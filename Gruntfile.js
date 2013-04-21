/* global module */

(function() {

    "use strict";

    module.exports = function(grunt) {

        grunt.initConfig({
            pkg: grunt.file.readJSON("package.json"),

            jshint: {
                options: grunt.file.readJSON(".jshintrc"),
                files: [
                    "Gruntfile.js",
                    "WineApi.js",
                    "example/*.js",
                    "test/*.spec.js"
                ]
            },

            watch: {
                files: ["<%= jshint.files %>"],
                tasks: ["jshint"]
            }
        });

        grunt.loadNpmTasks("grunt-contrib-jshint");
        grunt.loadNpmTasks("grunt-contrib-watch");

        grunt.registerTask("default", ["jshint"]);
    };
}());
