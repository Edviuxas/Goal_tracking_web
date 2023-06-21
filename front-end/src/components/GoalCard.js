import { Box, Card, CardActionArea, CardContent, CardHeader, IconButton, LinearProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteGoal } from '../services/api';
import { useNavigate } from "react-router-dom";
import GoalDetailsModal from './GoalDetailsModal';

function GoalCard({ setClickedGoal, goalInfo, goalsList, setGoalsList, setModalOpen }) {
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   // console.log(goalInfo.finishBy);
  //   // console.log('goal info from card' + goalInfo);
  //   console.log(goalInfo);
  // }, []);

  const handleDeleteGoal = (event) => {
    event.stopPropagation();
    console.log(goalInfo.id);
    deleteGoal(goalInfo.id);
    setGoalsList(goalsList.filter(goal => goal.id !== goalInfo.id));
  };

  const handleCardClick = (event) => {
    setClickedGoal(goalInfo);
    setModalOpen(true);
    // navigate('/goal', { state: goalInfo })
  };

  const deadlinePassed = () => {
    const dateToday = new Date();
    const deadlineDate = new Date(goalInfo.finishBy);
    if (dateToday > deadlineDate)
        return true;
    return false;
  }

  return (
    <>
      <Card variant='outlined' sx={{margin: 2, width: 300, position: 'relative', backgroundColor: deadlinePassed() && "lightpink"}}>
        <CardActionArea
          onClick={handleCardClick}
        >
          <CardHeader
            title={goalInfo.name}
            action={
              <IconButton onClick={handleDeleteGoal} sx={{ color: '#ab003c' }}>
                <DeleteIcon/>
              </IconButton>
            }
            sx={{ paddingBottom: 0 }}
          />
          <CardContent>
            {/* <IconButton onClick={handleDeleteGoal} sx={{ position: 'absolute', top: 10, right: 10, color: '#ab003c' }}>
              <DeleteIcon/>
            </IconButton> */}
            {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              
              
            </Box> */}
            <Box>
            {/* <Typography sx={{ fontWeight: 'bold' }}>{goalInfo.goalName}</Typography> */}
              <Typography>{goalInfo.finishBy}</Typography>
              <Box mb={1} mt={1}>
                <Typography sx={{ fontSize: 14 }}>Difficulty</Typography>
                <LinearProgress variant="determinate" value={goalInfo.difficulty * 20}/>
              </Box>
              <Typography>{goalInfo.goalType}</Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export default GoalCard