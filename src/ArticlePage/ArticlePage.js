import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { view as Header } from '../Header/'
import { fetchArticle } from './actions'
import { connect } from 'react-redux'
import Loading from '../Loading/Loading'
import * as Status from './status'
import './css/articlepage.css'
import Title from './component/Title'
import CommentInput from './component/commentInput'
import CommentList from './component/commentList'
import AuthorInfo from './component/AuthorInfo'
import PraiseBtn from './component/PraiseBtn'
import marked from 'marked'
class ArticlePage extends Component {
    componentDidMount() {
        const articleId = this.props.match.params.articleId
        this.props.onFetchArticle({ articleId: articleId })
    }
    render() {
        const { status, userInfo, article, authorAvatar, authorUserId, authorSex, authorResume,
            isLogin, wordsLen, praiseLen, fansLen } = this.props
        switch (status) {
            case Status.LOADING: {
                return (
                    <Loading />
                )
            }

            case Status.SUCCESS: {
                return (
                    <div className="article-page">
                        <Header />
                        <div className="container-page">
                            <h1>{article.title}</h1>
                            {userInfo.username === article.username ? <Link className="edit-article"
                                to={`/writer/${article.collectionId}/${article.noteId}`}>编辑文章</Link> : ''}
                            <Title
                                article={article}
                                authorAvatar={authorAvatar}
                                authorUserId={authorUserId}
                                authorSex={authorSex}
                            />
                            <div className="article-content" dangerouslySetInnerHTML={{ __html: marked(article.content) }}></div>
                            <div className="article-footer">
                                <div>
                                    <span className="glyphicon glyphicon-book"></span> <span> {article.collectionName}</span>
                                </div>
                                <div>© 著作权归作者所有</div>
                            </div>
                            <AuthorInfo
                                username={article.username}
                                avatar={authorAvatar}
                                wordsLen={wordsLen}
                                praiseLen={praiseLen}
                                fansLen={fansLen}
                                authorUserId={authorUserId}
                                authorResume={authorResume}
                                authorSex={authorSex}
                            />
                            <PraiseBtn
                                article={article}
                                userInfo={userInfo}
                                isLogin={isLogin}
                            />
                            {isLogin ? <div>
                                <CommentInput
                                    articleId={this.props.match.params.articleId}
                                    userInfo={userInfo}
                                />
                            </div> : '请登录在评论'}
                            <CommentList commentList={article.comment} />

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

const mapStateTopProps = (state) => {
    return {
        isLogin: state.user.isLogin,
        userInfo: state.user.userInfo,
        status: state.articlePage.status,
        article: state.articlePage.article,
        authorAvatar: state.articlePage.authorAvatar,
        authorUserId: state.articlePage.authorUserId,
        authorSex: state.articlePage.authorSex,
        authorResume:state.articlePage.authorResume,
        attentionLen: state.articlePage.attentionLen,
        fansLen: state.articlePage.fansLen,
        wordsLen: state.articlePage.wordsLen,
        praiseLen: state.articlePage.praiseLen

    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchArticle: (articleId) => {
            dispatch(fetchArticle(articleId))
        }

    }
}
export default connect(mapStateTopProps, mapDispatchToProps)(ArticlePage);