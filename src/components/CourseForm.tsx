import React, { useEffect, useState } from 'react';

import TextInput from './common/TextInput';
import SelectInput from './common/SelectInput';
import { CourseData } from './common/DataTypes';

import authorStore from '../stores/authorStore';
import * as authorActions from '../actions/authorActions';

interface CourseFormProps {
    errors;
    course: CourseData;
    onChange( event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement> );
    onSubmit( event: React.FormEvent );
}

export default function CourseForm( props: CourseFormProps ) {
    const [ authors, setAuthors ] = useState( authorStore.getAuthors() );

    useEffect( () => {
        authorStore.addChangeListener( onChange );
        if ( authors.length === 0 ) authorActions.loadAuthors();
        return () => authorStore.removeChangeListener( onChange );
    }, [ authors.length ] );

    function onChange() {
        setAuthors( authorStore.getAuthors() );
    }

    let options: Array<{ key: string, value: string; }> = [];
    for ( let author of authors ) {
        options.push( { key: author.id.toString(), value: author.name } );
    }

    return (
        <form onSubmit={props.onSubmit}>
            <TextInput id='title' label='Title' name='title' value={props.course.title} onChange={props.onChange} error={props.errors.title} />

            <SelectInput id='authorId' label='Author' name='authorId' options={options} value={props.course.authorId.toString()} onChange={props.onChange} error={props.errors.authorId} />

            <TextInput id='category' label='Category' name='category' value={props.course.category} onChange={props.onChange} error={props.errors.category} />

            <input type='submit' value='Save' className='btn btn-primary' />
        </form>
    );
}
