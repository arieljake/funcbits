module.exports = function(grunt)
{
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-es6-module-transpiler');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig(
    {
        clean: ["dist"],
        transpile:
        {
            common:
            {
                type: "cjs",
                files: [
                {
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.js'],
                    dest: 'lib/'
                }]
            },
            amd:
            {
                type: "amd",
                files: [
                {
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.js'],
                    dest: 'build/'
                }]
            }
        },

        uglify:
        {
            main:
            {
                files:
                {
                    'dist/funcbits.js': ['build/*.js']
                }
            }
        },

        mochaTest:
        {
            test:
            {
                options:
                {
                    reporter: 'spec'
                },
                src: ['test/*.test.js']
            }
        }
    });

    grunt.registerTask('build', ['clean', 'transpile:common', 'transpile:amd', 'uglify:main']);
    grunt.registerTask('test', 'mochaTest');

};