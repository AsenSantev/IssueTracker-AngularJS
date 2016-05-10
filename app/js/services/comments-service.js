'use strict';

angular.module('issueTracker.services.comments', [])
    .factory('comments', ['$http', '$q', 'BASE_URL', function($http, $q, baseUrl) {
        function getIssueComments(id) {
            var deferred = $q.defer();

            var request = {
                method: 'GET',
                url: baseUrl + 'issues/' + id + '/comments',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token
                }
            };

            $http(request)
                .then(function success(response) {
                    deferred.resolve(response.data);
                }, function error(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function addCommentToIssue(issueId, comment) {
            var deferred = $q.defer();

            var request = {
                method: 'POST',
                url: baseUrl + 'issues/' + issueId + '/comments',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token
                },
                data: comment
            };

            $http(request)
                .then(function success(response) {
                    deferred.resolve(response.data);
                }, function error(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        return {
            getIssueComments: getIssueComments,
            addCommentToIssue: addCommentToIssue
        }
    }]);