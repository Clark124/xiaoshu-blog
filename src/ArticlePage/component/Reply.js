import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteReply } from '../actions'
import '../css/reply.css'

class Reply extends Component {
    handleOnDeleteReply() {
        let r = window.confirm('确定要删除吗')
        if (r === true) {
            const articleId = this.props.articleId
            const { commentIndex, replyIndex } = this.props
            fetch('/article/deleteReply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ commentIndex, replyIndex, articleId })
            }).then((ret) => {
                if (ret.status !== 200) {
                    throw new Error('Fail to get response with status' + ret.status)
                }
                ret.json().then((res) => {
                    if (res.status === 200) {
                        this.props.onDeleteReply(commentIndex, replyIndex)
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
        const { username, createTime, content, userId } = this.props.data
        return (
            <div className="reply">
                {username === this.props.userInfo.username ?
                    <button className="delete-reply" onClick={this.handleOnDeleteReply.bind(this)}>删除</button> :
                    null
                }
                <p><Link to={`/user/${userId}`}>{username}: </Link> <p>{content}</p></p>
                <span>{createTime}</span>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
        articleId: state.articlePage.article.articleId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

        onDeleteReply: (commentIndex, replyIndex) => {
            dispatch(deleteReply(commentIndex, replyIndex))
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Reply);

