import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import { TextField, Box, IconButton, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import Avatar from "@mui/material/Avatar";
import UploadIcon from "@mui/icons-material/Upload";
import { editProfileSchema } from "../../validations/editProfileSchema";
import Logo from "../../images/LogoGoOut.png";
import axios from "axios";
import env from "../../environment.json";
import "./styles.css";

function EditProfile() {
  const [user, setUser] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const GetUserEmail = () => {
    const email = localStorage.getItem("userEmail");
    axios
      .get(`${env.BASE_URL}` + `User/${email}`)
      .then(function (response) {
        if (response) {
          setUser(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    GetUserEmail();
    console.log(user);
  }, []);

  const handleSubmit = (User) => {
    axios
      .put(`${env.BASE_URL}` + `User`, {
        id: user.id,
        name: User.name,
        surname: User.surname,
        photo: "",
        age: User.age,
        email: user.email,
        password: user.password,
      })
      .then(function (response) {
        if (response) {
          setUser(response.data);
          enqueueSnackbar("You edited your accoutnt succesfully!", {
            variant: "success",
          });
        }
      })
      .catch(function (error) {
        enqueueSnackbar(`Something went wrong!`, {
          variant: "error",
        });
        console.log(error);
      });
  };

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      name: user.name,
      surname: user.surname,
      age: user.age,
    },
    validationSchema: editProfileSchema,
    onSubmit: (values) => {
      let user;
      user = {
        name: values.name,
        surname: values.surname,
        age: values.age,
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

export default EditProfile;
