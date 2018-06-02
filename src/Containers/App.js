import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import ListingList from '../Components/ListingList';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Navbar />
				<ListingList />
			</div>
		);
	}
}

export default App;
