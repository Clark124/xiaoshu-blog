import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/aside.css'
import { Attention } from '../../ArticlePage/'
class Aside extends Component {
    constructor() {
        super()
        this.state = {
            
            isNewsArrive: true,
        }
    }
    componentDidMount() {
        
    }

    render() {
        if (this.props.authorList.length === 0) {
            return (
                <div>
                    <h5 className="title">推荐作者</h5>
                    <span>数据加载中。。。</span>
                </div>
            )
        } else if(this.props.authorList.length > 0){
            return (
                <div className="home-aside">
                    <h5 className="title">推荐作者</h5>
                    <ul>
                        {this.props.authorList.map((item) => {
                            return (
                                <li className="auhor-item" key={item.author.userId}>
                                    <img className="avatar" src={item.author.avatar} alt="" />
                                    <div className="author-item-info">
                                       <Link to={`/user/${item.author.userId}`}  className="author-name"> <p>{item.author.username}</p></Link>
                                        <span>写了{item.words}字</span>&nbsp;&nbsp;&nbsp;<span>获得{item.praise}喜欢</span>
                                    </div>
                                    <Attention authorUserId={item.author.userId} />
                                </li>
                            )
                        })}

                    </ul>
                </div>
            )
        } else {
            return (
                <div>
                    <h5 className="title">推荐作者</h5>
                    <span>数据加载中。。。</span>
                </div>
            )
        }
    }
}

export default Aside