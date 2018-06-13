import React, {Component} from 'react';

import './index.less';

import {
	Icon,
	Popover
} from 'antd';

class HeaderNotice extends Component {
	constructor(props) {
		super(props);

		this.renderPopContent = this.renderPopContent.bind(this);
		this.renderTitle = this.renderTitle.bind(this);
	}

	shouldComponentUpdate() {
		return true;
	}

	renderPopContent() {
		return (
			<div className="header-notice-pop-content">
				我是一个弹窗
			</div>
		);
	}

	renderTitle() {
		return (
			<div className="header-notice-pop-title">
				<span
					className="header-notice-pop-title-msg-word"
				>
					消息
				</span>
				<span
					className="header-notice-pop-title-markread"
				>
					标记全部已读
				</span>
			</div>
		);
	}

	render() {
		return (
			<div className="header-notice-box">
				<Popover
					placement="bottom"
					content={this.renderPopContent()}
					arrowPointAtCenter
					trigger='click'
					title={this.renderTitle()}
				>
					<span className="header-notice-icon">
						<Icon type="bell" />
					</span>
				</Popover>
			</div>
		);
	}
}

export default HeaderNotice;
