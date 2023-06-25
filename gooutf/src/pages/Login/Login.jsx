import React, { useState } from "react";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import { TextField, Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import Avatar from "@mui/material/Avatar";
import Logo from "../../images/LogoGoOut.png";
import { INITIAL_FORM_STATE, loginSchema } from "../../validations/loginSchema";
import axios from "axios";
import env from "../../environment.json";
import { Navigate, useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

function Login() {
  const [user, setUser] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const salt = "$2a$10$CwTycUXWue0Thq9StjUM0u";

  const populateStorage = (email) => {
    localStorage.setItem("userEmail", `${email}`);
  };
  let navigate=useNavigate();
  
  const handleSubmit = (email, password) => {
    axios
      .get(`${env.BASE_URL}` + `User/${email}`)
      .then(function (response) {
        if (response) { 
          if(response.data.password===bcrypt.hashSync(password,salt)){
          setUser(response.data);
          populateStorage(email);
          enqueueSnackbar("Logged in succesfully!", {
            variant: "success",
          });
          let path='/'
          navigate(path)
        }else{
          enqueueSnackbar(`Wrong email or password!`, {
            variant: "error",
          });
        }}
      })
      .catch(function (error) {
        enqueueSnackbar(`Wrong email or password!`, {
          variant: "error",
        });
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: INITIAL_FORM_STATE,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleSubmit(values.email,values.password);
    },
  });


  return (
    <div style={{width:"100%"}}>
    <form onSubmit={formik.handleSubmit}>
      <Box className="container">
      <img src={Logo} alt="logo" />
        <Box
          style={{
            display: "flex",
            position: "relative",
            width: "200px",
            height: "50px",
            paddingBottom: "20px",
          }}
        >
        
        </Box>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item lg={7} md={9} sm={12} xs={12}>
            <TextField
              sx={{ backgroundColor: "white", width: "100%" }}
              name="email"
              label="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={!!formik.errors.email && formik.touched.email}
              helperText={formik.errors.email}
              multiline
            />
          </Grid>
          <Grid item lg={7} md={8} sm={12} xs={12}>
            <TextField
              sx={{ backgroundColor: "white", width: "100%" }}
              label="Password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={!!formik.errors.password && formik.touched.password}
              helperText={formik.errors.password}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          type="submit"
          sx={{ height: "40px", width: "176px", marginTop: "10px" }}
        >
          {" "}
          Submit{" "}
        </Button>
      </Box>
    </form>
    <Box style={{width:"100%",justifyContent:"center",alignItems:"center",display:"flex"}}>
      <Button href="http://localhost:3000/register" style={{alignSelf:"center"}} >Don't have an account?</Button>
    </Box>
    </div>
  );
}

export default Login;
