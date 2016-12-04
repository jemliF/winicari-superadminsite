'use strict';

app.service('SuperAdminProvider', function ($resource, $q, apiAddress, $http, secHeaders) {

    this.getSuperAdmins = function () {
        var deferred = $q.defer();
        $http.get(apiAddress + '/api/superadmins', {
            headers: secHeaders
        }).success(function (resp) {
            
            deferred.resolve(resp);
        }).error(function (err) {
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.getSuperAdminById = function (id) {
        var deferred = $q.defer();
        $http.get(apiAddress + '/api/superadmins/' + id, {
            headers: secHeaders
        }).success(function (resp) {
            
            deferred.resolve(resp);
        }).error(function (err) {
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.update = function (superAdmin) {
        var deferred = $q.defer();
        $http.put(apiAddress + '/api/superadmins/' + superAdmin.id, superAdmin, {
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