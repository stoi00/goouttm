import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import EventCard from "../../components/EventCard/EventCard";
import axios from "axios";
import env from "../../environment.json";

function Events() {
  const categories = [
    {
      key: 1,
      value: "Cultural",
    },
    {
      key: 2,
      value: "Political",
    },
    {
      key: 3,
      value: "Students",
    },
    {
      key: 4,
      value: "Kids",
    },
  ];
  const [events, setEvents] = useState([]);
  const fetchEvents = async () => {
    await axios
      .get(`${env.BASE_URL}` + `Event`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div style={{ padding: "50px" }}>
      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid key={event.id} item lg={3} md={6} sm={6} xs={12}>
            <EventCard item={event} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Events;
