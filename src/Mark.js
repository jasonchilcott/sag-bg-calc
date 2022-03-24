import React from "react"

const Mark = (props) => {

  const displayMealPenalties = () => {
    let text = ""
    if (props.mealPenalties.first || props.mealPenalties.second) {
      text += "Meal Penalties: "
      if (props.mealPenalties.first) {
        text += `${props.mealPenalties.first}L`
        if (props.mealPenalties.second) {
          text += ", "
        }
      }
      if (props.mealPenalties.second) {
        text += `${props.mealPenalties.second}D`
      }
    }
    return (
      <div className="meal-penalties">
        <p>{text}</p>
      </div>
    )
  }

  const displayBaseBumps = () => {
    const baseBumpsNames = ['Make Up/Beard', 'Smoke', 'Wet', 'Other Bump']
    return props.baseBumps.map( ( bump, i ) => {
      if ( bump ) {
        return <li key={baseBumpsNames[i]}>{baseBumpsNames[i]}</li>
      }
    })
  }

  const displayNightPremiums = () => {
    if (props.intervals){
      let text = ""
      let n1 = (props.intervals.flat(2).some( e => e.night === 1.1))
      let n2 = (props.intervals.flat(2).some( e => e.night === 1.2))

      if ( n1 || n2 ) {
        text += "Night Premiums: "
        if ( n1 ) {
          text += "N1"
          if (n2) {
            text += ", "
          }
        }
        if (n2) {
          text += "N2"
        }
      }
      return (
        <div className="night-premiums">
          <p>{text}</p>
        </div>
      )
    }
  }

  const displayProops = () => {
    let text = ""
    const proopsArr = [ "Camera", "Golf Club(s)", "Luggage", "Pet", "Skis", "Tennis Racquet"]
    if ( props.proops.some( e => e === true ) ) {
      text += "Props: "
      let todaysProops = []
      proopsArr.forEach((proop, i) => {
        if (props.proops[i]) {
          todaysProops.push(proop)
        }
      })
      text += todaysProops.join(', ')
      
      return (
        <div className="proops">
          <p>{text}</p>
        </div>
      )
    }
  }

  const displayGold = () => {
    if ( props.intervals ) {
      if ( props.intervals[3] && props.intervals[3].ot === "gold") {
        let goldenTime = props.intervals[3].toDuration();
        let gold = Math.ceil(goldenTime.as("hours"));
        return (
          <div className={"golden-time"}>
            <p>GOLDEN TIME x {gold} !!!</p>
          </div>
        )
      }

    }
  }
 
  return (
    <div className="mark">
      <h2>MARK</h2>
      {displayGold()}
      {props.intervals ? displayMealPenalties() : null}
      {displayNightPremiums()}
      <ul className="base-bumps">
        {displayBaseBumps()}
      </ul>
      { props.changes ? <p>Wardrobe: {props.changes}C</p> : null }
      { props.formalUni[0] ? <p>Wardrobe: Formal wear</p> : null }
      { props.formalUni[1] ? <p>Wardrobe: Uniform</p> : null }
      {displayProops()}
      { props.miscBump ? <p>Misc Bump: $ {props.miscBump}</p> : null }
      
    </div>
  )
}

export default Mark