const fs = require('fs');
const { transform } = require('@babel/core/lib/index');
const { spawn } = require('child_process');
const { join } = require('path');

this.defConf = {
	opts: {
		"presets": ["@babel/preset-env"],
		// "targets":{"ie":"11"}
	},
	out: 'out',
};

this['default'] = this.iePasser = (path, test, conf = this.defConf) => {
	const outPath = join(__dirname, 'res', `${conf.out}.hta`);
	return new Promise((res, rej) => fs
		.createReadStream('res/frame.html')
		.pipe(fs.createWriteStream(outPath))
		.on('close', res)
		.on('error', rej)
	).then(() => new Promise((res, rej) => {
		let code = '';
		for (const i in test) code += `"i":${test[i].toString()},`;
		transform(`var k={${code}}`, conf.opts, (err, result) => err ? rej(err) : res(result));
	})).then(result => new Promise((res, rej) =>
		fs.writeFile(outPath, `
		<script type="test/javascript" src="${path}"></script>
		<pre>(function(){${result.code}\nreturn k})()</pre>
	`, { flag: 'a' }, (err) => err ? rej(err) : res())
	)).then(() =>
		spawn('mshta', [outPath])
	);
}