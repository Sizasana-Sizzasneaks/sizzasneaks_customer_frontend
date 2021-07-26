import React from "react";
import {Grid, Typography, Divider, Button, Box} from '@material-ui/core';



export default function Info({title, description, price, brand}){
    return <Grid container direction="column" style={{height: '100%'}}>
        <Typography variant="subtitle1">{brand}</Typography>
        <Divider/>
        <Box mt={2}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="subtitle1">{description}</Typography>            
            <Typography variant="h6">Color</Typography>
            <Button variant="outlined" >Green</Button>
            <Button variant="outlined">Blue</Button>
            <Button variant="outlined">Red</Button>
            <Typography variant="h6">Size</Typography>
            <Button variant="outlined">Uk5</Button>
            <Button variant="outlined">UK6</Button>
            <Button variant="outlined">UK7</Button>
            <Typography variant="h5">R{price}</Typography>
            <Button variant="contained" color="primary" justifyContent="flex-end" alignItems="flex-end">Add To Cart</Button>
            <Button variant="contained" color="primary" >Wishlist</Button>
        </Box>

        
        
        
    </Grid>
}