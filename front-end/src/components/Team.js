import React, { useEffect, useState } from 'react';
import { Box, Fab, Tooltip, Typography, Stack, AppBar, Toolbar } from '@mui/material';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import Navbar from './Navbar';
import CreateTeamModal from './CreateTeamModal';

function Team() {
  const [createTeamModalOpen, setCreateTeamModalOpen] = useState(false);
  const user = JSON.parse(sessionStorage.getItem('user'));
  // const navigate = useNavigate();
  const toggleModalOpen = () => {
    setCreateTeamModalOpen((prevState) => !prevState);
    // console.log(createTeamModalOpen);
  }

  useEffect(() => {
    console.log(createTeamModalOpen);
  }, [createTeamModalOpen])

  return (
    <>
      <Navbar/>
      {!user.team && 
        <Tooltip
          onClick={toggleModalOpen}
          title="Create new team"
          sx={{
              position: "fixed",
              bottom: 20,
              left: 30
          }}
        >
          <Fab color="primary">
            <Add/>
          </Fab>
        </Tooltip>
      }
      <CreateTeamModal createTeamModalOpen={createTeamModalOpen} setCreateTeamModalOpen={setCreateTeamModalOpen}/>
    </>
  )
}

export default Team