import * as courseApi from '../api/courseApi';
import { CourseData } from '../components/common/DataTypes';
import dispatchter from '../appDispatcher';
import actionTypes from './actionTypes';

export async function saveCourse( course: CourseData): Promise<any> {
    return courseApi.saveCourse( course ).then( savedCourse => {
        dispatchter.dispatch( {
            actionType: course.id ? actionTypes.UPDATE_COURSE : actionTypes.CREATE_COURSE,
            course: savedCourse
        } );
    } );
}

export async function loadCourses() {
    return courseApi.getCourses().then( courses => {
        dispatchter.dispatch( {
            actionType: actionTypes.LOAD_COURSES,
            courses
        } );
    } );
}

export async function deleteCourse(id: number): Promise<any> {
    return courseApi.deleteCourse( id ).then( () => {
        dispatchter.dispatch( {
            actionType: actionTypes.DELETE_COURSE,
            id
        } );
    } );
}
