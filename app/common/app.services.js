angular.module('app.services').service('$modalSinglePhotoView', function($uibModal, $rootScope) {
    return {
        open: function (properties, opts) {
            var scope = $rootScope.$new();
            angular.extend(scope, properties);

            opts = angular.extend(opts || {}, {
                scope: scope,
                templateUrl: 'app/modalPhoto/modalSinglePhotoView.html',
                windowClass: 'single-photo-modal'
            });
            var modalSinglePhotoView = $uibModal.open(opts);
            modalSinglePhotoView.result.then(function () {}, function () {});

            return modalSinglePhotoView;
        }
    };
});

angular.module('app.services').service('$geoLocationService', function($q, $window) {
    return {
        getCurrentPosition: function () {
            var deferred = $q.defer();

            if (!$window.navigator.geolocation) {
                deferred.reject('Geolocation not supported.');
            } else {
                $window.navigator.geolocation.getCurrentPosition(function (position) {
                    deferred.resolve(position);
                },
                function (err) {
                    deferred.reject(err);
                });
            }

        return deferred.promise;
        }
    };
});

angular.module('app.services').service('$dateEncoder', function() {
    return {
        formatDate: function (date) {
            return date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        }
    };
});