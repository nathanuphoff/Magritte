document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
var x = (function () {
'use strict';

const assign = Object.assign;

function component() {
	console.log(arguments);
}

function render() {
	console.log('render');
}

function route() {
	const parameters = arguments;
	return template => store => template;
}

function store() {}

var index = assign(component, {
	render,
	route,
	store
});

return index;

}());
