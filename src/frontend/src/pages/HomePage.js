import React, { useState, useEffect } from 'react';
import { TeamTile } from '../components/TeamTile';
import './HomePage.scss';

export const HomePage = () => {

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchAllTeams = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/teams`);
      const data = await response.json();
      setTeams(data);
    };
    fetchAllTeams();
  }, []);

  return (
    <div className="HomePage">
      <div className="header">
        <h1 className="app-name">IPL Dashboard</h1>
      </div>
      <div className="team-grid">
        {teams.map((team, idx) => <TeamTile key={idx} teamName={team.teamName} />)}
      </div>
    </div>
  )
}
