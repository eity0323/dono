import React, {Component} from 'react';

import './index.less';

import {
	Menu
} from 'antd';

const {Item: MenuItem} = Menu;
/*
*
* props = {
*   data: [{
*       title: '标题',
*       // 此item唯一标识，将作为判断此项是否选中的字段
*       id: 'page1',
*       // options为点击时作为回调参数的数据
*       options: {
*           xxx: xxx
*       }
*   }],
*   onItemClick: function(options, e, currentComponent) {
*       点击每个item的回调，opitons对应props.data的每个options
*   },
*   // 被选中而高亮的项目id，如果有此值，
*   // 表示此组件为受控组件，需要开发者自行编写切换函数
*   selectedId: 'page1',
*   // 根据id判断默认选中的项目
*   defaultSelectId: 'page1'
* };
*
* */


class SubNav extends Component {
	constructor(props) {
		super(props);

		this.handleClickItem = this.handleClickItem.bind(this);
	}

	handleClickItem(options) {
		return ({domEvent, item}) => {
			this.props.onItemClick(options, domEvent, item);
		};
	}

	render() {
		const {props} = this;
		const {
			data,
			selectedId,
			defaultSelectId
		} = props;

		let menuProps = {};

		if('selectedId' in props) {
			menuProps['selectedKeys'] = [selectedId];
		}

		return (
			<div className="body-sub-nav-box">
				<Menu
					mode="horizontal"
					className="sub-nav-menu"
					defaultSelectedKeys={[defaultSelectId]}
					{...menuProps}
				>
					{data.map((item, index) => {
						let key = item.id ? item.id : index;

						return (
							<MenuItem
								key={key + ''}
								onClick={this.handleClickItem(item.options)}
							>
								<span className="body-sub-nav-item-title">
									{item.title}
								</span>
							</MenuItem>
						);
					})}
				</Menu>
			</div>
		);
	}
}

export default SubNav;
