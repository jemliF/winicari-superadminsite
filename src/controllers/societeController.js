'use strict';

app.controller('SocieteController', function ($scope, SocieteProvider, AdminProvider) {
    SocieteProvider.getSocietes().then(function (resp) {
        $scope.societes = resp;
        
    }, function (err) {
        console.error(err);
    });

    $scope.bloquer = function (societe) {
        societe.active = false;
        SocieteProvider.update(societe).then(function (resp) {
            new PNotify({
                title: 'Société bloquée avec succés',
                text: 'Société ' + societe.nom + ' a été bloquée avec succés',
                type: 'success'
            });
        }, function (err) {
            console.error(err);
        });
    }

    $scope.debloquer = function (societe) {
        societe.active = true;
        SocieteProvider.update(societe).then(function (resp) {
            new PNotify({
                title: 'Société débloquée avec succés',
                text: 'Société ' + societe.nom + ' a été débloquée avec succés',
                type: 'success'
            });
        }, function (err) {
            console.error(err);
        });
    }

    $scope.add = function (societe) {
        societe.administre = false;
        societe.active = true;
        SocieteProvider.update(societe).then(function (resp) {
            $scope.societes.push(societe);
            new PNotify({
                title: 'Société ajoutée avec succés',
                text: 'Société ' + societe.nom + ' a été ajoutée avec succés',
                type: 'success'
            });
        }, function (err) {
            console.error(err);
        });
    }

    $scope.selectSociete = function (societe) {
        $scope.selectedSociete = societe;
        $scope.oldSociete = _.clone(societe);
    };
    $scope.update = function (societe) {
        SocieteProvider.update(societe).then(function (resp) {
            new PNotify({
                title: 'Société modifiée avec succés',
                text: 'Société ' + societe.nom + ' a été modifiée avec succés',
                type: 'success'
            });
            $scope.societes[$scope.societes.indexOf($scope.selectedSociete)] = $scope.oldSociete;
        }, function (err) {
            console.error(err);
        });
    };

    $scope.delete = function (societe) {
        SocieteProvider.delete(societe).then(function (resp) {
            $scope.societes.splice($scope.societes.indexOf(societe), 1);
            AdminProvider.getBySocieteAndRole(societe, 'admin').then(function (resp) {
                
                resp.forEach(function (admin) {
                    AdminProvider.deleteAdmin(admin);
                })
            }, function (err) {
                console.error(err);
            });
            new PNotify({
                title: 'Société supprimée avec succés',
                text: 'Société ' + societe.nom + ' a été supprimée avec succés',
                type: 'success'
            });
        }, function (err) {
            console.error(err);
        });
    };
});