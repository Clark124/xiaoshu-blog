import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import '../css/aside.css'
import { actions } from '../../Header/'
class Aside extends Component {
    constructor() {
        super()
        this.state = {
            showTextarea: false
        }
    }
    handleOnChangeTextareaVlue(e) {
        this.props.onChangeResume(e.target.value)
    }
    cancelEdit() {
        this.setState({ showTextarea: false })
    }
    showEditor() {
        this.setState({ showTextarea: true })
    }
    onSubmit() {
        const { username, resume } = this.props.userInfo

        fetch('/setting/updateUserInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, resume })
        }).then((ret) => {
            if (ret.status !== 200) {
                throw new Error('Fail to get response with status' + ret.status)
            }
            ret.json().then((res) => {
                if (res.status === 200) {
                    alert('保存成功')
                }
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            console.log(error)
        })
    }
    render() {
        const { userInfo, authorInfo } = this.props
        const myLove = (
            <div>
                <div className="article-resume">
                    <span className="resume-title">个人介绍</span>

                    <span className="edit text-right" onClick={this.showEditor.bind(this)}>
                        <span className="glyphicon glyphicon-pencil"></span>&nbsp;&nbsp;编辑
                    </span>
                    <br />
                    {this.state.showTextarea ?
                        <div>
                            <textarea
                                className="form-control"
                                value={userInfo.resume}
                                onChange={this.handleOnChangeTextareaVlue.bind(this)}
                            />
                            <button
                                className="btn btn-success"
                                onClick={this.onSubmit.bind(this)}>保存</button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={this.cancelEdit.bind(this)}
                                className="btn btn-primary"
                            >取消</button>
                        </div>
                        : <p className="resume-content">{userInfo.resume}</p>
                    }
                </div>
                <div className="my-attention">
                    <Link to={`/attention/${userInfo.userId}`}><p> <span className="glyphicon glyphicon-th-large"></span> 我关注</p></Link>
                    <Link to={`/favorite/${userInfo.userId}`}><p> <span className="glyphicon glyphicon-heart"></span> 我喜欢的文章</p></Link>
                </div>
            </div>
        )
        const authorLove = (
            <div>
                <div className="article-resume">
                    <span className="resume-title">个人介绍</span>
                     <p className="resume-content">{authorInfo.resume}</p>
                </div>
                <div className="my-attention">
                    <Link to={`/attention/${authorInfo.userId}`}><p> <span className="glyphicon glyphicon-th-large"></span> 作者关注</p></Link>
                    <Link to={`/favorite/${authorInfo.userId}`}><p> <span className="glyphicon glyphicon-heart"></span> 作者喜欢的文章</p></Link>
                </div>
            </div>
        )
        return (
            <div>
                {userInfo.username === authorInfo.username ? myLove : authorLove}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeResume: (value) => {
            dispatch(actions.changeResume(value))
        }

    }
}

export default connect(null, mapDispatchToProps)(Aside);