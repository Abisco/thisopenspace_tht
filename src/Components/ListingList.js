import React, { Component } from 'react';
import { Container, Item, Loader, Header } from 'semantic-ui-react'
import axios from 'axios';
import ListingItem from './ListingItem';

class ListingList extends Component {
    constructor(props) {
        super(props);

        this.grabListings = this.grabListings.bind(this);
        this.trackScrolling = this.trackScrolling.bind(this);
        this.isDoneListings = this.isDoneListings.bind(this);
        this.isGrabbing = this.isGrabbing.bind(this);
        this.errorGrabbing = this.errorGrabbing.bind(this);
        
        this.state = {
            listings_data: [],
            listings_grabbed: 0,
            page: 1,
            total_available: 1,
            grabbing: true,
            error_grabbing: false
        }
    }

    componentWillMount() {
        this.grabListings();
    }

    grabListings() {
        var self = this;
        axios.get('https://thisopenspace.com/lhl-test?page=' + this.state.page)
        .then(function(response) {
            self.setState({
                listings_data: self.state.listings_data.concat(response.data.data),
                page: self.state.page + 1,
                total_available: response.data.total,
                listings_grabbed: self.state.listings_grabbed + response.data.page_size,
                grabbing: false
            }, document.addEventListener('scroll', self.trackScrolling))
        })
        .catch(function(error) {
            console.log(error)
            self.setState({
                error_grabbing: true,
                grabbing: false,
                total_available: 0
            })
        })
    }
    
    trackScrolling() {
        const listings_list = document.getElementById('listings_list');
        if (this.isNearBottom(listings_list) && this.state.listings_grabbed < this.state.total_available && ! this.state.grabbing) {
            this.setState({
                grabbing: true
            })
            this.grabListings();
        }
    }

    //Helper function to check when 70% through the page
    isNearBottom(el) {
        if (el) {
            return (el.getBoundingClientRect().bottom * 0.7) <= window.innerHeight;
        }
    }

    //Present loading icon when grabbing more listings
    isGrabbing() {
        if (this.state.grabbing) return <Loader active inline='centered' />
    }

    //To ensure user has feedback there are no more listings
    isDoneListings() {
        if (this.state.listings_grabbed === this.state.total_available && ! this.state.error_grabbing) {
            return <Header as='h3' textAlign='center'>There are no more Listings</Header>
        }
    }

    //In case the internet cuts or the API is down, we want to give some feedback to the user
    errorGrabbing() {
        if (this.state.error_grabbing) {
            return <Header as='h3' textAlign='center'>There was an error in grabbing the Listings. Please try again later.</Header>
        }
    }

	render() {
		return (
            <Container>
                <Item.Group divided id="listings_list">
                    {this.state.listings_data.map((listing) => {
                        return <ListingItem listing={listing} key={listing.id}/>
                    })}
                </Item.Group>
                {this.isGrabbing()}
                {this.isDoneListings()}
                {this.errorGrabbing()}
            </Container>
		);
	}
}

export default ListingList;
