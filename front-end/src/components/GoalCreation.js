import { Box, Typography, Slider, TextField, Button, Grid, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { v4 as uuid } from 'uuid';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createGoal } from '../services/api';
import dayjs from 'dayjs';
import ResponsiblePeopleInput from './ResponsiblePeopleInput';

function GoalCreation() {
    const navigate = useNavigate();
    const [goalType, setGoalType] = useState('');
    const { state } = useLocation();
    const handleGoalTypeChange = (event, newType) => {
        setGoalType(newType);
    }

    const handleCreateGoal = (event) => {
        event.preventDefault();
        const goalData = new FormData(event.currentTarget);
        const createdGoal = {id: uuid(), createdBy: state.id, goalName: goalData.get('name'), finishBy: goalData.get('finishBy'), difficulty: goalData.get('difficulty'), 'goalType': goalType};
        createGoal(createdGoal);
        // state.setGoalsList([...state.goalsList, createdGoal]);
        // setGoalType('');
        navigate(-1);
        // console.log(goalsList);
        // console.log(goalData.get('name'));
        // console.log(goalData.get('finishBy'));
        // console.log(goalData.get('difficulty'));
        // console.log(goalData.get('goalType'));
    };

    useEffect(() => {
        console.log(state);
    }, [])

  return (
    <>
        <Box
            p={2}
            borderRadius={5}
            bgcolor={"background.default"}
            component="form"
            noValidate
            onSubmit={handleCreateGoal}
        >
            <Typography variant="h5" color="black" textAlign="center">
                Create new goal
            </Typography>
            <Grid
                container
                spacing={0.5}
                mb={2}
                mt={2}
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
            <ToggleButtonGroup
                name='goalType'
                color='primary'
                exclusive
                value={goalType}
                onChange={handleGoalTypeChange}
                sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}
            >
                <ToggleButton value="Personal goal">Personal goal</ToggleButton>
                <ToggleButton value="Team goal">Team goal</ToggleButton>
            </ToggleButtonGroup>
            <ResponsiblePeopleInput/>
            <Box pt={2} pb={2}>
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
    </>
  )
}

export default GoalCreation