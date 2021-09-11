import React, { useEffect, useState } from "react";

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

const NoteApp = () => {
  const { notes, createNote, deleteNoteByIndex, updateNote } = useNote();
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
          />
        );
      })}
    </div>
  );
};

const NoteItem = ({ deleteNote, updateNote, note }) => {
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

export default NoteApp;
