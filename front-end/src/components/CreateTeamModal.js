import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { createTeam } from '../services/api';

function CreateTeamModal({ createTeamModalOpen, setCreateTeamModalOpen }) {
    const [teamName, setTeamName] = useState('');

    const handleModalClose = () => {
        setCreateTeamModalOpen(false);
        console.log('closing from modal');
    }

    const handleCreateClick = async () => {
        const createdTeam = await createTeam({name: teamName});
        //TODO: update user using patch
        console.log('createdTeam');
        console.log(createdTeam);
        setCreateTeamModalOpen(false);
    }

    return (
        <Modal
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            open={createTeamModalOpen}
            onClose={handleModalClose}
        >
            <Box
                width={400}
                bgcolor={"background.default"}
                color={"text.primary"}
                p={3}
                borderRadius={5}
                sx={{display: 'flex', flexDirection: 'column'}}
            >
                <Typography textAlign='center' variant='h6' mb={1}>Create new team</Typography>
                <TextField onChange={(e) => setTeamName(e.target.value)} required size='small' fullWidth placeholder='Team name'/>
                <Box
                    pt={1}
                    sx={{ display: 'flex',  justifyContent: 'center', gap: '12px' }}
                >
                    <Button
                        onClick={handleModalClose}
                        variant='outlined'
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateClick}
                        type='submit'
                        variant='contained'
                        justifyContent='center'
                        alignItems='center'
                    >
                        Create
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default CreateTeamModal