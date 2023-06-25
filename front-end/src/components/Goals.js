import { Box, Fab, Tooltip, Typography, Stack, AppBar, Toolbar } from '@mui/material';
import { v4 as uuid } from 'uuid';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { createGoal, getGoals } from '../services/api';
import GoalCard from './GoalCard';
import GoalDetailsModal from './GoalDetailsModal';

function Goals() {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [goalsList, setGoalsList] = useState([]);
    const [clickedGoal, setClickedGoal] = useState({okrGoals: []});
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        getGoals().then(receivedGoals => setGoalsList(...goalsList, receivedGoals));
    }, []);

    // useEffect(() => {
    //     // console.log('modal should have opened');
    // }, [modalOpen])

    useEffect(() => {
        console.log('clicked goal: ')
        console.log(clickedGoal);
    }, [clickedGoal])
    
    return (
        <>
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
            <Box>
                <Stack direction="row" flexWrap="wrap">
                    {goalsList.map((goal) => (
                        <GoalCard
                            key={goal.id}
                            goalInfo={goal}
                            goalsList={goalsList}
                            setGoalsList={setGoalsList}
                            setClickedGoal={setClickedGoal}
                            setModalOpen={setModalOpen}
                        />
                    ))}
                </Stack>
            </Box>
            <Tooltip
                onClick={(e) => navigate('/goal-creation')}
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
            <GoalDetailsModal goalInfo={clickedGoal} modalOpen={modalOpen} setModalOpen={setModalOpen}/>
        </>
    )
}

export default Goals