import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { MDBContainer, MDBRow, MDBCol, MDBBtn,MDBCard, MDBCardBody} from 'mdb-react-ui-kit';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  card:{
     
  }
}));

function SignUpPage(){
    const classes=useStyles();
    return(
        <div>
        <MDBContainer >
            <p>Sign Up My my my</p>
        <MDBRow>
          <MDBCol md="8" className={classes.card}>
            <MDBCard>
              <MDBCardBody className={classes.root} > 
                <form>
                <p>Error message field</p>
                <p className="h4 text-left mb-4">Personal Details</p>
                <MDBRow >
                    <MDBCol md="6">  
                    <label htmlFor="defaultFormRegisterNameEx" >
                        First name
                    </label>
                    <input type="text" id="defaultFormRegisterNameEx" className="form-control" />
                    <br/>
                    </MDBCol>

                    <MDBCol md="6">
                    <label htmlFor="defaultFormRegisterNameEx">
                        Last Name
                    </label>
                    <input type="text" id="defaultFormRegisterNameEx" className="form-control" />
                    <br/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6">  
                    <label htmlFor="defaultFormRegisterEmailEx">
                     Email Address
                    </label>
                    <input type="email" id="defaultFormRegisterEmailEx" className="form-control" />
                    <br />
                    </MDBCol>

                    <MDBCol md="6">
                    <label htmlFor="defaultFormRegisterMobileEx">
                     Mobile Number
                    </label>
                    <input type="email" id="defaultFormMobileEx" className="form-control" />
                    <br />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6">  
                    <label htmlFor="defaultFormRegisterPasswordEx">
                     Password
                    </label>
                    <input type="password" id="defaultFormRegisterPasswordEx" className="form-control" />
                    <br/>
                    </MDBCol>

                    <MDBCol md="6">
                    <label htmlFor="defaultFormRegisterPasswordEx">
                     Retype Password
                    </label>
                    <input type="password" id="defaultFormRegisterPasswordEx" className="form-control" />
                    <br/>
                    </MDBCol>
                </MDBRow>
             
                  <div className="text-center mt-4">
                    <MDBBtn color="unique" type="submit">
                      Register
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      </div>
    );
}

export default SignUpPage;