import React, { useEffect, useState } from "react";

const useNote = (initialValue = []) => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || initialValue || []
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const createNote = (newNote) => {
    setNotes((notes) => notes.concat(newNote));
  };

  const deleteNoteByIndex = (deletedItemIndex) => {
    setNotes((notes) => notes.filter((_, index) => index !== deletedItemIndex));
  };

  return { notes, createNote, deleteNoteByIndex };
};

const NoteApp = () => {
  const { notes, createNote, deleteNoteByIndex } = useNote();
  return (
    <div>
      <CreateNote createNote={createNote} />
      {notes.map((note, index) => {
        return (
          <NoteItem
            key={index}
            deleteNote={() => deleteNoteByIndex(index)}
            note={note}
          />
        );
      })}
    </div>
  );
};

const NoteItem = ({ deleteNote, note }) => {
  return (
    <div
      style={{
        margin: "1rem",
        backgroundColor: "whitesmoke",
        boxShadow: "1px 1px 5px grey",
      }}
    >
      <button onClick={deleteNote}>delete</button>
      <div>{note}</div>
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
        }}
      >
        Create
      </button>
    </div>
  );
};

export default NoteApp;
