/// <reference path="../node_modules/grunt-contrib-jasmine/vendor/jasmine-1.3.1/jasmine.js" />
/// <reference path="../WineApi.js" />

// ReSharper disable InconsistentNaming

/* global require */

(function() {

    "use strict";

    // ReSharper disable UseOfImplicitGlobalInFunctionScope
    require("jasmine-node");
    // ReSharper restore UseOfImplicitGlobalInFunctionScope

    // ReSharper disable UseOfImplicitGlobalInFunctionScope
    var WineApi = require("../WineApi.js");
    // ReSharper restore UseOfImplicitGlobalInFunctionScope

    describe("WineApi category queries", function() {

        describe("when called with various options passed as a param", function () {

            describe("categoriesFilter option", function () {

                it("categoriesFilter with a single value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService({ categoriesFilter: 124 })
                        .url();
                    expect(url).toContain("&filter=categories(124)");
                });

                it("categoriesFilter with a single value in an array is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService({ categoriesFilter: [124] })
                        .url();
                    expect(url).toContain("&filter=categories(124)");
                });

                it("categoriesFilter with 2 values is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService({ categoriesFilter: [124, 125] })
                        .url();
                    expect(url).toContain("&filter=categories(124+125)");
                });
            });

            describe("ratingFilter option", function () {

                it("ratingFilter with a single value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService({ ratingFilter: 92 })
                        .url();
                    expect(url).toContain("&filter=rating(92)");
                });

                it("ratingFilter with a single value in an array is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService({ ratingFilter: [92] })
                        .url();
                    expect(url).toContain("&filter=rating(92)");
                });

                it("ratingFilter with a 2 values is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService({ ratingFilter: [92, 98] })
                        .url();
                    expect(url).toContain("&filter=rating(92|98)");
                });
            });

            describe("search option", function () {

                it("search with single word is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService({ search: "gamay" })
                        .url();
                    expect(url).toContain("&search=gamay");
                });

                it("search with 2 words is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService({ search: "gamay french" })
                        .url();
                    expect(url).toContain("&search=gamay+french");
                });

                it("search with 2 words and extraneous whitespace is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService({ search: "    \t  gamay    french\t\t  " })
                        .url();
                    expect(url).toContain("&search=gamay+french");
                });
            });

            describe("show option", function () {

                it("show with a single value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService({ show: 4 })
                        .url();
                    expect(url).toContain("&show=(4)");
                });

                it("show with a single value in an array is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService({ show: [4] })
                        .url();
                    expect(url).toContain("&show=(4)");
                });

                it("show with 2 values is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService({ show: [4, 5] })
                        .url();
                    expect(url).toContain("&show=(4+5)");
                });
            });
        });

        describe("when called with various options passed via chaining", function () {

            describe("categoriesFilter option", function () {

                it("categoriesFilter with a single value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService()
                        .categoriesFilter(124)
                        .url();
                    expect(url).toContain("&filter=categories(124)");
                });

                it("categoriesFilter with a single value in an array is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService()
                        .categoriesFilter([124])
                        .url();
                    expect(url).toContain("&filter=categories(124)");
                });

                it("categoriesFilter with 2 values is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService()
                        .categoriesFilter([124, 125])
                        .url();
                    expect(url).toContain("&filter=categories(124+125)");
                });
            });

            describe("ratingFilter option", function () {

                it("ratingFilter with a single value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService()
                        .ratingFilter(92)
                        .url();
                    expect(url).toContain("&filter=rating(92)");
                });

                it("ratingFilter with a single value in an array is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService()
                        .ratingFilter([92])
                        .url();
                    expect(url).toContain("&filter=rating(92)");
                });

                it("ratingFilter with a 2 values is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService()
                        .ratingFilter([92, 98])
                        .url();
                    expect(url).toContain("&filter=rating(92|98)");
                });
            });

            describe("search option", function () {

                it("search with single word is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService()
                        .search("gamay")
                        .url();
                    expect(url).toContain("&search=gamay");
                });

                it("search with 2 words is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService()
                        .search("gamay french")
                        .url();
                    expect(url).toContain("&search=gamay+french");
                });

                it("search with 2 words and extraneous whitespace is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService()
                        .search("    \t  gamay    french\t\t  ")
                        .url();
                    expect(url).toContain("&search=gamay+french");
                });
            });

            describe("show option", function () {

                it("show with a single value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService()
                        .show(4)
                        .url();
                    expect(url).toContain("&show=(4)");
                });

                it("show with a single value in an array is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService()
                        .show([4])
                        .url();
                    expect(url).toContain("&show=(4)");
                });

                it("show with 2 values is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.categoryMapService()
                        .show([4, 5])
                        .url();
                    expect(url).toContain("&show=(4+5)");
                });
            });
        });
    });
}());
