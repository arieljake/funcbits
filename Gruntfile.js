module.exports = function(grunt)
{
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-es6-module-transpiler');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig(
    {
        clean: ["build-common", "build-amd"],
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
                    dest: 'build-common/'
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
                    dest: 'build-amd/'
                }]
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

    grunt.registerTask('build', ['clean', 'transpile:common', 'transpile:amd']);
    grunt.registerTask('test', 'mochaTest');

};