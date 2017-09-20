import React, { Component } from 'react'
import '../css/attentionItem.css'
export default class AttentionItem extends Component {
    render() {
        const { username, avatar } = this.props
        return (
            <div className="attention-item">
                <img src={avatar} alt="" />
                <span>{username}</span>
            </div>
        )
    }
}