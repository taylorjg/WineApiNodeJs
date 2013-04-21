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

    describe("WineApi catalog queries", function () {

        describe("when called with no options", function () {

            it("should contain the name of the service before the query string question mark", function () {
                var wineApi = new WineApi();
                var url = wineApi.catalogService()
                        .url();
                expect(url).toContain("/json/catalog?");
            });

            it("should contain the apikey name/value pair after the query string question mark", function () {
                var myApiKey = "MyApiKeyValue";
                var wineApi = new WineApi(myApiKey);
                var url = wineApi.catalogService()
                        .url();
                expect(url).toContain("?apikey=" + myApiKey);
            });

            it("should contain the affiliateId name/value pair if affiliateId value was passed to the constructor", function () {
                var myApiKey = "MyApiKeyValue";
                var myAffiliateId = "MyAffiliateIdValue";
                var wineApi = new WineApi(myApiKey, myAffiliateId);
                var url = wineApi.catalogService()
                        .url();
                expect(url).toContain("&affiliateId=" + myAffiliateId);
            });

            it("should not contain the affiliateId name/value pair if no affiliateId value was passed to the constructor", function () {
                var myApiKey = "MyApiKeyValue";
                var wineApi = new WineApi(myApiKey);
                var url = wineApi.catalogService()
                        .url();
                expect(url).not.toContain("&affiliateId=");
            });
        });

        describe("when called with various options passed as a param", function () {

            describe("offset option", function () {
                it("offset option is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ offset: 23 })
                        .url();
                    expect(url).toContain("&offset=23");
                });
            });

            describe("size option", function () {
                it("size option is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ size: 46 })
                        .url();
                    expect(url).toContain("&size=46");
                });
            });

            describe("categoriesFilter option", function () {

                it("categoriesFilter with a single value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ categoriesFilter: 124 })
                        .url();
                    expect(url).toContain("&filter=categories(124)");
                });

                it("categoriesFilter with a single value in an array is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ categoriesFilter: [124] })
                        .url();
                    expect(url).toContain("&filter=categories(124)");
                });

                it("categoriesFilter with 2 values is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ categoriesFilter: [124, 125] })
                        .url();
                    expect(url).toContain("&filter=categories(124+125)");
                });
            });

            describe("ratingFilter option", function () {

                it("ratingFilter with a single value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ ratingFilter: 92 })
                        .url();
                    expect(url).toContain("&filter=rating(92)");
                });

                it("ratingFilter with a single value in an array is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ ratingFilter: [92] })
                        .url();
                    expect(url).toContain("&filter=rating(92)");
                });

                it("ratingFilter with a 2 values is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ ratingFilter: [92, 98] })
                        .url();
                    expect(url).toContain("&filter=rating(92|98)");
                });
            });

            describe("priceFilter option", function () {

                it("priceFilter with a single value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ priceFilter: 20 })
                        .url();
                    expect(url).toContain("&filter=price(20)");
                });

                it("priceFilter with a single value in an array is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ priceFilter: [20] })
                        .url();
                    expect(url).toContain("&filter=price(20)");
                });

                it("priceFilter with a 2 values is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ priceFilter: [20, 50] })
                        .url();
                    expect(url).toContain("&filter=price(20|50)");
                });
            });

            describe("productFilter option", function () {

                it("productFilter with a single value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ productFilter: 1234 })
                        .url();
                    expect(url).toContain("&filter=product(1234)");
                });

                it("productFilter with a single value in an array is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ productFilter: [1234] })
                        .url();
                    expect(url).toContain("&filter=product(1234)");
                });

                it("productFilter with 2 values is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ productFilter: [1234, 5678] })
                        .url();
                    expect(url).toContain("&filter=product(1234+5678)");
                });
            });

            describe("search option", function () {

                it("search with single word is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ search: "gamay" })
                        .url();
                    expect(url).toContain("&search=gamay");
                });

                it("search with 2 words is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ search: "gamay french" })
                        .url();
                    expect(url).toContain("&search=gamay+french");
                });

                it("search with 2 words and extraneous whitespace is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ search: "    \t  gamay    french\t\t  " })
                        .url();
                    expect(url).toContain("&search=gamay+french");
                });
            });

            describe("state option", function () {

                it("state is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ state: "ca" })
                        .url();
                    expect(url).toContain("&state=CA");
                });
            });

            describe("instock option", function () {

                it("instock with a value of true is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ instock: true })
                        .url();
                    expect(url).toContain("&instock=true");
                });

                it("instock with some other truthy value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ instock: "yes" })
                        .url();
                    expect(url).toContain("&instock=true");
                });

                it("instock with a value of false is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ instock: false })
                        .url();
                    expect(url).not.toContain("&instock=true");
                });

                it("instock with some other falsy value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ instock: 0 })
                        .url();
                    expect(url).not.toContain("&instock=true");
                });
            });

            describe("sort option", function () {

                var _testSortOptionOnItsOwn = function (sortOption) {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ sort: sortOption })
                        .url();
                    expect(url).toContain("&sort=" + sortOption + "|descending");
                };

                var _testSortOptionOnItsOwnInAnArray = function (sortOption) {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ sort: [sortOption] })
                        .url();
                    expect(url).toContain("&sort=" + sortOption + "|descending");
                };

                var _testSortOptionAndDirection = function (sortOption, sortDirection) {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ sort: [sortOption, sortDirection] })
                        .url();
                    expect(url).toContain("&sort=" + sortOption + "|" + sortDirection);
                };

                it("valid sort option on its own is handled correctly", function () {
                    _testSortOptionOnItsOwn("popularity");
                    _testSortOptionOnItsOwn("rating");
                    _testSortOptionOnItsOwn("vintage");
                    _testSortOptionOnItsOwn("winery");
                    _testSortOptionOnItsOwn("name");
                    _testSortOptionOnItsOwn("price");
                    _testSortOptionOnItsOwn("saving");
                    _testSortOptionOnItsOwn("justin");
                });

                it("valid sort option on its own in an array is handled correctly", function () {
                    _testSortOptionOnItsOwnInAnArray("popularity");
                    _testSortOptionOnItsOwnInAnArray("rating");
                    _testSortOptionOnItsOwnInAnArray("vintage");
                    _testSortOptionOnItsOwnInAnArray("winery");
                    _testSortOptionOnItsOwnInAnArray("name");
                    _testSortOptionOnItsOwnInAnArray("price");
                    _testSortOptionOnItsOwnInAnArray("saving");
                    _testSortOptionOnItsOwnInAnArray("justin");
                });

                it("valid sort option and valid sort direction are handled correctly", function () {
                    _testSortOptionAndDirection("popularity", "ascending");
                    _testSortOptionAndDirection("rating", "ascending");
                    _testSortOptionAndDirection("vintage", "ascending");
                    _testSortOptionAndDirection("winery", "ascending");
                    _testSortOptionAndDirection("name", "ascending");
                    _testSortOptionAndDirection("price", "ascending");
                    _testSortOptionAndDirection("saving", "ascending");
                    _testSortOptionAndDirection("justin", "ascending");

                    _testSortOptionAndDirection("popularity", "descending");
                    _testSortOptionAndDirection("rating", "descending");
                    _testSortOptionAndDirection("vintage", "descending");
                    _testSortOptionAndDirection("winery", "descending");
                    _testSortOptionAndDirection("name", "descending");
                    _testSortOptionAndDirection("price", "descending");
                    _testSortOptionAndDirection("saving", "descending");
                    _testSortOptionAndDirection("justin", "descending");
                });

                it("invalid sort option is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ sort: "bogus"})
                        .url();
                    expect(url).not.toContain("&sort=");
                });

                it("invalid sort direction is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ sort: ["name", "bogus"] })
                        .url();
                    expect(url).not.toContain("&sort=");
                });
            });
        });

        describe("when called with various options passed via chaining", function () {

            describe("offset option", function () {
                it("offset option is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .offset(23)
                        .url();
                    expect(url).toContain("&offset=23");
                });
            });

            describe("size option", function () {
                it("size option is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .size(46)
                        .url();
                    expect(url).toContain("&size=46");
                });
            });

            describe("categoriesFilter option", function () {

                it("categoriesFilter with a single value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .categoriesFilter(124)
                        .url();
                    expect(url).toContain("&filter=categories(124)");
                });

                it("categoriesFilter with a single value in an array is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .categoriesFilter([124])
                        .url();
                    expect(url).toContain("&filter=categories(124)");
                });

                it("categoriesFilter with 2 values is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .categoriesFilter([124, 125])
                        .url();
                    expect(url).toContain("&filter=categories(124+125)");
                });
            });

            describe("ratingFilter option", function () {

                it("ratingFilter with a single value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .ratingFilter(92)
                        .url();
                    expect(url).toContain("&filter=rating(92)");
                });

                it("ratingFilter with a single value in an array is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .ratingFilter([92])
                        .url();
                    expect(url).toContain("&filter=rating(92)");
                });

                it("ratingFilter with a 2 values is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .ratingFilter([92, 98])
                        .url();
                    expect(url).toContain("&filter=rating(92|98)");
                });
            });

            describe("priceFilter option", function () {

                it("priceFilter with a single value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .priceFilter(20)
                        .url();
                    expect(url).toContain("&filter=price(20)");
                });

                it("priceFilter with a single value in an array is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .priceFilter([20])
                        .url();
                    expect(url).toContain("&filter=price(20)");
                });

                it("priceFilter with a 2 values is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .priceFilter([20, 50])
                        .url();
                    expect(url).toContain("&filter=price(20|50)");
                });
            });

            describe("productFilter option", function () {

                it("productFilter with a single value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .productFilter(1234)
                        .url();
                    expect(url).toContain("&filter=product(1234)");
                });

                it("productFilter with a single value in an array is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .productFilter([1234])
                        .url();
                    expect(url).toContain("&filter=product(1234)");
                });

                it("productFilter with 2 values is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .productFilter([1234, 5678])
                        .url();
                    expect(url).toContain("&filter=product(1234+5678)");
                });
            });

            describe("search option", function () {

                it("search with single word is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .search("gamay")
                        .url();
                    expect(url).toContain("&search=gamay");
                });

                it("search with 2 words is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .search("gamay french")
                        .url();
                    expect(url).toContain("&search=gamay+french");
                });

                it("search with 2 words and extraneous whitespace is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .search("    \t  gamay    french\t\t  ")
                        .url();
                    expect(url).toContain("&search=gamay+french");
                });
            });

            describe("state option", function () {

                it("state is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .state("ca")
                        .url();
                    expect(url).toContain("&state=CA");
                });
            });

            describe("instock option", function () {

                it("instock with a value of true is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .instock(true)
                        .url();
                    expect(url).toContain("&instock=true");
                });

                it("instock with some other truthy value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .instock("yes")
                        .url();
                    expect(url).toContain("&instock=true");
                });

                it("instock with no value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .instock()
                        .url();
                    expect(url).toContain("&instock=true");
                });

                it("instock with a value of false is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .instock(false)
                        .url();
                    expect(url).not.toContain("&instock=true");
                });

                it("instock with some other falsy value is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .instock(0)
                        .url();
                    expect(url).not.toContain("&instock=true");
                });
            });

            describe("sort option", function () {

                var _testSortOptionOnItsOwn = function (sortOption) {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .sort(sortOption)
                        .url();
                    expect(url).toContain("&sort=" + sortOption + "|descending");
                };

                var _testSortOptionOnItsOwnInAnArray = function (sortOption) {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .sort([sortOption])
                        .url();
                    expect(url).toContain("&sort=" + sortOption + "|descending");
                };

                var _testSortOptionAndDirection = function (sortOption, sortDirection) {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService()
                        .sort([sortOption, sortDirection])
                        .url();
                    expect(url).toContain("&sort=" + sortOption + "|" + sortDirection);
                };

                it("valid sort option on its own is handled correctly", function () {
                    _testSortOptionOnItsOwn("popularity");
                    _testSortOptionOnItsOwn("rating");
                    _testSortOptionOnItsOwn("vintage");
                    _testSortOptionOnItsOwn("winery");
                    _testSortOptionOnItsOwn("name");
                    _testSortOptionOnItsOwn("price");
                    _testSortOptionOnItsOwn("saving");
                    _testSortOptionOnItsOwn("justin");
                });

                it("valid sort option on its own in an array is handled correctly", function () {
                    _testSortOptionOnItsOwnInAnArray("popularity");
                    _testSortOptionOnItsOwnInAnArray("rating");
                    _testSortOptionOnItsOwnInAnArray("vintage");
                    _testSortOptionOnItsOwnInAnArray("winery");
                    _testSortOptionOnItsOwnInAnArray("name");
                    _testSortOptionOnItsOwnInAnArray("price");
                    _testSortOptionOnItsOwnInAnArray("saving");
                    _testSortOptionOnItsOwnInAnArray("justin");
                });

                it("valid sort option and valid sort direction are handled correctly", function () {
                    _testSortOptionAndDirection("popularity", "ascending");
                    _testSortOptionAndDirection("rating", "ascending");
                    _testSortOptionAndDirection("vintage", "ascending");
                    _testSortOptionAndDirection("winery", "ascending");
                    _testSortOptionAndDirection("name", "ascending");
                    _testSortOptionAndDirection("price", "ascending");
                    _testSortOptionAndDirection("saving", "ascending");
                    _testSortOptionAndDirection("justin", "ascending");

                    _testSortOptionAndDirection("popularity", "descending");
                    _testSortOptionAndDirection("rating", "descending");
                    _testSortOptionAndDirection("vintage", "descending");
                    _testSortOptionAndDirection("winery", "descending");
                    _testSortOptionAndDirection("name", "descending");
                    _testSortOptionAndDirection("price", "descending");
                    _testSortOptionAndDirection("saving", "descending");
                    _testSortOptionAndDirection("justin", "descending");
                });

                it("invalid sort option is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ sort: "bogus" })
                        .url();
                    expect(url).not.toContain("&sort=");
                });

                it("invalid sort direction is handled correctly", function () {
                    var wineApi = new WineApi();
                    var url = wineApi.catalogService({ sort: ["name", "bogus"] })
                        .url();
                    expect(url).not.toContain("&sort=");
                });
            });
        });
    });
} ());
