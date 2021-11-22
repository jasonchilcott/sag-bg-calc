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

  const totalDollars = () => {
    if ( props.intervals ) {
      console.log(props.intervals)
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
          let goldenTime = intervalArray.pop().toDuration();
          gold = Math.ceil(goldenTime.as("hours")) * props.totalBaseRate;
        }
        const hoursToDollars = (int) => {
          let multiplier = int.otMultiplier * (int.night ?? 1);
          let tenthsTime = props.toTenths(int.toDuration().as("hours"));
          return tenthsTime * hourRate * multiplier;
        };
  
        const reduceAllTimeToMoney = () => {
          let moneyArr = intervalArray.flat(2).map((int) => {
            return hoursToDollars(int);
          });
          let allHoursMoney = moneyArr.reduce((a, b) => a + b);
          return allHoursMoney;
        };
  
        return reduceAllTimeToMoney() + gold + props.totalBumps + bothMealPenalties;
      }
    }
  };

  return (
    <div className="summary">
      <h2>SUMMARY</h2>
      <p>Total: $ {totalDollars()}</p>
    </div>
  )
}

export default Summary