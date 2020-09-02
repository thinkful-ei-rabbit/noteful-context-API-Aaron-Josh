import React from 'react';

const NotefulContext = React.createContext({
  folders: [],
  addFolder: () => {},
  deleteFolder: () => {},
  notes: [],
  addNote: () => {},
  deleteNote: () => {},
});

export default NotefulContext;