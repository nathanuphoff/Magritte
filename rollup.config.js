import resolve from 'rollup-plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const moduleName = 'x'
const entry = 'source/index.js'
const script = process.env.script || 'start'

if (script === 'start') console.log("Visit http://localhost:10001/example in a browser")

const setup = {
	
	start: {
		entry,
		moduleName,
		format: 'iife',
		dest: 'example/assets/x.js',
		plugins: [
			resolve(),
			serve(),
			livereload('bundle'),
			babel({ exclude: 'node_modules/**' }),
		],
	},
	
	build: {
		entry,
		moduleName,
		targets: [{
			format: 'iife',
			dest: 'bundle/browser/x.js'
		}, {
			format: 'cjs',
			dest: 'bundle/CommonJS/index.js'
		}],
		plugins: [
			resolve(),
			babel(),
		],
	},
	
	uglify: {
		entry,
		moduleName,
		format: 'iife',
		dest: 'bundle/browser/x.min.js',
		plugins: [
			resolve(),
			babel(),
			uglify(),
		],
	},
	
}

export default setup[script]