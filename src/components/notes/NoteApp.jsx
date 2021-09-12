import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

const useNote = (initialValue = []) => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || initialValue || []
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const createNote = (newNote) => {
    setNotes((notes) => [newNote].concat(notes));
  };

  const deleteNoteByIndex = (deletedNoteIndex) => {
    setNotes((notes) => notes.filter((_, index) => index !== deletedNoteIndex));
  };
  const updateNote = (updatedNote, updatedNoteIndex) => {
    setNotes((notes) =>
      notes.map((note, index) =>
        index !== updatedNoteIndex ? note : updatedNote
      )
    );
  };

  return { notes, createNote, deleteNoteByIndex, updateNote };
};

const NoteApp = ({ notes, createNote, deleteNoteByIndex, updateNote }) => {
  return (
    <div>
      <CreateNote createNote={createNote} />
      {notes.map((note, index) => {
        return (
          <NoteItem
            key={index}
            deleteNote={() => deleteNoteByIndex(index)}
            updateNote={(updatedNote) => updateNote(updatedNote, index)}
            note={note}
            index={index}
          />
        );
      })}
    </div>
  );
};

const NoteItem = ({ deleteNote, updateNote, note, index }) => {
  const [editMode, setEditMode] = useState(false);
  const [state, setstate] = useState(note);
  return (
    <div
      style={{
        margin: "1rem",
        backgroundColor: "whitesmoke",
        boxShadow: "1px 1px 5px grey",
      }}
    >
      <button onClick={deleteNote}>delete</button>
      <button
        onClick={() => {
          setEditMode(!editMode);
        }}
      >
        {editMode ? "discard changes" : "edit"}
      </button>
      {editMode && (
        <button
          onClick={() => {
            updateNote(state);
            setEditMode(false);
          }}
        >
          save
        </button>
      )}
      {index !== undefined && (
        <Link to={`/notes/${index}`}>
          <button>open</button>
        </Link>
      )}

      <div
        style={{
          margin: "1rem",
        }}
      >
        {editMode ? (
          <textarea
            style={{ width: "100%" }}
            type="text"
            value={state}
            onChange={(e) => setstate(e.target.value)}
          />
        ) : (
          note
        )}
      </div>
    </div>
  );
};

const CreateNote = ({ createNote }) => {
  const [note, setNote] = useState("");
  return (
    <div
      style={{
        margin: "1rem",
      }}
    >
      <textarea
        placeholder="Type something"
        style={{ width: "100%" }}
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
      />
      <button
        style={{ backgroundColor: "grey", color: "white", padding: "0.5rem" }}
        onClick={() => {
          note.trim() && createNote(note);
          setNote("");
        }}
      >
        Create
      </button>
    </div>
  );
};

const OneNotePage = ({ notes, deleteNoteByIndex, updateNote }) => {
  let { index } = useParams();
  index = Number(index);
  console.log(index, notes, deleteNoteByIndex, updateNote);
  return (
    <NoteItem
      key={index}
      deleteNote={() => deleteNoteByIndex(index)}
      updateNote={(updatedNote) => updateNote(updatedNote, index)}
      note={notes[index]}
    />
  );
};

const NoteAppRouter = () => {
  const { notes, createNote, deleteNoteByIndex, updateNote } = useNote();

  return (
    <Router>
      <Switch>
        <Route exact path="/notes/:index">
          <Link to="/">go back</Link>
          <OneNotePage {...{ notes, deleteNoteByIndex, updateNote }} />
        </Route>
        <Route path="/">
          <NoteApp {...{ notes, createNote, deleteNoteByIndex, updateNote }} />
        </Route>
      </Switch>
    </Router>
  );
};

export default NoteAppRouter;
