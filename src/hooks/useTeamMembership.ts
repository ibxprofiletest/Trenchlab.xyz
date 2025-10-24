import { useState, useEffect } from 'react';

export const useTeamMembership = () => {
  const [joinedTeam, setJoinedTeam] = useState<string | null>(null);

  useEffect(() => {
    // Load from localStorage on mount
    const savedTeam = localStorage.getItem('trenchmark-joined-team');
    if (savedTeam) {
      setJoinedTeam(savedTeam);
    }
  }, []);

  const joinTeam = (teamId: string) => {
    setJoinedTeam(teamId);
    localStorage.setItem('trenchmark-joined-team', teamId);
  };

  const leaveTeam = () => {
    setJoinedTeam(null);
    localStorage.removeItem('trenchmark-joined-team');
  };

  return {
    joinedTeam,
    joinTeam,
    leaveTeam,
  };
};
