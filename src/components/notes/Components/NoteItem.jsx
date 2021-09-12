import React, { useState } from "react";
import { useNote } from "../Context";
const NoteItem = ({ note, ExtraButton }) => {
  console.log(
    "🚀 ~ file: NoteApp.jsx ~ line 72 ~ NoteItem ~ note, ExtraButton",
    note,
    ExtraButton
  );
  const [editMode, setEditMode] = useState(false);
  const [state, setstate] = useState(note.text);

  const { deleteNote, updateNote } = useNote();

  return (
    <div
      style={{
        margin: "1rem",
        backgroundColor: "whitesmoke",
        boxShadow: "1px 1px 5px grey",
      }}
    >
      <button onClick={() => deleteNote(note)}>delete</button>
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
            updateNote({ ...note, text: state });
            setEditMode(false);
          }}
        >
          save
        </button>
      )}
      {ExtraButton}
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
          note.text
        )}
      </div>
    </div>
  );
};
export default NoteItem;
