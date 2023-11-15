import { Box, Typography } from '@mui/material'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import React from 'react'

function WhoCard({text}:any) {
  return (
    <Box sx={{width:{xs:"auto",md:"100%"},height:"2rem",display:"flex",flexDirection:"row",gap:"1rem",color:"#133249",backgroundColor:"white",borderRadius:"1rem",p:4,alignItems:"center"}}>
        <Box sx={{color:"green"}}>
            <TaskAltIcon sx={{fontSize:"3rem"}} />
        </Box>
        <Box >
            <Typography sx={{fontSize:"1.2rem",fontWeight:"550",textAlign:"left"}}>{text}</Typography>
        </Box>
    </Box>
  )
}

export default WhoCard