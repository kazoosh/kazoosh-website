(function() {
'use strict';

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    CONF: grunt.file.readJSON('conf/config.json'),
    jshint: {
      files: ['Gruntfile.js', 'src/js/**/*.js'],
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
          'dist/js/app.min.js': 'src/js/**/*.js',
        },
      },
    },
    bower_concat: {
      build: {
        dest: {
          js: 'dist/js/vendor.js',
          css: 'dist/css/vendor.css',
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
          'src/css/style.css': 'src/sass/style.scss',
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
          'dist/css/style.min.css': 'src/css/style.css',
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
          'src/index.html': ['bower.json'],
        },
      },
      src_dev: {
        options: {
          ignorePath: 'src',
          relative: true,
        },
        files: {
          'src/index.html': ['src/js/**/*.js', 'src/css/**/*.css'],
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
          'dist/index.html':
            ['dist/js/**/vendor*.js', 'dist/css/**/vendor*.css'],
        },
      },
      src_dist: {
        options: {
          ignorePath: 'dist',
          relative: true,
        },
        files: {
          'dist/index.html':
            ['dist/js/**/app*.js', 'dist/css/**/style*.css'],
        },
      },
    },
    cacheBust: {
      build: {
          options: {
              assets: ['dist/js/**/*.js', 'dist/css/**/*.css'],
              deleteOriginals: true,
            },
          src: ['dist/index.html'],
        },
    },
    watch: {
      content: {
        files: ['<%= CONF.contentSourceDirectory %>/**'],
        tasks: ['content'],
        options: {
          spawn: false,
        },
      },
      images: {
        files: ['<%= CONF.imagesSourceDirectory %>/**'],
        // Use images watch event for performance issues
        tasks: ['clean:images', 'copy:images'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['public_html/sass/*.scss'],
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
              'src/css/*.css',
              'src/*.html',
          ],
        },
        options: {
          server: {
            watchTask: true,
            baseDir: './src',
            routes: {
              '/bower_components': 'bower_components',
            },
          },
          browser: 'google chrome',
        },
      },
      dist: {
        options: {
          server: {
            baseDir: './dist',
          },
          browser: 'google chrome',
        },
      },
    },
    shell: {
      mdToJson: {
        command: function(sourceDirectory, destinationDirectory) {
          var script = 'python script/mdToJson.py ' +
            sourceDirectory + ' ' + destinationDirectory;
          return script;
        },
      },
    },
    clean: {
      images: ['<%= CONF.imagesDestinationDirectory %>'],
      dist: ['dist'],
    },
    copy: {
      images: {
        cwd: '<%= CONF.imagesSourceDirectory %>',
        src: '**',
        dest: '<%= CONF.imagesDestinationDirectory %>',
        expand: true,
      },
      assets: {
        cwd: '<%= CONF.sourceDirectory %>',
        src: '<%= CONF.assetDirectories %>',
        dest: '<%= CONF.distDirectory %>',
        expand: true,
      },
    },
  });

  // Merge local config
  if (grunt.file.exists('config.local.json')) {
    grunt.config.merge({CONF: grunt.file.readJSON('config.local.json')});
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
     imgFilePath = grunt.config.get('CONF.imagesDestinationDirectory') +
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

  grunt.registerTask('content',
    [
      'shell:mdToJson:<%= CONF.contentSourceDirectory %>:' +
      '<%= CONF.contentDestinationDirectory %>',
    ]
  );

  grunt.registerTask('build',
    [
    'jshint', 'jscs', 'sass', 'injector:bower_dev', 'injector:src_dev',
    ]
  );
  grunt.registerTask('serve',
    [
      'browserSync:dev', 'watch',
    ]
  );
  grunt.registerTask('default',
    [
      'build', 'serve',
    ]
  );
  grunt.registerTask('build:dist',
    [
      'jshint', 'jscs',
      'clean:dist',
      'uglify', 'bower_concat',
      'sass', 'cssmin',
      'copy:assets',
      'injector:bower_dist', 'injector:src_dist', 'cacheBust',
    ]
  );
  grunt.registerTask('serve:dist',
    [
      'browserSync:dist',
    ]
  );

  grunt.registerTask('images', ['clean:images', 'copy:images']);
  grunt.registerTask('observe', ['sass', 'content', 'images', 'watch']);
  grunt.registerTask('observe-contents', ['content', 'images', 'watch']);
};
}());