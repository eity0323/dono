import React from 'react';

import './index.less';
import {connect} from '../../common/store';

import Layout from '../../common/components/Layout';
import BaseComponent from '../../BaseComponent';

import SubNav from '../../common/components/SubNav';

import Navigation from '../components/Navigation';
import FilterBar from '../components/FilterBar';
import CandidateTable from '../components/CandidateTable';

class CandidateList extends BaseComponent {
	constructor(props) {
		super(props);

		this.handleItemClick = this.handleItemClick.bind(this);
	}

	handleItemClick(options, e) {
		alert(options);
		alert(e);
	}

	render() {
		const {page} = this.props;
		const subNavData = page.subNav;

		return (
			<Layout>
				<SubNav
					data={subNavData}
					onItemClick={this.handleItemClick}
					defaultSelectId='msrc'
				/>
				<div className="candidate-list-page-wrap">
					<div className="candidate-list-page-content">
						<Navigation
							{...page}
						/>
						<FilterBar />
						<CandidateTable
							{...page}
						/>
					</div>
				</div>
			</Layout>
		);
	}
}

export default connect(CandidateList);

