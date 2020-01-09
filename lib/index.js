const http = require('http');

let checkUrlsWorker = (urls, r) => {

	let _urls = [];

	urls.forEach(e => {

		let _e;
		if (e.length != 0) {
			_e = e.split("http://")[1];
		}

		let rs = process.runSync('ping', [_e], {
			"timeout": 100 // 单位为 ms    
		}); //	0 能ping通  68 ping不通

		if (rs == 0) {
			_urls.push(e);
		}

	})

	r.load(_urls);

}

module.exports = params => {

	let urls;

	urls = params;

	let r = new http.Repeater(urls);

	setInterval(() => {
		checkUrlsWorker(urls, r)
	}, 1000 * 10);

	return r;
}