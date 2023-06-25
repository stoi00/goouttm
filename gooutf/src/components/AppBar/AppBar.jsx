import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import LogoG from "../../images/LogoGoOut.png"
import { Drawer } from "@mui/material";
import { useState,useEffect } from "react";
import { createTheme,ThemeProvider } from "@mui/material/styles";
import Divider from '@mui/material/Divider';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from "@mui/material/Button";
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import ListSubheader from '@mui/material/ListSubheader';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import SearchIcon from '@mui/icons-material/Search';
const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    custom: {
      main: '#2A2967',
    },
    custom2:{
      main: '#FFFFFF'
    },
    custom3:{
      main: '#b23b3b'
    },
    custom4:{
      main:'#658354'
    }
  },
});
export default function AppbBar() {
  const [isDrawerOpen,setIsDrawerOpen]=useState(false)
  const [logg,setlogg]=useState(false)
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const logout=()=>{
    localStorage.clear();
  }
  const checkLogin=()=>{
    if(localStorage.getItem("userEmail")!=null)
    {
      return 1;
    }
    return 0;
  }
  useEffect(() => {
    if(checkLogin()===1){
      setlogg(true)
    }else{
      setlogg(false)
    }
  })
  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
      <AppBar position="static" style={{textAlign: 'center',display: "flex", }} color="custom">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          onClick={()=>setIsDrawerOpen(true)}>
            <MenuIcon color="custom2" />
          </IconButton>
          <Drawer anchor='left' open={isDrawerOpen} onClose={()=>setIsDrawerOpen(false)} >
            <Box p={2} width='250px' textAlign="center">
            <img src={LogoG} alt="logo"/>
            <Divider></Divider>
            <List>
            <Button onClick={handleClick} color="custom" style={{height:"55px",width:"250px",alignItems:"center",justifyContent:"center",display:"flex"}}> <AutoAwesomeMotionIcon />Events
            {open ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <Button href="http://localhost:3000/" variant="text" color="custom" style={{height:"55px",width:"250px"} }>All</Button>
            <Button href="http://localhost:3000/cultural" variant="text" color="custom" style={{height:"55px",width:"250px"} }>Cultural</Button>
            <Button href="http://localhost:3000/charity" variant="text" color="custom" style={{height:"55px",width:"250px"} }>Charity</Button>
            <Button href="http://localhost:3000/sportive" variant="text" color="custom" style={{height:"55px",width:"250px"} }>Sportive</Button>
            <Button href="http://localhost:3000/concerts" variant="text" color="custom" style={{height:"55px",width:"250px"} }>Concerts</Button>
            <Button href="http://localhost:3000/students" variant="text" color="custom" style={{height:"55px",width:"250px"} }>For students</Button>
            </List>
            </Collapse>
            </List>
            <Button href={logg? "http://localhost:3000/add_events":"http://localhost:3000/login"} variant="text" color="custom" style={{height:"55px",width:"250px"}}><LibraryAddIcon />Add events</Button>
            <Button href={logg? "http://localhost:3000/joined_events":"http://localhost:3000/login"} variant="text" color="custom" style={{height:"55px",width:"250px"}}><DomainVerificationIcon />Joined events</Button>  
            <Button href={"http://localhost:3000/search"} variant="text" color="custom" style={{height:"55px",width:"250px"}}><SearchIcon />Search events</Button>      
            <Button href={logg? "http://localhost:3000/your_events":"http://localhost:3000/login"} variant="text" color="custom" style={{height:"55px",width:"250px"}}><ModeEditIcon/>Your events</Button>
            <Button href={logg? "http://localhost:3000/edit_profile":"http://localhost:3000/login"} variant="text" color="custom" style={{height:"55px",width:"250px"}}><ManageAccountsIcon/>Account settings</Button>
            {logg?(<Button onClick={logout} href="http://localhost:3000/login" variant="text" color="custom3" style={{height:"55px",width:"250px"}}><LogoutIcon/>Logout</Button>):
            (<Button href="http://localhost:3000/login" variant="text" color="custom4" style={{height:"55px",width:"250px"}}><LoginIcon/>Login</Button>)}
            </Box>
          </Drawer>
          <div style={{width:"100%",alignItems:"center",display:'flex',justifyContent:"center"}}>
          <img src={LogoG} alt="logo" style={{width:"30px", height: "40px",alignSelf:"center",marginLeft:"-50px"}}/>
          <Typography style={{color:"white",fontSize:"30px"}}>o out</Typography>
          </div>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
    </Box>
 
  );
}
