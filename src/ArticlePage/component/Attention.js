import React, { Component } from 'react'
import '../css/attention.css'
import { connect } from 'react-redux'
import { actions } from '../../Header/'

class Attention extends Component {
    onToggleAttention() {
        const { isLogin, userInfo, authorUserId } = this.props
        const { attentions, userId } = userInfo
        if (!isLogin) {
            alert('请先登录')
            return
        }

        if (attentions.includes(authorUserId)) {
            fetch('/article/removeAttention', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, authorUserId })
            }).then((ret) => {
                if (ret.status !== 200) {
                    throw new Error('Fail to get response with status' + ret.status)
                }
                ret.json().then((res) => {
                    if (res.status === 200) {
                        this.props.onRemoveAttention(authorUserId)
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                console.log(error)
            })

        } else {

            fetch('/article/addAttention', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, authorUserId })
            }).then((ret) => {
                if (ret.status !== 200) {
                    throw new Error('Fail to get response with status' + ret.status)
                }
                ret.json().then((res) => {
                    if (res.status === 200) {
                        this.props.onAddAttention(authorUserId)
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    render() {
        const { isLogin, userInfo, authorUserId } = this.props
        const { attentions } = userInfo
        if (isLogin && attentions.includes(authorUserId)) {
            return (
                <span className="attentioned-btn" onClick={this.onToggleAttention.bind(this)}>
                    已关注
                </span>
            )
        }
        return (
            <span className="attention-btn" onClick={this.onToggleAttention.bind(this)}>
                +关注
            </span>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLogin: state.user.isLogin,
        userInfo: state.user.userInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddAttention: (authorUserId) => {
            dispatch(actions.addAttention(authorUserId))
        },
        onRemoveAttention: (authorUserId) => {
            dispatch(actions.removeAttention(authorUserId))
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Attention);