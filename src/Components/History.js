import React, { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import { listNotes } from '../graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from '../graphql/mutations';

const initialFormState = { name: '', description: '' }

function History() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
  }, []);


  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    setNotes(apiData.data.listNotes.items);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  }

  return(
    <div style={{  
       backgroundImage: `url("background.svg")`,
     }} className="background"> 
      <section class="hero is-fullheight">
        <div class="hero-body">
          <div className="container has-text-centered">
            <div className="moodiary">History</div>
          </div>

          <div style={{marginBottom: 30}}>
          {
            notes.map(note => (
              <div key={note.id || note.name}>
                <h2>{note.name}</h2>
                <p>{note.description}</p>
                <button onClick={() => deleteNote(note)}>Delete note</button>
              </div>
            ))
          }
          </div>


          </div>
        </section> 

    </div>
  )
}

export default History;