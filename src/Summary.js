import React from "react";

const Summary = (props) => {
  
  const hoursToDollars = (int) => {
    let multiplier = int.otMultiplier;
    let tenthsTime = props.toTenths(int.toDuration().as("hours"));
    return tenthsTime * (props.totalBaseRate / 8) * multiplier;
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
    return pay.toFixed(2);
  };

  const getOt = (otType) => {
    if (props.intervals) {
      let hours = props.intervals.flat(2);
      let otHours = hours.filter(
        (interval) => interval.otMultiplier === otType
      );
      let otMoney = otHours.map((int) => hoursToDollars(int));
      let otDollars = otMoney.reduce((a, b) => a + b, 0);
      return otDollars.toFixed(2);
    }
  };

  const getGold = () => {
    if (props.intervals) {
      let gold = 0;
      if (props.intervals[3] && props.intervals[3].ot === "gold") {
        let goldenTime = props.intervals[3].toDuration();
        gold = Math.ceil(goldenTime.as("hours")) * props.totalBaseRate;
      }
      return gold;
    }
  };

  const getChanges = () => {
    let wardrobe = 0;
    if (props.changes >= 1) {
      wardrobe += 9;
      let addtl = (props.changes - 1) * 6.25;
      wardrobe += addtl;
    }
    return wardrobe;
  };

  const getUniPay = () => {
    let uniPay = 0;
    if (props.formalUni[0]) {
      uniPay += 36;
    }
    if (props.formalUni[1]) {
      uniPay += 18;
    }
    return uniPay;
  };

  const getProopsPay = () => {
    let newProopsArr = props.proopsArr.map((proop, i) => {
      if (props.proops[i] === false) {
        return 0;
      } else {
        return proop;
      }
    });
    let totalProops = newProopsArr.reduce((a, b) => a + b);
    return totalProops;
  };

  const getNight = () => {
    let nightPay = 0;

    if (props.intervals) {
      let hourlyBase = props.totalBaseRate / 8;
      let hours = props.intervals.flat(2);
      let nightTimes = hours.filter((int) => {
        return int.night === 1.1 || int.night === 1.2;
      });
      let nightPayArr = nightTimes.map((interval) => {
        let premium = interval.otMultiplier * (interval.night - 1);
        let duration = props.toTenths(interval.toDuration().as("hours"));
        return premium * duration * hourlyBase;
      });
      nightPay = nightPayArr.reduce((a, b) => a + b, 0);
    }

    return nightPay.toFixed(2);
  };

  const getTotal = () => {
    let moneyArr = [
      props.totalBaseRate,
      getOt(1.5),
      getOt(2),
      getGold(),
      getNight(),
      mealPenaltiesPay(props.mealPenalties.first),
      mealPenaltiesPay(props.mealPenalties.second),
      getChanges(),
      getUniPay(),
      getProopsPay(),
      props.miscBump,
    ];
    return moneyArr.reduce((a, b) => Number(a) + Number(b), 0).toFixed(2);
  };

  return (
    <div className="summary">
      <h2>SUMMARY</h2>
      <p>Total: $ {getTotal()}</p>
      <p>Base Rate: $ {props.totalBaseRate}</p>
      <p>1.5x Time: $ {getOt(1.5)}</p>
      <p>2x Time: $ {getOt(2)}</p>
      <p>Golden Time: $ {getGold()}</p>
      <p>Night Premiums: $ {getNight()}</p>
      <p>Lunch Penalties: $ {mealPenaltiesPay(props.mealPenalties.first)}</p>
      <p>Dinner Penalties: $ {mealPenaltiesPay(props.mealPenalties.second)}</p>
      <p>Wardrobe changes: $ {getChanges()}</p>
      <p>Formal Wear/Uniform: $ {getUniPay()}</p>
      <p>Props: $ {getProopsPay()}</p>
      <p>Misc Bump: $ {props.miscBump}</p>
    </div>
  );
};

export default Summary;
