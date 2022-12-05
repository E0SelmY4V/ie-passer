const fs = require('fs');
const { transform } = require('@babel/core/lib/index');
const { spawn } = require('child_process');
const { join } = require('path');

function Conf (n) {
	for (const i in n) this[i] = n[i];
}
Conf.prototype = iePasser.defConf = {
	opts: {
		"presets": ["@babel/preset-env"],
	},
	out: 'out',
	version: '5',
};

function iePasser(path, test, _conf = null) {
	const conf = new Conf(_conf);
	const outPath = join(__dirname, 'res', `${conf.out}.hta`);
	new Promise((res, rej) => fs.writeFile(
		outPath,
		`<meta http-equiv="X-UA-Compatible" content="IE=${conf.version}">`,
		(err) => err ? rej(err) : res()
	)).then(() => new Promise((res, rej) => fs
		.createReadStream('res/frame.html')
		.pipe(fs.createWriteStream(outPath))
		.on('close', res)
		.on('error', rej)
	)).then(() => new Promise((res, rej) => {
		let code = '';
		for (const i in test) code += `"i":${test[i].toString()},`;
		transform(`var k={${code}}`, conf.opts, (err, result) => err ? rej(err) : res(result));
	})).then(result => new Promise((res, rej) =>
		fs.writeFile(
			outPath,
			`<script type="text/javascript">
				(${(function (path) {
				var a = document.createElement('script');
				a.type = 'text/javascript';
				a.src = path;
				document.appendChild(a);
			}).toString()})(${JSON.stringify(path)})
			</script>
			<pre style="display: none;">
				(function(){
					${result.code}
					return k
				})()
			</pre>`,
			{ flag: 'a' },
			(err) => err ? rej(err) : res()
		)
	)).then(() =>
		spawn('mshta', [outPath])
	);
}

this['default'] = this.iePasser = iePasser;