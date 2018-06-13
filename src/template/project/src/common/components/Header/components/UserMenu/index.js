import React, {Component} from 'react';

import './index.less';

import {
	Avatar,
	Dropdown,
	Menu,
	Icon
} from 'antd';

const {Item: MenuItem} = Menu;

class UserMenu extends Component {
	constructor(props) {
		super(props);

		this.renderMenu = this.renderMenu.bind(this);
	}

	renderMenu() {
		const {userMenu} = this.props;

		return (
			<Menu
				theme="dark"
				className="header-user-menu-list"
			>
				<MenuItem key="lg">
					<span
						className="header-user-menu-item"
					>
						拉勾测试公司
					</span>
				</MenuItem>
				<Menu.Divider />
				{userMenu.menuList.map((item, index) => {
					return (
						<MenuItem key={index + ''}>
							<span
								className="header-user-menu-item"
								onClick={() => {
									window.location.href = item.href;
								}}
							>
								{item.title}
							</span>
						</MenuItem>
					);
				})}
				<Menu.Divider />
				<MenuItem key="exit">
					<span
						className="header-user-menu-item"
					>
						退出
					</span>
				</MenuItem>
			</Menu>
		);
	}

	render() {
		return (
			<div className="header-user-menu">
				<Dropdown
					trigger={['click']}
					overlay={this.renderMenu()}
				>
					<div className="header-user-name-avatar">
						<span className="header-user-avatar">
							<Avatar
								size="small"
								style={{
									backgroundColor: '#fe6633'
								}}
							>
								18
							</Avatar>
						</span>
						<span className="header-user-name">
							18626876109 <Icon type="caret-down" />
						</span>
					</div>
				</Dropdown>
			</div>
		);
	}
}

export default UserMenu;
