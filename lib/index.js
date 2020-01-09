const http = require('http');

let checkUrlsWorker = (urls, r) => {

	let _urls = [];

	urls.forEach(e => {

		let _e;
		if (e.length != 0) {
			// _e = e.split("http://")[1];  // http://127.0.0.1:8091
			_e = e.split("http://")[1].split(":")[0];
		}

		let rs = process.runSync('ping', [_e], {
			"timeout": 100 // 单位为 ms    
		}); //	0 能ping通  68 ping不通

		if (rs == 0) {
			_urls.push(e);
		}

		console.warn(e, rs);
	})

	console.warn(_urls);

	r.load(_urls);

	// console.warn("checkUrlsWorker is running", new Date());
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