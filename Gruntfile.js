module.exports = function( grunt ) {
  require("matchdep").filter("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.initConfig({
    browserify : {
      app : {
        src : ['public/js/**/*.js'],
        dest : 'public/build/js/app.js'
      }
    }

  });

  grunt.registerTask('default',['browserify']);

  grunt.registerTask('production', ['browserify']);
};
