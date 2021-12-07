import React from "react"

const Summary = (props) => {

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

  //const tenthsTime = (int) => {props.toTenths(int.toDuration().as("hours"));}

  const hoursToDollars = (int) => {
    let multiplier = int.otMultiplier * (int.night ?? 1);
    let tenthsTime = props.toTenths(int.toDuration().as("hours"));
    return tenthsTime * (props.totalBaseRate / 8) * multiplier;
  };

  const reduceAllTimeToMoney = () => {
    let moneyArr = props.intervals.slice(0, -1).flat(2).map((int) => {
      return hoursToDollars(int);
    });
    let allHoursMoney = moneyArr.reduce((a, b) => a + b);
    return allHoursMoney;
  };

  const totalDollars = () => {
    if ( props.intervals ) {
      
      let intervalArray = props.intervals;
      let hourRate = props.totalBaseRate / 8;
      let gold = 0;
      let bothMealPenalties =
        mealPenaltiesPay(props.mealPenalties.first) +
        mealPenaltiesPay(props.mealPenalties.second);
      if (props.hoursMinusMeals.as('hours') < 8) {
        let n1Times = intervalArray.flat(2).filter((int) => {
          int.night === 1.1;
        });
        let n2Times = intervalArray.flat(2).filter((int) => {
          int.night === 1.2;
        });
        let n1Dur = 0;
        let n2Dur = 0; 

        if (n1Times.length) {n1Dur = props.toTenths(props.sumDurations(n1Times))}
        if (n2Times.length) {n2Dur = props.toTenths(props.sumDurations(n2Times))}

        let daytime = 8 - (n1Dur + n2Dur)
        let shortDayMoney = hourRate * (daytime + (n1Dur * 1.1) + (n2Dur * 1.2))
        return shortDayMoney + props.totalBumps + bothMealPenalties;
      } else {
        if (intervalArray[3] && intervalArray[3].ot === "gold") {
          let goldenTime = intervalArray[3].toDuration();
          gold = Math.ceil(goldenTime.as("hours")) * props.totalBaseRate;
        }
  
        return (Math.ceil((reduceAllTimeToMoney() + gold + props.totalBumps + bothMealPenalties) * 100) / 100).toFixed(2);
      }
    }
  };

  const displayHalfDollars = () => {
    if ( props.intervals ) {
      let otTimes = props.intervals[1]
      
      if (otTimes.length) {
        let halfTime = otTimes.map((int) => {
          let tenthsTime = props.toTenths(int.toDuration().as("hours"))
          return tenthsTime * (props.totalBaseRate / 8) * 1.5
        })
        console.log(halfTime)
        return halfTime.reduce((a, b) => a + b).toFixed(2)
      } else {
        return 0
      }
      
    }
  }

  const displayDoubleDollars = () => {
    if ( props.intervals ) {
      let otTimes = props.intervals[2]
      
      if (otTimes.length) {
        let doubleInts = otTimes.map((int) => {
          let tenthsTime = props.toTenths(int.toDuration().as("hours"))
          return (tenthsTime * (props.totalBaseRate / 8) * 1.5)
        })
        console.log(doubleInts)
        return doubleInts.reduce((a, b) => a + b).toFixed(2)
      } else {
        return 0
      }
      
    }
  }

  const displayGoldDollars = () => {
    if ( props.intervals ) {
      if ( props.intervals[3] ) {
        let gold
        let goldenTime = props.intervals[3].toDuration();
        goldenTime = Math.ceil(goldenTime.as("hours"))
        gold = goldenTime * props.totalBaseRate
        if (gold) {
          return <p className='gold'>GOLDEN TIME: $ {gold}!!!</p>
        }
      } 

    }
  }



  return (
    <div className="summary">
      <h2>SUMMARY</h2>
      <p>Total: $ {totalDollars()}</p>
      <p>Base Rate: $ {props.totalBaseRate}</p>
      <p>1.5x Time: $ {displayHalfDollars()}</p>
      <p>2x Time: $ {displayDoubleDollars()}</p>
      <>{displayGoldDollars()}</>
      <p>Night Premiums: </p>
      <p>Lunch Penalties: $ {mealPenaltiesPay(props.mealPenalties.first).toFixed(2)}</p>
      <p>Dinner Penalties: $ {mealPenaltiesPay(props.mealPenalties.second).toFixed(2)}</p>
      <p>Wardrobe changes: </p>
      <p>Formal Wear/Uniform: </p>
      <p>Props: </p>
      <p>Misc Bump: </p>
    </div>
  )
}

export default Summary