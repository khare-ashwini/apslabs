module.exports = function( grunt ) {
  require("matchdep").filter("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.initConfig({
    browserify : {
      app : {
        src : ['public/js/**/*.js'],
        dest : 'public/build/js/app.js'
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
    watch: {
      scripts: {
        files:['public/js/**/*.js'],
        tasks: ['browserify', 'uglify:app']
      }
    }

  });

  grunt.registerTask('default',['browserify', 'uglify:app', 'watch:scripts'] );

  grunt.registerTask('production', ['browserify']);
};
