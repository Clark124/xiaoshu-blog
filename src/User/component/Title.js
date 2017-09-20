import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { Attention } from '../../ArticlePage/'
import '../css/title.css'
class Title extends Component {
    render() {
        const { avatar, username, attentions, fans } = this.props.authorInfo
        const userInfo = this.props.userInfo
        const authorUserId = this.props.authorInfo.userId
        const { article } = this.props
        const attentionsLen = attentions.length,
            fansLen = fans.length,
            articleLen = article.length
        let words = 0, praise = 0
        article.forEach((item, index) => {
            words += item.content.length
        })
        article.forEach((item) => {
            praise += item.praise.length
        })
        return (
            <div className="title">
                {userInfo.username === username ? null :
                    <div className="attention-btn">
                        <Attention authorUserId={authorUserId} />
                    </div>
                }

                <img className="avatar" src={avatar} alt="" />
                <div className="data">
                    <h4>{username}</h4>
                    <ul className="data-list">
                        <li>
                            <span>{attentionsLen}</span>
                            <p>关注></p>
                        </li>
                        <li>
                            <span>{fansLen}</span>
                            <p>粉丝></p>
                        </li>
                        <li>
                            <span>{articleLen}</span>
                            <p>文章></p>
                        </li>
                        <li>
                            <span>{words}</span>
                            <p>字数></p>
                        </li>
                        <li>
                            <span>{praise}</span>
                            <p>收获喜欢></p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}


export default Title;