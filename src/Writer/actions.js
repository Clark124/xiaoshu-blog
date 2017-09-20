import {
    ADD_COLLECTION, REMOVE_COLLECTION, ADD_NOTE, REMOVE_NOTE, CHANGE_TITLE,
    CHANGE_CONTENT, TOGGLE_CLASS, TOGGLE_ATTRUBUTE_STATUS, FETCH_STARTED, FETCH_SUCCESS,
    FETCH_FAILURE
} from './actionTypes'

let nextCollectionId =  Math.floor(Math.random()*9999)
let nextNoteId = Math.floor(Math.random()*999999)
export const addCollection = (text) => ({
    type: ADD_COLLECTION,
    collectionName: text,
    id: nextCollectionId++
})


export const removeCollection = (id) => ({
    type: REMOVE_COLLECTION,
    id: id
})

export const addNote = (collectionId) => ({
    type: ADD_NOTE,
    collectionId,
    noteId: nextNoteId++
})

export const removeNote = (collectionId, noteId) => ({
    type: REMOVE_NOTE,
    collectionId,
    noteId
})
export const changeTitle = (collectionId, noteId, value) => ({
    type: CHANGE_TITLE,
    collectionId,
    noteId,
    value
})
export const changeContent = (collectionId, noteId, value) => ({
    type: CHANGE_CONTENT,
    collectionId,
    noteId,
    value
})
export const toggleClass = (collectionId, noteId) => ({
    type: TOGGLE_CLASS,
    collectionId,
    noteId
})
export const toggleAttrubuteStatus = (collectionId, noteId) => ({
    type: TOGGLE_ATTRUBUTE_STATUS,
    collectionId,
    noteId
})

export const fetchArticleStarted = () => ({
    type: FETCH_STARTED
})

export const fetchArticleSuccess = (result) => ({
    type: FETCH_SUCCESS,
    result
})

export const fetchArticleFailure = (error) => ({
    type: FETCH_FAILURE,
    error
})

export const fetchArticle = (username) => {
    return (dispatch) => {
        const apiUrl = `/article/fetchdata`
        dispatch(fetchArticleStarted())
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username
            })
        }).then((ret) => {
            console.log(ret)
            if (ret.status !== 200) {
                throw new Error('Fail to get response with status' + ret.status)
            }
            ret.json().then((retJson) => {
                console.log(retJson)
                dispatch(fetchArticleSuccess({}))
            }).catch((error) => {
                console.log(123)
                console.log(error)
                dispatch(fetchArticleFailure(error));
            })
        }).catch((error) => {
            dispatch(fetchArticleFailure(error))
        })
    }
}
