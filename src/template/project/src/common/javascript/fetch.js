import 'whatwg-fetch';


const requestCache = {};


export default (url, options = {}) => {

	if((url in requestCache) && options.cache === true) {
		return new Promise((resolve) => {
			resolve(requestCache[url]);
		});
	}

	return window.fetch(url, options)
		.then((res) => {
			if(options.cache) {
				requestCache[url] = res;
			}
			return res;
		})
		.catch((err) => {
			return err;
		});

};
