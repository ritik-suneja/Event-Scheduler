import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import EventAdderdb from "./EventAdderdb";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../state/index";
import { bindActionCreators } from "redux";
import { useAuth } from "../auth_components/AuthContext"
import Users from "./Users";
const locales = {
  "en-IN": require("date-fns/locale/en-IN"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});


export default function Dashboard() {
  const { currentUser } = useAuth()
  const allEvent = useSelector(state => state.data.allEvent);
  const dispatch = useDispatch();
  const {handlegetEvent} = bindActionCreators(actionCreators,dispatch);
  const {handledeleteEvent} = bindActionCreators(actionCreators,dispatch);
  

  useEffect(()=>{
    handlegetEvent(currentUser.uid);
  },[]);
  

  
  var ar = Object.entries(allEvent).map(e => e[1])
  ar.map(
  (element) => {
    element.start=new Date(element.start.seconds*1000);
    element.end=new Date(element.end.seconds*1000);
  }
  )

  const handleSelect=(event) => {
    console.log();
    for (var reff in allEvent) {
      if( allEvent[reff].title === event.title && allEvent[reff].start === event.start && allEvent[reff].end === event.end){
        if (window.confirm("Delete the Event?")) {
          handledeleteEvent(currentUser.uid,reff);
      } 
      }
    }
  }
  return (
    <>
      
      <Navbar />
      <div
        className="container-fluid"
        style={{ margin: "0px", padding: "0px" }}
      >
        <div className="row" style={{ margin: "0px", padding: "0px" }}>
          <div
            className="col-lg-3 float-right col-md-12"
            style={{ margin: "0px", padding: "0px" }}
          >
            <ProSidebar style={{ margin: "0px", padding: "0px" , width:'100%' } }>
              <Menu iconShape="square">
                <br></br>
                <MenuItem>
                 <h4 style={{ textAlign: "center" }}><b>User Details:</b></h4>
                 <h6 style={{ textAlign: "center" }}><b>{currentUser.email}</b></h6>
                </MenuItem>
                <hr></hr>
                <SubMenu title={<b >ADD EVENTS</b>}>
                <EventAdderdb></EventAdderdb>
                </SubMenu>
                <hr></hr>
                <SubMenu title={<b >USER-LIST</b>}>
                  <Users/>
                </SubMenu>
                <hr></hr>
                
              </Menu>
            </ProSidebar>
          </div>
          <div className="col-lg-9 float-left col-md-12" style={{ marginTop:"0px", padding: "20px" }} >
            <br></br>
            <div style={{marginLeft:"15px",marginRight:"20px", backgroundColor: "white" , border: '5px solid rgb(2, 194, 163, 0.5)' }}>
            <br></br>
            <h1 style={{ textAlign: "center" }}><b>Event-Scheduler</b> 
              </h1>
            
            <Calendar
              localizer={localizer}
               events={ar}
               startAccessor="start"
               endAccessor="end"
               style={{ height: 500, margin: "30px" }}
              step={15}
              timeslots={8}
               localizer={localizer}
              defaultView={Views.WEEK}
              onSelectEvent={handleSelect}
              eventPropGetter={(event) => {
                //rgb(2, 194, 163)
                //const backgroundColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
                var style = {
                  backgroundColor: 'rgb(2, 194, 163)',
                  borderRadius: '2px',
                  opacity: 0.8,
                  color: 'black',
                  border: '10px',
                  display: 'block'
              };
                return { style: style };
              }}
            />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
