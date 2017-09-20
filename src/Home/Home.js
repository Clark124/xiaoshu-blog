import React, { Component } from 'react';
import { connect } from 'react-redux'
import { view as Header } from '../Header/'
import Carousel from './component/Carousel'
import Loading from '../Loading/Loading'
import * as Status from './status'
import { fetchHome } from './actions'
import { Article } from '../User/'
import { addArticle } from './actions'

import Aside from './component/Aside'

import './css/home.css'
class Home extends Component {
    constructor() {
        super()
        this.state = {
            isNewsArrive: true,
            isDataOver: false,
            authorList: [],
            message: '',
        }
    }

    componentDidMount() {
        fetch('/home/recommendAuthor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ page: 0 })
        }).then((ret) => {
            if (ret.status !== 200) {
                throw new Error('Fail to get response with status' + ret.status)
            }

            ret.json().then((res) => {
                if (res.status === 200) {
                   
                    this.setState({ authorList: res.data.authorList})

                }
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            console.log(error)
        })
        this.page = 1
        this.props.onFetchHome()
        window.onscroll = this.fetchData.bind(this)
    }
    componentDidUpdate(){
        
    }
    componentWillUnmount() {
        window.onscroll = null
        this.setState({ isDataOver: false })
    }
    fetchData() {
        if (this.isVisible(this.loadMoreBtn)) {
            if (this.state.isNewsArrive === false || this.state.isDataOver === true) {
                return
            }
            this.setState({ isNewsArrive: false })
            fetch('/home', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ page: this.page++ })
            }).then((ret) => {
                if (ret.status !== 200) {
                    throw new Error('Fail to get response with status' + ret.status)
                }

                ret.json().then((res) => {
                    if (res.status === 200) {
                        if (res.data.articleList.length === 0) {
                            this.setState({ isDataOver: true, message: '没有更多数据了！' })

                        }
                        this.props.onAddArticle(res.data)
                        this.setState({ isNewsArrive: true })
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    isVisible(node) {
        if(!node){
            return
        }
        let windowHeight = window.innerHeight,
            scrollTop = window.scrollY,
            offsetTop = node.offsetTop,
            nodeHeight = node.offsetHeight;
        if (windowHeight + scrollTop > offsetTop && scrollTop < offsetTop + nodeHeight) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        const { status, articleList } = this.props
        switch (status) {
            case Status.LOADING: {
                return (
                    <Loading />
                )
            }
            case Status.SUCCESS: {
                return (
                    <div className="home">
                        <Header />
                        <div className="home-body">
                            <Carousel />
                            <div className="home-article">
                                <div className="article-list">
                                    <ul>
                                        {articleList.map((item) => {
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
                                    <button id="btn" style={{ visibility: 'hidden' }} ref={(button) => { this.loadMoreBtn = button }}>加载更多</button>
                                    <p>{this.state.message}</p>
                                </div>
                                <div className="aside">
                                     <Aside authorList={this.state.authorList}/> 
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

const mapStateTopProps = (state) => {
    return {
        status: state.home.status,
        articleList: state.home.articleList

    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchHome: () => {
            dispatch(fetchHome())
        },
        onAddArticle: (result) => {
            dispatch(addArticle(result))
        }

    }
}
export default connect(mapStateTopProps, mapDispatchToProps)(Home);