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
        <label for="changes">Wardrobe changes:</label>
        <input type="number" id="changes" name="changes"
        min="0" max="10"/>

        <p>Formalwear/Uniform</p>

        <div>
          <input type="checkbox" id="formalwear" name="formalwear"
                />
          <label for="formalwear">Formalwear</label>
        </div>

        <div>
          <input type="checkbox" id="uniform" name="uniform"/>
          <label for="uniform">Uniform</label>
        </div>
        
        <p>Props</p>

        <div>
          <input type="checkbox" id="camera" name="camera"
                />
          <label for="camera">Camera</label>
        </div>

        <div>
          <input type="checkbox" id="golf-clubs" name="golf-clubs"/>
          <label for="golf-clubs">Golf Club(s)</label>
        </div>
        
        <div>
          <input type="checkbox" id="luggage" name="luggage"
                />
          <label for="luggage">Luggage</label>
        </div>

        <div>
          <input type="checkbox" id="pet" name="pet"/>
          <label for="pet">Pet</label>
        </div>
        <div>
          <input type="checkbox" id="skis" name="skis"
                />
          <label for="skis">Skis</label>
        </div>

        <div>
          <input type="checkbox" id="tennis-racquet" name="tennis-racquet"/>
          <label for="tennis-racquet">Tennis Racquet</label>
        </div>

        
        
        
      </form>
    </div>
  )
}

export default MainForm