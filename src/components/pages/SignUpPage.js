import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { MDBContainer, MDBRow, MDBCol, MDBBtn,MDBCard, MDBCardBody} from 'mdb-react-ui-kit';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginRight:100,
    marginLeft:100
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  card:{
    marginRight:30,
    marginLeft:200  
  }
}));
//
function SignUpPage(){
    const classes=useStyles();
    return(
        <div>
        <MDBContainer >
            <p>Sign Up</p>
        <MDBRow>
          <MDBCol md="8">
            <MDBCard>
              <MDBCardBody > 
                <form>
                <p>Error message field</p>
                <p className="h4 text-left mb-4">Personal Details</p>
                <MDBRow >
                    <MDBCol md="6">  
                    <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                        First name
                    </label>
                    <input type="text" id="defaultFormRegisterNameEx" className="form-control" />
                    <br />
                    </MDBCol>

                    <MDBCol md="6">
                    <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                        Last Name
                    </label>
                    <input type="text" id="defaultFormRegisterNameEx" className="form-control" />
                    <br />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6">  
                    <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                     Email Address
                    </label>
                    <input type="email" id="defaultFormRegisterEmailEx" className="form-control" />
                    <br />
                    </MDBCol>

                    <MDBCol md="6">
                    <label htmlFor="defaultFormRegisterMobileEx" className="grey-text">
                     Mobile Number
                    </label>
                    <input type="email" id="defaultFormMobileEx" className="form-control" />
                    <br />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6">  
                    <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                     Password
                    </label>
                    <input type="password" id="defaultFormRegisterPasswordEx" className="form-control" />
                    <br/>
                    </MDBCol>

                    <MDBCol md="6">
                    <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
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