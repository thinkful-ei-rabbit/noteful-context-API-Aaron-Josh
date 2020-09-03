import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Note.css';
import NotefulContext from '../NotefulContext';

export default class Note extends React.Component {
  

  static contextType = NotefulContext;

  handleClickDelete = event => {
    event.preventDefault();
    const noteId = this.props.id

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(response => {
      if (!response.ok)
        return response.json().then(event => Promise.reject(event))
      return response.json()
    })
    .then(() => {
      this.context.deleteNote(noteId)
      this.props.onDeleteNote(noteId)
    })
    .catch(error => {
      console.error({ error })
    })
  }
  
  render() {

    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${this.props.id}`}>
            {this.props.name}
          </Link>
        </h2>
        <button className='Note__delete' type='button' 
        onClick={this.handleClickDelete}>
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
        remove
      </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
          {' '}
            <span className='Date'>
              {format(this.props.modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
