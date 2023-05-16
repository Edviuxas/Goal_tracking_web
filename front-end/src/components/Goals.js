import { Fab, Tooltip, Typography, Stack, AppBar, Toolbar } from '@mui/material';
import { v4 as uuid } from 'uuid';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { createGoal, getGoals } from '../services/api';
import GoalCard from './GoalCard';

// const CreateGoalModal = styled(Modal)({
//     // margin: 1,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
// })

function Goals() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [createGoalModalOpen, setCreateGoalModalOpen] = useState(false);
    const [goalsList, setGoalsList] = useState([]);
    const [goalType, setGoalType] = useState('');

    const handleCreateGoal = (event) => {
        event.preventDefault();
        setCreateGoalModalOpen(false);
        const goalData = new FormData(event.currentTarget);
        const createdGoal = {id: uuid(), createdBy: state.id, goalName: goalData.get('name'), finishBy: goalData.get('finishBy'), difficulty: goalData.get('difficulty'), 'goalType': goalType};
        createGoal(createdGoal);
        setGoalsList([...goalsList, createdGoal]);
        setGoalType('');
        // console.log(goalsList);
        // console.log(goalData.get('name'));
        // console.log(goalData.get('finishBy'));
        // console.log(goalData.get('difficulty'));
        // console.log(goalData.get('goalType'));
    };

    // const handleGoalTypeChange = (event, newType) => {
    //     setGoalType(newType);
    // }

    useEffect(() => {
        getGoals(state).then(receivedGoals => setGoalsList(...goalsList, receivedGoals));
        // console.log('shown');
    }, []);

    useEffect(() => {
        console.log('goalsList');
        console.log(goalsList);
    }, [goalsList])
    
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
                onClick={(e) => navigate('/createGoal', { state: state })}
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
            {/* <CreateGoalModal
                open={createGoalModalOpen}
                onClose={(e) => setCreateGoalModalOpen(false)}
            >
                <Box
                    m={1}
                    p={3}
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
            </CreateGoalModal> */}
        </>
    )
}

export default Goals