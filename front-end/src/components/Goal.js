import { Card, CardContent, Typography } from '@mui/material'
import React, { useEffect } from 'react'

function Goal(props) {
  return (
    <Card sx={{marginTop: 2, height: 300, width: 300}}>
      <CardContent>
        <Typography>{props.goalInfo.goalName}</Typography>
      </CardContent>
    </Card>
  )
}

export default Goal