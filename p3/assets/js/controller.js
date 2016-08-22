angular.module('myApp',[])
.controller('AppCtrl',function($scope,$filter){
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

  console.log($filter('json')($scope.contacts));

})
.filter('truncate',function(){
  return function(input,limit){
    return (input.length > limit) ? input.substr(0, limit) + '...' : input;
  };
})
