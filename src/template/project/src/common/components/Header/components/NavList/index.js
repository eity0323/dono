import React, {Component} from 'react';

import "./index.less";
import classname from "classnames";

import newImg from '../../../../images/new@2x.png';

class NavList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const navList = this.props.data;
		const activeNav = this.props.activeNav;

		return (
			<div className="header-nav">
				{navList.map((item) => {
					const classNames = classname({
						"header-nav-item": true,
						"active": item.id === activeNav
					});
					return (
						<div
							className={classNames}
							key={item.id}
							onClick={this.props.handleNavClick(item)}
						>
							<span className="header-nav-title">{item.title}</span>
							{
								item.isNew ?
									<span className="header-nav-new-icon">
										<img src={newImg} />
									</span> :
									null
							}

						</div>
					);
				})}
			</div>
		);
	}
}

export default NavList;
