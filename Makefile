.PHONY: matchStats

matchStats:
	@echo Building Match Stats Service
	cp ./protos/matches/lol_stats.proto ./MatchStatsService/protos/
	docker build -f MatchStatsService/Dockerfile -t bfox/match_stats_service ./MatchStatsService
	