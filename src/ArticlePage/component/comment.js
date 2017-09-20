import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ReplyInput from './ReplyInput'
import Reply from './Reply'
import { addSupport, removeSupport, deleteComment } from '../actions'
import '../css/comment.css'
class Comment extends Component {
    constructor() {
        super()
        this.state = {
            showReply: false,
            showReplyInput: false
        }
    }
    handleOnAddSupport() {
        if (!this.props.isLogin) {
            alert('请登录后在点赞')
            return
        }
        const userId = this.props.userInfo.userId
        const { support, index, articleId } = this.props
        if (support.includes(userId)) {
            fetch('/article/removeSupport', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ articleId, index, userId })
            }).then((ret) => {
                if (ret.status !== 200) {
                    throw new Error('Fail to get response with status' + ret.status)
                }
                ret.json().then((res) => {
                    if (res.status === 200) {
                        this.props.onRemoveSupport(userId, index)
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                console.log(error)
            })
            
        } else {
            fetch('/article/addSupport', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ articleId, index, userId })
            }).then((ret) => {
                if (ret.status !== 200) {
                    throw new Error('Fail to get response with status' + ret.status)
                }
                ret.json().then((res) => {
                    if (res.status === 200) {
                        this.props.onAddSupport(userId, index)
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                console.log(error)
            })

        }

    }

    handleOnDeleteComment() {
        const r = window.confirm('确定要删除吗')
        if (r === true) {
            const index = this.props.index
            const articleId = this.props.articleId
            fetch('/article/deleteComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ index, articleId })
            }).then((ret) => {
                if (ret.status !== 200) {
                    throw new Error('Fail to get response with status' + ret.status)
                }
                ret.json().then((res) => {
                    if (res.status === 200) {
                        this.props.onDeleteComment(index)
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
        const { createTime, content, username, userId, avatar, support, reply } = this.props.data
        const index = this.props.index
        const { isLogin, userInfo } = this.props

        const currentUserId = userInfo.userId

        return (
            <div className="comment">
                {username === userInfo.username ?
                    <button className="btn btn-danger delete-comment"
                        onClick={this.handleOnDeleteComment.bind(this)}
                    >删除</button> : null
                }

                <div className="user">
                    <img src={avatar} alt="" />
                    <div>
                        <Link to={`/user/${userId}`} className="username">{username}</Link>
                        <p className="create-time"><span>{index}楼 </span> {createTime}</p>
                    </div>
                </div>
                <p className="content">{content}</p>
                <ul className="viewpoint">
                    <li onClick={this.handleOnAddSupport.bind(this)}>
                        <span className={currentUserId && support.includes(currentUserId) ? "glyphicon glyphicon-thumbs-up yizan" : "glyphicon glyphicon-thumbs-up"}></span>
                        <span className="zan"> {support.length}人赞</span>
                    </li>
                    <li onClick={() => this.setState({
                        showReply: !this.state.showReply
                        , showReplyInput: !this.state.showReplyInput
                    })}>
                        <span className="glyphicon glyphicon-comment"></span>
                        <span className="reply"> 回复</span>
                    </li>
                </ul>
                {reply.length !== 0 || this.state.showReply ?
                    <div className="reply-list">
                        <ul>
                            {reply.map((item, replyIndex) => {
                                return (
                                    <li key={replyIndex} className="reply-item">
                                        <Reply data={item} replyIndex={replyIndex} commentIndex={index} />
                                    </li>
                                )
                            })}
                        </ul>
                        {isLogin ? <div>
                            <p className="add-reply" onClick={() => { this.setState({ showReplyInput: !this.state.showReplyInput }) }}>
                                <span className="glyphicon glyphicon-pencil"></span>
                                <span> 添加新评论</span>
                            </p>
                            {this.state.showReplyInput ? <ReplyInput index={index} /> : null}
                        </div> : '请登录进行评论'}
                    </div> : null}
            </div>
        )

    }
}



const mapStateToProps = (state, props) => {
    return {
        isLogin: state.user.isLogin,
        userInfo: state.user.userInfo,
        articleId: state.articlePage.article.articleId,
        support: state.articlePage.article.comment[props.index].support
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddSupport: (value, index) => {
            dispatch(addSupport(value, index))
        },
        onRemoveSupport: (value, index) => {
            dispatch(removeSupport(value, index))
        },
        onDeleteComment: (index) => {
            dispatch(deleteComment(index))
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment);