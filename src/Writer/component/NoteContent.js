import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/notecontent.css'


import { changeTitle, changeContent, toggleAttrubuteStatus } from '../actions'
class NoteContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDataArrive: true,
        }
    }
    handleOnChangeTitle(e) {
        const collectionId = parseInt(this.props.match.params.collectionId, 10)
        const noteId = parseInt(this.props.match.params.noteId, 10)
        this.props.onChangeTitle(collectionId, noteId, e.target.value)

    }
    handleOnChangeContent(e) {
        const collectionId = parseInt(this.props.match.params.collectionId, 10)
        const noteId = parseInt(this.props.match.params.noteId, 10)
        this.props.onChangeContent(collectionId, noteId, e.target.value)
    }
    makeArticleId(len) {
        const dict = "0123456789abcdefghijklmnopqrstuvwxyz";
        let str = "";
        for (var i = 0; i < len; i++) {
            str += dict[Math.floor(Math.random() * 36)];
        }
        return str
    }
    handleOnSubmit() {
        const username = this.props.username,
            collectionId = parseInt(this.props.match.params.collectionId, 10),
            collectionName = this.props.collectionName,
            noteId = this.props.content.noteId,
            articleId = this.makeArticleId(10),
            createTime = new Date().toLocaleString(),
            updateTime = new Date().toLocaleString(),
            title = this.props.content.title,
            content = this.props.content.content,
            isAttrubute = true,
            praise = [],
            comment = [],
            hits = 0

        if (!this.state.isDataArrive) {
            return
        }
        if (content.trim() === "" || !username) {
            return
        }
        this.setState({ isDataArrive: false })

        fetch('/article/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, collectionId, collectionName, isAttrubute, hits,
                noteId, articleId, createTime, updateTime, title, content, praise, comment
            })
        }).then((ret) => {
            if (ret.status !== 200) {
                throw new Error('Fail to get response with status' + ret.status)
            }
            ret.json().then((res) => {
                if (res.status === 200) {
                    alert('发布成功')
                    this.setState({ isDataArrive: true })
                    this.props.onToggleAttrubuteStatus(collectionId, noteId)
                }
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            console.log(error)
        })

    }
    handleOnUpdate() {
        const username = this.props.username,
            collectionId = parseInt(this.props.match.params.collectionId, 10),
            collectionName = this.props.collectionName,
            noteId = this.props.content.noteId,
            updateTime = new Date().toLocaleString(),
            title = this.props.content.title,
            content = this.props.content.content,
            isAttrubute = true,
            praise = [],
            comment = []

        if (!this.state.isDataArrive) {
            return
        }
        this.setState({ isDataArrive: false })
        fetch('/article/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, collectionId, collectionName, isAttrubute,
                noteId, updateTime, title, content, praise, comment
            })
        }).then((ret) => {
            if (ret.status !== 200) {
                throw new Error('Fail to get response with status' + ret.status)
            }
            ret.json().then((res) => {
                if (res.status === 200) {
                    alert('更新成功')
                    this.setState({ isDataArrive: true })
                }
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            console.log(error)
        })
    }
    render() {
        if (this.props.content) {
            const { content } = this.props
            return (
                <div className="edit-note">
                    <div className="edit-header">
                        <input type="text" className="content-title-input form-control"
                            value={content.title}
                            onChange={this.handleOnChangeTitle.bind(this)}
                        />
                        <div className="atribute">
                            {content.isAttrubute ?
                                <span onClick={this.handleOnUpdate.bind(this)}><span className="glyphicon glyphicon-refresh"></span> 发布更新</span> :
                                <span onClick={this.handleOnSubmit.bind(this)}><span className="glyphicon glyphicon-share-alt"></span> 发布文章</span>
                            }
                        </div>
                    </div>

                    {/* <textarea name="content" data-provide="markdown" rows="10"></textarea> */}
                    <textarea className="edit-container" name="content"
                        onChange={this.handleOnChangeContent.bind(this)}
                        value={content.content}></textarea>
                    {/* <ReactQuill
                        theme="snow"
                        style={{height:'100%',fontSize:'18px'}}
                        modules={this.modules}
                        formats={this.formats}
                        value={content.content}
                        onChange={(value) => { this.handleOnChangeContent(value) }} /> */}

                </div>
            )
        } else {
            return (
                <div className="choose-note">请选择文章</div>
            )
        }
    }
}

const mapStateToProps = (state, props) => {
    let params = props.match.params
    return {
        content: state.writer.article.filter((item) =>
            item.id === parseInt(params.collectionId, 10)
        )[0].notebooks.filter((item) =>
            item.noteId === parseInt(params.noteId, 10)
            )[0],
        username: state.user.userInfo.username,
        collectionName: state.writer.article.filter((item) => {
            return item.id === parseInt(params.collectionId, 10)
        })[0].collectionName
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onChangeTitle: (collectionId, noteId, value) => {
            dispatch(changeTitle(collectionId, noteId, value))
        },
        onChangeContent: (collectionId, noteId, value) => {
            dispatch(changeContent(collectionId, noteId, value))
        },
        onToggleAttrubuteStatus: (collectionId, noteId) => {
            dispatch(toggleAttrubuteStatus(collectionId, noteId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NoteContent);