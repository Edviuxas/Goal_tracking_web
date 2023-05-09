import React from 'react'
import { useLocation } from 'react-router-dom';

function Goals() {
    const { state } = useLocation();
    return (
        <div>{state.email}</div>
    )
}

export default Goals