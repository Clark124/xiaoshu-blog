import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import AddCollection from './component/AddCollection'
import CollectionList from './component/ColletcionList'
import NotebookList from './component/NotebookList'
import NoteContent from './component/NoteContent'
import Loading from '../Loading/Loading'
import { fetchArticleSuccess } from './actions'
import { getUserInfo } from '../Header/actions'
import './css/writer.css'

class Write extends Component {
    static propsType = {
        isLogin: PropTypes.bool
    }

    componentWillMount() {
        const userInfo = JSON.parse(localStorage.getItem('userinfo'))
        
        if (userInfo) {
            fetch('/article/fetchdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userInfo.username
                })
            }).then((ret) => {
                if (ret.status !== 200) {
                    throw new Error('Fail to get response with status' + ret.status)
                }
                ret.json().then((res) => {
                    if (res.status === 200) {
                        this.props.onFetchArticle(res.data)

                    }
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                console.log(error)
            })
        } else {
            window.location = '/sign_in'
        }

    }
    componentDidMount() {
    }
    render() {
        const { status } = this.props
        if (status === "success") {
            return (
                <div className="writer">
                    <div className="writer-collections">
                        <Link className="return-home" to="/">回首页</Link>
                        <AddCollection />
                        <ul className="writer-collections-lists">
                            <CollectionList />
                        </ul>
                    </div>

                    <div className="writer-titles">
                        <Route path={`${this.props.match.url}/:collectionId`} component={NotebookList} />
                        {/* <Route exact path={this.props.match.url} render={() => (
                        <NotebookList/>
                        )}/> */}
                    </div>
                    <div className="writer-panel">
                        <Route path={`${this.props.match.url}/:collectionId/:noteId`} component={NoteContent} />
                    </div>
                </div>
            )
        } else if (status === 'loading') {
            return (
                <Loading/>
            )
        } else if (status === 'failure') {
            return (
                <div>数据加载失败</div>
            )
        }
    }
}


const mapStateTopProps = (state) => {
    return {
        isLogin: state.user.isLogin,
        userInfo: state.user.userInfo,
        status: state.writer.status
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchArticle: (data) => {
            dispatch(fetchArticleSuccess(data))
        },
        getUserinfo: (userInfo) => {
            dispatch(getUserInfo(userInfo))
        }
    }
}
export default connect(mapStateTopProps, mapDispatchToProps)(Write);