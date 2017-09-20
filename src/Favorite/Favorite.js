import React, { Component } from 'react'
import { connect } from 'react-redux'
import { view as Header } from '../Header/'
import Loading from '../Loading/Loading'
import * as Status from './status'
import { fetchFavorite } from './actions'
import { Article } from '../User/'
import './css/favorite.css'

class Favorite extends Component {
    componentDidMount() {
        const userId = this.props.match.params.userId
        this.props.onFetchFavorite({ userId })
    }
    render() {
        const { status, favorite } = this.props
        switch (status) {
            case Status.LOADING: {
                return (
                    <Loading />
                )
            }

            case Status.SUCCESS: {

                return (
                    <div>
                        <Header />
                        <div className="my-favorite">
                            <h3 className="my-favorite-title">我喜欢的文章</h3>
                            {favorite.length === 0 ? <h3>还没有喜欢的文章</h3> :
                                <ul>
                                    {favorite.map((item) => {
                                        return (
                                            <li key={item.article.articleId}>
                                                <Article
                                                    title={item.article.title}
                                                    content={item.article.content}
                                                    articleId={item.article.articleId}
                                                    updateTime={item.article.updateTime}
                                                    comment={item.article.comment}
                                                    praise={item.article.praise}
                                                    authorInfo={item.authorInfo}
                                                    hits={item.article.hits}
                                                />
                                            </li>
                                        )
                                    })}
                                </ul>
                            }
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
        status: state.favorite.status,
        favorite: state.favorite.favorite


    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchFavorite: (userId) => {
            dispatch(fetchFavorite(userId))
        }

    }
}
export default connect(mapStateTopProps, mapDispatchToProps)(Favorite);