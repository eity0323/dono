module.exports = `
	<script>

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
	// 全局token变量，防CSRF，防重复提交
	window.X_Anti_Forge_Code = '$!{submitCode}';
	window.X_Anti_Forge_Token = '$!{submitToken}';
</script>

`;
