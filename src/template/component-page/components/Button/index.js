import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		console.log('button');
		return (
			<div>
				{this.context.btnName}
			</div>
		);
	}
}

Button.contextTypes = {
	btnName: PropTypes.string
};

export default Button;
