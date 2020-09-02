import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'
import { render } from 'enzyme';
import NotefulContext from '../NotefulContext'
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers';

export default class NotePageNav extends React.Component {

  static contextType = NotefulContext;




  render() {
    const { noteId } = this.props.match.params;
    const note = findNote(this.context.notes, noteId) || {};
    const folder = findFolder(this.context.folders, note.folderId);
    
    return (
      
      <div className='NotePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
        Back
      </CircleButton>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => { }
  }
}
