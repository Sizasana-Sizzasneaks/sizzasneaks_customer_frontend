import React from "react";
import {Grid, Typography, Button} from '@material-ui/core';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBRow, MDBCol, MDBContainer, MDBRipple} from 'mdb-react-ui-kit';



export default function RelatedProducts({title, price, brand}){
    

    return (
       
      <MDBContainer>
      
        <MDBRow>
          <MDBCol size='6' sm='3' className='col-example'>
            <MDBCard style={{ maxWidth: '22rem' }}>
              <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                <MDBCardImage src='https://res.cloudinary.com/shelflife-online/image/upload/c_fill,f_auto,q_auto:best,w_681/v1575961299/uploads/assets/560-Nike-Air-Force-1-Hello-CZ0327-100-side-075.jpg' height={80} fluid alt='...' />
                <a>
                  <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                </a>
              </MDBRipple>
                {/* <MDBCardImage src='https://res.cloudinary.com/shelflife-online/image/upload/c_fill,f_auto,q_auto:best,w_681/v1575961299/uploads/assets/560-Nike-Air-Force-1-Hello-CZ0327-100-side-075.jpg' height={80} position='top' /> */}
                <MDBCardBody>
                  <MDBCardText>
                  <Typography variant="subtitle1">{title}</Typography>
                  <Typography variant="subtitle1">{price}</Typography>
                  </MDBCardText>
                  <Button variant="contained" color="primary">Add To Cart</Button>
                </MDBCardBody>
              </MDBCard>
          </MDBCol>   
        </MDBRow>
    </MDBContainer>
        
      
        
        
                  
          
    
    );
}


