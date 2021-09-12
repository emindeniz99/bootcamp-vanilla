import React from "react";
import { Link } from "react-router-dom";
import { useNote } from "./Context";
import NoteItem from "./Components/NoteItem";
import CreateNote from "./Components/CreateNote";

const NoteApp = () => {
  const { notes } = useNote();

  return (
    <div>
      <CreateNote />
      {notes.map((note, index) => {
        return (
          <NoteItem
            key={index}
            note={note}
            ExtraButton={
              <Link to={`/notes/${note.id}`}>
                <button>open</button>
              </Link>
            }
          />
        );
      })}
    </div>
  );
};

export { NoteApp };
