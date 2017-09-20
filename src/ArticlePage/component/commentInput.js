import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/commentInput.css'
import { addComment } from '../actions'
class CommentInput extends Component {
    constructor() {
        super()
        this.state = {
            value: '',
            isDataArrive: true,
        }
    }
    changeValue(e) {
        this.setState({ value: e.target.value })
    }
    SubmitValue() {
        const value = {
            articleId:this.props.articleId,
            createTime: new Date().toLocaleString(),
            content: this.state.value,
            avatar: this.props.userInfo.avatar,
            username: this.props.userInfo.username,
            userId: this.props.userInfo.userId,
            support: [],
            reply: []
        }
        if (!this.state.isDataArrive) {
            return
        }
        this.setState({ isDataArrive: false })
        fetch('/article/addComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        }).then((ret) => {
            if (ret.status !== 200) {
                throw new Error('Fail to get response with status' + ret.status)
            }
            ret.json().then((res) => {
                if (res.status === 200) {
                    alert('发布评论成功')
                    this.props.onSubmitValue(value)
                    this.setState({ value: '',isDataArrive:true })
                }
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            console.log(error)
        })
        
    }
    render() {
        const { userInfo } = this.props
        return (
            <div className="comment-input">
                <div className="input-wrapper">
                    <img src={userInfo.avatar} alt="" />
                    <textarea
                        onChange={this.changeValue.bind(this)}
                        value={this.state.value}
                        placeholder="写下你的评论..."
                    />
                </div>
                <button className="btn btn-success text-right"
                    onClick={this.SubmitValue.bind(this)}
                >发送</button>

            </div>
        )

    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitValue: (value) => {
            dispatch(addComment(value))
        }

    }
}
export default connect(null, mapDispatchToProps)(CommentInput);