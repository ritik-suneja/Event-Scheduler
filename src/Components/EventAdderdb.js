import React, {useState, useEffect} from 'react';
import { MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Button } from 'react-bootstrap';
import EventAdder from './EventAdder';


export default function Users(props) {

    const [modalShow, setModalShow] = React.useState(false);

  return (
  <div>
      <Button variant="primary" style={{width:"90%"}} onClick={() => setModalShow(true)}>
    Add Event
    </Button>
    
    <EventAdder
    show={modalShow}
    onHide={() => setModalShow(false)}
    />
    <hr></hr>
    </div>
  );
}
