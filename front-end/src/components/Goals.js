import { Fab, Tooltip, Modal, Box, Typography, Slider, Input, TextField, Button, Grid, Container, Stack } from '@mui/material';
import { v4 as uuid } from 'uuid';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import styled from '@emotion/styled';
import { createGoal, getGoals } from '../services/api';
import dayjs from 'dayjs';
import Goal from './Goal';

const CreateGoalModal = styled(Modal)({
    // margin: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
})

function Goals() {
    const { state } = useLocation();
    const [createGoalModalOpen, setCreateGoalModalOpen] = useState(false);
    const [goalsList, setGoalsList] = useState([]);

    const handleCreateGoal = (event) => {
        event.preventDefault();
        setCreateGoalModalOpen(false);
        const goalData = new FormData(event.currentTarget);
        const createdGoal = {id: uuid(), createdBy: state.id, goalName: goalData.get('name'), finishBy: goalData.get('finishBy'), difficulty: goalData.get('difficulty')};
        createGoal(createdGoal);
        setGoalsList([...goalsList, createdGoal]);
        // console.log(goalsList);
        // console.log(goalData.get('name'));
        // console.log(goalData.get('finishBy'));
        // console.log(goalData.get('difficulty'));
    };

    useEffect(() => {
        getGoals(state).then(receivedGoals => setGoalsList(...goalsList, receivedGoals));
    }, []);

    useEffect(() => {
        // console.log(goalsList);
    }, [goalsList])
    
    return (
        <>
            <Stack direction="row">
                {goalsList.map((goal) => (<Goal key={goal.id} goalInfo={goal} goalsList={goalsList} setGoalsList={setGoalsList}/>))}
            </Stack>
            <Tooltip
                onClick={(e) => setCreateGoalModalOpen(true)}
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
            <CreateGoalModal
                open={createGoalModalOpen}
                onClose={(e) => setCreateGoalModalOpen(false)}
            >
                <Box
                    m={1}
                    p={2}
                    borderRadius={5}
                    bgcolor={"background.default"}
                    component="form"
                    noValidate
                    onSubmit={handleCreateGoal}
                >
                    <Typography variant="h6" color="gray" textAlign="center">
                        Create new goal
                    </Typography>
                    <Grid
                        container
                        spacing={0.5}
                        p={3}
                    >
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size='small'
                                required
                                label="Name"
                                name="name"
                                id="name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="date"
                                name="finishBy"
                                size="small"
                                InputProps={{inputProps: { min: dayjs().format('YYYY-MM-DD')}}}
                            />
                        </Grid>                        
                    </Grid>
                    <Box p={2}>
                        <Typography variant="h7" gutterBottom>
                            Difficulty
                        </Typography>
                        <Slider
                            id="difficulty"
                            name="difficulty"
                            defaultValue={1}
                            step={1}
                            min={1}
                            marks
                            max={5}
                            valueLabelDisplay='auto'
                        />
                    </Box>
                    <Box
                        sx={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                        <Button
                            type='submit'
                            variant='contained'
                            justifyContent='center'
                            alignItems='center'
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </CreateGoalModal>
        </>
    )
}

export default Goals