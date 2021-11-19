import React, { useState } from "react";
import { DateTime, Duration, Interval } from "luxon";
import Mark from "./Mark.js";
import Summary from "./Summary.js";

const Main = () => {
  //these just have the rates and bumps for base rate
  const baseRateObj = { background: 182, specialAbility: 192, standIn: 214 };
  const baseBumpsArr = [19, 14, 14, 0];
  const proopsArr = [5.5, 12, 5.5, 23, 12, 5.5];

  // i know there's gotta be a way to do this better
  const [role, setRole] = useState("background");
  const [otherBaseRate, setOtherBaseRate] = useState(0);
  const [baseBumps, setBaseBumps] = useState([false, false, false, false]);
  const [otherBaseBump, setOtherBaseBump] = useState(0);
  const [inTime, setInTime] = useState("");
  const [outTime, setOutTime] = useState("");
  const [ndb, setNdb] = useState(false);
  const [ndbTime, setNdbTime] = useState("");
  const [mealBreaks, setMealBreaks] = useState(0);
  const [firstMeal, setFirstMeal] = useState("");
  const [firstLength, setFirstLength] = useState("00:00");
  const [secondMeal, setSecondMeal] = useState("");
  const [secondLength, setSecondLength] = useState("00:00");
  const [changes, setChanges] = useState(0);
  const [formalUni, setFormalUni] = useState([false, false]);
  const [proops, setProops] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  //const [vehicles, setVehicles] = useState([false, false, false, false, false, false, false])
  const [miscBump, setMiscBump] = useState(0);

  const roleHandler = (e) => {
    setRole(e.target.value);
  };

  const otherBaseRateHandler = (e) => {
    setOtherBaseRate(e.target.value);
  };

  const baseBumpsHandler = (e) => {
    let newBaseBumpsArr = [...baseBumps];
    newBaseBumpsArr[e.target.value] = !newBaseBumpsArr[e.target.value];
    setBaseBumps(newBaseBumpsArr);
  };

  const formalUniHandler = (e) => {
    let newFormalUniArr = [...formalUni];
    newFormalUniArr[e.target.value] = !newFormalUniArr[e.target.value];
    setFormalUni(newFormalUniArr);
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

    if (e.target.name === "inTime") {
      setInTime(e.target.value);
    } else if (e.target.name === "outTime") {
      setOutTime(e.target.value);
    } else if (e.target.name === "ndbTime") {
      setNdbTime(e.target.value);
    } else if (e.target.name === "firstMeal") {
      setFirstMeal(e.target.value);
    } else if (e.target.name === "secondMeal") {
      setSecondMeal(e.target.value);
    }
  };

  const baseRate = () => {
    if (role === "other") {
      return otherBaseRate;
    } else {
      return baseRateObj[role];
    }
  };

  const totalBaseBumps = () => {
    let newBaseBumpsArr = [...baseBumpsArr];
    //if the other base rate bump is checked, use the amount
    //in the corresponding field as the value in the new array of amounts
    if (baseBumps[3]) {
      newBaseBumpsArr[3] = otherBaseBump;
    }
    newBaseBumpsArr = newBaseBumpsArr.map((bump, i) => {
      if (baseBumps[i] === false) {
        return 0;
      } else {
        return bump;
      }
    });
    return newBaseBumpsArr;
  };

  const totalBaseRate = () => {
    return totalBaseBumps().reduce((a, b) => a + b, baseRate());
  };

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
    setNdb(!ndb);
    if (ndb === false) {
      setNdbTime("");
    }
  };

  const maxNdb = () => {
    //the non-deductible breakfast, if one is offered, must be within 2 hours of the in time
    if (inTime !== "") {
      const start = DateTime.fromISO(inTime);
      return start.plus({ hours: 2 }).toLocaleString(DateTime.TIME_24_SIMPLE);
    }
  };

  const ndbField = () => {
    if (ndb) {
      return (
        <>
          <div>
            <input
              type="time"
              id="ndb-time"
              name="ndbTime"
              min={inTime}
              max={maxNdb()}
              value={ndbTime}
              onChange={timeHandler}
            />
          </div>
        </>
      );
    }
  };

  const breaksHandler = (e) => {
    setMealBreaks(e.target.value);
    if (parseInt(e.target.value) < 2) {
      setSecondLength("00:00");
      setSecondMeal("");
    }
    if (parseInt(e.target.value) < 1) {
      setFirstLength("00:00");
      setFirstMeal("");
    }
  };

  const mealBreaksField = () => {
    const firstMealField = () => {
      return (
        <>
          <label>1st Meal</label>
          <input
            className="htmlForm-control"
            type="time"
            id="firstMeal"
            name="firstMeal"
            min={inTime}
            max={outTime}
            value={firstMeal}
            onChange={timeHandler}
          />
          <div>
            <input
              type="radio"
              id="half"
              name="firstLength"
              value="00:30"
              checked={firstLength === "00:30" ? true : false}
              onChange={lengthHandler}
            />
            <label htmlFor="half">Half-hour</label>
          </div>
          <div>
            <input
              type="radio"
              id="hour"
              name="firstLength"
              value="01:00"
              checked={firstLength === "01:00" ? true : false}
              onChange={lengthHandler}
            />
            <label htmlFor="hour">1 Hour</label>
          </div>
        </>
      );
    };

    const secondMealField = () => {
      return (
        <>
          <label>2nd Meal</label>
          <input
            type="time"
            id="2nd-meal"
            name="secondMeal"
            min={firstMeal}
            max={outTime}
            value={secondMeal}
            onChange={timeHandler}
          />
          <div>
            <input
              type="radio"
              id="half"
              name="secondLength"
              value="00:30"
              checked={secondLength === "00:30" ? true : false}
              onChange={lengthHandler}
            />
            <label htmlFor="half">Half-hour</label>
          </div>
          <div>
            <input
              type="radio"
              id="hour"
              name="secondLength"
              value="01:00"
              checked={secondLength === "01:00" ? true : false}
              onChange={lengthHandler}
            />
            <label htmlFor="hour">1 Hour</label>
          </div>
        </>
      );
    };

    if (parseInt(mealBreaks) === 1) {
      return firstMealField();
    }
    if (parseInt(mealBreaks) === 2) {
      return (
        <>
          {firstMealField()} {secondMealField()}
        </>
      );
    }
  };

  const lengthHandler = (e) => {
    if (e.target.name === "firstLength") {
      setFirstLength(e.target.value);
    } else if (e.target.name === "secondLength") {
      setSecondLength(e.target.value);
    }
  };

  const rawHours = () => {
    let start = DateTime.fromISO(inTime);
    let end = DateTime.fromISO(outTime);
    end = adjustDay(start, end);
    return end.diff(start);
  };

  const hoursMinusMeals = () => {
    //just calculated the number of hours worked, subtracting any meal breaks
    let combined = Duration.fromMillis(0);
    if (inTime !== "" && outTime !== "") {
      if (firstLength !== "") {
        let first = Duration.fromISOTime(firstLength);
        if (secondLength !== "") {
          let second = Duration.fromISOTime(secondLength);
          combined = first.plus(second);
        } else {
          combined = first;
        }
      }
    }
    return rawHours().minus(combined);
  };

  const proopsHandler = (e) => {
    let newProopsArr = [...proops];
    newProopsArr[e.target.value] = !newProopsArr[e.target.value];
    setProops(newProopsArr);
  };

  const totalBumps = () => {
    //this calculates all wardrobe and prop bumps, and adds those and any misc. bump together
    let wardrobe = 0;
    if (formalUni[0]) {
      wardrobe += 36;
    }
    if (formalUni[1]) {
      wardrobe += 18;
    }
    if (changes >= 1) {
      wardrobe += 9;
      let addtl = (changes - 1) * 6.25;
      wardrobe += addtl;
    }
    let newProopsArr = proopsArr.map((proop, i) => {
      if (proops[i] === false) {
        return 0;
      } else {
        return proop;
      }
    });
    let totalProops = newProopsArr.reduce((a, b) => a + b);

    return wardrobe + totalProops + parseInt(miscBump);
  };

  const mealPenalties = () => {
    //this obviously can be improved, refactored
    let firstPeriodStart = DateTime.fromISO(inTime);
    let firstPenalties = 0;
    let secondPenalties = 0;
    let firstPenaltiesTime = Duration.fromMillis(0);
    let secondPenaltiesTime = Duration.fromMillis(0);

    // maybe have  firstPenaltiesEnd, secondPenaltiesEnd?
    //a non-deductible breakfast (NDB) is 15 minutes long
    // if there is an NBD, meal penalties will start accruing
    //six hours after the end of the NDB, one every half hour or fraction
    //of a half hour until the first meal break, or the out time
    //after the end of the first meal break, penalties start again after six hours
    //until a second meal break, or out time
    if (ndbTime && ndbTime !== "") {
      firstPeriodStart = DateTime.fromISO(ndbTime).plus({ minutes: 15 });
      firstPeriodStart = adjustDay(DateTime.fromISO(inTime), firstPeriodStart);
    }
    if (firstLength !== "00:00" && firstMeal !== "") {
      let secondPeriodStart = DateTime.fromISO(firstMeal).plus(
        Duration.fromISOTime(firstLength)
      );
      secondPeriodStart = adjustDay(
        DateTime.fromISO(inTime),
        secondPeriodStart
      );
      if (secondLength !== "00:00" && secondMeal !== "") {
        secondPeriodStart = adjustDay(
          DateTime.fromISO(inTime),
          secondPeriodStart
        );
        if (
          adjustDay(DateTime.fromISO(inTime), DateTime.fromISO(secondMeal)) >
          secondPeriodStart.plus({ hours: 6 })
        ) {
          secondPenaltiesTime = adjustDay(
            DateTime.fromISO(inTime),
            DateTime.fromISO(secondMeal)
          ).diff(secondPeriodStart.plus({ hours: 6 }));
        }
      } else {
        if (outTime !== "") {
          if (
            adjustDay(DateTime.fromISO(inTime), DateTime.fromISO(outTime)) >
            secondPeriodStart.plus({ hours: 6 })
          ) {
            secondPenaltiesTime = adjustDay(
              DateTime.fromISO(inTime),
              DateTime.fromISO(outTime)
            ).diff(secondPeriodStart.plus({ hours: 6 }));
          }
        }
      }
      secondPenalties = Math.ceil(secondPenaltiesTime.as("minutes") / 30);

      if (
        adjustDay(DateTime.fromISO(inTime), DateTime.fromISO(firstMeal)) >
        firstPeriodStart.plus({ hours: 6 })
      ) {
        firstPenaltiesTime = adjustDay(
          DateTime.fromISO(inTime),
          DateTime.fromISO(firstMeal)
        ).diff(firstPeriodStart.plus({ hours: 6 }));
      }
    } else if (outTime !== "") {
      let outDateTime = adjustDay(
        DateTime.fromISO(inTime),
        DateTime.fromISO(outTime)
      );
      if (outDateTime > firstPeriodStart.plus({ hours: 6 })) {
        firstPenaltiesTime = outDateTime.diff(
          firstPeriodStart.plus({ hours: 6 })
        );
      }
    }
    firstPenalties = Math.ceil(firstPenaltiesTime.as("minutes") / 30);

    return { L: firstPenalties, D: secondPenalties };
  };

  const mealPenaltiesPay = (mealPenalties) => {
    //this just converts the number of meal penalties to the total number of dollars

    let pay = 0;
    if (mealPenalties > 0) {
      pay += 7.5;
      if (mealPenalties > 1) {
        pay += 10;
        if (mealPenalties > 2) {
          pay += (mealPenalties - 2) * 12.5;
        }
      }
    }
    return pay;
  };

  const adjustDay = (a, b) => {
    //this just adds a day in cases where a time is after midnight
    //and the time picker makes it the same day but earlier
    if (a > b) {
      b = b.plus(Duration.fromObject({ days: 1 }));
    }
    return b;
  };

  // class WorkTime extends Interval {
  //   //i wrote this class thinking maybe i can add OT and night premium values
  //   //to interval instances but i think i did it wrong
  //   constructor(ot, night) {
  //     this.ot = ot;
  //     this.night = night;
  //   }
  // }

  const timesToIntervals = () => {
    if (inTime !== "" && outTime !== "") {
      let a = DateTime.fromISO(inTime);
      let b = DateTime.fromISO(outTime);
      b = adjustDay(a, b);
      let wholeDay = Interval.fromDateTimes(a, b);
      let goldenTime;
      let allIntervals 
      //golden time is any hour or fraction of an hour after 16 hours, including meal time
      //this bit splits any golden time into its own interval
      if (wholeDay.toDuration() > Duration.fromISOTime("16:00")) {
        let goldSplit = wholeDay.splitAt(a.plus(Duration.fromISOTime("16:00")));
        goldenTime = goldSplit[1];
        wholeDay = goldSplit[0];
      }
      //meal breaks are not counted as work time. because night premiums stack with OT
      //multipliers, we cannot simply subtract meal time from total hours to find
      //the work hours, so this bit breaks the day up by creating intervals before/between/after meal breaks
      let wDDur = wholeDay.toDuration();
      let totalBreakDur = Duration.fromISOTime(firstLength).plus(
        Duration.fromISOTime(secondLength)
      );
      let meals = [];
      if (firstLength !== "" && firstMeal !== "") {
        let first = Interval.after(
          DateTime.fromISO(firstMeal),
          Duration.fromISOTime(firstLength)
        );
        meals.push(first);
        if (secondLength !== "" && secondMeal !== "") {
          let second = Interval.after(
            DateTime.fromISO(secondMeal),
            Duration.fromISOTime(secondLength)
          );
          meals.push(second);
        }
      }
      let nonMealHours = wholeDay.difference(...meals);
      //checks to see if the day actually incudes any OT
      if (wDDur.minus(totalBreakDur) > Duration.fromISOTime("08:00")) {
        //the following chunk takes the work intervals which have any meal breaks
        //removed and splits them into groups based on whether or not they are
        //before or after the 8 hour mark, when 1.5x OT begins

        //i'm not very confident this is the best way to do this.

        let reg = [];
        let regHalf = [];
        let half = [];
        let double = [];
        let halfDouble = [];
        let split;

        //if the first interval is more than 8 hours long (no meal break in the first 8hours)
        if (nonMealHours[0].toDuration() > Duration.fromISOTime("08:00")) {
          regHalf = nonMealHours[0].splitAt(
            nonMealHours[0].start.plus(Duration.fromISOTime("08:00"))
          );
          nonMealHours.splice(0, 1);
          reg.push(regHalf.shift());
          half.push(...regHalf, ...nonMealHours);
        } else if (
          //if the time duration of the time before first meal and the time after first meal > 8 hours
          nonMealHours[0].toDuration().plus(nonMealHours[1].toDuration()) >
          Duration.fromISOTime("08:00")
        ) {
          split = nonMealHours[1].start.plus(
            Duration.fromISOTime("08:00").minus(nonMealHours[0].toDuration())
          );

          regHalf = nonMealHours[1].splitAt(split);
          nonMealHours.splice(1, 1);
          reg.push(nonMealHours.shift(), regHalf.shift());
          half.push(...regHalf, ...nonMealHours);
        } else if (
          //if the time duration of the time before first meal and the duration between first
          //and second meal and the time after 2nd meal > 8 hours
          nonMealHours[0]
            .toDuration()
            .plus(nonMealHours[1].toDuration())
            .plus(nonMealHours[2].toDuration()) > Duration.fromISOTime("08:00")
        ) {
          split = nonMealHours[2].start.plus(
            Duration.fromISOTime("08:00").minus(
              nonMealHours[0].toDuration().plus(nonMealHours[1].toDuration())
            )
          );
          regHalf = nonMealHours[2].splitAt(split);
          reg.push(nonMealHours[0], nonMealHours[1], regHalf[0]);
          half.push(regHalf[1]);
        }

        if (half[0].toDuration() > Duration.fromISOTime("02:00")) {
          halfDouble = half[0].splitAt(
            half[0].start.plus(Duration.fromISOTime("02:00"))
          );
          half.splice(0, 1, ...halfDouble);
          double = half;
          half = [double.shift()];
        } else if (
          half[0].toDuration().plus(half[1].toDuration()) >
          Duration.fromISOTime("02:00")
        ) {
          split = half[1].start.plus(
            Duration.fromISOTime("02:00").minus(half[0].toDuration())
          );
          halfDouble = half[1].splitAt(split);
          half.splice(1, 1, ...halfDouble);
          double = half;
          half = double.slice(0, 2);
          double.splice(0, 2);
        } else if (
          half[0]
            .toDuration()
            .plus(half[1].toDuration())
            .plus(half[2].toDuration()) > Duration.fromISOTime("02:00")
        ) {
          split = half[2].start.plus(
            Duration.fromISOTime("02:00").minus(
              half[0].toDuration().plus(half[1].toDuration())
            )
          );
          halfDouble = half[2].splitAt(split);
          half.splice(2, 1, ...halfDouble);
          double = half;
          half = double.slice(0, 3);
          double.splice(0, 3);
        }

        allIntervals = {regularTime: reg, timeAndAHalf: half, doubleTime: double, goldenTime: goldenTime};

      } else {
        let reg = [...nonMealHours];
        allIntervals = {regularTime: reg};
      }
      allIntervals.regularTime.forEach(interval => {
        interval['ot'] = 1
      });
      allIntervals.timeAndAHalf.forEach(interval => {
        interval['ot'] = 1.5
      });
      allIntervals.doubleTime.forEach(interval => {
        interval['ot'] = 2
      });
      return allIntervals

    }
  };

  

  //console.log(hoursMinusMeals())
  console.log(totalBumps());
  console.log(timesToIntervals());

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
          <input
            type="checkbox"
            id="makeup-beard"
            name="base-bump"
            value="0"
            checked={baseBumps[0]}
            onChange={baseBumpsHandler}
          />
          <label htmlFor="makeup-beard">Makeup/Beard</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="smoke"
            name="base-bump"
            value="1"
            checked={baseBumps[1]}
            onChange={baseBumpsHandler}
          />
          <label htmlFor="smoke">Smoke</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="wet"
            name="base-bump"
            value="2"
            checked={baseBumps[2]}
            onChange={baseBumpsHandler}
          />
          <label htmlFor="wet">Wet</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="other-base-rate-bump"
            name="base-bump"
            value="3"
            checked={baseBumps[3]}
            onChange={baseBumpsHandler}
          />
          <label htmlFor="other">Other:</label>
        </div>
        <div>{otherBaseBumpField()}</div>

        <div>
          <h2>Hours</h2>
          <label>Time in:</label>
          <input
            type="time"
            id="in-time"
            name="inTime"
            value={inTime}
            onChange={timeHandler}
          />
          <label>Time out:</label>
          <input
            type="time"
            id="out-time"
            name="outTime"
            min={inTime}
            value={outTime}
            onChange={timeHandler}
          />
        </div>
        <h2>Meals</h2>
        <div>
          <div>
            <label>NDB:</label>
            <input
              type="radio"
              id="no-ndb"
              name="ndb"
              value={ndb}
              defaultChecked
              onChange={ndbHandler}
            />
            <label htmlFor="ndb">None</label>
            <input
              type="radio"
              id="yes-ndb"
              name="ndb"
              value={ndb}
              onChange={ndbHandler}
            />
            <label htmlFor="ndb">NDB at:</label>
            <div>{ndbField()}</div>
          </div>
          <h3>Meal Breaks</h3>
          <input
            type="radio"
            id="0"
            name="meals"
            value="0"
            defaultChecked
            onChange={breaksHandler}
          />
          <label htmlFor="0">0</label>
        </div>
        <div>
          <input
            type="radio"
            id="1"
            name="meals"
            value="1"
            onChange={breaksHandler}
          />
          <label htmlFor="1">1</label>
        </div>
        <div>
          <input
            type="radio"
            id="2"
            name="meals"
            value="2"
            onChange={breaksHandler}
          />
          <label htmlFor="2">2</label>
        </div>

        {mealBreaksField()}

        <h2>Other Bumps</h2>
        <div>
          <label htmlFor="changes">Wardrobe changes:</label>
          <input
            type="number"
            id="changes"
            name="changes"
            min="0"
            max="10"
            value={changes}
            onChange={changesHandler}
          />
          <h3>Formalwear/Uniform</h3>
          <div>
            <input
              type="checkbox"
              id="formalwear"
              name="formalwear"
              value="0"
              checked={formalUni[0]}
              onChange={formalUniHandler}
            />
            <label htmlFor="formalwear">Formalwear</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="uniform"
              name="uniform"
              value="1"
              checked={formalUni[1]}
              onChange={formalUniHandler}
            />
            <label htmlFor="uniform">Uniform</label>
          </div>
          <h3>Props</h3>
          <div>
            <input
              type="checkbox"
              id="camera"
              name="camera"
              value="0"
              checked={proops[0]}
              onChange={proopsHandler}
            />
            <label htmlFor="camera">Camera</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="golf-clubs"
              name="golf-clubs"
              value="1"
              checked={proops[1]}
              onChange={proopsHandler}
            />
            <label htmlFor="golf-clubs">Golf Club(s)</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="luggage"
              name="luggage"
              value="2"
              checked={proops[2]}
              onChange={proopsHandler}
            />
            <label htmlFor="luggage">Luggage</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="pet"
              name="pet"
              value="3"
              checked={proops[3]}
              onChange={proopsHandler}
            />
            <label htmlFor="pet">Pet</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="skis"
              name="skis"
              value="4"
              checked={proops[4]}
              onChange={proopsHandler}
            />
            <label htmlFor="skis">Skis</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="tennis-racquet"
              name="tennis-racquet"
              value="5"
              checked={proops[5]}
              onChange={proopsHandler}
            />
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
          $
          <input
            type="number"
            id="misc"
            name="misc"
            min="0"
            value={miscBump}
            onChange={(e) => setMiscBump(e.target.value)}
          />
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
        <h4>
          hours minus meals:{" "}
          {Math.ceil(hoursMinusMeals().as("hours") * 10) / 10}
        </h4>
        <h4>
          lunch penalties: {mealPenalties().L}, ${" "}
          {mealPenaltiesPay(mealPenalties().L)}
        </h4>
        <h4>
          dinner penalties: {mealPenalties().D}, ${" "}
          {mealPenaltiesPay(mealPenalties().D)}
        </h4>
      </form>
      <Mark />
      <Summary />
    </div>
  );
};

export default Main;
