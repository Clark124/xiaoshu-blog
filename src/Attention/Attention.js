import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { view as Header } from '../Header/'
import Loading from '../Loading/Loading'
import * as Status from './status'
import { fetchAttention } from './actions'
import AttentionItem from './component/AttentionItem'
import ArticleList from './component/ArticleList'
import './css/attention.css'


class Attention extends Component {
    componentDidMount() {
        const userId = this.props.match.params.userId
        this.props.onFetchAttention({ userId })
    }

    render() {
        const { status } = this.props
        switch (status) {
            case Status.LOADING: {
                return (
                    <Loading />
                )
            }

            case Status.SUCCESS: {
                const { attentions } = this.props
                const attentionList = (
                    <ul>
                        {attentions.map((item) => {
                            return (
                                <li key={item.userId}>
                                    <Link to={`${this.props.match.url}/${item.userId}`}>
                                        <AttentionItem
                                            avatar={item.avatar}
                                            username={item.username}
                                            userId={item.userId}
                                        />
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                )
                return (
                    <div>
                        <Header />
                        <div className="container attention-wrapper">
                            <div className="attention-list">
                                <span className="attention-title">全部关注</span>

                                {attentionList}
                            </div>
                            <div className="article-list">
                                <Route path={`${this.props.match.url}/:authorId`} component={ArticleList} />
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

const mapStateTopProps = (state) => {
    return {
        isLogin: state.user.isLogin,
        userInfo: state.user.userInfo,
        status: state.attention.status,
        attentions: state.attention.attentions

    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchAttention: (userId) => {
            dispatch(fetchAttention(userId))
        }

    }
}
export default connect(mapStateTopProps, mapDispatchToProps)(Attention);