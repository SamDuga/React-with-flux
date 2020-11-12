import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CourseList from './CourseList';

import courseStore from '../stores/courseStore';
import { loadCourses, deleteCourse } from '../actions/courseActions';

import { getAuthors } from '../api/authorApi';
import { CourseData, AuthorData } from './common/DataTypes';

export default function CoursesPage() {
    const [ courses, setCourses ] = useState<CourseData[]>( courseStore.getCourses() );
    const [ authors, setAuthors ] = useState<AuthorData[]>( [] );

    useEffect( () => {
        courseStore.addChangeListener( onChange );
        if ( courseStore.getCourses().length === 0 ) loadCourses();
        return () => courseStore.removeChangeListener( onChange );
    }, [] );

    function onChange() {
        setCourses( courseStore.getCourses() );
    }

    useEffect( () => {
        getAuthors().then( _authors => setAuthors( _authors ) );
    }, [] );

    return (
        <>
            <h2>Courses</h2>
            <Link className='btn btn-primary' to='/course'>Add Course</Link>
            <CourseList courses={courses} authors={authors} deleteCourse={deleteCourse} />
        </>
    );
}
