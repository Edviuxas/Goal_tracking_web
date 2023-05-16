import { Box, Card, CardContent, CardHeader, IconButton, LinearProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteGoal } from '../services/api';

function Goal({ goalInfo, goalsList, setGoalsList }) {

  // useEffect(() => {
  //   console.log(goalInfo.finishBy);
  // }, []);

  const handleDeleteGoal = (event) => {
    console.log(goalInfo.id);
    deleteGoal(goalInfo.id);
    setGoalsList(goalsList.filter(goal => goal.id !== goalInfo.id));
  };

  return (
    <Card variant='outlined' sx={{margin: 2, height: 300, width: 300, position: 'relative'}}>
      <CardHeader
        title={goalInfo.goalName}
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
    </Card>
  )
}

export default Goal