# League of Legends Stats #
This is a partial implementation of an application that searches for and displays statistics for players of the game League of Legends.

All League of Legends game data is pulled via the Riot Games developer API at:
https://developer.riotgames.com/

## Application Structure ##
The application consists of 3 applications:

### 1) MatchStatsService ###
This is a Node JS microservice that encapsulates all communication with the Riot Games API. Communication with this microservice is achieved via gRPC calls to the application port.  In order for API calls to succeed, this service must run with a valid Riot Games API token stored in an environment variable named ```RIOT_API_KEY```.

Future features that are needed in this service are:

- Caching of Riot API responses (Redis)
- Monitoring of API Rate Limits (https://developer.riotgames.com/rate-limiting.html)
- Support for additional API calls to Riot Games for relevant player/match/tournament information
- Consolidated logging
- Full unit and integration testing

### 2) LOLStatsAPI ###
This is a Node JS API microservice using the Express framework.  The purpose of this API is to serve as a public bridge between a UI presentation layer and the business logic.  Public API endpoints are RESTful.  This service communicates with the MatchStatsService over a gRPC protocol.

Future features that are needed in this service are:

- Improved error handling around the communication with the MatchStatsService
- Once there is a full understanding of the exact match information needed for display, a mapping of the full data set to a DTO or view model should be done to return only relevant data to the UI.
- Support for paging of results
- Consolidated logging
- Full unit and integration testing

### 3) LOLStatsUI ###
This is a ReactJS user interface.  The purpose of this application is to provide a way for a user to search for a League of Legends Summoner and display some match results and statistics for the Summoner's most recent matches.  The application is configured with a basic CSS Grid based layout that adjusts for 3 basic screen widths.

Future features that are needed in this application are:

- Enhanced and complete styling
- Implementation of additional match metrics/statistics.
- Support for paging of match results

## Development ##

### Pre-requisites ### 
- NodeJS 10.0
- Docker
- Make

### Running the application locally ###
To run the application locally, first clone the repository to a local directory.
Then ```cd``` into that directory and run

```make```

to build the UI and the Docker images for the other two applications.

Run

```RIOT_API_KEY={your api key} ./run.sh```

to run the applications in Docker containers.  By default, the application can be accessed at:

```http://localhost:3001/```