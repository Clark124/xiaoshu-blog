import React, { Component } from 'react';
import { removeNote, toggleClass } from '../actions'
import { connect } from 'react-redux'
import '../css/noteitem.css'

class NoteItem extends Component {
    onRemoveNote() {
        let r = window.confirm('确定要删除吗,删除将无法恢复')
        if (r === true) {
            const { collectionId, noteId, username, isAttrubute } = this.props
            if (!username) {
                return
            }
            if (!isAttrubute) {
                return
            }
            fetch('/article/removenote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username, collectionId,
                    noteId
                })
            }).then((ret) => {
                if (ret.status !== 200) {
                    throw new Error('Fail to get response with status' + ret.status)
                }
                ret.json().then((res) => {
                    if (res.status === 200) {
                        alert('删除文章成功')
                        this.props.onRemoveNote(collectionId, noteId)
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                console.log(error)
            })
        } else {
            return
        }

    }
    render() {
        const { title, content, onToggleClass, noteId, collectionId, select, isAttrubute } = this.props
        const wordNum = content.length
        return (
            <div className={select ? 'note-item select' : 'note-item'}
                onClick={() => onToggleClass(collectionId, noteId)}
            >
                {isAttrubute ? <div className="icon">
                    <span className="glyphicon glyphicon-ok-circle"></span>
                </div> : ''}
                <div className="content-wrapper">
                    <h4 className="content-title">{title}</h4>
                    <p className="content">{content}</p>
                </div>

                <span className="word-num">字数:{wordNum}</span>
                <div className="btn-group note-setting">
                    <span className="noteset-icon glyphicon glyphicon-cog dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    </span>
                    <ul className="setting-wrapper dropdown-menu">
                        <li className="cancle-collection"
                            data-toggle="modal"
                            onClick={this.onRemoveNote.bind(this)}
                        >
                            <span className=" glyphicon glyphicon-trash" ></span> 删除文章
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRemoveNote: (collectionId, noteId) => {
            dispatch(removeNote(collectionId, noteId));
        },
        onToggleClass: (collectionId, noteId) => {
            dispatch(toggleClass(collectionId, noteId))
        }
    };
};
const mapStateToProps = (state, props) => {
    return {
        isAttrubute: state.writer.article.filter((item) =>
            item.id === props.collectionId
        )[0].notebooks.filter((item) =>
            item.noteId === props.noteId
            )[0].isAttrubute,
        username: state.user.userInfo.username,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteItem);

