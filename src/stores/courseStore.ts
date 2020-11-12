import { EventEmitter } from 'events';
import Dispatcher from '../appDispatcher';
import { CourseData } from '../components/common/DataTypes';
import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = "change";

let _courses: CourseData[] = [];

class CourseStore extends EventEmitter {
    addChangeListener(callback: (args: any[]) => void) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback: (args: any[]) => void) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    getCourses(): CourseData[] {
        return _courses;
    }

    getCourseBySlug(slug: string): CourseData {
        return _courses.find(course => course.slug === slug)!;
    }    
}

const store = new CourseStore();

Dispatcher.register(action => {
    switch(action.actionType) {
        case actionTypes.DELETE_COURSE:
            _courses = _courses.filter(course => course.id !== action.id);
            store.emitChange();
            break;
        case actionTypes.CREATE_COURSE:
            _courses.push(action.course);
            store.emitChange();
            break;
        case actionTypes.UPDATE_COURSE:
            _courses = _courses.map( course => course.id === action.course.id ? action.course : course);
            break;
        case actionTypes.LOAD_COURSES:
            _courses = action.courses;
            store.emitChange();
            break;
        default:
            break;
    }
})

export default store;
