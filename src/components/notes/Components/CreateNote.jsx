import React, { useState } from "react";
import { useNote } from "../Context";

const CreateNote = () => {
  const [noteText, setNoteText] = useState("");
  const { createNote } = useNote();

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
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        rows={4}
      />
      <button
        style={{ backgroundColor: "grey", color: "white", padding: "0.5rem" }}
        onClick={() => {
          noteText.trim() && createNote(noteText);
          setNoteText("");
        }}
      >
        Create
      </button>
    </div>
  );
};
export default CreateNote;
