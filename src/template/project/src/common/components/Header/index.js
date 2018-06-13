/*
*
* props: {
*   navData: [{
*       title: '首页',
*       isNew: false,
*       visible: true,
*       id: 'index',
*       href: '/',
*       target: '_blank'
*   }],
*   navActive: 'index',
*   handleNavClick: () => {},
*   userMenu: {
*       menuList: []
*   },
*   userInfo: {
*
*   },
*   companyInfo: {},
*   options: {
*       FE_ebase: ''
*   }
* }
*
* */

import React, {Component} from 'react';

import './index.less';

import {Icon} from 'antd';

import NavList from './components/NavList';
import AdditionIcon from './components/AdditionIcons';


class Header extends Component {
	constructor(props) {
		super(props);

		this.getCompanyName = this.getCompanyName.bind(this);
		this.renderStatus = this.renderStatus.bind(this);
	}

	shouldComponentUpdate() {
		return true;
	}

	getCompanyName() {
		const {
			userInfo,
			companyInfo
		} = this.props;

		if(userInfo.staffId || companyInfo === 4) {
			return (
				<a
					href='https://easy.lagou.com/company/to_lagou_company_home_page.htm'
					className="header-user-companyname-a"
				>
					{companyInfo.shortName ? companyInfo.shortName : companyInfo.fullName}
				</a>
			);
		}
		else {
			return companyInfo.shortName ? companyInfo.shortName : companyInfo.fullName;
		}
	}

	renderStatus() {
		const {
			companyInfo,
			userInfo,
			options
		} = this.props;

		const codeTxtMap = {
			0: '未认证',
			1: '邮箱待激活',
			2: '待认证',
			3: '认证拒绝'
		};

		let isShow = companyInfo.companyAuthCode
			&& companyInfo.companyAuthCode !== 4
			&& userInfo.isMyCompany
			&& userInfo.staffId;

		if(isShow) {
			return (
				<span className="header-company-status">
					<a
						href={`${options.FE_ebase}/bstatus/auth/index.htm`}
						target="_blank"
					>
						{codeTxtMap[companyInfo.companyAuthCode]}
					</a>
				</span>
			);
		}
	}

	render() {
		const {
			navData,
			navActive,
			userMenu
		} = this.props;

		return (
			<div className="header-box">
				<div className="header-user-company-name">
					<span>
						We
					</span>
					<span className="header-user-heart">
						<Icon type="heart" />
					</span>
					<span>
						{this.getCompanyName()}
					</span>
					{this.renderStatus()}
				</div>
				<NavList
					data={navData}
					activeNav={navActive}
					handleNavClick={this.props.handleNavClick}
				/>
				<AdditionIcon
					userMenu={userMenu}
				/>
			</div>
		);
	}
}

export default Header;
