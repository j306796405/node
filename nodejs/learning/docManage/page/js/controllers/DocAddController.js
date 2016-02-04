myApp.controller('DocAddController', ['$scope', '$state', 'DocAddService', function ($scope, $state, DocAddService) {
    $scope.formData = {
        tag: [],
        person: [],
        viLink: []
    };
    $scope.initForm = {
        tags: [
            {
                name: 'Online',
                isSelected: false
            },
            {
                name: 'Offline',
                isSelected: false
            },
            {
                name: 'Mobile',
                isSelected: false
            },
            {
                name: '物料',
                isSelected: false
            }
        ]
    }
    $scope.isEdit = {
        vi: {
            bool: true
        }
    }

    //点击经办人checkbox
    $scope.changeOperator = function(persons, personValue){
        angular.forEach(persons, function(value, key) {
            if(value !== personValue){
                persons[key].isOperator = 'false';
            }
        });
    }

    //业务线数据组合
    $scope.collectTag = function ($event, tag) {
        tag.isSelected = !tag.isSelected;
    }

    //项目成员数据组合
    $scope.makeModelPerson = function (person) {
        var valid = false;
        angular.forEach(person, function(item, key){
            if(item.value && $scope.$eval(item.isOperator)){
                valid = true;
            }
        })
        if(valid){
            $scope.addForm.operator.$setValidity('operatorEmpty', true);
            $scope.formData.person = [];
            angular.forEach(person, function(item, key) {
                item.isOperator = $scope.$eval(item.isOperator);
                $scope.formData.person.push(item);
            })
        }else{
            //经办人的单选和名字不同时存在验证设置失败
            $scope.addForm.operator.$setValidity('operatorEmpty', false);
        }
    }

    //新增任务
    $scope.addDoc = function () {
        $scope.addForm.$dirty = true;
        //验证经办人的单选和名字是否同时存在
        $scope.makeModelPerson($scope.person);

        if($scope.addForm.$valid){
            angular.forEach($scope.initForm.tags, function(initTag, i){
                if(initTag.isSelected){
                    $scope.formData.tag.push(initTag.name);
                }
            })
            setDefault($scope.formData, ['proDes', 'cp4', 'cssLink', 'picsLink', 'repository', 'lowfiLink']);
            DocAddService.addDoc($scope.formData).success(function(doc, status, headers, config){
                console.log('新增项目成功');
                $state.go('detail',{id: doc._id});
            });
        }
    }

    function setDefault(formData, arr){
        angular.forEach(arr, function(field, key){
            if(!formData[field]){
                formData[field] = '无';
            }
        })
    }

    //上传图片数据组合
    $scope.$on('addPicInfo', function(e, picInfo){
        $scope.formData.viLink.push(picInfo)
    })

    //上传图片数据组合
    $scope.$on('delPic', function(e, path){
        var pics = $scope.formData.viLink;
        angular.forEach(pics, function(value, index) {
            if(value.path == path){
                pics.splice(index, 1);
                return false;
            }
        })
    })
}])