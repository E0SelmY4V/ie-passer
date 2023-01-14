const fs = require('fs');
const { transform } = require('@babel/core/lib/index');
const { spawn } = require('child_process');
const { join } = require('path');
const { getInnerCode } = require('func2code');

function Conf(n) {
	for (const i in n) this[i] = n[i];
}
Conf.prototype = iePasser.defConf = {
	opts: {
		"presets": ["@babel/preset-env"],
	},
	out: 'out',
	version: '5',
};

function iePasser(_path, _test, _conf = null) {
	const path = Array.isArray(_path) ? _path : [_path];
	const test = typeof _test === 'object' ? _test : { test: _test };
	const conf = new Conf(_conf);
	const outPath = join(__dirname, 'res', `${conf.out}.hta`);
	new Promise((res, rej) => fs.writeFile(
		outPath,
		`<meta http-equiv="X-UA-Compatible" content="IE=${conf.version}">`,
		(err) => err ? rej(err) : res()
	)).then(() => new Promise((res, rej) => fs
		.createReadStream(join(__dirname, 'res/frame.html'))
		.pipe(fs.createWriteStream(outPath))
		.on('close', res)
		.on('error', rej)
	)).then(() => new Promise((res, rej) => {
		let code = '';
		for (const i in test) code += `"${i}":()=>{${getInnerCode(test[i])}},\n`;
		transform(`var k={${code}}`, conf.opts, (err, result) => err ? rej(err) : res(result));
	})).then(result => new Promise((res, rej) =>
		fs.writeFile(
			outPath,
			`<script type="text/javascript">
				document.getElementsByTagName('script')[0].__reqjs(${JSON.stringify(path)})
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
