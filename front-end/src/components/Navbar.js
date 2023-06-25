import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, AppBar, Toolbar } from '@mui/material';

function Navbar() {
  return (
    <AppBar position='static'>
        <Toolbar>
            <Link to="/goals" style={{ textDecoration: 'none', color: 'white' }}>
                <Typography
                    variant='h6'
                >
                    GOALS
                </Typography>
            </Link>
            <Link to="/teams" style={{ textDecoration: 'none', color: 'white' }}>
                <Typography
                    variant='h6'
                    marginLeft={5}
                >
                    TEAMS
                </Typography>
            </Link>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar