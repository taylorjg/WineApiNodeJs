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
    var WineApi = require("../WineApi.js");
    // ReSharper restore UseOfImplicitGlobalInFunctionScope

    describe("WineApi reference library queries", function () {

        describe("when called with various options passed as a param", function () {

            describe("categoriesFilter option", function () {

                it("categoriesFilter with a single value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.referenceService({ categoriesFilter: 124 })
                        .url();
                    expect(url).toContain("&filter=categories(124)");
                });

                it("categoriesFilter with a single value in an array is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.referenceService({ categoriesFilter: [124] })
                        .url();
                    expect(url).toContain("&filter=categories(124)");
                });

                it("categoriesFilter with 2 values is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.referenceService({ categoriesFilter: [124, 125] })
                        .url();
                    expect(url).toContain("&filter=categories(124+125)");
                });
            });
        });

        describe("when called with various options passed via chaining", function () {

            describe("categoriesFilter option", function () {

                it("categoriesFilter with a single value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.referenceService()
                        .categoriesFilter(124)
                        .url();
                    expect(url).toContain("&filter=categories(124)");
                });

                it("categoriesFilter with a single value in an array is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.referenceService()
                        .categoriesFilter([124])
                        .url();
                    expect(url).toContain("&filter=categories(124)");
                });

                it("categoriesFilter with 2 values is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.referenceService()
                        .categoriesFilter([124, 125])
                        .url();
                    expect(url).toContain("&filter=categories(124+125)");
                });
            });
        });
    });
} ());
