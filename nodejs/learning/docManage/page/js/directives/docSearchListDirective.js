myApp.directive('docSearchListDirective', ['DocListService' ,function(DocListService){
    return {
        restrict: 'AE',
        link: function(scope, element, attrs){
            scope.search = function(){
                DocListService.getDocsList({keyword: scope.searchConfig.keyword}).success(function(data, status, headers, config){
                    DocListService.listData = data;
                    scope.$emit('updateListData', DocListService.listData);
                });
            }
        }
    }
}])