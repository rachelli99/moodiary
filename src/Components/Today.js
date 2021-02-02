import React from "react";
import { useHistory } from "react-router-dom";
import './Style.css';

function Today() {
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
            <div class="field">
              <label className="msubtitle">Dear Diary:</label>
              <div className="control">
                <textarea class="textarea" placeholder="Today ...." style={{height: '40vh'}}></textarea>
              </div>
            </div>
            <div className="my-6"></div>
            <button className="button is-large is-family-primary" style={{backgroundColor: 'transparent', borderWidth: '0.3rem', borderColor: '#576A78'}} onClick={start}>
              <div style={{color: '#576A78'}}>Submit</div>
            </button>
          </div>

        </div>
      </section>

    </div>
  )
}

export default Today;