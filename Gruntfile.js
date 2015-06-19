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
    }

  });

  grunt.registerTask('default',['browserify', 'uglify:app']);

  grunt.registerTask('production', ['browserify']);
};
