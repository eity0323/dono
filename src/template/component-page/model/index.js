
export default {
	name: 'testPage',
	data: {
		name: 'lingyun',
		age: '18'
	},
	sync: {
		changeName: (state, payload) => {
			return {
				name: payload.name
			};
		}
	},
	async: {
		changeAge: (dispatch, getState, payload) => {
			setTimeout(() => {
				dispatch({
					type: 'changeName',
					payload: {
						name: payload.name
					}
				});
			}, 2000);
		}
	}
};
