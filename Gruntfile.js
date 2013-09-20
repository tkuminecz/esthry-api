module.exports = function(grunt) {

	// initialize configuration
	grunt.initConfig({
		jshint: {
			src: ['Gruntfile.js', 'lib/*']
		}
	});

	// load npm modules
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// register tasks
	grunt.registerTask('default', ['jshint']);
};
