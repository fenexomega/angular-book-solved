angular.module('myApp',['ngRoute','ngSanitize'])

.config(function($routeProvider, $locationProvider, $logProvider){
  $locationProvider.html5Mode(true);
  $logProvider.debugEnabled(true);


  $routeProvider.when('/',{
    controller: 'indexCtl',
    templateUrl: 'assets/partials/index.html'
  })

  .when('/add',{
    controller: 'addCtl',
    templateUrl: 'assets/partials/add.html'
  })

  .when('/contact/:id',{
    controller: 'contactCtl',
    templateUrl: 'assets/partials/view_contact.html'
  })


  .otherwise({
    redirectTo: '/'
  });

})

.value('demoService','abc123')

.factory('anotherService',function anotherServiceFactory(demoService){
  return demoService;
})

.controller('indexCtl',function indexCtl($scope,contacts,anotherService,notifierService){
  $scope.contacts = contacts.get();
    // console.log('DemoService = ' + anotherService);
    // notifierService.send('Hello');
    // Posso usar esse rootScope
    // $rootScope.contacts = $scope.contacts;
})

.controller('addCtl',function($scope){

})
.controller('contactCtl',function($scope,$routeParams,contacts){
  $scope.contact = contacts.find($routeParams.id);

})

.service('notifierService',function notifierFactoryService(){
  function Notifier()
  {
    this.send = function(message){
      window.alert(message);
    }
  }

  return new Notifier();
})

.factory('contacts', function (){
  var contacts = [
      {
        name: 'Stephen Radford',
        phone: '0123456789',
        address: '123, Some Street\nLeicester\nLE1 2AB',
        email: 'stephen@email.com',
        website: 'stephenradford.me',
        notes: ''
      },
      {
        name: 'Jordy',
        phone: '999999999',
        address: '123,Foda-se\nBairro Tal\n cep 333213',
        email: 'jordy@mail.com',
        notes: ''
      }
    ];

    return {
      get: function(){
        return contacts;
      },
      find: function(index){
        return contacts[index];
      },
      create: function(contact){
        contacts.push(contact);
      }
    }
})

.directive('gravatar', function(){
  return {
    restrict: 'AE',
    template: '<img ng-src="{{img}}" class="{{class}}" >',
    replace: true,
    link: function(scope,elem, attrs){
      var size = attrs.size ? attrs.size : 64;
      console.log('md5 = ' + md5(attrs.email));
      scope.img = 'http://gravatar.com/avatar/' + md5(attrs.email) + '?s=' + size;
      scope.class = attrs.class;
    }
  }
})

.directive('editable',function(){
  return {
    restrict: 'AE',
    templateUrl: '/assets/partials/editable.html',
    scope: {
        value: '=editable',
        field: '@fieldType'
    },
    controller: function($scope){
      $scope.editor = {
        showing: false,
        value: $scope.value
      };

      $scope.toggleEditor = function(){
        $scope.editor.showing = !$scope.editor.showing;
      };

      $scope.save = function(){
        $scope.value = $scope.editor.value;
        $scope.toggleEditor();
      };
    }
  };
})

.filter('paragraph', function(){
  return function(input){
    return (input) ? input.replace(/\n/g,'<br />') : input;
  };
})

.controller('appCtl', function($scope, $location){
  $scope.pageClass    = function(path){
    return (path == $location.path()) ? 'active': '';
  };
  $scope.startSearch  = function(){
    $location.path('/');
  };
})

.controller('ContactCtl', function($scope,$location,contacts){

  $scope.submit = function(contact)
  {
    contacts.create(contact);
    $scope.contact = null;
    $scope.added = true;
  };
})
