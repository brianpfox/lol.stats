.PHONY: all
all: matchStats lolStatsUI lolStatsAPI

.PHONY: matchStats 
matchStats:
	@echo Building Match Stats Service
	cp ./protos/matches/lol_stats.proto ./MatchStatsService/protos/
	docker build -f MatchStatsService/Dockerfile -t bfox/match_stats_service ./MatchStatsService
	
.PHONY: lolStatsUI
lolStatsUI:
	@echo Building LOL Stats UI
	cd ./LOLStatsUI && npm install && npm run build
	cp -R ./LOLStatsUI/build/ ./LOLStatsAPI/ui/

.PHONY: lolStatsAPI 
lolStatsAPI:
	@echo Building LOL Stats API
	cp ./protos/matches/lol_stats.proto ./LOLStatsAPI/protos/
	docker build -f LOLStatsAPI/Dockerfile -t bfox/lol_stats_api ./LOLStatsAPI
