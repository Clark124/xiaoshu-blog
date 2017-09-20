import React, { Component } from 'react'
import { connect } from 'react-redux'
import NoteItem from './NoteItem'
import { Link } from 'react-router-dom'
import '../css/notebook.css'
import { addNote } from '../actions'
class NotebookList extends Component {
    render() {
        if (this.props.notes) {
            const { notebooks, id } = this.props.notes
            return (
                <div className="notebook">
                    <p className="add-note" onClick={() => this.props.onAddNote(id)}><span className="glyphicon glyphicon-plus"></span> 新建文章</p>
                    <ul >
                        {notebooks.map((item,index) => (
                            <li key={item.noteId}>
                                <Link to={`${this.props.match.url}/${item.noteId}`} className="notebook-link">
                                    <NoteItem
                                        index={index}
                                        title={item.title}
                                        content={item.content}
                                        noteId={item.noteId}
                                        collectionId={id}
                                        select={item.select}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="choose-collection">请选择文集</div>
            )
        }

    }
}
const mapStateToProps = (state, props) => {
    let params = props.match.params
    return {
        notes: state.writer.article.filter((item) => item.id === parseInt(params.collectionId, 10))[0]
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddNote: (collectionId) => {
            dispatch(addNote(collectionId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NotebookList);