import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addFavorite, getBeersRequest, removeFavorite } from '../../redux/actions';
import { getBeersSelector, getFavoritsSelector } from '../../redux/selectors';
import Item from '../item/Item';
import './Browse.css';
import * as config from '../../config/config';

class Browse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            pageNumber: config.FIRST_PAGE
        };
    }

    setSearchValue = (newValue) => {
        this.setState({
            searchValue: newValue
        });
    }

    searchBeers = () => {
        this.setState({
            pageNumber: config.FIRST_PAGE
        });
        this.loadBeers(config.FIRST_PAGE);
    }

    findFavoriteBeer = (item) => {
        return !!this.props.favorites.favorites.find(e => e.id === item.id);
    }

    componentDidMount() {
        this.loadBeers();
    }

    nextPage = () => {
        const newPageValue = this.state.pageNumber + 1;
        this.setState({
            pageNumber: newPageValue
        });

        this.loadBeers(newPageValue);
    }

    previousPage = () => {
        if (this.state.pageNumber === 1) return;

        const newPageValue = this.state.pageNumber - 1;
        this.setState({
            pageNumber: newPageValue
        });

        this.loadBeers(newPageValue);
    }

    loadBeers = (pageNumber = this.state.pageNumber, searchValue = this.state.searchValue) => {
        const payload = {
            pageNumber,
            searchValue
        }

        this.props.getBeersRequest(payload);
    }

    render() {
        const { beers } = this.props;
        const { searchValue } = this.state;

        return (
            <div>
                <div className="row title">
                    <h2>Food Pairing</h2>
                    <input
                        className="textbox"
                        aria-label="Search by food"
                        value={searchValue}
                        onChange={e => this.setSearchValue(e.target.value)}
                    />
                    <button className="button" type="button" onClick={this.searchBeers}>Search</button>
                </div>

                {
                    beers?.errorMessage &&
                    <div className="row title">
                        <h2>{beers?.errorMessage}</h2>
                    </div>
                }

                <div className="row beers">
                    {beers?.beers?.map((item, index) => {
                        return (
                            <Item
                                key={index}
                                item={item}
                                showRank={false}
                                favorite={this.findFavoriteBeer(item)}
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

                <div className="row pages">
                    <button
                        className="button"
                        type="button"
                        onClick={this.previousPage}
                        disabled={this.state.pageNumber === 1}
                    >
                        Previous Page
                    </button>

                    <button
                        className="button"
                        type="button"
                        onClick={this.nextPage}
                        disabled={this.state.pageNumber === config.MAX_PAGES}
                    >
                        Next Page
                        </button>
                </div>

            </div >
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const beers = getBeersSelector(state);
    const favorites = getFavoritsSelector(state);
    return {
        beers,
        favorites
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getBeersRequest,
    addFavorite,
    removeFavorite
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Browse)