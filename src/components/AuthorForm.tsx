import React from 'react';

import TextInput from './common/TextInput';
import { AuthorData } from './common/DataTypes';

interface AuthorFormProps {
    errors;
    author: AuthorData;
    onChange( event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement> );
    onSubmit( event: React.FormEvent );
}

export default function AuthorForm( props: AuthorFormProps ) {

    return (
        <form onSubmit={props.onSubmit}>
            <TextInput id='name' label='Name' name='name' value={props.author.name} onChange={props.onChange} error={props.errors.name} />

            <input type='submit' value='Save' className='btn btn-primary' />
        </form>
    );
}
