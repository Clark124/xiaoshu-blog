import {
    ADD_COLLECTION, REMOVE_COLLECTION, ADD_NOTE, REMOVE_NOTE, CHANGE_TITLE,
    CHANGE_CONTENT, TOGGLE_CLASS, TOGGLE_ATTRUBUTE_STATUS, FETCH_STARTED,
    FETCH_SUCCESS, FETCH_FAILURE
} from './actionTypes'

let collectionId =  Math.floor(Math.random()*9999)
const writeState = {
    status: 'loading',
    article: [{ collectionName: "日记本", id: collectionId, notebooks: [] }]
}


export default (state = writeState, action) => {
    switch (action.type) {
        case FETCH_STARTED: {
            return { status: 'loading' }
        }
        case FETCH_SUCCESS: {
            return { ...state, status: "success", ...action.result }
        }
        case FETCH_FAILURE: {
            return { ...state, status: "failure" }
        }
        case ADD_COLLECTION: {
            return {
                ...state, article: [{
                    id: action.id,
                    collectionName: action.collectionName,
                    notebooks: [],
                    completed: false
                }, ...state.article]
            }
        }

        case REMOVE_COLLECTION: {
            return {
                ...state,
                article: state.article.filter((item) => {
                    return item.id !== action.id
                })
            }
        }
        case ADD_NOTE: {
            return {
                ...state,
                article: state.article.map((collectionItem) => {
                    if (collectionItem.id === action.collectionId) {
                        return {
                            ...collectionItem,
                            notebooks: [{ noteId: action.noteId, title: '无标题文章', content: '' }, ...collectionItem.notebooks]
                        }
                    } else {
                        return collectionItem
                    }
                })
            }
        }
        case REMOVE_NOTE: {
            return {
                ...state,
                article: state.article.map((collectionItem) => {
                    if (collectionItem.id === action.collectionId) {
                        return {
                            ...collectionItem,
                            notebooks: collectionItem.notebooks.filter((item) => item.noteId !== action.noteId)
                        }
                    } else {
                        return collectionItem
                    }
                })
            }
        }
        case CHANGE_TITLE: {
            return {
                ...state,
                article: state.article.map((collectionItem) => {
                    if (collectionItem.id === action.collectionId) {
                        return {
                            ...collectionItem,
                            notebooks: collectionItem.notebooks.map((item) => {
                                if (item.noteId === action.noteId) {
                                    return {
                                        ...item, title: action.value
                                    }
                                } else {
                                    return item
                                }
                            })
                        }
                    } else {
                        return collectionItem
                    }
                })
            }
        }
        case CHANGE_CONTENT: {
            return {
                ...state,
                article: state.article.map((collectionItem) => {
                    if (collectionItem.id === action.collectionId) {
                        return {
                            ...collectionItem,
                            notebooks: collectionItem.notebooks.map((item) => {
                                if (item.noteId === action.noteId) {
                                    return {
                                        ...item, content: action.value
                                    }
                                } else {
                                    return item
                                }
                            })
                        }
                    } else {
                        return collectionItem
                    }
                })
            }
        }
        case TOGGLE_CLASS: {
            return {
                ...state,
                article: state.article.map((collectionItem) => {
                    if (collectionItem.id === action.collectionId) {
                        return {
                            ...collectionItem,
                            notebooks: collectionItem.notebooks.map((item) => {
                                if (item.noteId === action.noteId) {
                                    return {
                                        ...item, select: true
                                    }
                                } else {
                                    return {
                                        ...item, select: false
                                    }
                                }
                            })
                        }
                    } else {
                        return collectionItem
                    }
                })
            }
        }
        case TOGGLE_ATTRUBUTE_STATUS: {
            return {
                ...state,
                article: state.article.map((collectionItem) => {
                    if (collectionItem.id === action.collectionId) {
                        return {
                            ...collectionItem,
                            notebooks: collectionItem.notebooks.map((item) => {
                                if (item.noteId === action.noteId) {
                                    return {
                                        ...item, isAttrubute: true
                                    }
                                } else {
                                    return {
                                        ...item
                                    }
                                }
                            })
                        }
                    } else {
                        return collectionItem
                    }
                })
            }
        }
        default: {
            return state
        }
    }
}