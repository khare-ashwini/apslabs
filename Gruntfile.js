module.exports = function( grunt ) {
  require("matchdep").filter("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.initConfig({
    browserify : {
      app : {
        files: { 'public/build/js/app.js': ['public/js/**/*.js', '!public/js/libs/*.js'] },
        options: {
          browserifyOptions: {
            debug: true
          }
        },
      }
    },
    uglify: {
      options: {
        mangle: false,
        sourceMap: true
      },
      app: {
        files: {
          'public/build/js/app.min.js': [ 'public/build/js/app.js']
        }
      }
    },
    exorcise: {
      app: {
        options: {},
        files: {
          'public/build/js/app.js.map': ['public/build/js/app.js'],
        }
      }
    },
    watch: {
      scripts: {
        files:['public/js/**/*.js'],
        tasks: ['browserify']
      }
    }

  });

  grunt.registerTask('default',['browserify', 'exorcise', 'watch:scripts'] );

  grunt.registerTask('production', ['browserify', 'exorcise']);
};
