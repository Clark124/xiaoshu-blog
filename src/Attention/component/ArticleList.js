import React, { Component } from 'react';

import { fetchArticle } from '../../User/actions'
import { connect } from 'react-redux'
import Loading from '../../Loading/Loading'
import * as Status from '../status'
import Title from '../../User/component/Title'
import Article from '../../User/component/Article'
import '../../User/css/user.css'


class ArticleList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabIndex: 0,
            url:props.match.params.authorId
        }
    }
    componentDidMount() {
        const userId = this.props.match.params.authorId
        this.props.onFetchArticle({ userId })
        

    }
    componentDidUpdate(){
        const userId = this.props.match.params.authorId
        if(userId!==this.state.url){
            this.setState({url:userId})
            this.props.onFetchArticle({ userId })
        }

    }
    onToggle(e) {
        this.setState({ tabIndex: Number(e.target.id) })
    }
    render() {
        const { status, article, authorInfo, isLogin, userInfo } = this.props
        switch (status) {
            case Status.LOADING: {
                return (
                    <Loading />
                )
            }

            case Status.SUCCESS: {
                return (
                    <div className="user-page">
                        <div className="article-wrapper">
                            <div className="main">
                                <Title
                                    authorInfo={authorInfo}
                                    article={article}
                                    isLogin={isLogin}
                                    userInfo={userInfo}
                                />
                                <div className="article-list">
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
export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);