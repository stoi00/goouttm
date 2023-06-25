import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import { TextField, Box, IconButton, Button } from "@mui/material";
import {
  INITAL_FORM_STATE,
  searchEventsSchema,
} from "../../validations/searchEventsSchema";
import axios from "axios";
import env from "../../environment.json";

function SearchEvents() {
  const [user, setUser] = useState({});
  
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
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (name, category) => {
    navigate('/result', {state:{name: name, category: category}});
  };

  const formik = useFormik({
    initialValues: INITAL_FORM_STATE,
    validationSchema: searchEventsSchema,
    onSubmit: (values) => {
      let event;
      event = {
        name: values.name,
        category: values.category,
        date: values.date
      };
      handleSubmit(values.name, values.category, values.date);
    },
  });

  return (
      <form onSubmit={formik.handleSubmit}>
      <Box className="container">
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item lg={7} md={9} sm={12} xs={12}>
            <TextField
              sx={{ backgroundColor: "white", width: "100%" }}
              name="name"
              label="Keyword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={!!formik.errors.name && formik.touched.name}
              helperText={formik.errors.name}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          type="submit"
          sx={{ height: "40px", width: "176px", marginTop: "10px" }}
        >
          {" "}
          Search{" "}
        </Button>
         
      </Box>
      </form>
)
              }
export default SearchEvents
