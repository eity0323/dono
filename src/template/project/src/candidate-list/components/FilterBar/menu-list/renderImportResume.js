import React from 'react';

import {
	Menu
} from 'antd';

const {Item: MenuItem} = Menu;

export const renderImportResume = () => {
	return (
		<Menu>
			<MenuItem key={1}>
				<span>从本地上传</span>
			</MenuItem>
			<MenuItem key={2}>
				<span>从邮箱收取</span>
			</MenuItem>
		</Menu>
	);
};
