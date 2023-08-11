import React from 'react'
import { Box, Typography, Divider,Paper } from '@mui/material'

function ContactUs() {
    return (
        <div>
            <Box sx={{
                bgcolor: 'background.paper',
                borderRadius: "10px",
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Typography variant='h5' m={2}>Contact Us</Typography>
                <Divider sx={{ mb: 2, color: "blue" }} />
                <Paper elevation={2} sx={{padding:"100px"}}>
                    <Typography id="modal-modal-description">
                        Thank you for uploading your details, for any queries, please reach out at 9818373388 or shikher@klarfin.com
                    </Typography>
                </Paper>
            </Box>

        </div>
    )
}

export default ContactUs