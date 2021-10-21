import React from "react"
import Mark from './Mark.js';
import Summary from './Summary.js'

const Main = () => {

  //const totalBaseRate = baseRate + baseRateBumps




  return (
    <div className="main">

      
      <form>

      <h2>Base Rate:</h2>

      <div>
          <input type="radio" id="background" name="base-rate" value="background"
                checked/>
          <label for="background">Background</label>
        </div>
        <div>
          <input type="radio" id="special-ability" name="base-rate" value="special-ability"/>
          <label for="special-ability">Special-ability</label>
        </div>
        <div>
          <input type="radio" id="stand-in" name="base-rate" value="stand-in"
                />
          <label for="stand-in">Stand-in/Photo Double</label>
        </div>
        <div>
          <input type="radio" id="other" name="base-rate" value="other"/>
          <label for="other">Other:</label>
        </div>
        <label for="other-base">Other Base Rate: $</label>
        <input type="number" id="other-base" name="other-base"
        min="0"/>

      <h2>Base Rate Bumps</h2>

        <div>
          <input type="checkbox" id="makeup-beard" name="makeup-beard"
                />
          <label for="makeup-beard">Makeup/Beard</label>
        </div>

        <div>
          <input type="checkbox" id="smoke" name="smoke"/>
          <label for="smoke">Smoke</label>
        </div>

        <div>
          <input type="checkbox" id="wet" name="wet"
                />
          <label for="wet">Wet</label>
        </div>

        <label for="other-base-bump">Other Base Rate Bump: $</label>
        <input type="number" id="other-base-bump" name="other-base-bump"
        min="0"/>

        <div>
          <h2>Hours</h2>
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
        </div>
        <h2>Meals</h2>
        <div>
          <div>
        <label>NDB:</label>
        <input type="radio" id="no-ndb" name="ndb" value="false"
                checked/>
          <label for="no-ndb">None</label>
          <input type="radio" id="yes-ndb" name="ndb" value="true"/>
          <label for="yes-ndb">NDB at:</label>
          <div>

        <input
          className="form-control"
          type="time" id="ndb-time" name="ndb-time"
        />
        </div>
        </div>

        <h3>Meal Breaks</h3>
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
                />
          <label for="half">Half-hour</label>
        </div>
        <div>
          <input type="radio" id="hour" name="1st-duration" value="hour"/>
          <label for="hour">1 Hour</label>
        </div>

        <h2>Other Bumps</h2>
        <div>
        <label for="changes">Wardrobe changes:</label>
        <input type="number" id="changes" name="changes"
        min="0" max="10"/>

        <h3>Formalwear/Uniform</h3>

        <div>
          <input type="checkbox" id="formalwear" name="formalwear"
                />
          <label for="formalwear">Formalwear</label>
        </div>

        <div>
          <input type="checkbox" id="uniform" name="uniform"/>
          <label for="uniform">Uniform</label>
        </div>
        
        <h3>Props</h3>

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

        <h3>Vehicles</h3>

        <div>
          <input type="checkbox" id="bike" name="bike"
                />
          <label for="bike">Bike</label>
        </div>

        <div>
          <input type="checkbox" id="car" name="car"/>
          <label for="car">car</label>
        </div>
        
        <div>
          <input type="checkbox" id="moped" name="moped"
                />
          <label for="moped">Moped</label>
        </div>

        <div>
          <input type="checkbox" id="motorcycle" name="motorcycle"/>
          <label for="motorcycle">Motorcycle</label>
        </div>
        <div>
          <input type="checkbox" id="skates" name="skates"
                />
          <label for="skates">Rollerskates/Skateboard</label>
        </div>

        <div>
          <input type="checkbox" id="trailer" name="trailer"/>
          <label for="trailer">Trailer</label>
        </div>

        <h3>Misc.</h3>

        <label for="misc">Misc. Bump:</label>
        $<input type="number" id="misc" name="misc"
        min="0"/>
        </div>



        
        
      </form>
      <Mark />
      <Summary />
    </div>
  )
}

export default Main