module.exports = exports = (grunt) ->


    grunt.initConfig
        pkg: grunt.file.readJSON('package.json')
        browserify:
            dist:
                files:
                    'sawrocket-xmpp.browser.js': ['xmpp.js']
                options:
                    alias:( "#{src.replace /^sawrocket-xmpp/, '.'}:#{tgt}" for tgt, src of require('./package').browser)

    grunt.loadNpmTasks 'grunt-browserify'

    grunt.registerTask 'default', [
        'browserify'
    ]
