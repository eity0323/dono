


import {
	UPDATE_GLOBAL
} from './action';
/*
* {
			title: '考勤',
			isNew: false,
			id: 'attendance'
		}, {
			title: '薪酬',
			isNew: false,
			id: 'salary'
		}, {
			title: '工资条',
			isNew: false,
			id: 'salaryBill'
		}, {
			title: '审批',
			isNew: false,
			id: 'examination'
		}, {
			title: '统计',
			isNew: false,
			id: 'statistics'
		}
* */


window.pageData = {
	FE_ebase: "$!{FE_ebase}",
	whiteStatus: "$!{whiteStatus}",
	userInfo: {
		shortName: "$!{shortName}",
		fullName: "$fullName",
		companyAuthCode: "$!{companyAuthCode}",
		isYunUpgradeVersion: "$!{staffInfo.isYunUpgradeVersion}",
		isMyCompany: "$isMyCompany",
		isStaffPermission: "$isStaffPermission",
		hrAuthStatusCode: "$hrAuthStatusCode",
		isManager: "$isManager",
		portrait: "$portrait",
		staffName: "$staffName",
		permissions: "$permissions",
		isPlus: "$isPlus",
		isCompanySetting: "$isCompanySetting",
		isCompanyStaff: "$isCompanyStaff",
		pop_report:"$!{pop_report}",
		hrIsAuthState: "$hrIsAuthState",
		getUserTitle: "$!{userInfoTool.getUserTitle()}"
	},
	goodsContract: "$goodsContract",
	navStatus: {
		offer: "$navOffer",
		staff: "$navStaff",
		attendance: "$navAttendance",
		sallary: "$navSallary",
		payroll: "$navPayroll",
		approval: "$navApproval",
		statistics: "$navStatistics"
	}
}



export const initState = {
	header: {
		navList: [{
			title: '首页',
			isNew: false,
			id: 'index',
			href: '/',
			target: '_blank'
		}, {
			title: '找人才',
			isNew: false,
			id: 'findPeople'
		}, {
			title: '猎头人才',
			isNew: true,
			id: 'huntPeople'
		}, {
			title: '招聘',
			isNew: false,
			id: 'recruit'
		}, {
			title: '录用',
			isNew: false,
			id: 'employ'
		}, {
			title: '员工',
			isNew: false,
			id: 'employee'
		}],
		activeNav: 'recruit',
		userMenu: {
			menuList: [{
				title: '公司主页',
				href: '/'
			}]
		}
	},
	userInfo: {
		// 员工id
		staffId: '1111',
		// 据猜测是否是公司老板
		isMyCompany: true
	},
	companyInfo: {
		// 公司简称
		shortName: '公司简称',
		// 公司全称
		fullName: '公司全称',
		// 公司的一个状态码
		// 0 - 未认证、1 - 邮箱待激活、2 - 待认证、3 - 认证拒绝、4 - 认证通过
		companyAuthCode: 2
	},
	navStatus: {
		offer: false,
		staff: false,
		attendance: false,
		sallary: false,
		payroll: false,
		approval: false,
		statistics: false
	},
	FE_ebase: window.pageData.FE_ebase
};


export default (state = initState, action) => {

	switch(action.type) {

	case UPDATE_GLOBAL:
		return {
			...state,
			...action.data
		};
	default:
		return state;

	}

};
