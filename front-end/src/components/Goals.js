import { Fab, Tooltip, Typography, Stack, AppBar, Toolbar } from '@mui/material';
import { v4 as uuid } from 'uuid';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { createGoal, getGoals } from '../services/api';
import GoalCard from './GoalCard';

function Goals() {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [goalsList, setGoalsList] = useState([]);

    useEffect(() => {
        getGoals().then(receivedGoals => setGoalsList(...goalsList, receivedGoals));
    }, []);
    
    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <Typography
                        variant='h6'
                    >
                        GOALS
                    </Typography>
                    <Typography
                        variant='h6'
                        marginLeft={5}
                    >
                        TEAMS
                    </Typography>
                </Toolbar>
            </AppBar>
            <Stack direction="row" flexWrap="wrap">
                {goalsList.map((goal) => (<GoalCard key={goal.id} goalInfo={goal} goalsList={goalsList} setGoalsList={setGoalsList}/>))}
            </Stack>
            <Tooltip
                onClick={(e) => navigate('/createGoal')}
                title="Create new goal"
                sx={{
                    position: "fixed",
                    bottom: 20,
                    left: 30
                }}
            >
                <Fab color="primary">
                    <Add>

                    </Add>
                </Fab>
            </Tooltip>
        </>
    )
}

export default Goals