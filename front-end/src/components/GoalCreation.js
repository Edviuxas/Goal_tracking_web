import { Box, Typography, Slider, TextField, Button, Grid, ToggleButtonGroup, ToggleButton, Stack, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuid } from 'uuid';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createGoal } from '../services/api';
import dayjs from 'dayjs';
import ResponsiblePeopleInput from './ResponsiblePeopleInput';
import OkrTable from './OkrTable';

function GoalCreation() {
    const okrTableColumns = [
        { field: 'okrName', headerName: 'Name' },
        { field: 'okrFinishBy', headerName: 'Due date' },
        { field: 'okrDifficulty', headerName: 'Difficulty'}
    ];
    const navigate = useNavigate();
    const [goalType, setGoalType] = useState('');
    const [okrGoalsList, setOkrGoalsList] = useState([]);
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

    const handleAddOkrGoal = (event) => {
        event.preventDefault();
        const okrGoalData = new FormData(event.currentTarget);
        setOkrGoalsList([...okrGoalsList, {id: uuid(), okrName: okrGoalData.get('okrName'), okrFinishBy: okrGoalData.get('okrFinishBy'), okrDifficulty: okrGoalData.get('okrDifficulty')}])
        // console.log({okrName: okrGoalData.get('okrName'), okrFinishBy: okrGoalData.get('okrFinishBy'), okrDifficulty: okrGoalData.get('okrDifficulty')});
    };

    // useEffect(() => {
    //     console.log(okrGoalsList);
    // }, [okrGoalsList])

  return (
    <Stack
        direction="row"
        spacing={2}
        justifyContent="space-evenly"
        divider={<Divider orientation="vertical" flexItem />}
    >
        <Box
            p={2}
            component="form"
            noValidate
            onSubmit={handleCreateGoal}
            width="60%"
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
            <Box mt={2}>
                <OkrTable okrGoalsList={okrGoalsList} setOkrGoalsList={setOkrGoalsList}/>
            </Box>
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
                sx={{ display: 'flex',  justifyContent: 'flex-end' }}
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
        <Box
            p={2}
            component="form"
            onSubmit={handleAddOkrGoal}
        >
            <Typography variant="h5" color="black" textAlign="center">
                Create new OKR goal
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
                        name="okrName"
                        id="okrName"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        type="date"
                        name="okrFinishBy"
                        size="small"
                        InputProps={{inputProps: { min: dayjs().format('YYYY-MM-DD')}}}
                    />
                </Grid>                        
            </Grid>
            <Box pt={2} pb={2}>
                <Typography variant="h7" gutterBottom>
                    Difficulty
                </Typography>
                <Slider
                    id="okrDifficulty"
                    name="okrDifficulty"
                    defaultValue={1}
                    step={1}
                    min={1}
                    marks
                    max={5}
                    valueLabelDisplay='auto'
                />
            </Box>
            <Box
                sx={{ display: 'flex',  justifyContent: 'flex-end' }}
            >
                <Button
                    type='submit'
                    variant='contained'
                    justifyContent='center'
                    alignItems='center'
                >
                    Add
                </Button>
            </Box>
        </Box>
    </Stack>
  )
}

export default GoalCreation