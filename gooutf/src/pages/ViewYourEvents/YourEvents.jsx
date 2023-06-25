import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import EventCard from "../../components/EventCard/EventCard";
import axios from "axios";
import env from "../../environment.json";
import EditCard from "../../components/EditCard/EditCard";

function YourEvents() {
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
  }, [user]);

  return (
    <div style={{ padding: "50px" }}>
      <Grid container spacing={2}>
        {user.createdEvents?.map((event) => (
          <Grid key={event.id} item lg={3} md={6} sm={6} xs={12}>
            <EditCard item={event} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default YourEvents;
