import React, {useState, useEffect} from 'react';
import { fireDB } from '../firebase';
import { MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Button } from 'react-bootstrap';
import { useAuth } from "../auth_components/AuthContext"
import OtherUsersEventAdder from './OtherUsersEventAdder';


export default function Users(props) {

    const { currentUser } = useAuth()
    const [userlist, setuserlist] = useState({});


    useEffect(()=>{
        fireDB.child('users').on("value",(snapshot)=>{
            
            if(snapshot.val() !== null){
                setuserlist({
                    ...snapshot.val(),
                });
            } else {
                snapshot({});
            }
        })
    },[]);

    const [modalShow, setModalShow] = React.useState(false);

  return (
  <div>
      {Object.keys(userlist).map((id)=>{
          if(userlist[id].email !== currentUser.email ){
          return (
          <div key={userlist[id].uid}>
          <MenuItem ><b className='float-left'>{userlist[id].username}</b> &nbsp; &nbsp;
          <Button className="btn btn-primary btn-sm float-right"  onClick={() => setModalShow(true)}> Add Event
         </Button>
         <OtherUsersEventAdder
          user={userlist[id].uid}
          show={modalShow}
          onHide={() => setModalShow(false)}/>
        </MenuItem>
          <hr></hr>
          </div>
          )
      }})}
    </div>
    
  );
}
