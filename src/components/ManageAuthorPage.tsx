import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import AuthorForm from './AuthorForm';

import { EmptyAuthor } from './common/DataTypes';

import authorStore from '../stores/authorStore';
import * as authorActions from '../actions/authorActions';

export default function ManageCoursePage( props ) {
    const [ errors, setErrors ] = useState( { name: '' } );
    const [ authors, setAuthors ] = useState( authorStore.getAuthors() );
    const [ author, setAuthor ] = useState( EmptyAuthor );

    useEffect( () => {
        authorStore.addChangeListener( onChange );
        const id = +props.match.params.id;
        if ( authors.length === 0 ) authorActions.loadAuthors();
        else if ( id ) {
            if ( !authors.find( x => x.id === id ) ) {
                props.history.push( '/404' );
            }
            setAuthor( authorStore.getAuthorById( id ) );
        }
        return () => authorStore.removeChangeListener( onChange );
    }, [ props.history, authors, authors.length, props.match.params.id ] );

    function onChange() {
        setAuthors( authorStore.getAuthors() );
    }

    function handleChange( event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) {
        setAuthor( { ...author, [ event.target.name ]: event.target.value } );
    }

    function handleSubmit( event: React.FormEvent ) {
        event.preventDefault();

        if ( !formIsValid() ) return;

        authorActions.saveAuthor( author )
            .then( () => {
                props.history.push( '/authors' );
                toast.success( 'Author saved sucessfully!' );
            } );
    }

    function formIsValid(): boolean {
        const _errors: any = {};

        if ( !author.name ) _errors.title = "Title is required!";

        setErrors( _errors );
        return Object.keys( _errors ).length === 0;
    }
    return (
        <>
            <h2>Manage Author{author.id !== 0 ? ': ID#: ' + author.id : ''}</h2>
            <AuthorForm errors={errors} author={author} onChange={handleChange} onSubmit={handleSubmit} />
        </>
    );
}
