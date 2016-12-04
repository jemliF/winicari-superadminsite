'use strict';

app.controller('ProfileController', function ($scope, SuperAdminProvider) {
    SuperAdminProvider.getSuperAdminById(localStorage.superAdminId).then(function (resp) {
        $scope.currentUser = resp;

        
    }, function (err) {
        console.error(err);
    });

    $scope.update = function () {
        SuperAdminProvider.update($scope.currentUser).then(function (superAdmin) {
            $scope.currentUser = superAdmin;
            new PNotify({
                title: 'Profile modifié avec succés',
                text: 'Profile modifié avec succés',
                type: 'success'
            });
        }, function (err) {
            console.error(err);
        });
    }

    $scope.updatePassword = function () {
        $scope.currentUser.password = $scope.newPassword;
        SuperAdminProvider.update($scope.currentUser).then(function (superAdmin) {
            $scope.currentUser = superAdmin;
            //$('#passModal').close();
            new PNotify({
                title: 'Mot de passe modifié avec succés',
                text: 'Mot de passe modifié avec succés',
                type: 'success'
            });
        }, function (err) {
            console.error(err);
        });
    }
});

app.controller('LoginController', function ($scope) {

});