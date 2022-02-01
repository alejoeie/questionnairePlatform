import React from 'react'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import './profile.css';
function PaperCard({title, description, action, variante}) {
    return (
        <Grid item xs={4}>
        <Paper elevation={6} className="paperCard">
            <Box padding={2}>
            <Typography variant="subtitle1" component="h3">{title}</Typography>
            <Button variant="contained" onClick={action}>{description}</Button>
            </Box>
        </Paper>
        </Grid>
    )
}

export default PaperCard
