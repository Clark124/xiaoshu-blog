import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './css/header.css'
import { Link, } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserInfo, signOut } from './actions'

class Header extends Component {
    static propTypes = {
        isLogin: PropTypes.bool,
        signOut: PropTypes.func,
        userInfo: PropTypes.object,
        getUserinfo: PropTypes.func
    }
    componentWillMount() {
        let userInfo = JSON.parse(localStorage.getItem('userinfo'))
        // if (!userInfo) {
        //     fetch('/header/getSession').then((ret) => {
        //         if (ret.status !== 200) {
        //             throw new Error('Fail to get response with status' + ret.status)
        //         }
        //         ret.json().then((res) => {
        //             if (res.status === 200) {
        //                 fetch('/header/userInfo', {
        //                     method: 'POST',
        //                     headers: {
        //                         'Content-Type': 'application/json'
        //                     },
        //                     body: JSON.stringify({ username: res.data })
        //                 }).then((ret) => {
        //                     if (ret.status !== 200) {
        //                         throw new Error('Fail to get response with status' + ret.status)
        //                     }
        //                     ret.json().then((res) => {
        //                         if (res.status === 200) {
        //                             this.props.getUserinfo(res.data)
        //                         }
        //                     }).catch((error) => {
        //                         console.log(error)
        //                     })
        //                 }).catch((error) => {
        //                     console.log(error)
        //                 })
        //             } else if (res.status === 404) {
        //                 return
        //             }
        //         })
        //     })
        // }
        if (userInfo) {
            fetch('/header/userInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: userInfo.username })
            }).then((ret) => {
                if (ret.status !== 200) {
                    throw new Error('Fail to get response with status' + ret.status)
                }
                ret.json().then((res) => {
                    if (res.status === 200) {
                        this.props.getUserinfo(res.data)
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                console.log(error)
            })
        }
    }
    componentWillUnmount() {

    }
    onSignOut() {
        localStorage.removeItem('userinfo')
        this.props.signOut()
    }
    render() {
        const { isLogin, userInfo } = this.props
        const { userId, avatar } = userInfo

        const homePage = (
            <ul className="nav navbar-nav">
                <li ><Link to='/' className="">首页</Link></li>
            </ul>
        )
        const navByLognin = (
            <ul className="nav navbar-nav login">
                <li ><Link to='/' className="">首页</Link></li>
                <li ><Link to={`/attention/${userId}`} className="">关注</Link></li>
                <li ><Link to={`/favorite/${userId}`} className="">喜欢</Link></li>
            </ul>
        )
        const signInAndSignUp = (
            <ul className="nav navbar-nav log-in-out">
                <li><Link to='/sign_in'>登录</Link></li>
                <li><Link to='/sign_up'>注册</Link></li>
            </ul>
        )
        let mySetting = (
            <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    <img className="avatar-img" src={avatar} alt="" />
                    <span className="caret">
                    </span>
                </a>
                <ul className="dropdown-menu">
                    <li><Link to={`/user/${userId}`}><span className="glyphicon glyphicon-user"></span> 我的主页</Link></li>
                    <li><Link to='/setting'><span className="glyphicon glyphicon-cog"></span> 个人设置</Link></li>
                    <li><a onClick={this.onSignOut.bind(this)}><span className="glyphicon glyphicon-log-out"></span> 登出</a></li>
                </ul>
            </li>
        )
        return (

            <div className="header">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed " data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand " style={{ color: "#ec8e8e" }} to='/'>小书</Link>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            {isLogin ? navByLognin : homePage}

                            <ul className="nav navbar-nav navbar-right">
                                {isLogin ? mySetting : signInAndSignUp}
                                {isLogin ? <li>
                                    <Link to='/writer' className="writer-link-wrapper">
                                        <div className="writer-link">
                                            <span className="glyphicon glyphicon-pencil"></span> 写文章
                                        </div>
                                    </Link>
                                </li> : null}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

const mapStateTopProps = (state) => {
    return {
        isLogin: state.user.isLogin,
        userInfo: state.user.userInfo
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => {
            dispatch(signOut())
        },
        getUserinfo: (userInfo) => {
            dispatch(getUserInfo(userInfo))
        }
    }
}
export default connect(mapStateTopProps, mapDispatchToProps)(Header);