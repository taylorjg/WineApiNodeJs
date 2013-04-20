/// <reference path="../node_modules/grunt-contrib-jasmine/vendor/jasmine-1.3.1/jasmine.js" />
/// <reference path="../WineApi.js" />

// ReSharper disable InconsistentNaming

/* global require */

(function () {

    "use strict";

// ReSharper disable UseOfImplicitGlobalInFunctionScope
    require("jasmine-node");
// ReSharper restore UseOfImplicitGlobalInFunctionScope

// ReSharper disable UseOfImplicitGlobalInFunctionScope
    var UrlBuilder = require("../WineApi.js");
// ReSharper restore UseOfImplicitGlobalInFunctionScope

    describe("UrlBuilder", function () {

        it("should provide a constructor", function () {
            var urlBuilder = new UrlBuilder();
            expect(urlBuilder).not.toBeNull();
        });

        it("object created via the constructor should have the correct constructor property", function () {
            var urlBuilder = new UrlBuilder();
            expect(urlBuilder.constructor).toBe(UrlBuilder);
        });
    });
} ());
