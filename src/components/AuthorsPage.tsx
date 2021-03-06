import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthorList from './AuthorList';

import authorStore from '../stores/authorStore';
import { loadAuthors, deleteAuthor } from '../actions/authorActions';

import { AuthorData } from './common/DataTypes';

export default function CoursesPage() {
    const [ authors, setAuthors ] = useState<AuthorData[]>( authorStore.getAuthors() );

    useEffect( () => {
        authorStore.addChangeListener( onChange );
        if ( authorStore.getAuthors().length === 0 ) loadAuthors();
        return () => authorStore.removeChangeListener( onChange );
    }, [] );

    function onChange() {
        setAuthors( authorStore.getAuthors() );
    }

    return (
        <>
            <h2>Authors</h2>
            <Link className='btn btn-primary' to='/author'>Add Author</Link>
            <AuthorList authors={authors} deleteAuthor={deleteAuthor} />
        </>
    );
}
