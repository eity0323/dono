import React, {Component} from 'react';
import './index.less';

import Header from '../Header';
import {connect} from "../../store";
import {updateGlobal} from "../../store/action";


import {
	fetchIsHuntingGray,
	initNavList
} from '../../store/action';

class Layout extends Component {
	constructor(props) {
		super(props);

		this.handleNavClick = this.handleNavClick.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(fetchIsHuntingGray())
			.then(() => {
			});

		this.props.dispatch(initNavList());
	}

	handleNavClick(nav) {

		return () => {
			this.props.dispatch(updateGlobal({
				header: {
					...this.props.global.header,
					activeNav: nav.id
				}
			}));

			if(nav.href) {
				if(nav.target === '_blank') {
					window.open(nav.href);
				}
				else {
					window.location.href = nav.href;
				}
			}
		};
	}

	render() {
		const {children, global} = this.props;

		return (
			<div className="layout-wrap">
				<div className="layout-header-wrap">
					<Header
						navData={global.header.navList}
						navActive={global.header.activeNav}
						handleNavClick={this.handleNavClick}
						userMenu={global.header.userMenu}
						userInfo={global.userInfo}
						companyInfo={global.companyInfo}
						options={{
							FE_ebase: global.FE_ebase
						}}
					/>
				</div>
				<div className="layout-content-wrap">
					{children}
				</div>
			</div>
		);
	}
}

export default connect(Layout);

