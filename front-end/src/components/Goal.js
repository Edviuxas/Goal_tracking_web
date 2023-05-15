import { Box, Card, CardContent, IconButton, LinearProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteGoal } from '../services/api';

function Goal({ goalInfo, goalsList, setGoalsList }) {

  // useEffect(() => {
  //   console.log(goalsList);
  // }, []);

  const handleDeleteGoal = (event) => {
    console.log(goalInfo.id);
    deleteGoal(goalInfo.id);
    setGoalsList(goalsList.filter(goal => goal.id !== goalInfo.id));
  };

  return (
    <Card sx={{margin: 2, height: 300, width: 300, position: 'relative'}}>
      <CardContent>
        <IconButton onClick={handleDeleteGoal} sx={{ position: 'absolute', top: 10, right: 10, color: '#ab003c' }}>
          <DeleteIcon/>
        </IconButton>
        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          
          
        </Box> */}
        <Box sx={{ width: '80%' }}>
        <Typography sx={{ fontWeight: 'bold' }}>{goalInfo.goalName}</Typography>
          <Typography>{goalInfo.finishBy}</Typography>
          <Box>
            <Typography sx={{ fontSize: 14 }}>Difficulty</Typography>
            <LinearProgress variant="determinate" value={goalInfo.difficulty * 20}/>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Goal