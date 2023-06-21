import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Typography, ListItemButton, ListItemIcon, Button, Alert, AlertTitle } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { updateGoal } from '../services/api';

function GoalDetails() {
    const navigate = useNavigate();
    const [checked, setChecked] = React.useState([]);
    const goalInfo = useLocation().state;
    const [currentGoal, setCurrentGoal] = useState(goalInfo);
    // const [goalUpdated, setGoalUpdated] = useState(false);

    useEffect(() => {
        let initiallyChecked = [];
        goalInfo.okrGoals.forEach(okrGoal => {
            if (okrGoal.isDone)
                initiallyChecked.push(okrGoal.id);
        });
        setChecked(initiallyChecked);
        console.log(goalInfo);
    }, [])

    const handleToggle = (id) => () => {    
        const currentIndex = checked.indexOf(id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    }

    const handleUpdateGoal = (event) => {
        let updatedOkrGoals = goalInfo.okrGoals;
        updatedOkrGoals.forEach(okrGoal => {
            if (checked.includes(okrGoal.id))
                okrGoal.isDone = true;
        });
        updateGoal({...goalInfo, okrGoals: updatedOkrGoals});
        navigate(-1);
    }

    return (
        <Box p={2}>
            <Typography variant='h4'>{goalInfo.goalName}</Typography>
            <Typography variant='h6'>Check off completed okr goals</Typography>
            <List>
                {goalInfo.okrGoals.map((okrGoal) => (
                    <ListItem
                        key={okrGoal.id}
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(okrGoal.id)} dense disabled={okrGoal.isDone}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    tabIndex={-1}
                                    checked={checked.indexOf(okrGoal.id) !== -1}
                                    disableRipple
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </ListItemIcon>
                            <ListItemText primary={okrGoal.name}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box
                sx={{ display: 'flex',  justifyContent: 'center' }}
            >
                <Button
                    type='submit'
                    variant='contained'
                    justifyContent='center'
                    alignItems='center'
                    onClick={handleUpdateGoal}
                >
                    Save
                </Button>
            </Box>
            {/* {goalUpdated && (
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    This is a success alert — <strong>check it out!</strong>
                </Alert>
            )} */}
        </Box>
    )
}

export default GoalDetails