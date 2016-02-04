myApp.directive('contenteditAddDirective', [function () {
    return {
        scope: true,
        templateUrl: 'js/views/doc-contentedit-add.html',
        transclude: true,
        link: function (scope, element, attrs, ngModel) {
            scope.addLink = function(){
                if(scope.contenteditAddTitle){
                    scope.formData.cssLink = scope.formData.cssLink || '';
                    var linkStr = '<div>'+ scope.contenteditAddTitle + ': ' + '<a href="'+ scope.contenteditAddLink +'">' + scope.contenteditAddLink + '</a>' +'</div>'
                    scope.formData.cssLink += linkStr
                }
            }
        }
    };
}]);