module.exports = function(grunt) {
	
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			addContent: {
				files: ['content/**'],
				tasks: ['shell:mdToJson'],
				options: {
					event: ['added', 'changed', 'deleted']
				}
			}
		},
		shell: {
			mdToJson: {
				command: function () {
					grunt.log.writeln('mdToJson');
					
					var script = '';
					script += 'for D in content/*;'
					//for all directories in content folder
					script += '	do if [ -d $D ]; ';
					script += '		then';
					script += '			for z in $D/*; do';
					script += '				if [ -f $z ];';
					script += '					then';
					//update if directory contains files
					//script += '						echo "update public_html/$D.json";';
					script += '						ls $D/* | xargs node node_modules/markdown-to-json/bin/m2j -w 1000000000 -o "public_html/$D.json";';
					script += '						break;';
					script += '					else';
					//remove if directory contains no files
					//script += '						echo "rm public_html/$D.json";';
					script += '						rm "public_html/$D.json";';
					script += '					fi;';
					script += '			done;';
					script += '		fi;';
					script += 'done;';
					
					return script;
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');
	
	
	grunt.registerTask('observe', ['watch']);

};