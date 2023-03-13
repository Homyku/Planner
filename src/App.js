import './App.css';

import React, { useState, useEffect } from "react";
import Weather from "./Weather";
import CalendarWithEvents from './CalendarWithEvents';
import DarkMode from './DarkMode';


function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const MAX_SMALL_LENGTH = 80;

  const handleAddNote = () => {
    if (title.trim() !== "" && content.trim() !== "") {
      const newNote = { title, content };
      setNotes([...notes, newNote]);
      setTitle("");
      setContent("");
      const updatedNotes = [...notes, newNote];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }
  };

  useEffect(() => {
    const notesFromStorage = localStorage.getItem("notes");
    if (notesFromStorage) {
      setNotes(JSON.parse(notesFromStorage));
    }
  }, []);
  
  

  const handleRemoveNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  return (
    <div className="note-container">
      <h1 class="maintitle">My planner</h1>
      
      <div className="form-container">
      <div class="planner">
        <DarkMode />
        <div class="weather">
      <Weather />
      </div>
      <div class="calendar">
      <CalendarWithEvents />
      </div>
      </div>
        <div class="title-note">
          <input
            type="text"
            class="input title"
            placeholder="Title"
            value={title}
            maxLength="20"
            onChange={(e) => setTitle(e.target.value)}
          /></div>
          <div>
          <textarea
            placeholder="Content"
            class="input content"
            value={content}
            maxLength="250"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button class="btn" onClick={handleAddNote} disabled={!title.trim() || !content.trim()}>
          Add note
        </button>
        
      </div>
      <ul>
        {notes.map((note, index) => {
          const isSmallNote = note.content.length <= MAX_SMALL_LENGTH;
          const cardClass = `card ${isSmallNote ? 'small' : 'large'}`;

          return (
            <li key={index} className={cardClass}>
              <div>
                <h3 id="noteTitle">{note.title} <button id="removing" onClick={() => handleRemoveNote(index)}>
                Delete
              </button></h3>
                <p id="noteContent">{note.content}</p>
              </div>
              
            </li>
          );
        })}
      </ul>
      
    </div>
  );
}

export default App;
