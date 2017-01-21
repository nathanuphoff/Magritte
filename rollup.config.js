import resolve from 'rollup-plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
	entry: 'source/index.js',
	dest: 'bundle/index.js',
	format: 'iife',
	moduleName: 'x',
	plugins: [
		resolve(),
		serve(),
		livereload('bundle'),
		babel(),
		// uglify(),
	],
}