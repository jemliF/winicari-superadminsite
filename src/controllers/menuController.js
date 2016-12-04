'use strict';

app.controller('MenuController', function ($scope, SuperAdminProvider, superAdminId, $location) {
    SuperAdminProvider.getSuperAdminById(superAdminId).then(function (resp) {
        $scope.currentUser = resp;
        
    }, function (err) {
        console.error(err);
    });

});