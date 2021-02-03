import React, { Component } from 'react';
import Modal from '../modal/Modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeRank } from '../../redux/actions';
import './Item.css';


class Item extends Component {

    constructor(props) {
        super(props);

        //  Handle modal
        this.state = {
            show: false,
            rank: this.props.item.rank || "5"
        };
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    onFavoriteChange = () => {
        this.props.onFavoriteChange(this.props.item, !this.props.favorite);
    }

    render() {
        return (
            <div id={this.props.item.id} className="item">
                <i onClick={this.onFavoriteChange} className={"favorite-beer " + (this.props.favorite ? 'fa fa-star' : 'far fa-star')}></i>
                <img className="beer-image" src={this.props.item.image_url} alt="" onClick={this.showModal} ></img>
                <p onClick={this.showModal}>{this.props.item.name}</p>
                <select name="rank" className={this.props.showRank ? "showRank" : "hideRank"}
                    value={this.state.rank}
                    onChange={e => {
                        const payload = {
                            rank: e.target.value,
                            id: this.props.item.id
                        }
                        this.props.changeRank(payload);
                        this.setState({ rank: e.target.value })
                    }}>
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                </select>
                <Modal show={this.state.show} handleClose={this.hideModal} item={this.props.item} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    changeRank
}, dispatch)

export default connect(null, mapDispatchToProps)(Item);