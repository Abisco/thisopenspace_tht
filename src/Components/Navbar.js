import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react'

class Navbar extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
        }
    }

	render() {
		return (
            <Segment inverted>
                <Menu inverted secondary>
                    <Menu.Item name="Abbass-Ali's thisopenspace Take Home Test" />
                </Menu>
            </Segment>
		);
	}
}

export default Navbar;
