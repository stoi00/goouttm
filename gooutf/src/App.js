import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Events from "./pages/Events/Events";
import AppbBar from "./components/AppBar/AppBar";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import AddEvents from "./pages/AddEventsAsUser/AddEvents";
import YourEvents from "./pages/ViewYourEvents/YourEvents";
import EditEvents from "./pages/EditEventsAsUser/EditEvents";
import EditProfile from "./pages/EditProfile/EditProfile";
import JoinedEvents from "./pages/ViewJoinedEvents/JoinedEvents";
import SearchEvents from "./pages/Search/SearchEvents";
import { useState,useEffect } from "react";
import StudentEvents from "./pages/Events/StudentEvents";
import CharityEvents from "./pages/Events/CharityEvents";
import SportiveEvents from "./pages/Events/SportiveEvents";
import ConcertsEvents from "./pages/Events/ConcertsEvents";
import CulturalEvents from "./pages/Events/CulturalEvents";
import Result from "./pages/Search/Result";
function App() {
  const [logg,setlogg]=useState(false)
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
  // <Route exact path="/result" element={<Result />} />
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <AppbBar/>
      <Router>
        <Routes>
          {!logg?(<><Route exact path="/" element={<Events />} />
          <Route exact path="/students" element={<StudentEvents/>}/>
          <Route exact path="/charity" element={<CharityEvents/>}/>
          <Route exact path="/sportive" element={<SportiveEvents/>}/>
          <Route exact path="/concerts" element={<ConcertsEvents/>}/>
          <Route exact path="/cultural" element={<CulturalEvents/>}/>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/search" element={<SearchEvents />} />
          <Route exact path="/result" element={<Result />} /></>)
          :(<><Route exact path="/" element={<Events />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/add_events" element={<AddEvents />} />
          <Route exact path="/your_events/:id" element={<EditEvents />} />
          <Route exact path="/your_events" element={<YourEvents />} />
          <Route exact path="/edit_profile" element={<EditProfile />} />
          <Route exact path="/joined_events" element={<JoinedEvents />} />
          <Route exact path="/search" element={<SearchEvents />} />
          <Route exact path="/result" element={<Result />} />
          <Route exact path="/students" element={<StudentEvents/>}/>
          <Route exact path="/charity" element={<CharityEvents/>}/>
          <Route exact path="/sportive" element={<SportiveEvents/>}/>
          <Route exact path="/concerts" element={<ConcertsEvents/>}/>
          <Route exact path="/cultural" element={<CulturalEvents/>}/></>)}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
