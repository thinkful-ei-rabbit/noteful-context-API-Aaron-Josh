import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import NotefulContext from '../NotefulContext'
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers';

export default class NotePageMain extends React.Component {
  static contextType = NotefulContext;

  render(){
    const { noteId } = this.props.match.params;
    const note = findNote(this.context.notes, noteId);

    return (
    <section className='NotePageMain'>
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
      />
      <div className='NotePageMain__content'>
        {this.props.note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
        }
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
