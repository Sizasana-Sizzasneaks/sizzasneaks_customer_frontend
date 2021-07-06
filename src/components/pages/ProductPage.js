import React, { useState } from 'react';
/* import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css'; */

import {Grid} from '@material-ui/core';
import ImageGrid from '../general/ImageGrid';
import MainImage from '../general/MainImage';
import Info from '../general/Info';


const images = [
  "https://res.cloudinary.com/shelflife-online/image/upload/c_fill,f_auto,q_auto:best,w_681/v1575961299/uploads/assets/560-Nike-Air-Force-1-Hello-CZ0327-100-side-075.jpg",
  "https://res.cloudinary.com/shelflife-online/image/upload/c_fill,f_auto,q_auto:best,w_681/v1575961299/uploads/assets/80c-Nike-Air-Force-1-Hello-CZ0327-100-close-up-1-6ab.jpg",
  "https://res.cloudinary.com/shelflife-online/image/upload/c_fill,f_auto,q_auto:best,w_681/v1575961299/uploads/assets/867-Nike-Air-Force-1-Hello-CZ0327-100-close-up-2-380.jpg"
  
];

const product = {
  title: 'Airforce 1',
  description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  price: 1999,
  brand:"Nike"
};

function ProductPage(){
    const [selectedImage, setSelectedImage] = useState(0)
    return(
      <div>
        <Grid container spacing={1} style={{maxWidth: 1100, margin: "0 auto"}}>
          <Grid Item sm={1}>
            <ImageGrid images={images} onSelect={setSelectedImage} selectedImage={selectedImage}/>
          </Grid>
          <Grid Item sm={5}>
            <MainImage src={images[selectedImage]}/>
          </Grid>
          <Grid Item sm={6}>
            <Info {...product}/>
          </Grid>
        </Grid>
      </div>
      )
}

export default ProductPage;




