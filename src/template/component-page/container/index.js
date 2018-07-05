import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {connect} from "../../common/stores";

import List from '../components/List';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			test: '我是aaa'
		};
		this.handleClick = this.handleClick.bind(this);
	}

	getChildContext() {
		return {
			btnName: this.state.test
		}
	}

	shouldComponentUpdate() {
		return true;
	}

	componentDidMount() {
		console.log(this);
		setTimeout(() => {
			this.setState({
				test: '我想要'
			});
		}, 3000)
	}

	handleClick() {
		this.props.dispatch({
			type: 'testPage/changeName',
			payload: {
				name: 'iii'
			}
		});
	}

	render() {
		return (
			<div>
				<div>
					{this.props.testPage.name}
				</div>
				<List
					test={this.state.test}
				/>
			</div>
		);
	}
}

Home.childContextTypes = {
	btnName: PropTypes.string
};

export default connect(Home);
