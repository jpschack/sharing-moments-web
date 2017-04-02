angular.module('googleLocationServices').service('$googleLocationService', function($http, env) {
    return {
        getLocationByID: function (id) {
            var url = '/api/google/maps/places/details/json?placeid=' + id + '&key=' + env.googleMapsApiKey;
            return $http.get(url)
                .then(
                    function (response) {
                        if (response.data.result) {
                            return response.data.result;
                        } else {
                            return [];
                        }
                },
                function (httpError) {
                    throw { 'status': httpError.status , 'data': httpError.data };
                });
        },
        getLocationsByTextSearch: function (searchInput) {
            var url = '/api/google/maps/places/textsearch/json?query=' + escape(searchInput) + '&key=' + env.googleMapsApiKey;
            return $http.get(url)
                .then(
                    function (response) {
                        if (response.data.results) {
                            return response.data.results;
                        } else {
                            return [];
                        }
                },
                function (httpError) {
                    throw { 'status': httpError.status , 'data': httpError.data };
                });
        },
        getLocationsByGeoLocation: function (geoLocation, searchInput) {
            var url = '/api/google/maps/places/nearbysearch/json?location=' + geoLocation.latitude + ',' + geoLocation.longitude + '&radius=20000' + '&key=' + env.googleMapsApiKey;
            if (searchInput) {
                url += '&keyword=' + escape(searchInput);
            }

            return $http.get(url)
                .then(
                    function (response) {
                        if (response.data.results) {
                            return response.data.results;
                        } else {
                            return [];
                        }
                },
                function (httpError) {
                    throw { 'status': httpError.status , 'data': httpError.data };
                });
        }
    };
});