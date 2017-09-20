import React, { Component } from 'react'
import { connect } from 'react-redux'
import { view as Header } from '../Header/'
import './css/setting.css'
import Dropzone from 'react-dropzone';
import request from 'superagent';

import { actions } from '../Header/'


const CLOUDINARY_UPLOAD_PRESET = 'jg0nx7ed';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dqaapmcak/upload';

class Setting extends Component {
    constructor() {
        super()
        this.state = {
            uploadedFileCloudinaryUrl: '',
            status: '',
            showRetPassword: false,
            oldPassword: '',
            newPassword: ''
        }
    }
    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0],
            status: 'loading',
            avatarUrl: ''
        });
        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }
            console.log(response.body.secure_url)
            this.setState({ avatarUrl: response.body.secure_url })
            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url,
                    status: ''
                });
            }
        });
    }

    onChangeAvatar() {
        const { username } = this.props.userInfo
        const avatar = this.state.avatarUrl
        if (!avatar) {
            alert('请添加图片')
            return;
        }
        fetch('/setting/setAvatar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, avatar })
        }).then((ret) => {
            if (ret.status !== 200) {
                throw new Error('Fail to get response with status' + ret.status)
            }
            ret.json().then((res) => {
                if (res.status === 200) {
                    alert('更改头像成功')
                    this.props.onChangeAvatar(avatar)
                }
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    handleOnChangeEmail(e) {
        this.props.onChangeEmail(e.target.value)
    }
    handleOnChangeTextareaVlue(e) {
        this.props.onChangeResume(e.target.value)
    }
    handleOnChangeSex(e) {
        this.props.onChangeSex(e.target.value)
    }
    handleOnChangeUsername(e) {

    }
    onSubmit(e) {
        e.preventDefault()
        const { username, email, userId, resume, sex } = this.props.userInfo

        fetch('/setting/updateUserInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, username, email, resume, sex })
        }).then((ret) => {
            if (ret.status !== 200) {
                throw new Error('Fail to get response with status' + ret.status)
            }
            ret.json().then((res) => {
                if (res.status === 200) {
                    alert('更新成功')
                }
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            console.log(error)
        })
    }
    isValidPassword(str) {
        return /^\w{6,15}$/.test(str)
    }
    onSetPassword() {
        if(!this.isValidPassword(this.state.newPassword)){
            alert('请输入正确的密码，必须6位以上')
            this.setState({newPassword:""})
            return
        }
        fetch('/setPassword/resetPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.props.userInfo.username,
                password: this.state.oldPassword,
                newPassword:this.state.newPassword
            })
        }).then((res) => {

            res.json().then((result) => {
                if (result.status === 200) {
                    alert('修改成功')
                    this.setState({oldPassword:'',newPassword:"",showRetPassword:false})
                    
                } else if (result.status === 202) {
                    alert('密码错误')
                    this.setState({oldPassword:'',newPassword:""})
                } 
            })
        })
    }
    onChangeOldPassword(e){
        this.setState({oldPassword:e.target.value})
    }
    onChangNewPassword(e){
        this.setState({newPassword:e.target.value})
    }
    render() {
        const { userInfo, isLogin } = this.props
        const { avatar } = userInfo
        const dropZoneStyle = {
            width: "150px",
            height: "150px",
            border: "2px dashed #ccc",
            textAlign: "center"
        }
        if (isLogin) {
            return (
                <div className="setting">
                    <Header />
                    <div className="setting-avatar">
                        <label>头像设置</label>
                        <img src={avatar} alt="" />
                        <Dropzone
                            style={dropZoneStyle}
                            multiple={false}
                            accept="image/*"
                            onDrop={this.onImageDrop.bind(this)}>
                            <p>拖拽图片放在此处</p>
                            <div>
                                {this.state.status === 'loading' ? <div>加载中</div> : null}
                                {this.state.uploadedFileCloudinaryUrl === '' ? null :
                                    <div>
                                        <p>{this.state.uploadedFile.name}</p>
                                        <img className="avatar-change" src={this.state.uploadedFileCloudinaryUrl} alt="" />
                                    </div>}
                            </div>
                        </Dropzone>
                        <button className="btn btn-success" onClick={this.onChangeAvatar.bind(this)}>更改头像</button>
                    </div>

                    <div className="setting-info">
                        <div className="setting-password" >
                            <p className="title" onClick={() => this.setState({ showRetPassword: !this.state.showRetPassword })}>修改密码></p>
                            {this.state.showRetPassword ?
                                <div>
                                    <label>
                                        原始密码
                                <input type="password" className="form-control"
                                 value={this.state.oldPassword}
                                 onChange={this.onChangeOldPassword.bind(this)}
                                  />
                                    </label>
                                    <label>
                                        新密码
                                <input type="password" className="form-control "
                                 value={this.state.newPassword}
                                  onChange={this.onChangNewPassword.bind(this)}
                                 />
                                    </label>
                                    <button className="btn btn-primary"
                                        onClick={this.onSetPassword.bind(this)}
                                    >提交</button>
                                </div> : null
                            }
                        </div>
                        <form onSubmit={this.onSubmit.bind(this)}>
                            <div className="userinfo-input">
                                <label>用户名：</label>
                                <input type="text"
                                    className="form-control username"
                                    value={userInfo.username}
                                    onChange={this.handleOnChangeUsername.bind(this)}
                                />
                            </div>
                            <div>
                                <label className="sex-label">性别：</label>
                                <select value={userInfo.sex} onChange={this.handleOnChangeSex.bind(this)}>
                                    <option value="secret">保密</option>
                                    <option value="male">男</option>
                                    <option value="female">女</option>
                                </select>
                            </div>
                            <div className="userinfo-input">
                                <label>邮箱：</label>
                                <input type="email"
                                    className="form-control email"
                                    value={userInfo.email}
                                    onChange={this.handleOnChangeEmail.bind(this)}
                                />
                            </div>
                            <div >
                                <label>个人简介：</label>
                                <textarea placeholder="请输入个人简介"
                                    value={userInfo.resume}
                                    onChange={this.handleOnChangeTextareaVlue.bind(this)}
                                    className="form-control textarea-input"></textarea>
                            </div>
                            <button className="btn btn-primary" type="submit">提交</button>
                        </form>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <Header />
                    数据加载中
                </div>
            )
        }

    }
}

const mapStateTopProps = (state) => {
    return {
        userInfo: state.user.userInfo,
        isLogin: state.user.isLogin
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        onChangeAvatar: (avatar) => {
            dispatch(actions.changeAvatar(avatar))
        },
        onChangeSex: (value) => {
            dispatch(actions.changeSex(value))
        },
        onChangeEmail: (value) => {
            dispatch(actions.changeEmail(value))
        },
        onChangeResume: (value) => {
            dispatch(actions.changeResume(value))
        },

    }
}
export default connect(mapStateTopProps, mapDispatchToProps)(Setting);