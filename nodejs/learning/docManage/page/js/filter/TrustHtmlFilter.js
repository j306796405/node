myApp.filter('TrustHtmlFilter', ['$sce', function ($sce) {
    return function (input){
        return $sce.trustAsHtml(input);
    }
}])