import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Attention from './Attention'
import '../css/title.css'
class Title extends Component {
    render() {
        const { article, authorAvatar, authorUserId, authorSex } = this.props
        const { comment, content, updateTime, praise, username, hits } = article
        // const {avatar,username} = userInfo
        let sex = null
        if(authorSex==="secret"){
            sex =  null
        }else if(authorSex==='male'){
            sex =  <span style={{color:"green"}}>帅哥&nbsp;&nbsp;&nbsp;</span>
        }else if(authorSex==='female'){
            sex =  <span style={{color:"red"}}>美女&nbsp;&nbsp;&nbsp;</span>
        }
        return (
            <div className="article-page-title">
                <img className="avatar" src={authorAvatar} alt="" />
                <div className="data">
                    <span className="author" >作者</span>
                    <Link to={`/user/${authorUserId}`} className="username">{username}</Link>
                    {sex}
                    <Attention authorUserId={authorUserId} />
                    <div className="article-data">
                        <span>{updateTime}</span>
                        <span>字数 {content.length}</span>
                        <span>阅读 {hits}</span>
                        <span>评论 {comment.length}</span>
                        <span>喜欢 {praise.length}</span>
                    </div>
                </div>
            </div>
        )
    }
}


export default Title