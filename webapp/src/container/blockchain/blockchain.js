import React, { Component } from 'react';

class Blockchain extends Component {
	constructor(props){
		super(props);

		this.renderBlockchain = this.renderBlockchain.bind(this);
	}
	
	renderBlockchain() {
		
		return;
	}

    render() {
		return (
			<div> 
				{ this.renderBlockchain() }
			</div>
		)
	}
}

export default Blockchain;