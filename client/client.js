var app = angular.module('myApp', []);
console.log("This is running");

app.controller('MainController', ['$scope', '$http', function($scope, $http){
  $scope.toDo = '';
  $scope.toDoList = [];
  $scope.item = {};

var fetchList = function() {
  $http.get('/toDo').then(function(response){
    console.log('This is the response from To Do ', response);
    if(response.status !== 200){
      console.log('Failed to get list from API!');
    }

    $scope.toDoList = response.data;
    return response.data;
  })
}
//Builds to do list
  $scope.runClick = function(){
    // $scope.toDoList.push($scope.toDo);
    if($scope.toDo === ''){
      $scope.showError = true;
    } else {
      $scope.showError = false;
      // pushes to the array as object
      $scope.toDoList.push({toDoItem: $scope.toDo, completed: false})
      $http.post('/toDo', {toDoItem: $scope.toDo, completed: false}).then(fetchList());
      // console.log($scope.toDoList);
      $scope.toDo ='';
    }
    fetchList();
  }

  $scope.completedItem = function () {
    console.log('this is a completed item');
    $http.put('/toDo', {toDoItem: $scope.toDo, completed: true}).then();
    console.log($scope.toDoList);
  }

  $scope.removeItem = function() {
    //coming back as undefined(also tried item.toDoItem and toDoItem)
    $scope.item.remove();
  }
}]);
