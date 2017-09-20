import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Collection from './Collection';

class CollectionList extends Component {
    // static propTypes = {
    //     collections: PropTypes.array.isRequired,

    // }

    render() {
        let collection = (
            this.props.collections.map((item) => (
                <Collection
                    key={item.id}
                    id={item.id}
                    text={item.collectionName}
                />
            ))
        )

        return (
            <ul className="writer-collections-lists">
                { collection }
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        collections: state.writer.article
    };
}


export default connect(mapStateToProps)(CollectionList);

