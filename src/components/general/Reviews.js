import React from "react";
import {Grid, Typography, Divider, Button, Box, TextField, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));


export default function Reviews({name}){
    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return <Grid container direction="column" style={{height: '100%'}}>
        
        <Typography variant="h5">Reviews</Typography>
        <Box>
            <form className={classes.root} noValidate autoComplete="off">
      
                <div>                    
                    <TextField
                    id="outlined-multiline-static"
                    label="Multiline"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                    variant="outlined"
                    />
                </div>
            </form>
            <Button variant="contained" color="primary" justifyContent="flex-end" alignItems="flex-end">Publish</Button>
        </Box>

        
        
        
    </Grid>
}