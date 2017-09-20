import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './css/signup.css'
export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            repeatPassword: '',
            showErrorMessage: false,
            errorMessage: ''
        }
    }

    isEmai(str) {
        return /^\w+@\w+\.\w+$/.test(str)
    }

    isValidUsername(str) {
        return /^[0-9a-zA-Z\u0391-\uFFE5]{3,10}$/.test(str)
    }
    isValidPassword(str) {
        // if (str.length < 6 || str.length > 20 || /\W/.test(str)) {
        //     return false;
        // }
        // var count = 0;
        // if (/[a-z]/g.test(str)) count++;
        // if (/[A-Z]/g.test(str)) count++;
        // if (/[0-9]/g.test(str)) count++;
        // if (/_/g.test(str)) count++;
        // if (count >= 2) {
        //     return true;
        // } else {
        //     return false;
        // }
        return /\w{6,15}/.test(str)
    }
    checkUsername() {
        if (!this.isValidUsername(this.state.username)) {
            this.setState({
                errorMessage: '请输入正确人用户名,必须3位以上',
                showErrorMessage: true,
                username: ''
            })
        } else {
            this.setState({
                showErrorMessage: false,
            })
        }
    }
    checkPassword() {
        if (!this.isValidPassword(this.state.password)) {
            this.setState({
                errorMessage: '请输入正确的密码，必须6位以上',
                showErrorMessage: true,
                password: ''
            })
        } else {
            this.setState({

                showErrorMessage: false
            })
        }
    }
    checkRepeatPassword() {
        if (this.state.password !== this.state.repeatPassword) {
            this.setState({
                errorMessage: '密码不一致',
                showErrorMessage: true,
                repeatPassword: ''
            })
        }
    }
    checkEmail() {
        if (!this.isEmai(this.state.email)) {
            this.setState({
                errorMessage: '请输入正确的邮箱',
                showErrorMessage: true,
                email: ''
            })
        } else {
            this.setState({

                showErrorMessage: false
            })
        }
    }
    handleChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
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
    makeUserId(len) {
        const dict = "0123456789abcdefghijklmnopqrstuvwxyz";
        let str = "";
        for (var i = 0; i < len; i++) {
            str += dict[Math.floor(Math.random() * 36)];
        }
        return str
    }
    handleOnSubmit() {
        const { username, password, repeatPassword, email } = this.state
        if (email === "") {
            alert('必须填写邮箱')
            return
        }
        if (username === "") {
            alert('必须填写用户名')
            return
        }
        if (password === "") {
            alert('必须填写密码')
            return
        }
        if (repeatPassword === "") {
            alert('必须填写密码确认')
            return
        }
        fetch('/regist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                userId: this.makeUserId(10)
            })
        }).then((ret) => {
            if (ret.status !== 200) {
                throw new Error('Fail to get response with status' + ret.status)
            }
            ret.json().then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('userinfo', JSON.stringify(res.data))
                    window.location="/"
                } else if (res.status === 201) {
                    this.setState({
                        errorMessage: res.message,
                        showErrorMessage: true
                    })
                }
            }).catch((error) => {
                this.setState({
                    errorMessage: error,
                    showErrorMessage: true
                })
            })
        }).catch((error) => {
            this.setState({
                errorMessage: error,
                showErrorMessage: true
            })
        })
       
    }
    render() {

        return (
            <div className="signUp">
                <Link to='/'><div className="logo">小书</div></Link>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 form-wrapper">
                        <div className="title">
                            <Link className="sign-up" to='/sign_up'>注册</Link>
                            <Link to='/sign_in'>登录</Link>
                        </div>

                        <div className="form-group">
                            <label>用户名</label>
                            <input type="text" className="form-control" id="username" placeholder="用户名"
                                value={this.state.username}
                                onBlur={this.checkUsername.bind(this)}
                                onChange={this.handleChangeUsername.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <label>密码</label>
                            <input type="password" className="form-control" id="password" placeholder="密码"
                                value={this.state.password}
                                onBlur={this.checkPassword.bind(this)}
                                onChange={this.handleChangePassword.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <label>确认密码</label>
                            <input type="password" className="form-control" id="password" placeholder="确认密码"
                                value={this.state.repeatPassword}
                                onChange={this.handleChangeRepeatPassword.bind(this)}
                                onBlur={this.checkRepeatPassword.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <label>邮箱</label>
                            <input type="email" className="form-control" id="email" placeholder="邮箱"
                                value={this.state.email}
                                onBlur={this.checkEmail.bind(this)}
                                onChange={this.handleChangeEmail.bind(this)}
                            />
                        </div>
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" /> 我遵守注册规定
                            </label>
                        </div>
                        <div className="btn-submit">
                            <button type="submit" id="signup" className="btn btn-primary"
                                onClick={this.handleOnSubmit.bind(this)}
                            >注册</button>
                        </div>

                        {this.state.showErrorMessage ? <div id="errmsg" className="alert alert-danger " role="alert">{this.state.errorMessage}</div> : ""}

                    </div>
                </div>
            </div>
        )
    }
}
