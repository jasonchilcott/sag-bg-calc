import React from "react"

const MainForm = () => {

  return (
    <div className="main-form">
      <h4>BG CALC Main Form</h4>
      <form>
      <label>Time in:</label>
        <input
          className="form-control"
          type="time" id="time-in" name="time-in"
        />
        <label>Time out:</label>
        <input
          className="form-control"
          type="time" id="time-out" name="time-out"
        />
        <label>NDB:</label>
        <input
          className="form-control"
          type="time" id="ndb" name="ndb"
        />
        
        
      </form>
    </div>
  )
}

export default MainForm