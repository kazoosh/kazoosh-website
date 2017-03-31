(function() {
'use strict';

/*global module:false*/
module.exports = function(grunt) {

  var packageJSON = 'package.json';
  var bowerJSON = 'bower.json';
  var confFile = 'conf/config.json';
  var confFileLocal = 'conf/config.local.json';
  var mdToJsonScript = 'script/mdToJson.py';
  var defaultBrowser = 'google chrome';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON(packageJSON),
    CONF: grunt.file.readJSON(confFile),
    jshint: {
      files: [
        'Gruntfile.js', '<%= CONF.sourceDir %><%= CONF.jsDir %>**/*.js',
      ],
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish'),
      },
    },
    jscs: {
      files: {
        src: ['<%= jshint.files %>'],
      },
      options: {
        config: '.jscsrc',
      },
    },
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
        // Beautify: true,
        // mangle: true,
      },
      build: {
        files: {
          '<%= CONF.distDir %><%= CONF.jsDir %>app.min.js':
            '<%= CONF.sourceDir %><%= CONF.jsDir %>**/*.js',
        },
      },
    },
    bower_concat: {
      build: {
        dest: {
          js: '<%= CONF.distDir %><%= CONF.jsDir %>vendor.js',
          css: '<%= CONF.distDir %><%= CONF.cssDir %>vendor.css',
        },
        callback: function(mainFiles, component) {
          return mainFiles.map(function(filepath) {
            // Use minified files if available
            var min = filepath.replace(/\.js$/, '.min.js');
            return grunt.file.exists(min) ? min : filepath;
          });
        },
      },
    },
    sass: {
      options: {
          style: 'expanded',
        },
      build: {
        files: {
          '<%= CONF.sourceDir %><%= CONF.cssDir %>style.css':
            '<%= CONF.sourceDir %><%= CONF.sassDir %>style.scss',
        },
      },
    },
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
      },
      build: {
        files: {
          '<%= CONF.distDir %><%= CONF.cssDir %>style.min.css':
            '<%= CONF.sourceDir %><%= CONF.cssDir %>style.css',
        },
      },
    },
    injector: {
      bower_dev: {
        options: {
          prefix: '..',
          starttag: '<!-- injector_bower:{{ext}} -->',
          endtag: '<!-- endinjector_bower -->',
        },
        files: {
          '<%= CONF.sourceDir %><%= CONF.indexHtml %>': [bowerJSON],
        },
      },
      src_dev: {
        options: {
          ignorePath: 'src',
          relative: true,
        },
        files: {
          '<%= CONF.sourceDir %><%= CONF.indexHtml %>': [
            '<%= CONF.sourceDir %><%= CONF.jsDir %>**/*.js',
            '<%= CONF.sourceDir %><%= CONF.cssDir %>**/*.css',
          ],
        },
      },
      bower_dist: {
        options: {
          starttag: '<!-- injector_bower:{{ext}} -->',
          endtag: '<!-- endinjector_bower -->',
          ignorePath: 'dist',
          relative: true,
        },
        files: {
          '<%= CONF.distDir %><%= CONF.indexHtml %>': [
            '<%= CONF.distDir %><%= CONF.jsDir %>**/vendor*.js',
            '<%= CONF.distDir %><%= CONF.cssDir %>**/vendor*.css',
          ],
        },
      },
      src_dist: {
        options: {
          ignorePath: 'dist',
          relative: true,
        },
        files: {
          '<%= CONF.distDir %><%= CONF.indexHtml %>': [
            '<%= CONF.distDir %><%= CONF.jsDir %>**/app*.js',
            '<%= CONF.distDir %><%= CONF.cssDir %>**/style*.css',],
        },
      },
    },
    cacheBust: {
      build: {
          options: {
              assets: [
                '<%= CONF.distDir %><%= CONF.jsDir %>**/*.js',
                '<%= CONF.distDir %><%= CONF.cssDir %>**/*.css',],
              deleteOriginals: true,
            },
          src: ['<%= CONF.distDir %><%= CONF.indexHtml %>'],
        },
    },
    watch: {
      content: {
        files: ['<%= CONF.contentSrcDir %>/**'],
        tasks: ['json'],
        options: {
          spawn: false,
        },
      },
      images: {
        files: ['<%= CONF.imagesSrcDir %>/**'],
        // Use images watch event for performance issues
        tasks: ['clean:images', 'copy:images'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['<%= CONF.sourceDir %><%= CONF.sassDir %>*.scss'],
        tasks: ['sass'],
      },
      jshint: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint'],
      },
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
              '<%= CONF.sourceDir %><%= CONF.cssDir %>*.css',
              '<%= CONF.sourceDir %>*.html',
          ],
        },
        options: {
          server: {
            watchTask: true,
            baseDir: './<%= CONF.sourceDir %>',
            routes: {
              '/bower_components': 'bower_components',
            },
          },
          browser: defaultBrowser,
        },
      },
      dist: {
        options: {
          server: {
            baseDir: './<%= CONF.distDir %>',
          },
          browser: defaultBrowser,
        },
      },
    },
    shell: {
      mdToJson: {
        command: function(sourceDir, destinationDir) {
          var script = 'python ' + mdToJsonScript + ' ' +
            sourceDir + ' ' + destinationDir;
          return script;
        },
      },
    },
    clean: {
      images: ['<%= CONF.imagesDestDir%>'],
      dist: ['dist'],
    },
    copy: {
      images: {
        cwd: '<%= CONF.imagesSrcDir %>',
        src: '**',
        dest: '<%= CONF.imagesDestDir%>',
        expand: true,
      },
      assets: {
        cwd: '<%= CONF.sourceDir %>',
        src: '<%= CONF.assetDirs %>',
        dest: '<%= CONF.distDir %>',
        expand: true,
      },
    },
  });

  // Merge local config
  if (grunt.file.exists(confFileLocal)) {
    grunt.config.merge({CONF: grunt.file.readJSON(confFileLocal)});
  }

  grunt.event.on('watch', function(action, filepath, target) {

    grunt.log.write(
      'watch: action:' + action +
      ', filepath: ' + filepath +
      ', target: ' + target
    );

    // TODO: ony 'deleted' action seems to be working on server
    /*

    If (target === 'images') {
     var pathArray = filepath.split("/");
     var imgFilePath = pathArray.slice(1).join("/");//path without image folder
     imgFilePath = grunt.config.get('CONF.imagesDestDir) +
      '/'+imgFilePath;

     if (action === 'deleted') {
      grunt.log.write("delete image "+imgFilePath);
      grunt.file.delete(imgFilePath);
     }
     else if(
      action === 'added' ||
      action === 'changed' ||
      action === 'renamed'
    ){
      grunt.log.write("copy image from "+filepath+" to "+imgFilePath);
      grunt.file.copy(filepath, imgFilePath)
     }
    }*/
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-cache-bust');

  grunt.registerTask('json', [
      'shell:mdToJson:<%= CONF.contentSrcDir %>:' +
      '<%= CONF.contentDestDir %>',
  ]);
  grunt.registerTask('images', [
    'clean:images', 'copy:images',
  ]);
  grunt.registerTask('contents', [
    'sass', 'json', 'images',
  ]);
  grunt.registerTask('observe', [
    'contents', 'watch',
  ]);
  grunt.registerTask('observe-contents', [
    'contents', 'watch',
  ]);
  grunt.registerTask('build', [
    'jshint', 'jscs',
    'contents',
    'injector:bower_dev', 'injector:src_dev',
  ]);
  grunt.registerTask('serve', [
      'browserSync:dev', 'watch',
    ]);
  grunt.registerTask('build:dist', [
      'jshint', 'jscs',
      'contents',
      'clean:dist',
      'uglify', 'bower_concat',
      'sass', 'cssmin',
      'copy:assets',
      'injector:bower_dist', 'injector:src_dist', 'cacheBust',
  ]);
  grunt.registerTask('serve:dist', [
      'browserSync:dist',
  ]);
  grunt.registerTask('start', [
      'build', 'serve',
  ]);
  grunt.registerTask('start:dist', [
      'build:dist', 'serve:dist',
  ]);
  grunt.registerTask('default', [
      'start',
  ]);
};
}());