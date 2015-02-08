module.exports = function(grunt) {
	
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		CONF: grunt.file.readJSON('config.json'),
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'public_html/css/style.css': 'public_html/sass/style.scss'
				}
			}
		},
		watch: {
			content: {
				files: ['content/**'],
				tasks: ['shell:mdToJson:<%= CONF.contentSourceDirectory %>:<%= CONF.contentDestinationDirectory %>'],
				options: {
					event: ['added', 'changed', 'deleted']
				}
			},
			css: {
				files: ['public_html/sass/*.scss'],
				tasks: ['sass']
			},
		},
		shell: {
			mdToJson: {
				command: function (sourceDirectory, destinationDirectory) {
					var script = 'python script/mdToJson.py '+sourceDirectory+' '+destinationDirectory;
					return script;
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('observe', ['sass', 'shell:mdToJson:<%= CONF.contentSourceDirectory %>:<%= CONF.contentDestinationDirectory %>', 'watch']);
};