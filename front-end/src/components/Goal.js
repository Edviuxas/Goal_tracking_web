import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

function Goal(goalInfo) {
  return (
    // <div>{goalInfo.name}</div>
    <Card sx={{height: 300, width: 300}}>
      <CardContent>
        <Typography variant='h1'>{goalInfo.goalName}</Typography>
      </CardContent>
    </Card>
  )
}

export default Goal