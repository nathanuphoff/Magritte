import resolve from 'rollup-plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const moduleName = 'magritte'
const entry = 'source/index.js'
const script = process.env.script || 'start'

if (script === 'start') console.info("Visit http://localhost:10001/example/ in a browser")

const setup = {
	
	start: {
		entry,
		moduleName,
		format: 'iife',
		dest: 'example/magritte.js',
		plugins: [
			resolve(),
			serve(),
			livereload(),
			babel(),
		],
	},
	
	build: {
		entry,
		moduleName,
		targets: [{
			format: 'iife',
			dest: 'bundle/magritte.js'
		}, {
			format: 'cjs',
			dest: 'bundle/index.js'
		}],
		plugins: [
			resolve(),
			babel(),
		],
	},
	
}

export default setup[script]