module.exports = function(grunt) {

	// initialize configuration
	grunt.initConfig({
		jshint: {
			src: ['Gruntfile.js', 'lib/*'],
			options: {
				newcap: false
			}
		}
	});

	// load npm modules
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// register tasks
	grunt.registerTask('default', ['jshint']);
};
