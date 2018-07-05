import React from 'react';

import Button from '../Button';


class List extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		console.log('list');
		return (
			<div>
				<Button
					test={this.props.test}
				/>
			</div>
		);
	}
}

export default List;
