import React, { useEffect, useState } from "react";
import { uuidv4 } from "./Utils";

const NoteContext = React.createContext();

const NoteProvider = ({ children, initialValue = [] }) => {
  /**
   * note={id:uuidstring,text:string}
   */
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || initialValue
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const createNote = (newNoteText) => {
    setNotes((notes) => [{ id: uuidv4(), text: newNoteText }].concat(notes));
  };

  const deleteNote = (deletedNote) => {
    setNotes((notes) => notes.filter((note) => note.id !== deletedNote.id));
  };
  const updateNote = (updatedNote) => {
    setNotes((notes) =>
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  return (
    <NoteContext.Provider value={{ notes, createNote, deleteNote, updateNote }}>
      {children}
    </NoteContext.Provider>
  );
};

const useNote = () => React.useContext(NoteContext);

export { useNote, NoteProvider };
