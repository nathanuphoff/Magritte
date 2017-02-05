import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import jsx from 'rollup-plugin-jsx'

export default {
	entry: 'source/index.js',
	moduleName: 'table',
	format: 'iife',
	dest: 'bundle/index.js',
	plugins: [
		resolve(),
		commonjs(),
		serve(),
		livereload(),
		jsx({factory: 'magritte.jsx'} ),
		babel(),
	],
}