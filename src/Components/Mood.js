import React, {useState, useEffect} from "react";
import Predictions from '@aws-amplify/predictions';
import { listNotes } from '../graphql/queries';
import { API, Storage } from 'aws-amplify';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;

function Mood() {
  const [notes, setNotes] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetchNotes();
    calcScore();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    setNotes(apiData.data.listNotes.items);
    console.log("hi");
    console.log(notes);
    var entry = "";
    for (var i = 0; i < notes.length; i+=1){
      if (notes[i]["name"] === today){
        entry = notes[i]["description"]
      }
    }
    console.log(entry);
  }

  async function calcScore() {
    const get_scores = await Storage.get("test1.txt", { download: true });
    get_scores.Body.text()
    .then(string => { 
      setScores(string); 
    })
  }

  
  return(
    <div style={{  
       backgroundImage: `url("background.svg")`,
     }} className="background"> 
      <section class="hero is-fullheight">
        <div class="hero-body">
          <div className="container has-text-centered">
            <div className="moodiary">Mood Histories</div>
            <div>{scores}</div>
          </div>
        </div>


        <div style={{marginBottom: 30}}>
          {
            notes.map(note => (
              <div key={note.id || note.name}>
                <h2>{note.name}</h2>
                <p>{note.description}</p>
              </div>
            ))
          }
        </div>

      </section> 

    </div>
  )
}

export default Mood;