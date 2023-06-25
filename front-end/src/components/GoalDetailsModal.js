import { Box, Button, Checkbox, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { updateGoal } from '../services/api';

function GoalDetailsModal({ modalOpen, setModalOpen, goalInfo }) {
    const [checked, setChecked] = useState([]);

    useEffect(() => {
        console.log(goalInfo);
        if (modalOpen) {
            let initiallyChecked = [];
            goalInfo.okrGoals.forEach(okrGoal => {
                // console.log('okrGoal:');
                // console.log(okrGoal);
                if (okrGoal.isDone) {
                    console.log('pushing to checked');
                    initiallyChecked.push(okrGoal.id);
                }
            });
            setChecked(initiallyChecked);
        }
        // console.log(`modal open: ${modalOpen}`);
    }, [modalOpen])

    // useEffect(() => {
    //     console.log('goal info from modal')
    //     console.log(goalInfo);
        
    // }, [])

    // useEffect(() => {
    //     console.log('checked');
    //     console.log(checked);
    // }, [checked])

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

    const handleModalClose = () => {
        setModalOpen(false);
        setChecked([]);
    }
    
    const handleSaveButtonClick = () => {
        // goalInfo.okrGoals = checked;
        for (let i = 0; i < checked.length; i++) {
            const indexOfCheckedOkrGoal = goalInfo.okrGoals.findIndex(okrGoal => okrGoal.id === checked[i]);
            console.log('indexOfCheckedOkrGoal: ' + indexOfCheckedOkrGoal);
            goalInfo.okrGoals[indexOfCheckedOkrGoal].isDone = true;
        }
        updateGoal(goalInfo);
        setModalOpen(false);
    }

    const deadlinePassed = (okrGoal) => {
        const dateToday = new Date();
        const deadlineDate = new Date(okrGoal.finishBy);
        if (dateToday > deadlineDate)
            return true;
        return false;
    }

    return (
        <Modal
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            open={modalOpen}
            onClose={handleModalClose}
        >
            <Box
                width={400}
                bgcolor={"background.default"}
                color={"text.primary"}
                p={3}
                borderRadius={5}
            >
                <Box>
                    <Typography textAlign="center" variant='h6'>Okr goals</Typography>
                    <List>
                        {goalInfo.okrGoals.map((okrGoal, idx) => (
                            <>
                                <ListItem
                                    key={okrGoal.id}
                                    disablePadding
                                    sx={{justifyContent: "space-around"}}
                                >
                                    <ListItemButton role={undefined} onClick={handleToggle(okrGoal.id)} dense disabled={okrGoal.isDone} sx={{backgroundColor: deadlinePassed(okrGoal) && "lightpink"}}>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                tabIndex={-1}
                                                checked={checked.indexOf(okrGoal.id) !== -1}
                                                disableRipple
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </ListItemIcon>
                                        <Box sx={{display: 'flex', width:"100%", justifyContent: 'space-between'}}>
                                            <ListItemText primary={okrGoal.name}/>
                                            <ListItemText primary={"Due: " + okrGoal.finishBy} sx={{flex: 'none'}}/>    
                                        </Box>
                                    </ListItemButton>
                                </ListItem>
                                {idx < goalInfo.okrGoals.length - 1 && <Divider/>}
                            </>
                        ))}
                    </List>
                </Box>
                <Box sx={{ display:'flex', justifyContent:'center'}}>
                    <Button variant="contained" onClick={handleSaveButtonClick}>Save & close</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default GoalDetailsModal