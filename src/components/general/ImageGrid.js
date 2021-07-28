import React from "react";
import {Grid} from '@material-ui/core';



export default function ImageGrid({ images, onSelect, selectedImage}){
    return <Grid container>
            {images.map((image, index) => <img src={image} height={55} onClick={() => onSelect(index)} style={{ border: index === selectedImage ? "solid 1px black" : "solid 1px #eee", cursor: "pointer"}}/>)}
    </Grid>;
}