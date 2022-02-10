import React, { useState, useEffect } from "react";
import { Modal, Button, Form, ModalFooter } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { useAuth } from "../auth_components/AuthContext"
import firebase from "firebase/app"
import DateTimePicker from 'react-datetime-picker';
import { actionCreators } from "../state/index";
import { bindActionCreators } from "redux";
import { useSelector } from "react-redux";

export default function EventAdder(props) {
const allEvent = useSelector(state => state.data.allEvent);
const [newEvent, setNewEvent] = useState({ title: "", start: new Date(), end: new Date() });
const { currentUser } = useAuth()
const dispatch = useDispatch();
const {handleAddEvent} = bindActionCreators(actionCreators,dispatch);
const {handlegetEvent} = bindActionCreators(actionCreators,dispatch);
const {handlegetusers} = bindActionCreators(actionCreators,dispatch);
const userlist = useSelector(state => state.data.userlist);
useEffect(()=>{
  handlegetusers();
},[]);



useEffect(()=>{
  handlegetEvent(currentUser.uid);
},[]);

const checkfunction=(obj)=>{
  for (var reff in allEvent) {
    if(( (allEvent[reff].start < newEvent.start) && (allEvent[reff].end > newEvent.start)) || ((allEvent[reff].start < newEvent.end)&&(allEvent[reff].end > newEvent.end)) || ((allEvent[reff].start >= newEvent.start)&&(allEvent[reff].end <= newEvent.end))){
      flag=1
    }
  }
  if(flag===0)
  handleAddEvent(currentUser.uid.toString(),obj)
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
    start: firebase.firestore.Timestamp.fromDate(new Date(newEvent.start)),
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
  );
}
