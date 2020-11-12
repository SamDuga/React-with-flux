import { EventEmitter } from 'events';
import Dispatcher from '../appDispatcher';
import { AuthorData } from '../components/common/DataTypes';
import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = "change";

let _authors: AuthorData[] = [];

class AuthorStore extends EventEmitter {
    addChangeListener(callback: (args: any[]) => void) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback: (args: any[]) => void) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    getAuthors(): AuthorData[] {
        return _authors;
    }

    getAuthorById(id: number): AuthorData {
        return _authors.find(author => author.id === id)!;
    }    
}

const store = new AuthorStore();

Dispatcher.register(action => {
    switch(action.actionType) {
        case actionTypes.DELETE_AUTHOR:
            _authors = _authors.filter(author => author.id !== action.id);
            store.emitChange();
            break;
        case actionTypes.CREATE_AUTHOR:
            _authors.push(action.author);
            store.emitChange();
            break;
        case actionTypes.UPDATE_AUTHOR:
            _authors = _authors.map( author => author.id === action.author.id ? action.author : author);
            break;
        case actionTypes.LOAD_AUTHORS:
            _authors = action.authors;
            store.emitChange();
            break;
        default:
            break;
    }
})

export default store;
