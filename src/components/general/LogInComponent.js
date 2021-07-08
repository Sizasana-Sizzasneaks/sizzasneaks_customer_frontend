import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn,MDBCard,MDBCardBody} from 'mdb-react-ui-kit';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    
  }));
function LogInComponent(){
    const classes=useStyles();
    return(
        <div>
        <MDBContainer >
        <MDBRow>
          <MDBCol md="8" >
            <MDBCard style={{ maxWidth: '22rem' }}>
              <MDBCardBody className={classes.root} > 
                <form> 
                <p className="h4 text-center py-4">LOGIN</p>
                <div><p>Successful Login: div error message</p></div>
                <MDBRow >
                    <MDBCol md="12">  
                        <label htmlFor="defaultFormRegisterNameEx" >
                            Username
                        </label>
                        <input type="text" id="defaultFormRegisterNameEx" placeholder='Enter username' className="form-control" />
                        <br/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12">  
                        <label htmlFor="defaultFormRegisterPasswordEx">
                        Password
                        </label>

                        <input type="password" id="defaultFormRegisterPasswordEx" placeholder='Enter Password'className="form-control" />
                        <p className="font-small blue-text d-flex justify-content-end pb-3">
                            <a href='/src/components/pages/ProductPage.js'>Forgot Password?</a>
                        </p>
                    </MDBCol>  
                </MDBRow>
                
                  <div className="text-center mt-4">
                        <MDBBtn color="unique" type="submit">
                        LOGIN
                        </MDBBtn>
                        <p>New Customer? <a href='/sign-up'>Register Now</a></p>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer> 
      </div>
    )
}

export default LogInComponent;