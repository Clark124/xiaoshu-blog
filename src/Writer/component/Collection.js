import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { removeCollection } from '../actions.js';
import { Link } from 'react-router-dom'
class Collection extends Component {
    static propTypes = {
        onRemove: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired
    }
    handleOnRemove() {
        let r = window.confirm('确定要删除吗,删除将无法恢复')
        if (r === true) {
            const userInfo = JSON.parse(localStorage.getItem('userinfo'))
            fetch('/article/removecollection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userInfo.username, collectionId: this.props.id,

                })
            }).then((ret) => {
                if (ret.status !== 200) {
                    throw new Error('Fail to get response with status' + ret.status)
                }
                ret.json().then((res) => {
                    if (res.status === 200) {
                        alert('删除成功')
                        this.props.onRemove()
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                console.log(error)
            })
        } else {
            return
        }


    }
    render() {
        let { text, id } = this.props
        return (
            <li >
                <Link to={`/writer/${id}`} className="writer-collections-item">
                    <span className="text">{text}</span>
                    <div className="btn-group seting">
                        <span className="collection-setting glyphicon glyphicon-cog dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        </span>
                        <ul className="setting-wrapper dropdown-menu">
                            <li onClick={this.handleOnRemove.bind(this)}
                                data-toggle="modal"
                                className="cancle-collection"><span className=" glyphicon glyphicon-trash" >
                                </span> 删除文集
                            </li>
                        </ul>
                    </div>

                </Link>
            </li>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    let id = ownProps.id
    return {
        onRemove: () => {
            dispatch(removeCollection(id));
        }
    };
};

export default connect(null, mapDispatchToProps)(Collection);

