'use strict';

const polyline = require('@mapbox/polyline');

/**
 * Creates a polyline-encoded circle around a given point
 * @param {Number}  lat     Latitude for the center of the circle
 * @param {Number}  lng     Longitude for the center of the circle
 * @param {Number}  radius  Radius of the circle (in meters)
 * @returns {String} A polyline encoded circle
 */
module.exports = function(lat, lng, radius) {
    var earth_radius = 6371;

    var pi = Math.PI;

    lat = (lat * pi) / 180;
    lng = (lng * pi) / 180;

    var d = (radius / 1000) / earth_radius;

    var points = [];

    for (var i = 0; i <= 360; i += 12) {
        var brng = i * pi / 180;

        var pLat = Math.asin(Math.sin(lat) * Math.cos(d) + Math.cos(lat) * Math.sin(d) * Math.cos(brng));

        points.push([
            (pLat * 180) / pi,
            ((lng + Math.atan2(Math.sin(brng) * Math.sin(d) * Math.cos(lat), Math.cos(d) - Math.sin(lat) * Math.sin(pLat))) * 180) / pi
        ]);
    }

    return polyline.encode(points);
};
