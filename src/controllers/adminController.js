'use strict';

app.controller('AddAdminController', function ($scope, SocieteProvider, AdminProvider) {
    SocieteProvider.getSocietes().then(function (resp) {
        $scope.societes = resp;
        
    }, function (err) {
        console.error(err);
    });

    $scope.addAdmin = function (admin) {
        admin.role = "admin";
        AdminProvider.saveAdmin(admin).then(function (resp) {
            admin.societe.administre = true;
            SocieteProvider.update(admin.societe);
        }, function (err) {
            console.error(err);
        });
    }
})
    .controller('AdminsController', function ($scope, SocieteProvider, AdminProvider) {
        AdminProvider.getAdminsByRole('admin').then(function (result) {

            $scope.admins = result;
        }, function (err) {

        });

        $scope.bloquer = function (admin) {
            admin.active = false;
            AdminProvider.updateAdmin(admin).then(function (resp) {
                new PNotify({
                    title: 'Admin bloqué avec succés',
                    text: 'Admin ' + admin.nom + ' ' + admin.prenom + ' ' + admin.prenom + ' a été bloqué avec succés',
                    type: 'success'
                });
            }, function (err) {
                console.error(err);
            });
        }

        $scope.debloquer = function (admin) {
            admin.active = true;
            AdminProvider.updateAdmin(admin).then(function (resp) {
                new PNotify({
                    title: 'Admin débloqué avec succés',
                    text: 'Admin ' + admin.nom + ' ' + admin.prenom + ' a été débloqué avec succés',
                    type: 'success'
                });
            }, function (err) {
                console.error(err);
            });
        }

        $scope.add = function (admin) {
            admin.role = "admin";
            AdminProvider.saveAdmin(admin).then(function (resp) {
                admin.societe.administre = true;
                SocieteProvider.update(admin.societe);
                $scope.admins.push(admin);
                new PNotify({
                    title: 'Admin ajouté avec succés',
                    text: 'Admin ' + admin.nom + ' ' + admin.prenom + ' a été ajouté avec succés',
                    type: 'success'
                });
            }, function (err) {
                console.error(err);
            });
        }

        $scope.selectAdmin = function (admin) {
            $scope.selectedAdmin = admin;
            $scope.oldAdmin = _.clone(admin);
        }
        $scope.update = function (admin) {
            AdminProvider.updateAdmin(admin).then(function (resp) {
                //$scope.oldAdmin.societe.administre = false;
                SocieteProvider.update($scope.oldAdmin.societe);

                admin.societe.administre = true;
                SocieteProvider.update(admin.societe);
                AdminProvider.getBySocieteAndRole($scope.selectedAdmin.societe, 'admin').then(function (admins) {
                    if (admins.length == 0) {
                        $scope.selectedAdmin.societe.administre = false;
                        SocieteProvider.update($scope.selectedAdmin.societe);
                    }
                }, function (err) {
                    console.error(err);
                });
                new PNotify({
                    title: 'Admin modifié avec succés',
                    text: 'Admin ' + admin.nom + ' ' + admin.prenom + ' a été modifié avec succés',
                    type: 'success'
                });
                $scope.admins[$scope.admins.indexOf($scope.selectedAdmin)] = $scope.oldAdmin;
            }, function (err) {
                console.error(err);
            });
        };
        $scope.delete = function (admin) {
            AdminProvider.deleteAdmin(admin).then(function (resp) {
                admin.societe.administre = false;
                SocieteProvider.update(admin.societe);
                new PNotify({
                    title: 'Admin supprimé avec succés',
                    text: 'Admin ' + admin.nom + ' ' + admin.prenom + ' a été supprimé avec succés',
                    type: 'success'
                });
                AdminProvider.getBySociete($scope.selectedAdmin.societe).then(function (admins) {
                    if (admins.length == 0) {
                        $scope.selectedAdmin.societe.administre = false;
                        SocieteProvider.update($scope.selectedAdmin.societe);
                    }
                }, function (err) {
                    console.error(err);
                });
                $scope.admins.splice($scope.admins.indexOf(admin), 1);
            }, function (err) {
                console.error(err);
            });
        };

        SocieteProvider.getSocietes().then(function (resp) {
            $scope.societes = resp;

        }, function (err) {
            console.error(err);
        });
    });
