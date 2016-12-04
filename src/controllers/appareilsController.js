'use strict';

app.controller('AppareilsController', function ($scope, AdminProvider, AppareilProvider, SocieteProvider) {
    /*window.gMapsCallback = function () {
     $(window).trigger('gMapsLoaded');
     }

     $(document).ready((function () {
     var map, pos, busMarkers = [], appareilMarkers = [];

     function initialize() {
     pos = {
     lat: 35.758075,
     lng: 10.596399
     };

     var mapOptions = {
     zoom: 8,
     center: new google.maps.LatLng(pos.lat, pos.lng),
     mapTypeId: google.maps.MapTypeId.ROADMAP
     };
     map = new google.maps.Map(document.getElementById('map'), mapOptions);
     var busIcon = {
     url: 'vendor/imagess/bus.png',
     size: new google.maps.Size(32, 37),
     origin: new google.maps.Point(0, 0),
     anchor: new google.maps.Point(10, 34)
     };
     var busStopIcon = {
     url: 'vendor/imagess/busstop.png',
     size: new google.maps.Size(32, 37),
     origin: new google.maps.Point(0, 0),
     anchor: new google.maps.Point(10, 34)
     };

     window.setInterval(function () {
     AppareilProvider.getAll().then(function (appareils) {

     if (appareilMarkers.length) {
     appareilMarkers.forEach(function (appareilMarker) {
     appareilMarker.setMap(null);
     });
     }
     appareilMarkers = new Array(appareils.length);
     appareils.forEach(function (appareil) {

     AppareilProvider.getAppareilPosition(appareil).then(function (appareilPosition) {


     if (appareilPosition.localisation) {

     var appareilMarker = new google.maps.Marker({
     position: {
     lat: appareilPosition.localisation.x, lng: appareilPosition.localisation.y
     },
     map: map,
     title: appareil.reference,
     icon: busIcon
     });
     appareilMarker.addListener('click', function () {
     var infoWindow = new google.maps.InfoWindow({map: map});
     infoWindow.setPosition({
     lat: appareilPosition.localisation.x, lng: appareilPosition.localisation.y
     });
     AppareilProvider.getAppareilDistance(appareil).then(function (distance) {

     AppareilProvider.getAppareilVitesse(appareil).then(function (vitesse) {
     infoWindow.setContent('<strong>' + appareil.reference + '</strong><br>Distance parcourue: ' + distance + ' Km<br>Vitesse: ' + vitesse + ' Km/s');
     }, function (err) {
     console.error(err);
     });
     }, function (err) {
     console.error(err);
     });

     });
     appareilMarkers.push(appareilMarker);
     }
     }, function (err) {
     console.error(err);
     });
     });
     }, function (err) {
     console.error(err);
     });
     }, 2000);
     }


     function loadGoogleMaps() {
     var script_tag = document.createElement('script');
     script_tag.setAttribute("type", "text/javascript");
     script_tag.setAttribute("src", "http://maps.google.com/maps/api/js?key=AIzaSyCFIrO_FkWanN6bqCu2oWIyh5mxdj7-cGs&callback=gMapsCallback");
     (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
     }

     $(window).bind('gMapsLoaded', initialize);
     loadGoogleMaps();
     })());*/

    AppareilProvider.getAll().then(function (resp) {
        $scope.appareils = resp;
    }, function (err) {
        console.error(err);
        new PNotify({
            title: 'Données non disponible',
            type: 'dark',
            text: 'SVP, vérifier votre connexion Internet.',
            nonblock: {nonblock: true, nonblock_opacity: .2}
        });
    });

    $scope.save = function (appareil) {

        AppareilProvider.save(appareil).then(function (resp) {
            $scope.appareils.push(appareil);
            new PNotify({
                title: 'Appareil ajouté avec succés',
                text: 'Appareil ' + appareil.reference + ' a été ajouté avec succés',
                type: 'success'
            });
        }, function (err) {
            console.error(err);
            new PNotify({
                title: 'Echéc lors de l\'ajout du appareil',
                text: 'Un autre appareil ayant ce référence est déja existant!',
                type: 'error'
            });
        });
    }
    $scope.updateAppareil = function (appareil) {
        $scope.selectedAppareil = appareil;
        $scope.oldAppareil = _.clone(appareil);
    };
    $scope.update = function (appareil) {
        AppareilProvider.update(appareil).then(function (resp) {
            new PNotify({
                title: 'Appareil modifié avec succés',
                text: 'Appareil ' + appareil.reference + ' a été modifié avec succés',
                type: 'success'
            });
        }, function (err) {
            console.error(err);
            new PNotify({
                title: 'Echéc lors de la modification du appareil',
                text: 'Un autre appareil ayant ce référence est déja existant!',
                type: 'error'
            });
        });
        ;
    };

    SocieteProvider.getSocietes().then(function (resp) {
        $scope.societes = resp;

    }, function (err) {
        console.error(err);
    });

    $scope.deleteAppareil = function (appareil) {
        $scope.selectedAppareil = appareil;
        $scope.oldAppareil = _.clone(appareil);
    };
    $scope.delete = function (appareil) {
        AppareilProvider.delete(appareil).then(function (resp) {
            $scope.appareils.splice($scope.appareils.indexOf(appareil), 1);
            new PNotify({
                title: 'Appareil supprimé avec succés',
                text: 'Appareil ' + appareil.reference + ' a été supprimé avec succés',
                type: 'success'
            });
        }, function (err) {
            console.error(err);
            new PNotify({
                title: 'Echéc lors de la suppression du appareil',
                text: 'Ce appareil n\'a pas pu être supprimé',
                type: 'error'
            });
        });
    };
});
