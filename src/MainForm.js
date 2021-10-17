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
        <p>Meals</p>
        <div>
          <input type="radio" id="0" name="meals" value="0"
                checked/>
          <label for="0">0</label>
        </div>
        <div>
          <input type="radio" id="1" name="meals" value="1"/>
          <label for="1">1</label>
        </div>
        <div>
          <input type="radio" id="2" name="meals" value="2"/>
          <label for="2">2</label>
        </div>
        <label>1st Meal</label>
        <input
          className="form-control"
          type="time" id="1st-meal" name="1st-meal"
        />
        <div>
          <input type="radio" id="half" name="1st-duration" value="half"
                checked/>
          <label for="half">Half-hour</label>
        </div>
        <div>
          <input type="radio" id="hour" name="1st-duration" value="hour"/>
          <label for="hour">1 Hour</label>
        </div>
        <label>2nd Meal</label>
        <input
          className="form-control"
          type="time" id="2nd-meal" name="2nd-meal"
        />
        <div>
          <input type="radio" id="half" name="1st-duration" value="half"
                checked/>
          <label for="half">Half-hour</label>
        </div>
        <div>
          <input type="radio" id="hour" name="1st-duration" value="hour"/>
          <label for="hour">1 Hour</label>
        </div>
        
        
      </form>
    </div>
  )
}

export default MainForm