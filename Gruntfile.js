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
				tasks: ['shell:mdToJson', 'shell:folderNamesToJson'],
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
					
					var script = '';
					script += 'rm public_html/content/*;'
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
			},
			folderNamesToJson: {
				command: function(){

					var script = '';
					//create navi.json file with folder names as contents
					script += 'json="";';
					script += 'json+="{";';
					script += 'json+="\\"contents\\": [";';
					script += 'seperator="";';
					script += 'for D in content/*;';
					//for all directories in content folder
					script += '	do if [ -d $D ];';
					script += '		then';
					//#exlude folders starting with _
					//script += '			if [ ${D:8:1} != "_" ];';
					//script += '				then';
					//#strip of string "content/"';
					script += '					json+=$seperator"\\""${D:8}"\\"";';
					script += '					seperator=",";';
					//script += '				fi;';
					script += '		fi; ';
					script += 'done;';

					script += 'json+="]";';
					script += 'json+="}";';

					script += 'rm public_html/content/contents.json;';
					script += 'echo $json >> public_html/content/contents.json;';

					return script;
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-sass');
	

	grunt.registerTask('observe', ['watch']);
};