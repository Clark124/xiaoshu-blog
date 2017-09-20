import React, { Component } from 'react'
// import { connect } from 'react-redux'
import '../css/commentList.css'
import Comment from '../component/comment'
class CommentList extends Component {
    
    
    render() {
        const { commentList } = this.props
        const comment = commentList.map((item,index)=>{
            return (
                <li key={index}>
                    <Comment data={item} index={index}/>
                </li>  
            )
        })
        return (
            <div className="comment-List">
                <ul>
                    {comment}
                </ul>

            </div>
        )

    }
}

export default CommentList