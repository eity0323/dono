import React, {Component} from 'react';

class BaseComponent extends Component {

	shouldComponentUpdate() {
		return true;
	}

	getUserAvatar({portrait, name, ...othersProps}) {
		if(portrait) {
			let src = '';

			if(/^https:\\/.test(portrait)) {
				src = portrait;
			}
			else {
				src = `https://www.lgstatic.com/thumbnail_50x50/yun/${portrait.replace(/^[/]/, '')}`;
			}

			return (
				<img
					{...othersProps}
					src={src}
				/>
			);
		}
		else {
			return this.splitName(name, 2);
		}
	}

	splitName(name, len) {
		len = len || 2;

		if(!name)
			return '';

		const reg = /[\u4E00-\u9FA5\uF900-\uFA2D]+/g;

		name = name + '';

		const regResult = name.match(reg);

		if(regResult && regResult.length > 0) {
			let result = regResult[regResult.length - 1];

			let startIndex = result.lenght - len < 0 ? 0 : result.length - len;
			return result.substr(startIndex, len);
		}
		else {
			return name.substr(0, 2);
		}
	}

}


export default BaseComponent;
