import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Attention from './Attention'
import '../css/authorInfo.css'
class AuthorInfo extends Component {
    render() {

        const { avatar, username, wordsLen, praiseLen, fansLen,
            authorUserId, authorResume, authorSex } = this.props
        let sex = null
        if (authorSex === "secret") {
            sex = null
        } else if (authorSex === 'male') {
            sex = <span style={{ color: "green" }}>&nbsp;&nbsp;&nbsp;帅哥</span>
        } else if (authorSex === 'female') {
            sex = <span style={{ color: "red" }}>&nbsp;&nbsp;&nbsp;美女</span>
        }
        return (
            <div className="author-info-wrapper">
                <div className="author-info">
                    <img className="avatar" src={avatar} alt="" />
                    <div className="data">
                        <Link to={`/user/${authorUserId}`} className="username">{username}</Link>
                        {sex}
                        <ul className="data-list">
                            <li>
                                <span>写了{wordsLen}字</span>
                            </li>
                            <li>
                                <span>被{fansLen}关注</span>
                            </li>
                            <li>
                                <span>获得了{praiseLen}喜欢</span>
                            </li>
                        </ul>
                    </div>
                    <div className="attention-btn">
                        <Attention authorUserId={authorUserId} />
                    </div>
                </div>

                <p className="author-resume">{authorResume}</p>
            </div>
        )
    }
}


export default AuthorInfo;