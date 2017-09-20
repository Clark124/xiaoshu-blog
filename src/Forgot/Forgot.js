import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './forgot.css'
// import 'whatwg-fetch'
export default class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
        }
    }

    handleChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    handleChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    handleChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    isValidPassword(str) {
        return /^\w{6,15}$/.test(str)
    }
    onSetPassword() {
        if (!this.isValidPassword(this.state.newPassword)) {
            alert('请输入正确的密码，必须6位以上')
            this.setState({ newPassword: "" })
            return
        }
        fetch('/setPassword/forgotPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        }).then((res) => {
            res.json().then((result) => {
                if (result.status === 200) {
                    alert('重置成功')
                    this.setState({ username: '', email: '', password: '' })
                    window.location='/sign_in'

                }  else if(result.status === 201) {
                    alert('用户名和邮箱不匹配')
                    this.setState({ username: '', email: '', password: '' })
                }
            })
        })
    }

    render() {
        return (
            <div className="signIn">
                <Link to='/'><div className="logo">小书</div></Link>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 form-wrapper">
                        <div className="title">
                            <h4 style={{ fontWeight: 'bold' }}>找回密码</h4>
                        </div>

                        <div className="form-group">
                            <label>用户名</label>
                            <input type="text" className="form-control" id="username" placeholder="用户名"
                                value={this.state.username}
                                onChange={this.handleChangeUsername.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <label>邮箱</label>
                            <input type="email" className="form-control" id="email" placeholder="邮箱"
                                value={this.state.email}
                                onChange={this.handleChangeEmail.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <label>新密码</label>
                            <input type="password" className="form-control" id="password" placeholder="新密码"
                                value={this.state.password}
                                onChange={this.handleChangePassword.bind(this)}
                            />
                        </div>
                        <div className="submit-wrapper">
                            <button type="submit" className="btn btn-primary btn-login"
                            onClick={this.onSetPassword.bind(this)}
                            >提交</button>
                            <Link to='sign_in'>返回登录</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}