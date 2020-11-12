import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import CourseForm from './CourseForm';

import { EmptyCourse } from './common/DataTypes';

import courseStore from '../stores/courseStore';
import * as courseActions from '../actions/courseActions';

export default function ManageCoursePage( props ) {
    const [ errors, setErrors ] = useState( { title: '', authorId: '', category: '' } );
    const [ courses, setCourses ] = useState( courseStore.getCourses() );
    const [ course, setCourse ] = useState( EmptyCourse );

    useEffect( () => {
        courseStore.addChangeListener( onChange );
        const slug = props.match.params.slug;
        if ( courses.length === 0 ) courseActions.loadCourses();
        else if ( slug ) {
            if ( !courses.find( x => x.slug === slug ) ) {
                props.history.push( '/404' );
            }
            setCourse( courseStore.getCourseBySlug( slug ) );
        }
        return () => courseStore.removeChangeListener( onChange );
    }, [ props.history, courses, courses.length, props.match.params.slug ] );

    function onChange() {
        setCourses( courseStore.getCourses() );
    }

    function handleChange( event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) {
        setCourse( { ...course, [ event.target.name ]: event.target.value } );
    }

    function handleSubmit( event: React.FormEvent ) {
        event.preventDefault();

        if ( !formIsValid() ) return;

        courseActions.saveCourse( course )
            .then( () => {
                props.history.push( '/courses' );
                toast.success( 'Course saved sucessfully!' );
            } );
    }

    function formIsValid(): boolean {
        const _errors: any = {};

        if ( !course.title ) _errors.title = "Title is required!";
        if ( !course.authorId ) _errors.authorId = "Author is required!";
        if ( !course.category ) _errors.category = "Category is required!";

        setErrors( _errors );
        return Object.keys( _errors ).length === 0;
    }
    return (
        <>
            <h2>Manage Course</h2>
            <CourseForm errors={errors} course={course} onChange={handleChange} onSubmit={handleSubmit} />
        </>
    );
}
