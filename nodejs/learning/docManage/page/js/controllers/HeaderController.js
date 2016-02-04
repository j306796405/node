myApp.controller('HeaderController', ['$scope', 'DocLoginService', '$location', '$window', 'LOGOUT',
    function ($scope, DocLoginService, $location, $window, LOGOUT) {
        $scope.listTitile = '项目列表';
        $scope.reportTitle = '报表';
        $scope.addDocTitle = '创建项目';
        $scope.logoutUrl = LOGOUT + DocLoginService.currentAngularUrl();
        //view中 user.name为$rootScope中的属性

        $scope.logout = function () {
            DocLoginService.logout().success(function (user, status, header, config) {
                console.log('logout successful');
            })
        }
    }])