
import React from 'react';
import {render} from 'react-dom';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect as reduxConnect} from 'react-redux';
import reduxThunk from 'redux-thunk';

import globalReduers, {initState} from './reducers';


const start = ({root, component: ContainerComponent, reducers}) => {

	const rootReducers = combineReducers({
		global: globalReduers,
		page: reducers
	});
	const store = createStore(rootReducers, {
		global: initState
	}, applyMiddleware(reduxThunk));

	const StoreContainer = () => {
		return (
			<Provider store={store}>
				<ContainerComponent />
			</Provider>
		);
	};

	if(root) {
		render(
			<StoreContainer />,
			root
		);
	}
	else {
		return StoreContainer;
	}

};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => {
	return {dispatch};
};

const connect = (component) => {
	return reduxConnect(mapStateToProps, mapDispatchToProps)(component);
};

export {
	start,
	connect
};
