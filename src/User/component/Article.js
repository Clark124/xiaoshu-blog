import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/article.css'

export default class Article extends Component {
    addHits() {
        const articleId = this.props.articleId
        let hits = this.props.hits
        hits += 1
        fetch('/article/addHits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ articleId, hits })
        })
    }
    render() {
        const { authorInfo, title, content, updateTime, comment, praise, articleId, hits } = this.props
        let url = content.match(/!\[.*?\)/g)
        if (url) {
            url = url[0].match(/\(.*?\)/g)[0].slice(1, -1)
        }
        return (
            <div className="article" style={url?{paddingRight:'160px'}:null}>
                {url?<img src={url} className="article-img" alt=""/>:null}
                <div className="article-user">
                    <img src={authorInfo.avatar} alt="" />
                    <Link to={`/user/${authorInfo.userId}`}><span className="username">{authorInfo.username}</span></Link>
                    <span className="update-time">{updateTime}</span>
                </div>
                <Link className="article-title" to={`/article/${articleId}`} onClick={this.addHits.bind(this)}>{title}</Link>
                <div className="article-abstract" >
                    {content.replace(/#+|^`+`+$|\n/g, '').substr(0, 100) + '...'}
                </div>
                <ul className="article-meta">
                    <li><span className="glyphicon glyphicon glyphicon-eye-open"></span> {hits}</li>
                    <li><span className="glyphicon glyphicon-comment"></span> {comment.length}</li>
                    <li><span className="glyphicon glyphicon-heart"></span> {praise.length}</li>
                </ul>
            </div>
        )
    }
}

