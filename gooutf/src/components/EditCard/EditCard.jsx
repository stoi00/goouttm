import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import env from "../../environment.json";
import axios from "axios";
import "./styles.css";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function EditCard({ item }) {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    axios
      .delete(`${env.BASE_URL}` + `Event/${item.id}`)
      .then(function (response) {
        if (response) {
          enqueueSnackbar("Event deleted succesfully!", {
            variant: "success",
          });
        }
      })
      .catch(function (error) {
        enqueueSnackbar(`Something went wrong!`, {
          variant: "error",
        });
      });
  };

  const submit = () => {

    confirmAlert({
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete()
        },
        {
          label: 'No',
        }
      ]
    });
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        title={item.name}
        titleTypographyProps={{ fontSize: 20, fontWeight: "bold" }}
        subheader={<Typography variant="body2" color="text.secondary">
        Date: {item.date_Time.toLocaleString().replace("T"," Time:")}
      </Typography>}
      />
      <CardMedia
        sx={{ padding: 0, width: "95%", borderRadius: 5, marginLeft: "10px" }}
        component="img"
        height="250"
        image={
          item.photo === ""
            ? "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80"
            : item.photo
        }
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <b>Location:</b> {item.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Price:</b> {item.entryFee}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="card-actions">
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          style={{ alignSelf: "flex-start" }}
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <Button
          onClick={() => {
            navigate(`/your_events/${item.id}`);
          }}
        >
          Edit
        </Button>
        <Button onClick={submit}>Delete</Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <b>Description:</b>
          </Typography>
          <Typography>{item.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
