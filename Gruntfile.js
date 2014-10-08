module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			scripts: {
				files: ['content/**'],
				tasks: ['shell:mdToJson']
			},
		},
		shell: {
			mdToJson: {
				command: [
					'for D in content/*; do if [ -d $D ]; then ls $D/* | xargs node node_modules/markdown-to-json/bin/m2j -w 1000000000 -o "public_html/$D.json"; fi; done;'
				].join('&&')
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');
	

	// Default task(s).
	grunt.registerTask('observe', ['watch']);
	grunt.registerTask('content', ['shell:mdToJson']);
};