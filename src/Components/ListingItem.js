import React, { Component } from 'react';
import { Item, Icon } from 'semantic-ui-react'
import '../Styles/ListingItem.css';

class ListingItem extends Component {
	render() {
		return (
            <Item className="listing_item">
              <Item.Image src={this.props.listing.primary_photo_css_url_small} />
        
              <Item.Content>
                <Item.Header as='a'>{this.props.listing.name}</Item.Header>
                <Item.Meta>
                  <span >{this.props.listing.address}</span>
                </Item.Meta>
                <Item.Extra className="listing_item_extras">
                    <div>
                        <span><Icon name='eye' />{this.props.listing.views_count} Views</span> <br />
                        <span><Icon name='users' />{this.props.listing.capacity} Capacity</span> <br />
                        <span><Icon name='building' />{this.props.listing.square_footage} Sq Ft</span>
                    </div>
                    <div>
                        <span><Icon name='dollar' />{this.props.listing.daily_price}/ Day</span> <br />
                        <span><Icon name='dollar' />{this.props.listing.hourly_price}/ Hour</span>
                    </div>
                </Item.Extra>
              </Item.Content>
            </Item>
		);
	}
}

export default ListingItem;
