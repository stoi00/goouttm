import React, { useEffect, useState } from "react";
import { AppBar, Grid } from "@mui/material";
import { useFormik } from "formik";
import { TextField, Box, IconButton, Button } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker"
import { useSnackbar } from "notistack";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import UploadIcon from "@mui/icons-material/Upload";
import {
  INITAL_FORM_STATE,
  addEventsSchema,
} from "../../validations/addEventsSchema";
import axios from "axios";
import env from "../../environment.json";
import "./styles.css";
function AddEvents() {
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState({});
  const [imagePath,setImagePath]=useState("");
  const [date, setDate] = useState();
  const [image, setImage] = useState('');
  const categories = [
    {
      key: 1,
      value: "Cultural",
    },
    {
      key: 2,
      value: "Sportive",
    },
    {
      key: 3,
      value: "Students",
    },
    {
      key: 4,
      value: "Charity",
    },
    {
      key: 5,
      value: "Concerts",
    },
  ];
  const uploadImage = async () => {
    const event= document.getElementById('inp').files[0];
    const files = event
    const data = new FormData()
    data.append('file', event)
    data.append('upload_preset', 'internship')
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dm196upxm/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()

    setImage(file.secure_url)
    setImagePath(file.secure_url);
    console.log(file.secure_url)
  }
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

  const handleSubmit = (event) => {
    axios
      .post(`${env.BASE_URL}` + `Event`, {
        name: event.name,
        photo: (imagePath)?imagePath:"",
        date_time: date,
        description: event.description,
        location: event.location,
        category: event.category,
        entryFee: event.entryFee,
        createdUserID: user.id,
      })
      .then(function (response) {
        if (response) {
          console.log(response.data);
          console.log(event);
          enqueueSnackbar("You event was registerd succesfully!", {
            variant: "success",
          });
        }
      })
      .catch(function (error) {
        enqueueSnackbar(`Something went wrong!`, {
          variant: "error",
        });
        console.log(event);
      });
  };

  const formik = useFormik({
    initialValues: INITAL_FORM_STATE,
    validationSchema: addEventsSchema,
    onSubmit: (values) => {
      let event;
      event = {
        name: values.name,
        description: values.description,
        location: values.location,
        category: values.category,
        entryFee: values.entryFee.toString(),
      };
      handleSubmit(event);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box className="container">
      <Box
          style={{
            display: "flex",
            position: "relative",
            width: "355.77px",
            height: "250px",
            flexDirection: "column",
            padding: "20px",
            outlineStyle:"double",
            borderRadius:"8px",
            outlineOffset:"-15px" 
          }}
        >
          <img
            sx={{ width: "355.77px", height: "250px" }}
            aria-label="recipe"
            alt=""
            src={image?image:""}
            style={{borderRadius:"8px",marginTop:"6 px ",width: "355.77px", height: "250px"}}
          />
          <IconButton
            color="primary"
            aria-label="Upload picture"
            component="label"
            sx={{ position: "absolute" }}
          >
            <input id="inp" hidden accept="image/*" type="file" onChange={()=>uploadImage()} />
            <UploadIcon
              sx={{
                fontSize: "2.5rem",
                color: "white",
                backgroundColor: "blue",
                borderRadius: 10,
              }}
            />
          </IconButton>
        </Box>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item lg={7} md={9} sm={12} xs={12}>
            <TextField
              sx={{ backgroundColor: "white", width: "100%" }}
              name="name"
              label="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={!!formik.errors.name && formik.touched.name}
              helperText={formik.errors.name}
              multiline
            />
          </Grid>
          <Grid item lg={7} md={9} sm={12} xs={12}>
 
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Date&Time"
                onChange={(newval)=>{setDate(newval)}}
                value={date}
                error={!!formik.errors.date_time && formik.touched.date_time}
                helperText={formik.errors.date_time} style={{width:"100%"}}/>
            </LocalizationProvider>
          </Grid>
          <Grid item lg={7} md={9} sm={12} xs={12}>
            <TextField
              sx={{ backgroundColor: "white", width: "100%" }}
              label="Description"
              name="description"
              multiline
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              error={!!formik.errors.description && formik.touched.description}
              helperText={formik.errors.description}
            />
          </Grid>
          <Grid item lg={7} md={9} sm={12} xs={12}>
            <TextField
              sx={{ backgroundColor: "white", width: "100%" }}
              label="Location"
              name="location"
              multiline
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
              error={!!formik.errors.location && formik.touched.location}
              helperText={formik.errors.location}
            />
          </Grid>
          <Grid item lg={7} md={9} sm={12} xs={12}>
            <TextField
              sx={{ backgroundColor: "white", width: "100%" }}
              label="Price"
              name="entryFee"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.entryFee}
              error={!!formik.errors.entryFee && formik.touched.entryFee}
              helperText={formik.errors.entryFee}
            />
          </Grid>
          <Grid item lg={7} md={9} sm={12} xs={12}>
            <TextField
              sx={{ backgroundColor: "white", width: "100%" }}
              select
              label="Category"
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              error={!!formik.errors.category && formik.touched.category}
              helperText={formik.errors.category}
            >
              {categories.map((option) => (
                <MenuItem key={option.key} value={option.key}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
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

export default AddEvents;
