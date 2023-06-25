import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import EventCard from "../../components/EventCard/EventCard";
import axios from "axios";
import env from "../../environment.json";

function ConcertsEvents() {
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
        {events.filter(e=>e.category===5).map((event) => (
          <Grid key={event.id} item lg={3} md={6} sm={6} xs={12}>
            <EventCard item={event} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ConcertsEvents;
