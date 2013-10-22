module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'app/lib/angular/angular.js',
      'app/lib/angular/angular-*.js',
      'test/lib/angular/angular-mocks.js',
      'app/js/controllers.js',
      'app/js/directives.js',
      'app/js/filters.js',
      'app/js/services.js',
      'test/unit/**/*.js',
      'app/libs/jquery.min.js',
      "app/libs/bootstrap/js/bootstrap.min.js",
      "app/libs/ui-bootstrap-tpls-0.6.0.min.js"
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'       
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
