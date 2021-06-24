import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { YearSelector } from '../components/YearSelector';
import { Link } from 'react-router-dom';
import './MatchPage.scss';

export const MatchPage = () => {

  const [matches, setMatches] = useState([]);
  const { teamName, year } = useParams();

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}/matches?year=${year}`);
      const data = await response.json();
      setMatches(data);
    };
    fetchMatches();
  }, [teamName, year]);

  let renderMatches;

  if(matches === null || matches.length === 0) {
    renderMatches = <h3>Team has no match.</h3>
  } else {
    renderMatches = matches.map((match, idx) => (
      <MatchDetailCard key={idx} match={match} teamName={teamName} />
    ));
  }

  return (
    <div className="MatchPage">
      <div className="year-selector">
        <h3>Select Year</h3>
        <YearSelector teamName={teamName} />
      </div>
      <div>
        <div className="heading">
          <h1 className="page-heading">{teamName} matches in {year}</h1>
          <h4><Link to="/">{`<`} All Teams</Link></h4>
        </div>
        {renderMatches}
      </div>
    </div>
  )
}
