import React from 'react';

import './index.less';

import BaseComponent from '../../../BaseComponent';

import {
	Table
} from 'antd';

class CandidateTable extends BaseComponent {
	constructor(props) {
		super(props);

		this.getNewResumeColumns = this.getNewResumeColumns.bind(this);
	}

	getNewResumeColumns() {
		const newResume = [{
			title: '候选人',
			dataIndex: 'name',
			key: 'name',
			render: (text, record) => {
				return (
					<span>
						<span className="candidate-content-user-avatar">
							{this.getUserAvatar({
								portrait: record.portrait,
								name: record.name
							})}
						</span>
					</span>
				);
			}
		}, {
			title: '工作年限',
			dataIndex: 'workYear',
			key: 'workYear',
			render: (text, record) => {
				if(record.workYear === 0) {
					return '应届';
				}
				else {
					return record.workYear;
				}
			}
		}, {
			title: '学历',
			dataIndex: 'educational',
			key: 'educational'
		}, {
			title: '应聘职位',
			dataIndex: 'positionName',
			key: 'positionName'
		}, {
			title: '最近经历',
			dataIndex: 'lastExperience',
			key: 'lastExperience'
		}, {
			title: '应聘时间',
			dataIndex: 'interviewTime',
			key: 'interviewTime'
		}, {
			title: '渠道',
			dataIndex: 'channelName',
			key: 'channelName'
		}];

		return newResume;
	}

	render() {
		const {candidateListData} = this.props;

		return (
			<div className="candidate-content-table-wrap">
				<Table
					columns={this.getNewResumeColumns()}
					dataSource={candidateListData}
					rowSelection={{
						type: 'checkbox'
					}}
				/>
			</div>
		);
	}
}

export default CandidateTable;
