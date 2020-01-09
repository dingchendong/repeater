#API负载均衡和健康检查

# repeater 模块

## 介绍

repeater 模块，该模块用以处理对一组api地址进行负载均衡和健康检查。

## 使用

```javascript
...
let repeater = require("../lib/");

let params = {
	urls: ["http://127.0.0.1:8091", "http://127.0.0.1:8092", "http://127.0.0.1:8093"],
	port: 8081
};

var httpServer = new http.Server(params.port, [
	(req) => {
		req.session = {}
	}, {
		"*": repeater(params.urls)
	}
]);
...
```

[示例代码](./examples/)