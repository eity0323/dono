import React from 'react';

import {
	Menu
} from 'antd';

const {Item: MenuItem} = Menu;

export const renderFallList = () => {
	return (
		<Menu>
			<MenuItem key={1}>
				<span>淘汰</span>
			</MenuItem>
			<MenuItem key={2}>
				<span>投诉放鸽子</span>
			</MenuItem>
			<MenuItem key={3}>
				<span>投诉简历造假</span>
			</MenuItem>
			<MenuItem key={4}>
				<span>录用</span>
			</MenuItem>
			<MenuItem key={5}>
				<span>已入职</span>
			</MenuItem>
		</Menu>
	);
};
