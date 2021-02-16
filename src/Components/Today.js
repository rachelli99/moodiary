import React,{ useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { API } from 'aws-amplify';
import './Style.css';

import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from '../graphql/mutations';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
const initialFormState = { name: today, description: '' }

function Today() {

  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  async function createNote() {
    history.push("/today")
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  const history = useHistory()

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
                <textarea 
                  class="textarea" placeholder="Today ...." style={{height: '40vh'}}
                  onChange={e => setFormData({ ...formData, 'description': e.target.value})}
                  value={formData.description}
                ></textarea>
              </div>
            </div>
            <div className="my-6"></div>

              {/* <input
                onChange={e => setFormData({ ...formData, 'name': e.target.value})}
                placeholder="Note name"
                value={formData.name}
              /> */}


            <button 
              className="button is-large is-family-primary" style={{backgroundColor: 'transparent', borderWidth: '0.3rem', borderColor: '#576A78'}} 
              onClick={createNote}
            >
              <div style={{color: '#576A78'}}>Submit</div>
            </button>
          </div>

        </div>
      </section>

    </div>
  )
}

export default Today;