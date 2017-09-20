import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/replyInput.css'
import { addReply } from '../actions'
class ReplyInput extends Component {
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
            createTime: new Date().toLocaleString(),
            content: this.state.value,
            username: this.props.userInfo.username,
            userId: this.props.userInfo.userId,
            index:this.props.index,
            articleId:this.props.articleId
        }
        const index = this.props.index
        if (!this.state.isDataArrive) {
            return
        }
        this.setState({ isDataArrive: false })
        fetch('/article/addReply', {
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
                    this.props.onSubmitValue(value, index)
                    this.setState({ value: '',isDataArrive:true })
                }
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            console.log(error)
        })
        // this.props.onSubmitValue(value, index)
        // this.setState({ value: '' })
    }
    render() {
        return (
            <div className="reply-input">
                <div className="input-wrapper">

                    <textarea
                        onChange={this.changeValue.bind(this)}
                        value={this.state.value}
                        placeholder="写下你的评论..."
                    />
                </div>
                <button className="btn btn-success"
                    onClick={this.SubmitValue.bind(this)}
                >发送</button>

            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
        articleId: state.articlePage.article.articleId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitValue: (value, index) => {
            dispatch(addReply(value, index))
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReplyInput);