'use strict';

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'IndexController',
            templateUrl: 'views/acceuil.html',
            resolve: {loggedIn: onlyLoggedIn}
        })
        .when('/admins', {
            controller: 'AdminsController',
            templateUrl: 'views/admins.html',
            resolve: {loggedIn: onlyLoggedIn}
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'views/login.html',
            resolve: {loggedIn: onlyLoggedIn}
        })
        .when('/societes', {
            controller: 'SocieteController',
            templateUrl: 'views/societes.html',
            resolve: {loggedIn: onlyLoggedIn}
        })
        .when('/appareils', {
            controller: 'AppareilsController',
            templateUrl: 'views/appareils.html',
            resolve: {loggedIn: onlyLoggedIn}
        })
        .when('/profile', {
            controller: 'ProfileController',
            templateUrl: 'views/profile.html',
            resolve: {loggedIn: onlyLoggedIn}
        })
        .when('/addAdmin', {
            controller: 'AddAdminController',
            templateUrl: 'views/addAdmin.html',
            resolve: {loggedIn: onlyLoggedIn}
        })
        .when('/logout', {
            controller: 'IndexController',
            resolve: {loggedIn: onlyLoggedIn}
        });
});


var onlyLoggedIn = function ($location, $q) {
    var deferred = $q.defer();
    if (localStorage.superAdminId === undefined || !localStorage.superAdminId.length) {
        window.location = '/superadminsite/login/index';
        deferred.reject();
    } else {
        deferred.resolve();
    }
    return deferred.promise;
};