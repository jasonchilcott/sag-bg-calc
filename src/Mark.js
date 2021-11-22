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

  const displayNightPremiums = () => {
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
 
  return (
    <div className="mark">
      <h2>MARK</h2>
      {displayMealPenalties()}
      {displayNightPremiums()}
      { props.changes ? <p>Wardrobe: {props.changes}C</p> : null }
      { props.formalUni[0] ? <p>Wardrobe: Formal wear</p> : null }
      { props.formalUni[1] ? <p>Wardrobe: Uniform</p> : null }
      {displayProops()}
      { props.miscBump ? <p>Misc Bump: $ {props.miscBump}</p> : null }
      
    </div>
  )
}

export default Mark