import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import dummyStore from '../dummy-store';
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers';
import './App.css';
import NotefulContext from '../NotefulContext';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        // fake date loading from API call
        setTimeout(() => this.setState(dummyStore), 600);
        
        fetch('http://localhost:9090/folders/')
        .then(response => {
            if (response.ok) {
                return response.json();
            }    
        })
        .then (folderdata => this.setState({ folders: folderdata }))        
        return fetch('http://localhost:9090/notes/')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then (notedata => this.setState({ notes: notedata }))
        
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    }

    renderNavRoutes() {
        // const {notes, folders} = this.state
        
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    //     render={routeProps => (                           
                    //             <NoteListNav
                    //                 folders={folders}
                    //                 notes={notes}
                    //                 {...routeProps}
                    //             />
                    //         
                    //     )}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageNav}
                    // render={routeProps => {
                    //     const { noteId } = routeProps.match.params;
                    //     const note = findNote(notes, noteId) || {};
                    //     const folder = findFolder(folders, note.folderId);
                    //     return <NotePageNav {...routeProps} folder={folder} 
                    //     />;
                    // }}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        const { notes, folders } = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                        // render={routeProps => {
                        //     const { folderId } = routeProps.match.params;
                        //     const notesForFolder = getNotesForFolder(
                        //         notes,
                        //         folderId
                        //     );
                        //     return (
                        //         <NoteListMain
                        //             {...routeProps}
                        //             notes={notesForFolder}
                        //         />
                        //     );
                        // }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    component = {NotePageMain}
                    //render={routeProps => {
                        //const { noteId } = routeProps.match.params;
                       // const note = findNote(notes, noteId);
                       // return <NotePageMain {...routeProps} note={note} />;
                   // }}
                />
            </>
        );
    }

    render() {

        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote
        }
        
        return (            
            <div className="App">
                <NotefulContext.Provider value={value}>
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
                </NotefulContext.Provider>
            </div>
        );
    }
}

export default App;
