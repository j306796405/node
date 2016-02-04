var myApp = angular.module('MyApp', ['ui.router', 'bw.paging', 'angularFileUpload', 'highcharts-ng', 'ngMessages', 'daterangepicker']);

myApp.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/docs-list');

        $stateProvider
            .state('/', {
                url: '/docs-list',
                views: {
                    'header': {
                        templateUrl: 'js/views/header.html',
                        controller: 'HeaderController'
                    },
                    'main-container': {
                        templateUrl: 'js/views/doc-list.html',
                        controller: 'DocListController'
                    }
                },
                controllerAs: 'formatUrl',
                resolve: {
                    formatUrl: function(DocLoginService){
                        return DocLoginService.formatUrl();
                    }
                }
            })
            .state('list', {
                url: '/doc-add',
                views: {
                    'header': {
                        templateUrl: 'js/views/header.html',
                        controller: 'HeaderController'
                    },
                    'main-container': {
                        templateUrl: 'js/views/doc-add.html',
                        controller: 'DocAddController'
                    },
                    'upload@list': {
                        templateUrl: 'js/views/doc-add-upload.html',
                        controller: 'UploadController'
                    }
                },
                controllerAs: 'formatUrl',
                resolve: {
                    formatUrl: function(DocLoginService){
                        return DocLoginService.formatUrl();
                    }
                }
            })
            .state('detail', {
                url: '/doc-detail?id',
                views: {
                    'header': {
                        templateUrl: 'js/views/header.html',
                        controller: 'HeaderController'
                    },
                    'main-container': {
                        templateUrl: 'js/views/doc-detail.html',
                        controller: 'DocDetailController'
                    },
                    'upload@detail': {
                        templateUrl: 'js/views/doc-add-upload.html',
                        controller: 'UploadController'
                    }
                },
                controllerAs: 'formatUrl',
                resolve: {
                    formatUrl: function(DocLoginService){
                        return DocLoginService.formatUrl();
                    }
                }
            })
            .state('report', {
                url: '/doc-report',
                views: {
                    'header': {
                        templateUrl: 'js/views/header.html',
                        controller: 'HeaderController'
                    },
                    'main-container': {
                        templateUrl: 'js/views/doc-report.html',
                        controller: 'DocReportController'
                    }
                },
                controllerAs: 'formatUrl',
                resolve: {
                    formatUrl: function(DocLoginService){
                        return DocLoginService.formatUrl();
                    }
                }
            })
            .state('version', {
                url: '/doc-version',
                views: {
                    'header': {
                        templateUrl: 'js/views/header.html',
                        controller: 'HeaderController'
                    },
                    'main-container': {
                        templateUrl: 'js/views/doc-version.html',
                        controller: ''
                    }
                },
                controllerAs: 'formatUrl',
                resolve: {
                    formatUrl: function(DocLoginService){
                        return DocLoginService.formatUrl();
                    }
                }
            })
    }])

myApp.run(['$rootScope', '$location', 'DocUtils', 'DocLoginService',
    function ($rootScope, $location, DocUtils, DocLoginService) {
        //登录初始化
        //DocLoginService.initLogin();
    }])
