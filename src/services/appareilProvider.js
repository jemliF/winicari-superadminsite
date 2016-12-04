'use strict';

app.service('AppareilProvider', function ($http, secHeaders, $q, apiAddress) {

    this.save = function (appareil) {
        
        var deferred = $q.defer();
        $http.post(apiAddress + '/api/appareils', appareil, {
            headers: secHeaders
        }).success(function (resp) {
            
            deferred.resolve(resp);
        }).error(function (err) {
            

            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }
    this.get = function (societe) {

        
        var deferred = $q.defer();
        $http.get(apiAddress + '/api/appareils', {
            headers: secHeaders
        }).success(function (resp) {
            
            deferred.resolve(resp);
        }).error(function (err) {
            

            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.getAll = function () {

        
        var deferred = $q.defer();
        $http.get(apiAddress + '/api/appareils', {
            headers: secHeaders
        }).success(function (resp) {
            
            deferred.resolve(resp);
        }).error(function (err) {
            

            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.getAppareilPosition = function (appareil) {

        
        var deferred = $q.defer();
        $http.get(apiAddress + '/api/appareils/' + appareil.id + '/position', {
            headers: secHeaders
        }).success(function (resp) {
            
            deferred.resolve(resp);
        }).error(function (err) {
            
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.getAppareilVitesse = function (appareil) {

        
        var deferred = $q.defer();
        $http.get(apiAddress + '/api/appareils/' + appareil.id + '/vitesse', {
            headers: secHeaders
        }).success(function (resp) {
            
            deferred.resolve(resp);
        }).error(function (err) {
            
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.getAppareilDistance = function (appareil) {

        
        var deferred = $q.defer();
        $http.get(apiAddress + '/api/appareils/' + appareil.id + '/distance', {
            headers: secHeaders
        }).success(function (resp) {
            
            deferred.resolve(resp);
        }).error(function (err) {
            
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.update = function (appareil) {

        
        var deferred = $q.defer();
        $http.put(apiAddress + '/api/appareils/' + appareil.id, appareil, {
            headers: secHeaders
        }).success(function (resp) {
            
            deferred.resolve(resp);
        }).error(function (err) {
            
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.delete = function (appareil) {
        
        var deferred = $q.defer();
        $http.delete(apiAddress + '/api/appareils/' + appareil.id, {
            headers: secHeaders
        }).success(function (resp) {
            
            deferred.resolve(resp);
        }).error(function (err) {
            

            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }
});