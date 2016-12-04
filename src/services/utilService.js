'use strict';

app
    .factory('apiAddress', function () {
        return 'http://localhost:8080'
        /*51.254.212.179*/
    })
    .factory('secHeaders', function () {
        var authdata = {
            username: 'user',
            password: 'ramindjawadi'
        };
        var headers = authdata && authdata.username ? {
            Authorization: "Basic "
            + btoa(authdata.username + ":"
                + authdata.password)
        } : {};
        return headers;
    })
    .factory('noConnectionNotify', function () {
        return new PNotify({
            title: 'Données non disponible',
            type: 'dark',
            text: 'SVP, vérifier votre connexion Internet.',
            nonblock: {
                nonblock: true,
                nonblock_opacity: .2
            }
        });
    })
    .factory('superAdminId', function () {
        return localStorage.getItem('superAdminId');
    });