(function(angular) {
    angular.module('todoApp.todoSrv', [])
        .service('$todoSrv', ['$window', function($window) {
            // this.test = "这是服务器的数据";
            // todo: 将控制器中所有与数据相关的操作全部都放到服务中
            // 控制器中所有要操作的数据 , 只需要调用服务相应的方法即可
            // 将数据存储到localStorage 中 ,因为ng中没有单独提供这个服务
            // 此时可以通过$window获取到
            var storage = $window.localStorage;
            // console.log($window === window);
            // 获取任务列表数据
            var dataStr = storage.getItem('todo');
            var todoList = JSON.parse(dataStr) || [];
            // 暴露数据
            this.getData = function() {
                return todoList;
            }
            this.addData = function(newTask) {
                todoList.push({
                    id: todoList.length - 1 ? 0 : todoList.length - 1,
                    name: newTask,
                    isCompleted: false
                });
                this.saveData();
            };
            this.removeData = function(id) {
                for (var i = 0; i < todoList.length; i++) {
                    if (todoList[i].id == id) {
                        // splice删除数组中的某个元素 第一个参数是要删除元素的索引 第二个参数是删除这个索引后的几个元素
                        todoList.splice(i, 1);
                    }
                }
                this.saveData();
            };
            this.selectAll = function(isCheckedAll) {
                for (var i = 0; i < todoList.length; i++) {
                    todoList[i].isCompleted = isCheckedAll;
                }
                this.saveData();
            }
            this.clearCompleted = function() {
                var temp = [];
                for (var i = 0; i < todoList.length; i++) {
                    if (!todoList[i].isCompleted) {
                        temp.push(todoList[i]);
                    }
                }
                todoList = temp;
                this.saveData();
            };
            // 保存数据 将数据同步到localStorage中
            this.saveData = function() {
                storage.setItem('todo', JSON.stringify(todoList));
            };
        }]);
})(angular)
