import React, {Component} from 'react';

import './index.less';

import {Badge} from 'antd';

import HeaderNotice from '../Notice';
import UserMenu from '../UserMenu';

class AdditionIconsBox extends Component {
	constructor(props) {
		super(props);

		this.handlePrintClick = this.handlePrintClick.bind(this);
	}

	shouldComponentUpdate() {
		return true;
	}

	handlePrintClick() {
		window.location.href = '/';
	}

	render() {
		const {
			userMenu
		} = this.props;
		return (
			<div className="header-additional-box">
				<span className="header-print-icon-wrap">
					<Badge dot>
						<span
							className="header-print-icon"
							onClick={this.handlePrintClick}
						/>
					</Badge>
				</span>
				<a
					className="header-recruit-solution"
					href="/"
				>
					招聘解决方案
				</a>
				<HeaderNotice />
				<UserMenu
					userMenu={userMenu}
				/>
			</div>
		);
	}
}

export default AdditionIconsBox;
