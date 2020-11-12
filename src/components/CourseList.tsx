import React from 'react';
import { Link } from "react-router-dom";

import { AuthorData, CourseData } from './common/DataTypes';

interface CourseListProps {
    courses: CourseData[];
    authors: AuthorData[];
    deleteCourse( id: number ): Promise<any>;
}

export default function CourseList( props: CourseListProps ) {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Delete Course</th>
                </tr>
            </thead>
            <tbody>
                {props.courses.map( course => {
                    const author = props.authors.find( x => x.id === course.authorId );
                    return (
                        <tr key={course.id}>
                            <td><Link to={'/course/' + course.slug}>{course.title}</Link></td>
                            <td>{author?.name}</td>
                            <td>{course.category}</td>
                            <td>
                                <button onClick={() => props.deleteCourse( course.id )} className='btn btn-outline-danger'>Delete</button>
                            </td>
                        </tr> );
                } )}
            </tbody>
        </table>
    );
}
