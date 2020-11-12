import * as authorApi from '../api/authorApi';
import { AuthorData } from '../components/common/DataTypes';
import dispatchter from '../appDispatcher';
import actionTypes from './actionTypes';

export async function saveAuthor( author: AuthorData): Promise<any> {
    return authorApi.saveAuthor( author ).then( savedAuthor => {
        dispatchter.dispatch( {
            actionType: author.id ? actionTypes.UPDATE_AUTHOR : actionTypes.CREATE_AUTHOR,
            author: savedAuthor
        } );
    } );
}

export async function loadAuthors(): Promise<any> {
    return authorApi.getAuthors().then( authors => {
        dispatchter.dispatch( {
            actionType: actionTypes.LOAD_AUTHORS,
            authors
        } );
    } );
}

export async function deleteAuthor(id: number): Promise<any> {
    return authorApi.deleteAuthor( id ).then( () => {
        dispatchter.dispatch( {
            actionType: actionTypes.DELETE_AUTHOR,
            id
        } );
    } );
}
