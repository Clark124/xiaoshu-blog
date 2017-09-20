import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './signin.css'
// import 'whatwg-fetch'
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showErrorMessage: false,
            errorMessage: ''
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
    handleChangeRepeatPassword(e) {
        this.setState({
            repeatPassword: e.target.value
        })
    }
    handleOnSubmit() {
        const { username, password } = this.state

        if (username === "") {
            alert('必须填写用户名')
            return
        }
        if (password === "") {
            alert('必须填写密码')
            return
        }

        const userInfo = {
            username: this.state.username
        }
        localStorage.setItem('userinfo', JSON.stringify(userInfo))
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        }).then((res) => {

            res.json().then((result) => {
                if (result.status === 200) {
                    localStorage.setItem('userinfo', JSON.stringify(result.data))
                    window.location = '/'
                } else if (result.status === 202) {
                    this.setState({
                        errorMessage: result.data,
                        showErrorMessage: true
                    })
                } else if (result.status === 201) {
                    this.setState({
                        errorMessage: result.data,
                        showErrorMessage: true
                    })
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
                            <Link to='/sign_up'>注册</Link>
                            <Link to='/sign_in' className="signIn-btn">登录</Link>
                        </div>

                        <div className="form-group">
                            <label>用户名</label>
                            <input type="text" className="form-control" id="username" placeholder="用户名"
                                value={this.state.username}
                                onChange={this.handleChangeUsername.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <label>密码</label>
                            <input type="password" className="form-control" id="password" placeholder="密码"
                                value={this.state.password}
                                onChange={this.handleChangePassword.bind(this)}
                            />
                        </div>
                        <div className="submit-wrapper">
                            <button type="submit" id="signup" className="btn btn-primary btn-login"
                                onClick={this.handleOnSubmit.bind(this)}
                            >登录</button>
                            <Link to='/forgot' >忘记密码</Link>
                        </div>
                        {/* <div className="text-center" style={{marginBottom:"20px"}}>其他登录方式</div>
                        <ul className="login-method">
                            <li><a href="/auth/github"><img src="/images/github.jpg" alt=""/></a></li>
                            <li><a href="/auth/github"><img src="/images/qq.jpg" alt=""/></a></li>
                            <li><a href="/auth/github"><img src="/images/weixin.jpg" alt=""/></a></li>
                        </ul> */}
                        {this.state.showErrorMessage ?
                            <div id="errmsg" className="alert alert-danger  " role="alert">{this.state.errorMessage}</div> : ""}
                    </div>
                </div>
            </div>
        )
    }
}