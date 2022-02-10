import React from 'react'
import { useState, useEffect } from "react";
import { Modal, Button, Form, ModalFooter } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import firebase from "firebase/app"
import { actionCreators } from "../state/index";
import { bindActionCreators } from "redux";
import {fireDB} from "../firebase";
import DateTimePicker from 'react-datetime-picker';
import { Alert } from "react-bootstrap";


export default function OtherUsersEventAdder(props) {
const [newEvent, setNewEvent] = useState({ title: "", start: new Date(), end: new Date() });
const dispatch = useDispatch();
const {handleAddEvent} = bindActionCreators(actionCreators,dispatch);

const [Eventlist, setEventlist] = useState({});

useEffect(()=>{
    fireDB.child(`${props.user}`).on("value",(snapshot)=>{
        
        if(snapshot.val() !== null){
            setEventlist({
                ...snapshot.val(),
            });
        } else {
            snapshot({});
        }
    })
},[]);

  console.log()
const checkfunction=(obj)=>{
for (var reff in Eventlist) {
    if(( (Eventlist[reff].start.seconds < obj.start.seconds ) && (Eventlist[reff].end.seconds  > obj.start.seconds )) || ((Eventlist[reff].start.seconds  < obj.end.seconds )&&(Eventlist[reff].end.seconds  > obj.end.seconds )) || ((Eventlist[reff].start.seconds  >= obj.start.seconds )&&(Eventlist[reff].end.seconds  <= obj.end.seconds ))){
    flag=1
    }
}
if(flag===0)
{fireDB.child(`${props.user}`).push(obj, (err)=>{
   if(err) {
      console.log(err);
   }
})}
else
{
  alert("An Event Already Exists!!")
}
}


var flag=0;
const onSubmit = (e) => {
e.preventDefault();
let obj={
    title: newEvent.title,
    start: firebase.firestore.Timestamp.fromDate(new Date(newEvent.start )),
    end: firebase.firestore.Timestamp.fromDate(new Date(newEvent.end))
    }
    if(newEvent.end < newEvent.start){
      alert("Invalid Event!!")
    }
    else{
    checkfunction(obj)
    }
};

const handleselect = (value) => setNewEvent(prev => ({
    ...prev, 
    start: value }))
    
const handleendselect = (value) => setNewEvent(prev => ({
    ...prev, 
    end: value }))
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Event
        </Modal.Title>
      </Modal.Header>
      
        <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Title" value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}/>
          </Form.Group>

          <Form.Group>
          <Form.Label>Start Date</Form.Label>
          <DateTimePicker value={new Date(newEvent.start)} onChange={handleselect} format="y-MM-dd h:mm:ss a"/>
          </Form.Group>
          <br></br>
          <Form.Group>
          <Form.Label>End Date</Form.Label>
          <DateTimePicker value={new Date(newEvent.end)} onChange={handleendselect} format="y-MM-dd h:mm:ss a"/>
          </Form.Group>
          </Modal.Body>
          <ModalFooter>
          <Button variant="primary" type="submit" className="float-left mx-1" onClick={onSubmit} >
            Submit
          </Button>
          <Button className="float-right mx-1" onClick={props.onHide}>Close</Button>
          </ModalFooter>
        </Form>
    </Modal>
  )
}
