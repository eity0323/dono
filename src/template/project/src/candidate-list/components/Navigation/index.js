import React, {Component} from 'react';

import './index.less';

import {
	Menu
} from 'antd';

const {Item: MenuItem} = Menu;

class Navigation extends Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate() {
		return true;
	}

	render() {
		return (
			<div className="candidate-list-nav-wrap">
				<Menu
					mode="horizontal"
				>
					<MenuItem key="resume">
						<span className="candidate-list-nav-item">
							新简历（0）
						</span>
					</MenuItem>
					<MenuItem key="communicate">
						<span className="candidate-list-nav-item">
							待沟通（0）
						</span>
					</MenuItem>
					<MenuItem key="interview">
						<span className="candidate-list-nav-item">
							面试（0）
						</span>
					</MenuItem>
					<MenuItem key="employ">
						<span className="candidate-list-nav-item">
							录用（0）
						</span>
					</MenuItem>
				</Menu>
			</div>
		);
	}
}

export default Navigation;
