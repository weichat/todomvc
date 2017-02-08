(function(angular) {
    angular.module('todoApp.todoCtrl', ['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/:status?', {
                templateUrl: 'todoView.html',
                controller: 'TodoController'
            });
        }])
        .controller('TodoController', ['$scope', '$todoSrv', '$routeParams', function($scope, $todoSrv, $routeParams) {
            // 1 展示任务列表
            // 思路: 创建一个数据列表, 然后通过 ng-repeat 指令将数据进行展示 
            //调用服务中的获取数据的方法
            $scope.todoList = $todoSrv.getData();
            // 1. 添加任务
            $scope.newTask = '';
            $scope.add = function() {
                if ($scope.newTask == '') return;
                //调用服务的添加数据的方法
                $todoSrv.addData($scope.newTask);
                $scope.newTask = '';
            };
            // 2.删除任务
            $scope.remove = function(id) {
                $todoSrv.removeData(id);
            };
            // 3.修改任务
            $scope.updateId = -1;
            $scope.update = function(id) {
                $scope.updateId = id;
            };
            // 4.保存任务
            $scope.save = function() {
                $scope.updateId = -1;
                $todoSrv.saveData();
            };
            // 5.实现全选
            $scope.isCheckedAll = false;
            // a.使用监视isCheckedAll值变化的方式实现全选
            // $scope.$watch('isCheckedAll', function(newValue, oldValue) {
            //     if (newValue == oldValue) return;
            //     for (var i = 0; i < $scope.todoList.length; i++) {
            //         $scope.todoList[i].isCompleted = newValue;
            //     }
            // });
            // b.点击事件调用函数的方式实现全选
            $scope.selectAll = function() {
                $todoSrv.selectAll($scope.isCheckedAll);
            };
            // 6.删除全部已完成任务
            $scope.clearCompleted = function() {
                $todoSrv.clearCompleted();
                $scope.todoList = $todoSrv.getData();
            };
            // 7.控制删除全部已完成任务按钮是否显示
            $scope.isShow = function() {
                for (var i = 0; i < $scope.todoList.length; i++) {
                    if ($scope.todoList[i].isCompleted) {
                        //说明有已完成任务 返回true让按钮显示出来
                        return true;
                    }
                }
                //如果没有已完成任务 返回false 不让按钮显示出来
                return false;
            };
            // 8.显示已完成的任务数
            $scope.getCount = function() {
                var count = 0;
                for (var i = 0; i < $scope.todoList.length; i++) {
                    if (!$scope.todoList[i].isCompleted) {
                        count++;
                    }
                }
                return count;
            };
            $scope.$watch('todoList', function(newValue, oldValue) {
                if (newValue === oldValue) return;
                $todoSrv.saveData();
            }, true);
            // 9.显示不同状态的任务
            //  可以通过angular中的过滤器来完成
            $scope.status = {};
            $scope.checkAll = function() {
                $scope.status = {};
            };
            $scope.checkActive = function() {
                $scope.status = { 'isCompleted': false };
            };
            $scope.checkCompleted = function() {
                $scope.status = { 'isCompleted': true };
            };
            console.log($location.url());
            switch ($routeParams.status) {
                case '':
                    $scope.status = {};
                    break;
                case 'active':
                    $scope.status = { isCompleted: false };
                    break;
                case 'completed':
                    $scope.status = { isCompleted: true };
                    break;
                default:
                    $scope.status = {};
                    break;
            }
        }])

})(angular);
