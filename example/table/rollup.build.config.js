import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import jsx from 'rollup-plugin-jsx'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

export default {
	entry: 'source/index.js',
	moduleName: 'table',
	format: 'iife',
	dest: 'bundle/index.js',
	plugins: [
		resolve(),
		commonjs(),
		jsx({factory: 'magritte.jsx'} ),
		babel(),
		uglify(),
	],
}