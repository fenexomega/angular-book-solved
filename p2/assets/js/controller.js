var myApp = angular.module('myApp',[])

myApp.controller('AppCtrl',['$scope',function($scope){
  $scope.clickHandler = function()  {
    $scope.isHidden = !$scope.isHidden;
  };


  $scope.contacts = [
    {
      'name':'Jordy',
      'email':"jordy@gmail.com",
      'telefone':'99999-9999'
    },
    {
      'name':'Iná',
      'email':"ina@gmail.com",
      "telefone":'12345-1234'
    }
  ]

}])
