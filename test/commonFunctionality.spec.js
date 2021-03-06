﻿/// <reference path="../node_modules/grunt-contrib-jasmine/vendor/jasmine-1.3.1/jasmine.js" />
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

    describe("WineApi common functionality", function () {

        it("should provide a constructor", function () {
            var wineApi = new WineApi();
            expect(wineApi).not.toBeNull();
        });

        it("object created via the constructor should have the correct constructor property", function () {
            var wineApi = new WineApi();
            expect(wineApi.constructor).toBe(WineApi);
        });

        it("can set apikey via the constructor", function () {
            var wineApi = new WineApi("myApiKey");
            expect(wineApi.apiKey()).toBe("myApiKey");
        });

        it("can set apikey and affiliateId via the constructor", function () {
            var wineApi = new WineApi("myApiKey", "myAffiliateId");
            expect(wineApi.apiKey()).toBe("myApiKey");
            expect(wineApi.affiliateId()).toBe("myAffiliateId");
        });

        it("can set and get apikey via the apiKey method", function () {
            var wineApi = new WineApi();
            wineApi.apiKey("newApiKey");
            expect(wineApi.apiKey()).toBe("newApiKey");
        });

        it("can set and get the affiliateId via the affiliateId method", function () {
            var wineApi = new WineApi();
            wineApi.affiliateId("newAffiliateId");
            expect(wineApi.affiliateId()).toBe("newAffiliateId");
        });

        it("version has a sensible default", function () {
            var wineApi = new WineApi();
            expect(wineApi.version()).toBe("beta2");
        });

        it("can set and get the version via the version method", function () {
            var wineApi = new WineApi();
            wineApi.version("newVersion");
            expect(wineApi.version()).toBe("newVersion");
        });

        it("can get the url via the url method", function () {
            var wineApi = new WineApi();
            wineApi.catalogService();
            expect(wineApi.url()).toContain("catalog");
            expect(wineApi.url()).toContain("?apikey=");
        });

        it("can reset the url via the reset method", function () {
            var wineApi = new WineApi();
            wineApi.catalogService();
            wineApi.reset();
            expect(wineApi.url()).toBe("");
        });

        it("instances of WineApi behave independently", function () {
            var wineApi1 = new WineApi("apiKey1", "affiliateId1");
            var wineApi2 = new WineApi("apiKey2", "affiliateId2");
            expect(wineApi1.apiKey()).toBe("apiKey1");
            expect(wineApi1.affiliateId()).toBe("affiliateId1");
            expect(wineApi2.apiKey()).toBe("apiKey2");
            expect(wineApi2.affiliateId()).toBe("affiliateId2");
        });

        describe("chaining", function () {

            it("main service methods return this", function () {
                var wineApi = new WineApi();
                expect(wineApi.catalogService()).toBe(wineApi);
                expect(wineApi.categoryMapService()).toBe(wineApi);
                expect(wineApi.referenceService()).toBe(wineApi);
            });

            it("option methods return this", function () {
                var wineApi = new WineApi();
                expect(wineApi.offset()).toBe(wineApi);
                expect(wineApi.size()).toBe(wineApi);
                expect(wineApi.categoriesFilter()).toBe(wineApi);
                expect(wineApi.ratingFilter()).toBe(wineApi);
                expect(wineApi.priceFilter()).toBe(wineApi);
                expect(wineApi.productFilter()).toBe(wineApi);
                expect(wineApi.search()).toBe(wineApi);
                expect(wineApi.state()).toBe(wineApi);
                expect(wineApi.instock()).toBe(wineApi);
                expect(wineApi.sort()).toBe(wineApi);
            });
        });

        describe("when a service is called with no options then the url", function () {

            var _testServiceName = function (wineApi, serviceFunction, serviceName) {
                wineApi.reset();
                var url = serviceFunction.call(wineApi).url();
                expect(url).toContain("/json/" + serviceName + "?");
            };

            var _testApiKey = function (wineApi, serviceFunction) {
                wineApi.reset();
                var url = serviceFunction.call(wineApi).url();
                expect(url).toContain("?apikey=" + wineApi.apiKey());
            };

            var _testAffiliateId = function (wineApi, serviceFunction) {
                wineApi.reset();
                var url = serviceFunction.call(wineApi).url();
                expect(url).toContain("&affiliateId=" + wineApi.affiliateId());
            };

            var _testAbsenceOfAffiliateId = function (wineApi, serviceFunction) {
                wineApi.reset();
                var url = serviceFunction.call(wineApi).url();
                expect(url).not.toContain("&affiliateId=");
            };

            it("should contain the name of the service before the query string question mark", function () {
                var wineApi = new WineApi();
                _testServiceName(wineApi, wineApi.catalogService, "catalog");
                _testServiceName(wineApi, wineApi.categoryMapService, "categorymap");
                _testServiceName(wineApi, wineApi.referenceService, "reference");
            });

            it("should contain the apikey name/value pair after the query string question mark", function () {
                var wineApi = new WineApi("MyApiKeyValue");
                _testApiKey(wineApi, wineApi.catalogService);
                _testApiKey(wineApi, wineApi.categoryMapService);
                _testApiKey(wineApi, wineApi.referenceService);
            });

            it("should contain the affiliateId name/value pair if affiliateId value was passed to the constructor", function () {
                var wineApi = new WineApi("MyApiKeyValue", "MyAffiliateIdValue");
                _testAffiliateId(wineApi, wineApi.catalogService);
                _testAffiliateId(wineApi, wineApi.categoryMapService);
                _testAffiliateId(wineApi, wineApi.referenceService);
            });

            it("should not contain the affiliateId name/value pair if no affiliateId value was passed to the constructor", function () {
                var wineApi = new WineApi("MyApiKeyValue");
                _testAbsenceOfAffiliateId(wineApi, wineApi.catalogService);
                _testAbsenceOfAffiliateId(wineApi, wineApi.categoryMapService);
                _testAbsenceOfAffiliateId(wineApi, wineApi.referenceService);
            });
        });
    });
} ());
