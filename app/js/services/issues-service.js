'use strict';

angular.module('issueTracker.services.issues', [])
    .factory('issues', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, baseUrl) {

        function getMyIssues(criteria, params) {
            var deferred = $q.defer();

            var request = {
                method: 'GET',
                url: baseUrl + 'issues/me?orderBy=' + criteria + ' desc&pageSize=' + params.pageSize + '&pageNumber=' + params.pageNumber,
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

        function getIssueById(id) {
            var deferred = $q.defer();

            var request = {
                method: 'GET',
                url: baseUrl + 'issues/' + id,
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

        function editIssue(issue, id) {
            var deferred = $q.defer();

            var dataLabels = '';
            issue.Labels.forEach(function(l, index) {
                dataLabels += '&labels[' + index + '].Name=' + l.trim();
            });

            var data = 'Title=' + issue.Title +
                    '&Description=' + issue.Description +
                    '&DueDate=' + issue.DueDate.toISOString() +
                    '&AssigneeId=' + issue.AssigneeId +
                    '&PriorityId=' + issue.PriorityId +
                    dataLabels;

            var request = {
                method: 'PUT',
                url: baseUrl + 'issues/' + id,
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            };

            $http(request)
                .then(function success(response) {
                    deferred.resolve(response.data);
                }, function error(err) {
                    console.log(err);
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function changeStatus(issueId, statusId) {
            var deferred = $q.defer();

            var request = {
                method: 'PUT',
                url: baseUrl + 'issues/' + issueId + '/changestatus?statusid=' + statusId,
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token,
                }
            };

            $http(request)
                .then(function success(response) {
                    deferred.resolve(response);
                }, function error() {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        return {
            getUserIssues: getMyIssues,
            getIssueById: getIssueById,
            editIssue: editIssue,
            changeStatus: changeStatus
        }
    }]);