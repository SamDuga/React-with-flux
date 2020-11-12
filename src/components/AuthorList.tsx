import React from 'react';
import { Link } from 'react-router-dom';

import { AuthorData } from './common/DataTypes';

interface AuthorListProps {
    authors: AuthorData[];
    deleteAuthor( id: number ): Promise<any>;
}

export default function AuthorList( props: AuthorListProps ) {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Author</th>
                    <th>Delete Author</th>
                </tr>
            </thead>
            <tbody>
                {props.authors.map( author => {
                    return (
                        <tr key={author.id}>
                            <td><Link to={'/author/' + author.id}>{author.name}</Link></td>
                            <td>
                                <button onClick={() => props.deleteAuthor( author.id )} className='btn btn-outline-danger'>Delete</button>
                            </td>
                        </tr> );
                } )}
            </tbody>
        </table>
    );
}
