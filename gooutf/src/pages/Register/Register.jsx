import React, { useState } from "react";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import { TextField, Box, IconButton, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import Avatar from "@mui/material/Avatar";
import UploadIcon from "@mui/icons-material/Upload";
import {
  INITAL_FORM_STATE,
  registerSchema,
} from "../../validations/registerSchema";
import axios from "axios";
import env from "../../environment.json";
import "./styles.css";
import Logo from "../../images/LogoGoOut.png"
import bcrypt from 'bcryptjs';

function Register() {
  const [user, setUser] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const salt = "$2a$10$CwTycUXWue0Thq9StjUM0u";

  const handleSubmit = (user) => {
    axios
      .post(`${env.BASE_URL}` + `User`, {
        name: user.name,
        surname: user.surname,
        age: user.age,
        photo: "",
        email: user.email,
        password: bcrypt.hashSync(user.password, salt)
      })
      .then(function (response) {
        if (response) {
          setUser(response.data);
          enqueueSnackbar("You account was registerd succesfully!", {
            variant: "success",
          });
        }
      })
      .catch(function (error) {
        enqueueSnackbar(`This email has been already registered!`, {
          variant: "error",
        });
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: INITAL_FORM_STATE,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      let user;
      user = {
        name: values.name,
        surname: values.surname,
        age: values.age,
        email: values.email,
        password: values.password,
      };
      handleSubmit(user);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box className="container">
      <img src={Logo} alt="logo"/>
        <Box
          style={{
            display: "flex",
            position: "relative",
            width: "50px",
            height: "50px",
            flexDirection: "column",
            padding: "20px",
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
          <Grid item lg={7} md={9} sm={12} xs={12}>
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
          <Grid item lg={7} md={9} sm={12} xs={12}>
            <TextField
              sx={{ backgroundColor: "white", width: "100%" }}
              label="Name"
              name="name"
              multiline
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={!!formik.errors.name && formik.touched.name}
              helperText={formik.errors.name}
            />
          </Grid>
          <Grid item lg={7} md={9} sm={12} xs={12}>
            <TextField
              sx={{ backgroundColor: "white", width: "100%" }}
              label="Surname"
              name="surname"
              multiline
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.surname}
              error={!!formik.errors.surname && formik.touched.surname}
              helperText={formik.errors.surname}
            />
          </Grid>
          <Grid item lg={7} md={9} sm={12} xs={12}>
            <TextField
              sx={{ backgroundColor: "white", width: "100%" }}
              label="Age"
              name="age"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
              error={!!formik.errors.age && formik.touched.age}
              helperText={formik.errors.age}
            />
          </Grid>
        {/* </Grid>
        <Grid item lg={7} md={9} sm={12} xs={12}>
          <h5>Write "yes" below if you consent to using your data. </h5>
          </Grid>
        <Grid item lg={7} md={9} sm={12} xs={12}>
            <TextField id="text"
              sx={{ backgroundColor: "white", width: "100%" }}
            /> */}
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
  );
}

export default Register;
