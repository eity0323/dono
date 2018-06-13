import React from 'react';

import {
	Menu
} from 'antd';

const {Item: MenuItem} = Menu;

export const renderMoveList = () => {
	return (
		<Menu>
			<MenuItem key={1}>
				<span>新简历</span>
			</MenuItem>
			<MenuItem key={2}>
				<span>待沟通</span>
			</MenuItem>
			<MenuItem key={3}>
				<span>面试</span>
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
