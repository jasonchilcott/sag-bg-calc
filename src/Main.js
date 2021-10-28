import React, { useState } from "react";
import { DateTime, Duration, Interval  } from "luxon";
import Mark from "./Mark.js";
import Summary from "./Summary.js";

const baseRateObj = { background: 182, specialAbility: 192, standIn: 214 };
const baseBumpsArr = [19, 14, 14, 0]
const proopsArr = [5.5, 12, 5.5, 23, 12, 5.5]


const Main = () => {
  const [role, setRole] = useState("background");
  const [otherBaseRate, setOtherBaseRate] = useState(0);
  const [baseBumps, setBaseBumps] = useState([false, false, false, false]);
  const [otherBaseBump, setOtherBaseBump] = useState(0);
  const [inTime, setInTime] = useState('');
  const [outTime, setOutTime] = useState('');
  const [ndb, setNdb] = useState(false);
  const [ndbTime, setNdbTime] = useState('');
  const [mealBreaks, setMealBreaks] = useState(0);
  const [firstMeal, setFirstMeal] = useState('');
  const [firstLength, setFirstLength] = useState('')
  const [secondMeal, setSecondMeal] = useState('')
  const [secondLength, setSecondLength] = useState('')
  const [changes, setChanges] = useState(0)
  const [formalUni, setFormalUni] = useState([false, false])
  const [proops, setProops] = useState([false, false, false, false, false, false])
  //const [vehicles, setVehicles] = useState([false, false, false, false, false, false, false])
  const [miscBump, setMiscBump] = useState(0)

  const roleHandler = (e) => {
    setRole(e.target.value);
  };

  const otherBaseRateHandler = (e) => {
    setOtherBaseRate(e.target.value);
  };

  const baseBumpsHandler = (e) => {
    let newBaseBumpsArr = [...baseBumps]
    newBaseBumpsArr[e.target.value] = !newBaseBumpsArr[e.target.value]
    setBaseBumps(newBaseBumpsArr)
  };

  const formalUniHandler = (e) => {
    let newFormalUniArr = [...formalUni]
    newFormalUniArr[e.target.value] = !newFormalUniArr[e.target.value]
    setFormalUni(newFormalUniArr)
  };

  const otherBaseBumpHandler = (e) => {
    setOtherBaseBump(e.target.value);
  };

  const changesHandler = (e) => {
    setChanges(e.target.value);
  };

  //const capitalize = (str) => { str.charAt(0).toUpperCase() + str.slice(1) }

  const timeHandler = (e) => {
    // console.log(e.target.name)
    // let setter = 'set' + capitalize(e.target.name)
    // eval(setter).call(e.target.value)

    if (e.target.name === 'inTime') {
      setInTime(e.target.value)
    } else if (e.target.name === 'outTime') {
      setOutTime(e.target.value)
    } else if (e.target.name === 'ndbTime') {
      setNdbTime(e.target.value)
    } else if (e.target.name === 'firstMeal') {
      setFirstMeal(e.target.value)
    } else if (e.target.name === 'secondMeal') {
      setSecondMeal(e.target.value)
    }
    
  }

  const baseRate = () => {
    if (role === "other") {
      return otherBaseRate;
    } else {
      return baseRateObj[role];
    }
  };
  const totalBaseBumps = () => {
    let newBaseBumpsArr = [...baseBumpsArr]
    if (baseBumps[3]) {
      newBaseBumpsArr[3] = otherBaseBump
    } 
    newBaseBumpsArr = newBaseBumpsArr.map((bump, i) => {
      if (baseBumps[i] === false) {
        return 0
      } else {
        return bump
      }
    })
    return newBaseBumpsArr
  }

  const totalBaseRate = () => {
    return totalBaseBumps().reduce(
      (a, b) => a + b, 
      baseRate()
    )
  }

  const otherBaseRateField = () => {
    if (role === "other") {
      return (
        <>
          <label htmlFor="other-base">$</label>
          <input
            type="number"
            id="other-base"
            name="other-base"
            value={otherBaseRate}
            onChange={otherBaseRateHandler}
            min="0"
          />
        </>
      );
    }
  }; 

  const otherBaseBumpField = () => {
    //adds field for other base rate bumps if other is checked
    if (baseBumps[3]) {
      return (
        <>
        <label htmlFor="other-base-bump">$</label>
        <input
          type="number"
          id="other-base-bump"
          name="other-base-bump"
          min="0"
          onChange={otherBaseBumpHandler}
          value={otherBaseBump}
        />
        </>
      );
    }
  };

  const ndbHandler = () => {
    setNdb(!ndb)
    if (!ndb) {
      setNdbTime('')
    }
  }

  const maxNdb = () => {
    //the non-deductible breakfast, if one is offered, must be within 2 hours of the in time
    const start = DateTime.fromISO(inTime)
    return start.plus({ hours: 2 }).toLocaleString(DateTime.TIME_24_SIMPLE)
  }

  const ndbField = () => {
    if (ndb) {
      return (
        <>
          <div>
              <input type="time" id="ndb-time" name="ndbTime" min={inTime} max={maxNdb()} value={ndbTime} onChange={timeHandler}/>
            </div>
        </>
      );
    }
  }; 

  const breaksHandler = (e) => {
    setMealBreaks(e.target.value);
  };

  const mealBreaksField = () => {
    const firstMealField = () => {
      return(
      <>
      <label>1st Meal</label>
          <input
            className="htmlForm-control"
            type="time"
            id="firstMeal"
            name="firstMeal"
            min={inTime}
            max={outTime}
            onChange={timeHandler}
          />
          <div>
            <input type="radio" id="half" name="firstLength" value="00:30" onChange={lengthHandler}/>
            <label htmlFor="half">Half-hour</label>
          </div>
          <div>
            <input type="radio" id="hour" name="firstLength" value="01:00" onChange={lengthHandler}/>
            <label htmlFor="hour">1 Hour</label>
          </div>
          </>)
    }

    const secondMealField = () => {
      return(
      <>
      <label>2nd Meal</label>
        <input type="time" id="2nd-meal" name="secondMeal" min={firstMeal} max={outTime} onChange={timeHandler}/>
        <div>
          <input type="radio" id="half" name="secondLength" value="00:30" onChange={lengthHandler}/>
          <label htmlFor="half">Half-hour</label>
        </div>
        <div>
          <input type="radio" id="hour" name="secondLength" value="01:00" onChange={lengthHandler}/>
          <label htmlFor="hour">1 Hour</label>
        </div>
        </>)
    }

    if (parseInt(mealBreaks) === 1) {
      return firstMeal()
    }
    if (parseInt(mealBreaks) === 2) {
      return <>{firstMealField()} {secondMealField()}</>
    }
  }

  const lengthHandler = (e) => {
    if (e.target.name === 'firstLength') {
      setFirstLength(e.target.value)
    } else if (e.target.name === 'secondLength') {
      setSecondLength (e.target.value)
    }
  } 

  const rawHours = () => {
    let start = DateTime.fromISO(inTime)
    let end = DateTime.fromISO(outTime)
    return end.diff(start)

  }

  const hoursMinusMeals = () => {
    let combined = Duration.fromMillis(0)
    if ((firstLength !== "" )) {
      let first = Duration.fromISOTime(firstLength)
      if ((secondLength !== "" )) {
        let second = Duration.fromISOTime(secondLength)
        combined = first.plus(second)
      } else {
        combined = first
      }
    console.log(combined)
    }
  return ( rawHours().minus(combined) )
  
  }

  const proopsHandler = (e) => {
    let newProopsArr = [...proops]
    newProopsArr[e.target.value] = !newProopsArr[e.target.value]
    setProops(newProopsArr)
  }

  const totalBumps = () => {
    let wardrobe = 0
    if (formalUni[0]) {
      wardrobe += 36
    }
    if (formalUni[1]) {
      wardrobe += 18
    }
    if (changes >= 1) {
      wardrobe += 9
      let addtl = (changes - 1) * 6.25
      wardrobe += addtl
    }
    let newProopsArr = proopsArr.map((proop, i) => {
      if (proops[i] === false) {
        return 0
      } else {
        return proop
      }
    })
    let totalProops = newProopsArr.reduce(
      (a, b) => a + b 
      )

    return (wardrobe + totalProops + parseInt(miscBump))
  }

  const mealPenalties = () => {
    //this obviously can be improved, refactored
    let firstPeriodStart = DateTime.fromISO(inTime)
    let firstPenalties = 0
    let secondPenalties = 0
    let firstPenaltiesTime = Duration.fromMillis(0)
    let secondPenaltiesTime = Duration.fromMillis(0)
    // maybe have  firstPenaltiesEnd, secondPenaltiesEnd
    if (ndbTime && (ndbTime !== '')) {
      firstPeriodStart = DateTime.fromISO(ndbTime).plus({minutes: 15})
    }
    if ((firstLength && (firstLength !== '')) && (firstMeal && (firstMeal !== ''))){
      let secondPeriodStart = DateTime.fromISO(firstMeal).plus(Duration.fromISOTime(firstLength))
      if ((secondLength && (secondLength !== '')) && (secondMeal && (secondMeal !== ''))){
        if (DateTime.fromISO(secondMeal) > secondPeriodStart.plus({hours: 6})) {
          secondPenaltiesTime = DateTime.fromISO(secondMeal).diff(secondPeriodStart.plus({hours: 6}))
        }
      } else {
        if (outTime && (outTime !== '')) {
          if (DateTime.fromISO(outTime) > secondPeriodStart.plus({hours: 6})) {
            secondPenaltiesTime = DateTime.fromISO(outTime).diff(secondPeriodStart.plus({hours: 6}))
          }
        }
      }
      secondPenalties = Math.ceil(secondPenaltiesTime.as('minutes')/15)

      if (DateTime.fromISO(firstMeal) > firstPeriodStart.plus({hours: 6})) {
        firstPenaltiesTime = DateTime.fromISO(firstMeal).diff(firstPeriodStart.plus({hours: 6}))
      }
    } else if (outTime && (outTime !== '')) {
        if (DateTime.fromISO(outTime) > firstPeriodStart.plus({hours: 6})) {
          firstPenaltiesTime = DateTime.fromISO(outTime).diff(firstPeriodStart.plus({hours: 6}))
        }
      }
    firstPenalties = Math.ceil(firstPenaltiesTime.as('minutes')/15)
    
    return {L: firstPenalties, D: secondPenalties}
  }

  const mealPenaltiesPay = (penaltyHours) => {
    let pay = 0
    if ( penaltyHours > 0 ) {
      pay += 7.5
      if ( penaltyHours > 1 ) {
        pay += 10
        if ( penaltyHours > 2 ) {
          pay += ((penaltyHours - 2) * 12.5)
        }
      }
    }
    return pay
  }

  const timesToIntervals = () => {
    let a = DateTime.fromISO(inTime)
    let b = DateTime.fromISO(outTime)
    let wholeDay = Interval.fromDateTimes( a, b )
    let goldenTime
    if (wholeDay.toDuration > Duration.fromISOTime('16:00')) {
      let goldSplit = wholeDay.splitAt(a.plus(Duration.fromISOTime('16:00')))
      goldenTime = goldSplit[1]
      wholeDay = goldSplit[0]
    }
    let meals = []
    if ((firstLength && (firstLength !== '')) && (firstMeal && (firstMeal !== ''))) {
      let first = Interval.after( DateTime.fromISO(firstMeal), Duration.fromISOTime(firstLength))
      meals.push(first)
      if ((secondLength && (secondLength !== '')) && (secondMeal && (secondMeal !== ''))) {
        let second = Interval.after( DateTime.fromISO(secondMeal), Duration.fromISOTime(secondLength))
        meals.push(second)
      }
    } 
    let nonMealHours = wholeDay.difference(meals)
  }

//console.log(hoursMinusMeals())
console.log(totalBumps())
console.log(mealPenalties())



  return (
    <div className="main">
      <form>
        <h2>Base Rate:</h2>
        <div>
          <input
            type="radio"
            id="background"
            name="role"
            value="background"
            onChange={roleHandler}
            defaultChecked
          />
          <label htmlFor="background">Background</label>
        </div>
        <div>
          <input
            type="radio"
            id="special-ability"
            name="role"
            value="specialAbility"
            onChange={roleHandler}
          />
          <label htmlFor="special-ability">Special-ability</label>
        </div>
        <div>
          <input
            type="radio"
            id="stand-in"
            name="role"
            value="standIn"
            onChange={roleHandler}
          />
          <label htmlFor="stand-in">Stand-in/Photo Double</label>
        </div>
        <div>
          <input
            type="radio"
            id="other"
            name="role"
            value="other"
            onChange={roleHandler}
          />
          <label htmlFor="other">Other:</label>
        </div>
        <div>{otherBaseRateField()}</div>
        <h2>Base Rate Bumps</h2>
        <div>
          <input type="checkbox" id="makeup-beard" name="base-bump" value="0" checked={baseBumps[0]} onChange={baseBumpsHandler} />
          <label htmlFor="makeup-beard">Makeup/Beard</label>
        </div>

        <div>
          <input type="checkbox" id="smoke" name="base-bump" value="1" checked={baseBumps[1]} onChange={baseBumpsHandler}/>
          <label htmlFor="smoke">Smoke</label>
        </div>

        <div>
          <input type="checkbox" id="wet" name="base-bump" value="2"  checked={baseBumps[2]} onChange={baseBumpsHandler}/>
          <label htmlFor="wet">Wet</label>
        </div>

        <div>
          <input type="checkbox" id="other-base-rate-bump" name="base-bump" value="3" checked={baseBumps[3]} onChange={baseBumpsHandler}/>
          <label htmlFor="other">Other:</label>
        </div>
        <div>{otherBaseBumpField()}</div>
        
        <div>
          <h2>Hours</h2>
          <label>Time in:</label>
          <input type="time" id="in-time" name="inTime" value={inTime} onChange={timeHandler}/>
          <label>Time out:</label>
          <input type="time" id="out-time" name="outTime" min={inTime} value={outTime} onChange={timeHandler}/>
        </div>
        <h2>Meals</h2>
        <div>
          <div>
            <label>NDB:</label>
            <input type="radio" id="no-ndb" name="ndb" value={ndb} defaultChecked onChange={ndbHandler}/>
            <label htmlFor="ndb">None</label>
            <input type="radio" id="yes-ndb" name="ndb" value={ndb} onChange={ndbHandler}/>
            <label htmlFor="ndb">NDB at:</label>
            <div>{ndbField()}</div>
            
          </div>
          <h3>Meal Breaks</h3>
          <input type="radio" id="0" name="meals" value="0" defaultChecked onChange={breaksHandler}/>
          <label htmlFor="0">0</label>
        </div>
        <div>
          <input type="radio" id="1" name="meals" value="1" onChange={breaksHandler}/>
          <label htmlFor="1">1</label>
        </div>
        <div>
          <input type="radio" id="2" name="meals" value="2" onChange={breaksHandler}/>
          <label htmlFor="2">2</label>
        </div>

        {mealBreaksField()}
        
        
        <h2>Other Bumps</h2>
        <div>
          <label htmlFor="changes">Wardrobe changes:</label>
          <input type="number" id="changes" name="changes" min="0" max="10" value={changes} onChange={changesHandler}/>
          <h3>Formalwear/Uniform</h3>
          <div>
            <input type="checkbox" id="formalwear" name="formalwear" value="0" checked={formalUni[0]} onChange={formalUniHandler}/>
            <label htmlFor="formalwear">Formalwear</label>
          </div>
          <div>
            <input type="checkbox" id="uniform" name="uniform" value="1" checked={formalUni[1]} onChange={formalUniHandler}/>
            <label htmlFor="uniform">Uniform</label>
          </div>
          <h3>Proops</h3>
          <div>
            <input type="checkbox" id="camera" name="camera" value="0" checked={proops[0]} onChange={proopsHandler}/>
            <label htmlFor="camera">Camera</label>
          </div>
          <div>
            <input type="checkbox" id="golf-clubs" name="golf-clubs" value="1" checked={proops[1]} onChange={proopsHandler}/>
            <label htmlFor="golf-clubs">Golf Club(s)</label>
          </div>
          <div>
            <input type="checkbox" id="luggage" name="luggage" value="2" checked={proops[2]} onChange={proopsHandler}/>
            <label htmlFor="luggage">Luggage</label>
          </div>
          <div>
            <input type="checkbox" id="pet" name="pet" value="3" checked={proops[3]} onChange={proopsHandler}/>
            <label htmlFor="pet">Pet</label>
          </div>
          <div>
            <input type="checkbox" id="skis" name="skis" value="4" checked={proops[4]} onChange={proopsHandler}/>
            <label htmlFor="skis">Skis</label>
          </div>
          <div>
            <input type="checkbox" id="tennis-racquet" name="tennis-racquet" value="5" checked={proops[5]} onChange={proopsHandler}/>
            <label htmlFor="tennis-racquet">Tennis Racquet</label>
          </div>
          {/* <h3>Vehicles</h3>
          <div>
            <input type="checkbox" id="bike" name="bike" />
            <label htmlFor="bike">Bike</label>
          </div>
          <div>
            <input type="checkbox" id="car" name="car" />
            <label htmlFor="car">car</label>
          </div>
          <div>
            <input type="checkbox" id="moped" name="moped" />
            <label htmlFor="moped">Moped</label>
          </div>
          <div>
            <input type="checkbox" id="motorcycle" name="motorcycle" />
            <label htmlFor="motorcycle">Motorcycle</label>
          </div>
          <div>
            <input type="checkbox" id="skates" name="skates" />
            <label htmlFor="skates">Rollerskates/Skateboard</label>
          </div>
          <div>
            <input type="checkbox" id="trailer" name="trailer" />
            <label htmlFor="trailer">Trailer</label>
          </div> */}
          <h3>Misc.</h3>
          <label htmlFor="misc">Misc. Bump:</label>
          $<input type="number" id="misc" name="misc" min="0" value={miscBump} onChange={(e) => setMiscBump(e.target.value)}/>
        </div>
        <h4>role: {role}</h4>
        <h4>base Rate: {baseRate()}</h4>
        <h4>base Rate Bumps: {totalBaseBumps()}</h4>
        <h4>total base Rate: {totalBaseRate()}</h4>
        <h4>time in: {inTime}</h4>
        <h4>time out: {outTime}</h4>
        <h4>nbd: {ndbTime}</h4>
        <h4>max ndb: {maxNdb()}</h4>
        <h4>first Meal: {firstMeal}</h4>
        <h4>1st length: {firstLength}</h4>
        <h4>second meal: {secondMeal}</h4>
        <h4>2nd length: {secondLength}</h4>
        <h4>hours minus meals: {Math.ceil(hoursMinusMeals().as('hours') * 10) / 10}</h4>
        {/* <h4>raw hours: {rawHours()}</h4> */}
        
      </form>
      <Mark />
      <Summary />
    </div>
  );
};

export default Main;
