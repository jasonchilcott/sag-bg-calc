import React, {useState} from "react"
import Mark from './Mark.js';
import Summary from './Summary.js'


const baseRateObj = { 'background': 182, 'specialAbility': 192, 'standIn': 214}
const Main = () => {

  //const totalBaseRate = baseRate + baseRateBumps

  const [role, setRole] = useState('background')
  const [ otherBaseRate, setOtherBaseRate] = useState(0)

  const roleHandler = (e) => {
    setRole(e.target.value)
  }

  const otherBaseRateHandler = (e) => {
    setOtherBaseRate(e.target.value)
  }

  const baseRate = () => {
    if ( role === 'other' ) {
      return otherBaseRate
    } else {
      return baseRateObj[role]
    }
  }

  const otherBaseRateField = () => {
    if ( role === 'other') {
      return (
        <>
        <label htmlFor="other-base" >Other Base Rate: $</label>
        <input type="number" id="other-base" name="other-base" value={otherBaseRate} onChange={otherBaseRateHandler}
        min="0"/>
        </>

      )
    }
  }

  console.log(baseRateObj[role])


  






  return (
    <div className="main">

      
      <form>

      <h2>Base Rate:</h2>

      <div>
          <input type="radio" id="background" name="role" value="background"
            onChange={roleHandler} defaultChecked/>
          <label htmlFor="background">Background</label>
        </div>
        <div>
          <input type="radio" id="special-ability" name="role" value="specialAbility" onChange={roleHandler}/>
          <label htmlFor="special-ability">Special-ability</label>
        </div>
        <div>
          <input type="radio" id="stand-in" name="role" value="standIn" onChange={roleHandler}
                />
          <label htmlFor="stand-in">Stand-in/Photo Double</label>
        </div>
        <div>
          <input type="radio" id="other" name="role" value="other" onChange={roleHandler}/>
          <label htmlFor="other">Other:</label>
        </div>
        <div>
        {otherBaseRateField()}
        </div>

      <h2>Base Rate Bumps</h2>

        <div>
          <input type="checkbox" id="makeup-beard" name="makeup-beard"
                />
          <label htmlFor="makeup-beard">Makeup/Beard</label>
        </div>

        <div>
          <input type="checkbox" id="smoke" name="smoke"/>
          <label htmlFor="smoke">Smoke</label>
        </div>

        <div>
          <input type="checkbox" id="wet" name="wet"
                />
          <label htmlFor="wet">Wet</label>
        </div>

        <label htmlFor="other-base-bump">Other Base Rate Bump: $</label>
        <input type="number" id="other-base-bump" name="other-base-bump"
        min="0"/>

        <div>
          <h2>Hours</h2>
        <label>Time in:</label>
        <input
          
          type="time" id="time-in" name="time-in"
        />
        <label>Time out:</label>
        <input
          
          type="time" id="time-out" name="time-out"
        />
        </div>
        <h2>Meals</h2>
        <div>
          <div>
        <label>NDB:</label>
        <input type="radio" id="no-ndb" name="ndb" value="false"
                />
          <label htmlFor="no-ndb">None</label>
          <input type="radio" id="yes-ndb" name="ndb" value="true"/>
          <label htmlFor="yes-ndb">NDB at:</label>
          <div>

        <input
          
          type="time" id="ndb-time" name="ndb-time"
        />
        </div>
        </div>

        <h3>Meal Breaks</h3>
          <input type="radio" id="0" name="meals" value="0"
                defaultChecked/>
          <label htmlFor="0">0</label>
        </div>
        <div>
          <input type="radio" id="1" name="meals" value="1"/>
          <label htmlFor="1">1</label>
        </div>
        <div>
          <input type="radio" id="2" name="meals" value="2"/>
          <label htmlFor="2">2</label>
        </div>
        <label>1st Meal</label>
        <input
          className="htmlForm-control"
          type="time" id="1st-meal" name="1st-meal"
        />
        <div>
          <input type="radio" id="half" name="1st-duration" value="half"
                />
          <label htmlFor="half">Half-hour</label>
        </div>
        <div>
          <input type="radio" id="hour" name="1st-duration" value="hour"/>
          <label htmlFor="hour">1 Hour</label>
        </div>
        <label>2nd Meal</label>
        <input
          
          type="time" id="2nd-meal" name="2nd-meal"
        />
        <div>
          <input type="radio" id="half" name="1st-duration" value="half"
                />
          <label htmlFor="half">Half-hour</label>
        </div>
        <div>
          <input type="radio" id="hour" name="1st-duration" value="hour"/>
          <label htmlFor="hour">1 Hour</label>
        </div>

        <h2>Other Bumps</h2>
        <div>
        <label htmlFor="changes">Wardrobe changes:</label>
        <input type="number" id="changes" name="changes"
        min="0" max="10"/>

        <h3>Formalwear/Uniform</h3>

        <div>
          <input type="checkbox" id="formalwear" name="formalwear"
                />
          <label htmlFor="formalwear">Formalwear</label>
        </div>

        <div>
          <input type="checkbox" id="uniform" name="uniform"/>
          <label htmlFor="uniform">Uniform</label>
        </div>
        
        <h3>Props</h3>

        <div>
          <input type="checkbox" id="camera" name="camera"
                />
          <label htmlFor="camera">Camera</label>
        </div>

        <div>
          <input type="checkbox" id="golf-clubs" name="golf-clubs"/>
          <label htmlFor="golf-clubs">Golf Club(s)</label>
        </div>
        
        <div>
          <input type="checkbox" id="luggage" name="luggage"
                />
          <label htmlFor="luggage">Luggage</label>
        </div>

        <div>
          <input type="checkbox" id="pet" name="pet"/>
          <label htmlFor="pet">Pet</label>
        </div>
        <div>
          <input type="checkbox" id="skis" name="skis"
                />
          <label htmlFor="skis">Skis</label>
        </div>

        <div>
          <input type="checkbox" id="tennis-racquet" name="tennis-racquet"/>
          <label htmlFor="tennis-racquet">Tennis Racquet</label>
        </div>

        <h3>Vehicles</h3>

        <div>
          <input type="checkbox" id="bike" name="bike"
                />
          <label htmlFor="bike">Bike</label>
        </div>

        <div>
          <input type="checkbox" id="car" name="car"/>
          <label htmlFor="car">car</label>
        </div>
        
        <div>
          <input type="checkbox" id="moped" name="moped"
                />
          <label htmlFor="moped">Moped</label>
        </div>

        <div>
          <input type="checkbox" id="motorcycle" name="motorcycle"/>
          <label htmlFor="motorcycle">Motorcycle</label>
        </div>
        <div>
          <input type="checkbox" id="skates" name="skates"
                />
          <label htmlFor="skates">Rollerskates/Skateboard</label>
        </div>

        <div>
          <input type="checkbox" id="trailer" name="trailer"/>
          <label htmlFor="trailer">Trailer</label>
        </div>

        <h3>Misc.</h3>

        <label htmlFor="misc">Misc. Bump:</label>
        $<input type="number" id="misc" name="misc"
        min="0"/>
        </div>



        <h4>role: {role}</h4>
        <h4>baseRate: </h4>
        <h4>baseRate: {baseRate()}</h4>
        
      </form>
      <Mark />
      <Summary />
    </div>
  )
}

export default Main