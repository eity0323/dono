const initState = {
	subNav: [{
		title: '候选人',
		id: 'hxr',
		options: {}, // 该项被点击的时候会传回该值
	}, {
		title: '面试日程',
		id: 'msrc',
		options: {}
	}],
	candidateListData: [{
		'name': 'name',
		'nickName': 'nickName',
		'celPhone': 'celPhone',
		'workYear': 'workYear',
		'educational': 'educational',
		'positionName': 'positionName',
		'lastExperience': '',
		'lastPositionName': '',
		'lastCompanyName': '',
		'deliverDays': '',
		'channelName': '',
		'interviewTime': '',
		'offer': ''
	}]
};

export default (state = initState, action) => {

	let type = action.type;

	switch (type) {
	default:
		return state;
	}

};
