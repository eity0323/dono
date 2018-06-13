import React from 'react';

import {
	Menu
} from 'antd';

const {Item: MenuItem} = Menu;

export const renderSelectList = () => {
	return (
		<Menu>
			<MenuItem key={1}>
				<span>全部</span>
			</MenuItem>
			<MenuItem key={2}>
				<span>未查看</span>
			</MenuItem>
		</Menu>
	);
};
