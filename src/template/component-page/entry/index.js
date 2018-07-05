import React from 'react';

import Home from '../container';

import {start} from '../../common/stores';

import model from '../model';

start({
	root: document.getElementById('root'),
	component: <Home />,
	model: [model]
});
