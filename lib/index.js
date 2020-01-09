const http = require('http');

let checkUrlsWorker = (urls, r) => {

	let req = new http.Request;

	let _urls = [];

	urls.forEach(e => {

		let _e;
		if (e.length != 0) {
			_e = e.split("http://")[1];
		}

		let rs = process.runSync('ping', [_e], {
			"timeout": 100 // 单位为 ms    
		}); //	0 能ping通  68 ping不通

		// var rs = http.post(e + '/v1/chain/get_info').json();

		if (rs == 0) {
			_urls.push(e);
		}

	})

	r.load(_urls);

	console.warn("checkUrlsWorker is running", new Date());
}

let runServer = (port, r) => {

	var httpServer = new http.Server(port, [
		(req) => {
			req.session = {}
		}, {
			"*": r
		}
	]);

	httpServer.enableCrossOrigin();

	let version = process.version.split("-")[0].split('.')[1];
	if (Number(version) < 29) {
		httpServer.run(() => {});
	} else {
		httpServer.start();
	}
}

module.exports = params => {

	let urls, port;

	urls = params.urls;
	port = params.port;

	let r = new http.Repeater(urls);

	setInterval(() => {
		checkUrlsWorker(urls, r)
	}, 1000 * 10);

	runServer(port, r);

}