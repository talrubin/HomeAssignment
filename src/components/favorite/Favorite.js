import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addFavorite, removeFavorite, removeAllFavorites } from '../../redux/actions';
import { getFavoritsSelector } from '../../redux/selectors';
import Item from '../item/Item';
import './Favorite.css';
const Swal = require('sweetalert2')

class Favorite extends React.Component {

    removeAllFavorites = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove all!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.removeAllFavorites();
            }
        })
    }

    render() {
        const { favorites } = this.props;

        return (
            <div>
                <div className="row title">
                    <h2>Favorite Beers</h2>
                    <button className="button" type="button" onClick={this.removeAllFavorites}>Remove All</button>
                </div>

                <div className="row beers">
                    {favorites?.favorites?.map((item, index) => {
                        return (
                            <Item
                                key={index}
                                item={item}
                                showRank={true}
                                favorite={true}
                                onFavoriteChange={(item, toFavorites) => {
                                    if (toFavorites) {
                                        this.props.addFavorite(item);
                                    } else {
                                        this.props.removeFavorite(item.id);
                                    }
                                }} />
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const favorites = getFavoritsSelector(state);
    return {
        favorites
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    addFavorite,
    removeFavorite,
    removeAllFavorites
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Favorite)