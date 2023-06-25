import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import env from "../../environment.json";
import JoinCard from "../../components/JoinCard/JoinCard";

function JoinedEvents() {
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
        {user.likedEvents?.map((event) => (
          <Grid key={event.id} item lg={3} md={6} sm={6} xs={12}>
            <JoinCard item={event} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default JoinedEvents;
