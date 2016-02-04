myApp.controller('DocDetailController', ['$scope', '$location', 'DocDetailService', 'FAKE_URL', 'DOC_TYPE_LOGO',
    function ($scope, $location, DocDetailService, FAKE_URL, DOC_TYPE_LOGO) {
        //详情页初始化
        var id = $location.search().id;
        DocDetailService.getDocDetail({
            method: 'get',
            url: FAKE_URL + '/item/' + id
        }).success(function (doc, status, headers, config) {
            angular.forEach(DOC_TYPE_LOGO, function (value, index) {
                if (DOC_TYPE_LOGO[index].name == doc.proClass) {
                    doc.proClassLogo = DOC_TYPE_LOGO[index].url;
                    return false;
                }
            })
            $scope.doc = doc;
            //通知uploadController初始化已上传的图片
            $scope.$broadcast('makePicsView', $scope.doc.viLink);
        });

        //初始化变量
        $scope.isEdit = {};
        $scope.temp = {
            viLink: []
        }

        //页面初始化
        $scope.initForm = {
            tags: [
                {name: 'Online' ,isSelected: false},
                {name: 'Offline', isSelected: false},
                {name: 'Mobile', isSelected: false},
                {name: '物料', isSelected: false}
            ],
        }
        //修改经办人
        $scope.changeOperator = function(persons, group){
            angular.forEach(persons, function(person, key) {
                if(person.group == group){
                    person.isOperator = true;
                }else{
                    person.isOperator = false;
                }
            });
        }
        //通用修改事件
        $scope.modify = function (fieldName, e) {
            initIsEditField(fieldName);
            $scope.$broadcast('isContenteditable',{
                isEdit: $scope.isEdit[fieldName].bool,
                ngField: $scope.doc[fieldName],
                fieldName: fieldName
            });
        }
        //通用保存
        $scope.commonSave = function(filedName){
            var config = {};
            config[filedName] = $scope.doc[filedName];
            DocDetailService.updateField($scope.doc._id, config).success(function () {
                $scope.isEdit[filedName].bool = false;
                console.log(filedName + ' updating success!');
            });
        }
        //更新任务名和业务线
        $scope.saveNameAndFlag = function(filedName){
            var tag = [];
            angular.forEach($scope.initForm.tags, function(initTag, i){
                if(initTag.isSelected){
                    tag.push(initTag.name);
                }
            })
            DocDetailService.updateField($scope.doc._id, {
                proName: $scope.doc.proName,
                tag: tag
            }).success(function () {
                $scope.doc.tag = tag;
                $scope.isEdit[filedName].bool = false;
                console.log('updating success!');
            });
        }
        //保存图片
        $scope.saveVi = function (fieldName) {
            initIsEditField(fieldName);
            $scope.doc.viLink = $scope.doc.viLink.concat($scope.temp.viLink);
            console.log($scope.doc.viLink);
            DocDetailService.updateField($scope.doc._id, {
                viLink: $scope.doc.viLink
            }).success(function () {
                $scope.isEdit[fieldName].bool = false;
                $scope.temp.viLink = [];
                $scope.$broadcast('imgSavingSuccess', '');
                console.log('updating success!');
            });
        }

        //业务线数据组合
        $scope.collectTag = function ($event, tag) {
            tag.isSelected = !tag.isSelected;
        }

        //上传图片数据组合
        $scope.$on('addPicInfo', function (e, picInfo) {
            console.log(picInfo);
            $scope.temp.viLink.push(picInfo);
        })

        //删除图片数据组合
        $scope.$on('delPic', function (e, path) {
            splicePics($scope.doc.viLink, path);
            splicePics($scope.temp.viLink, path);
        })
        //设置为修改状态
        function initIsEditField(fieldName){
            if(!$scope.isEdit[fieldName]){
                $scope.isEdit[fieldName] = {};
            }
            $scope.isEdit[fieldName].bool = !$scope.isEdit[fieldName].bool;
        }
        //移除本地数组图片对象
        function splicePics(pics, path){
            angular.forEach(pics, function (value, index) {
                if (value.path == path) {
                    pics.splice(index, 1);
                    return false;
                }
            })
        }
    }])