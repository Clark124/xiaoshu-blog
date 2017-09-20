import React, { Component } from 'react';
import { view as Header } from '../Header/'
import { fetchArticle } from './actions'
import { connect } from 'react-redux'
import Loading from '../Loading/Loading'
import * as Status from './status'
import Title from './component/Title'
import Article from './component/Article'
import Aside from './component/Aside'
import './css/user.css'
// import {Route} from 'react-router-dom'

class User extends Component {
    constructor() {
        super()
        this.state = {
            tabIndex: 0
        }
    }
    componentDidMount() {
        const userId = this.props.match.params.userId
        this.props.onFetchArticle({ userId })

    }
    onToggle(e) {
        this.setState({ tabIndex: Number(e.target.id) })
    }
    render() {
        const { status, article, authorInfo, isLogin, userInfo } = this.props
        const tabHeader = ['文章', '动态', '最新评论', '热门']
        switch (status) {
            case Status.LOADING: {
                return (
                    <Loading />
                )
            }

            case Status.SUCCESS: {
                return (
                    <div className="user-page">
                        <Header />
                        <div className="article-wrapper container">
                            <div className="main col-md-8">
                                <Title
                                    authorInfo={authorInfo}
                                    article={article}
                                    isLogin={isLogin}
                                    userInfo={userInfo}
                                />
                                <ul className="article-tab" >
                                    {tabHeader.map((item, index) => {
                                        return (
                                            <li key={index} id={index}
                                                style={index === this.state.tabIndex ?
                                                    { borderBottom: '1px solid #000' } : { borderBottom: 'none' }}
                                                onClick={this.onToggle.bind(this)}>{item}</li>
                                        )
                                    })}
                                </ul>
                                <div className="article-list"
                                    style={0 === this.state.tabIndex ?
                                        { display: 'block' } : { display: "none" }}>
                                    <ul>
                                        {article.map((item) => {
                                            return (
                                                <li key={item.noteId}>
                                                    <Article
                                                        title={item.title}
                                                        content={item.content}
                                                        articleId={item.articleId}
                                                        updateTime={item.updateTime}
                                                        comment={item.comment}
                                                        praise={item.praise}
                                                        authorInfo={authorInfo}
                                                        hits={item.hits}
                                                    />
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="aside col-md-4">
                                <Aside
                                    article={article}
                                    authorInfo={authorInfo}
                                    userInfo={userInfo}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
            case Status.FAILURE: {
                return (
                    <div>数据加载失败</div>
                )
            }
            default: {
                throw new Error('unexpected status ' + status);
            }
        }
    }

}



const mapStateToProps = (state) => {
    return {
        isLogin: state.user.isLogin,
        userInfo: state.user.userInfo,
        authorInfo: state.userArticle.authorInfo,
        status: state.userArticle.status,
        article: state.userArticle.article
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchArticle: (userId) => {
            dispatch(fetchArticle(userId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(User);