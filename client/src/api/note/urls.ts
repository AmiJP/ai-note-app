import { baseURL } from "../urls";

export const baseUserURL = () => {
  const url = new URL(baseURL);
  url.pathname += "note/";
  return url;
};

export const addNoteURL = () => {
  const url = baseUserURL();
  url.pathname += "create/";
  return url;
};

export const updateNoteURL = (noteId: number) => {
  const url = baseUserURL();
  url.pathname += `update/${noteId}`;
  return url;
};

export const deleteNoteURL = (noteId: number) => {
  const url = baseUserURL();
  url.pathname += `delete/${noteId}`;
  return url;
};

export const getNoteURL = (noteId: number) => {
  const url = baseUserURL();
  url.pathname += `${noteId}`;
  return url;
};
