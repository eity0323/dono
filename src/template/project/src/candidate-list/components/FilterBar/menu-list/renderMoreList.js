import React from 'react';

import {
	Menu
} from 'antd';

const {Item: MenuItem} = Menu;

export const renderMoreList = () => {
	return (
		<Menu>
			<MenuItem key={1}>
				<span>推荐到职位</span>
			</MenuItem>
			<MenuItem key={2}>
				<span>背调订单</span>
			</MenuItem>
			<MenuItem key={3}>
				<span>添加候选人</span>
			</MenuItem>
			<MenuItem key={4}>
				<span>清理候选人</span>
			</MenuItem>
		</Menu>
	);
};
