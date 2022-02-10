import React, { useState } from "react"
import { useAuth } from "../auth_components/AuthContext"
import { Link, useHistory } from "react-router-dom"
export default function Navbar(props) {

  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark bg-dark`}
    >
      <div className="container-fluid">
        <div className="navbar-brand" style={{margin:"5px"}}>
          <b>Event-Scheduler</b>
        </div>
        
        <div>
        <Link to="/update-profile"><button type="button" className="btn btn-primary m-1 float-right">Update Profile</button></Link>
          <button variant="link" onClick={handleLogout} type="button" className="btn btn-danger m-1 float-right">Log Out</button>
          </div>
      </div>
    </nav>
  );
}

// Navbar.propTypes = {
//   title: PropTypes.string.isRequired,
// };

// Navbar.defaultProps = {
//     title: 'Navbar'
//   };
