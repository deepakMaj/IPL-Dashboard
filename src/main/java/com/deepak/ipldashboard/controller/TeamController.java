package com.deepak.ipldashboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.deepak.ipldashboard.model.Team;
import com.deepak.ipldashboard.repository.MatchRepository;
import com.deepak.ipldashboard.repository.TeamRepository;

@RestController
public class TeamController {
	
	private TeamRepository teamRepository;
	private MatchRepository matchRepository;
	
	@Autowired
	public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
		this.teamRepository = teamRepository;
		this.matchRepository = matchRepository;
	}
	
	@GetMapping("/team/{teamName}")
	public Team getTeam(@PathVariable String teamName) {
		Team team = this.teamRepository.findByTeamName(teamName);
		team.setMatches(this.matchRepository.findLatestMatchesByTeam(teamName, 4));
		return team;
	}

}
