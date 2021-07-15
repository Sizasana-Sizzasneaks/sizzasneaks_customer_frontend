import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import 'bootstrap-css-only/css/bootstrap.min.css';
import "mdbreact/dist/css/mdb.css";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
   },  

}));

function SignUpPage() {
  const classes = useStyles();
  return (
    <div>
      <p style={{margin:"40px 0px 0px 0px", padding: "0px 50px 0px"}} >Sign Up</p>
      <MDBContainer style={{ margin: "10px auto 50px", backgroundColor: "#FFFFFF", padding:"20px"}}>
        <MDBRow>
          <MDBCol md="8" className={classes.card} style={{ margin: "0 auto" }}>
                <form>
                  <p>Error message field</p>
                  <p className="h4 text-left mb-4">Personal Details</p>
                  <MDBRow>
                    <MDBCol md="6">
                      <label htmlFor="defaultFormRegisterNameEx">
                        First name
                      </label>
                      <input
                        type="text"
                        id="defaultFormRegisterNameEx"
                        className="form-control"
                        required
                      />
                      <br />
                    </MDBCol>

                    <MDBCol md="6">
                      <label htmlFor="defaultFormRegisterNameEx">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="defaultFormRegisterNameEx"
                        className="form-control"
                        required
                      />
                      <br />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6">
                      <label htmlFor="defaultFormRegisterEmailEx">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="defaultFormRegisterEmailEx"
                        className="form-control"
                        required
                      />
                      <br />
                    </MDBCol>

                    <MDBCol md="6">
                      <label htmlFor="defaultFormRegisterMobileEx">
                        Mobile Number
                      </label>
                      <input
                        type="email"
                        id="defaultFormMobileEx"
                        className="form-control"
                        required
                      />
                      <br />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6">
                      <label htmlFor="defaultFormRegisterPasswordEx">
                        Password
                      </label>
                      <input
                        type="password"
                        id="defaultFormRegisterPasswordEx"
                        className="form-control"
                        required
                      />
                      <br />
                    </MDBCol>

                    <MDBCol md="6">
                      <label htmlFor="defaultFormRegisterPasswordEx">
                        Retype Password
                      </label>
                      <input
                        type="password"
                        id="defaultFormRegisterPasswordEx"
                        className="form-control"
                        required
                      />
                     
                    </MDBCol>
                  </MDBRow>

                  <div className="text-center mt-4">
                    <MDBBtn color="red-text"  className="rounded amber" type="submit">
                      Register
                    </MDBBtn>
                  </div>
                </form>
              
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default SignUpPage;
