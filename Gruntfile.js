module.exports = function(grunt) {
	
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
			addContent: {
				files: ['content/**'],
				tasks: ['shell:mdToJson'],
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
				command: function () {
					var script = 'python script/mdToJson.py';
					return script;
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-sass');
	

	grunt.registerTask('observe', ['sass', 'shell', 'watch']);
};