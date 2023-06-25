import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import React from 'react'

function CreateTeamModal({ createTeamModalOpen, setCreateTeamModalOpen }) {

    const handleModalClose = () => {
        setCreateTeamModalOpen(false);
        console.log('closing from modal');
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
                <TextField required size='small' fullWidth/>
                <Box
                    pt={1}
                    sx={{ display: 'flex',  justifyContent: 'flex-end', gap: '12px' }}
                >
                    <Button
                        onClick={handleModalClose}
                        variant='outlined'
                    >
                        Cancel
                    </Button>
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
        </Modal>
    )
}

export default CreateTeamModal