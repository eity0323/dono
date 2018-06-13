import React, {Component} from 'react';

import './index.less';

import {
	Dropdown,
	Button,
	Icon,
	Input
} from 'antd';

// const {Button: DropdownButton} = Dropdown;
// const {Item: MenuItem} = Menu;
const {Search} = Input;

import {
	renderSelectList,
	renderMoveList,
	renderFallList,
	renderImportResume,
	renderMoreList
} from './menu-list/menu';

class FilterBar extends Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate() {
		return true;
	}

	render() {
		return (
			<div className="candidate-list-filter-bar">
				<span className="candidate-list-filter-item">
					<Button
						type="ghost"
					>
						<Icon type="filter" /> 筛选
					</Button>
				</span>
				<span className="candidate-list-filter-item">
					<Dropdown
						overlay={renderSelectList()}
						trigger={['hover']}
					>
						<Button
							type="ghost"
						>
							全部 <Icon type="down" />
						</Button>
					</Dropdown>
				</span>
				<span className="candidate-list-filter-item">
					<Search
						style={{
							width: '300px',
							position: 'relative',
							top: '1px'
						}}
						placeholder="搜索姓名/手机/邮箱/公司/职位/标签等"
					/>
				</span>
				<div className="candidate-list-left-filter">
					<span className="candidate-list-filter-item">
						<Dropdown
							overlay={renderMoveList()}
						>
							<Button
								type="ghost"
							>
								<Icon type="swap" /> 移动到待沟通 <Icon type="down" />
							</Button>
						</Dropdown>
					</span>
					<span className="candidate-list-filter-item">
						<Dropdown
							overlay={renderFallList()}
						>
							<Button
								type="ghost"
							>
								<Icon
									type="minus-circle-o"
									style={{
										transform: "rotate(135deg)"
									}}
								/> 淘汰 <Icon type="down" />
							</Button>
						</Dropdown>
					</span>
					<span className="candidate-list-filter-item">
						<Button
							type="ghost"
						>
							@ 转发给同事
						</Button>
					</span>
					<Dropdown
						overlay={renderImportResume()}
					>
						<span className="candidate-list-filter-item">
							<Button
								type="ghost"
							>
								<Icon type="upload" /> 导入简历 <Icon type="down" />
							</Button>
						</span>
					</Dropdown>
					<span className="candidate-list-filter-item">
						<Dropdown
							overlay={renderMoreList()}
						>
							<Button
								type="ghost"
							>
								<Icon type="ellipsis" />
							</Button>
						</Dropdown>
					</span>
				</div>
			</div>
		);
	}
}

export default FilterBar;
