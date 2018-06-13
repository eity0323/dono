import fetchs from "../javascript/fetch";


export const UPDATE_GLOBAL = 'UPDATE';



export const updateGlobal = (obj) => {

	return {
		type: UPDATE_GLOBAL,
		data: obj
	};
};


export const fetchIsHuntingGray = () => {

	return () => {
		return fetchs('/api/onlinehunting/isHuntingGray.json', {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'X-Anit-Forge-Code': window.X_Anti_Forge_Code || '',
				'X-Anit-Forge-Token': window.X_Anti_Forge_Token || ''
			}
		});
	};

};


export const initNavList = () => {

	return () => {
		const pageData = window.pageData;

		let headerData = [{
			title: '首页',
			href: pageData.userInfo.staffId ? 'https://yun.lagou.com/home/index.htm' : `${pageData.FE_ebase}/dashboard/index.htm`,
			id: 'index',
		}, {
			title: '找人才',
			href: `${pageData.FE_ebase}/search/index.htm`,
			id: 'findPeople'
		}, {
			title: '猎头人才',
			href: `${pageData.FE_ebase}/v2/`,
			id: 'huntPeople'
		}, {
			title: '招聘',
			href: `${pageData.FE_ebase}`,
			id: 'recruit'
		}];

		if(pageData.navStatus.offer) {
			let offerItem = {
				title: '录用'
			};
			headerData.push(offerItem);
		}

	};

};
