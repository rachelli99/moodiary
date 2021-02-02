import React from "react";
import { useHistory } from "react-router-dom"
import './Style.css'


// const BackgroundImage = ({ source, children, style, ...props }) => {
//   return (
//       <image
//         source={source}
//         style={[{flex: 1, width: null, height: null, }, style]}>
//         {children}
//       </image>
//   );
// }

function Landing() {
  const history = useHistory()

  function start() {
    history.push("/today")
  }

  return(      
    <div style={{  
       backgroundImage: `url("background.svg")`,
     }} className="background">  

      <section class="hero is-fullheight">
      <div class="hero-body">
        <div className="container has-text-centered">
          <div className="moodiary">Moodiary</div>
            <button className="button is-large is-family-primary" style={{backgroundColor: 'transparent', borderWidth: '0.3rem', borderColor: '#576A78'}} onClick={start}>
              <div style={{color: '#576A78'}}>Write Your Day</div>
            </button>
          </div>

        </div>
      </section>

    </div>
  )
}

export default Landing;
