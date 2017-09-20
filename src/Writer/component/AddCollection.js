import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { addCollection } from '../actions.js';

class AddCollection extends Component {
  static propTypes = {
    onCollection: PropTypes.func.isRequired
  }
  constructor() {
    super()
    this.state = {
      value: '',
      showInput: false
    }
  }
  changeValue(e) {
    this.setState({ value: e.target.value })
  }
  onSubmit(ev) {
    ev.preventDefault();

    const inputValue = this.state.value
    if (!inputValue.trim()) {
      return;
    }

    this.props.onCollection(inputValue);
    this.setState({
      value: ''
    });
  }
  showInput() {
    this.setState({
      showInput: true
    })
  }
  hideInput() {
    this.setState({
      showInput: false
    })
  }
  render() {
    let addCollectionInput = (
      <div>
        <input className="add-collection-input form-control"
          onChange={this.changeValue.bind(this)}
          value={this.state.value}
        />
        <div className="btn-wrapper">
          <button className="btn btn-default" onClick={this.onSubmit.bind(this)}>
            添加
          </button>
          <button className="btn btn-primary" onClick={this.hideInput.bind(this)}>
            取消
          </button>
        </div>

      </div>
    )
    return (
      <div className="add-collection">
        <p className="add-title" onClick={this.showInput.bind(this)}><span className="glyphicon glyphicon-plus"></span> 新建文集</p>
        {this.state.showInput ? addCollectionInput : ''}
      </div>
    )
  }
}
// const mapStateDispatchToProps = (state) => {
//  return {
//    showInput:state.writer.
//  }
// }
const mapDispatchToProps = (dispatch) => {
  return {
    onCollection: (text) => {
      dispatch(addCollection(text));
    }
  }
};

export default connect(null, mapDispatchToProps)(AddCollection);

