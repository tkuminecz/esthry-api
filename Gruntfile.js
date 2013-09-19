module.exports = function(grunt) {

	// initialize configuration
	grunt.initConfig({
		jshint: {
			src: ['lib/*']
		}
	});

	// load npm modules
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// register tasks
	grunt.registerTask('default', ['jshint']);
};
