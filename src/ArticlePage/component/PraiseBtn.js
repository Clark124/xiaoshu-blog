import React, { Component } from 'react'
import '../css/favoriteBtn.css'
import { connect } from 'react-redux'
import { addPraise, removePraise } from '../actions'
class PraiseBtn extends Component {

    handleAddPraise() {

        if (!this.props.isLogin) {
            alert('请先登录')
            return
        }
        const userId = this.props.userInfo.userId
        const { praise, articleId } = this.props.article
        if (praise.includes(userId)) {
            fetch('/article/removePraise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ articleId, userId })
            }).then((ret) => {
                if (ret.status !== 200) {
                    throw new Error('Fail to get response with status' + ret.status)
                }
                ret.json().then((res) => {
                    if (res.status === 200) {
                        this.props.onRemovePraise(userId)
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                console.log(error)
            })

        } else {
            fetch('/article/addPraise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ articleId, userId })
            }).then((ret) => {
                if (ret.status !== 200) {
                    throw new Error('Fail to get response with status' + ret.status)
                }
                ret.json().then((res) => {
                    if (res.status === 200) {
                        this.props.onAddPraise(userId)
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
        const {isLogin,userInfo} = this.props
        const { praise } = this.props.article
        return (
            <div className={isLogin && praise.includes(userInfo.userId) ? "favorite-btn has-add-parise" : "favorite-btn"}
                onClick={this.handleAddPraise.bind(this)}>
                <span className="glyphicon glyphicon-heart"></span>
                <span>喜欢</span>
                <span>{this.props.article.praise.length}</span>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddPraise: (userId) => {
            dispatch(addPraise(userId))
        },
        onRemovePraise: (userId) => {
            dispatch(removePraise(userId))
        }

    }
}
export default connect(null, mapDispatchToProps)(PraiseBtn);