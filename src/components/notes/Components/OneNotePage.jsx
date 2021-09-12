import React from "react";
import { useParams, Redirect } from "react-router-dom";
import { useNote } from "../Context";
import NoteItem from "./NoteItem";

const OneNotePage = () => {
  const { notes } = useNote();

  let { id } = useParams();
  let note = notes.find((note) => note.id === id);
  if (!note) return <Redirect to="/" />;
  return <NoteItem key={id} note={note} />;
};
export default OneNotePage;
