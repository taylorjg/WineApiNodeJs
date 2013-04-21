/// <reference path="node_modules/underscore/underscore.js" />

// ReSharper disable InconsistentNaming

/* global module, require */

(function () {

    "use strict";

    // ReSharper disable UseOfImplicitGlobalInFunctionScope
    var _ = require("underscore");
    // ReSharper restore UseOfImplicitGlobalInFunctionScope

    // ReSharper disable UseOfImplicitGlobalInFunctionScope
    module.exports = UrlBuilder;
    // ReSharper restore UseOfImplicitGlobalInFunctionScope

    var CATALOG_RESOURCE = "catalog";
    var CATEGORYMAP_RESOURCE = "categorymap";
    var REFERENCE_RESOURCE = "reference";

    var validSortOptions = [
            "popularity",
            "rating",
            "vintage",
            "winery",
            "name",
            "price",
            "saving",
            "justin"
        ];

    var validSortDirections = [
            "ascending",
            "descending"
        ];

    function UrlBuilder(apiKeyConstructorParam, affiliateIdConstructorParam) {

        var _apiKey = "SET-ME!";
        var _affiliateId;
        var _url = "";
        var _version = "beta2";

        this.apiKey = function (newValue) {
            if (arguments.length === 1) {
                _apiKey = newValue;
            }
            return _apiKey;
        };

        this.affiliateId = function (newValue) {
            if (arguments.length === 1) {
                _affiliateId = newValue;
            }
            return _affiliateId;
        };

        this.version = function (newValue) {
            if (arguments.length === 1) {
                _version = newValue;
            }
            return _version;
        };

        this.url = function () {
            return _url;
        };

        this.reset = function () {
            _url = "";
        };

        this.catalogService = function (options) {

            _buildBaseUrl(CATALOG_RESOURCE);

            options = options || {};

            this.offset(options.offset);
            this.size(options.size);
            this.categoriesFilter(options.categoriesFilter);
            this.ratingFilter(options.ratingFilter);
            this.priceFilter(options.priceFilter);
            this.productFilter(options.productFilter);
            this.search(options.search);
            this.state(options.state);
            this.instock(options.instock);
            this.sort(options.sort);

            return this;
        };

        this.categoryMapService = function (/* options */) {
            _buildBaseUrl(CATEGORYMAP_RESOURCE);
            //options = options || {};
            return this;
        };

        this.referenceService = function (/* options */) {
            _buildBaseUrl(REFERENCE_RESOURCE);
            //options = options || {};
            return this;
        };

        this.offset = function (value) {
            _addQueryParamNameValue("offset", value);
            return this;
        };

        this.size = function (value) {
            _addQueryParamNameValue("size", value);
            return this;
        };

        this.categoriesFilter = function (value) {
            _addCategoriesFilterQueryStringParam(value);
            return this;
        };

        this.ratingFilter = function (value) {
            _addFromToQueryStringParam("filter=rating", value);
            return this;
        };

        this.priceFilter = function (value) {
            _addFromToQueryStringParam("filter=price", value);
            return this;
        };

        this.productFilter = function (value) {
            _addProductFilterQueryStringParam(value);
            return this;
        };

        this.search = function (value) {
            _addSearchQueryStringParam(value);
            return this;
        };

        this.state = function (value) {
            _addStateQueryParam(value);
            return this;
        };

        this.instock = function (value) {
            if (arguments.length === 1) {
                _addInstockQueryStringParam(value);
            } else {
                _addInstockQueryStringParam();
            }
            return this;
        };

        this.sort = function (value) {
            _addSortQueryStringParam(value);
            return this;
        };

        function _buildBaseUrl(serviceName) {
            _url = "http://services.wine.com/api/" + _version + "/service.svc/json/" + serviceName + "?apikey=" + _apiKey;
            if (!_.isUndefined(_affiliateId)) {
                _url = _url + "&affiliateId=" + _affiliateId;
            }
        }

        function _addQueryParamNameValue(name, value) {
            if (_.isUndefined(value)) {
                return;
            }
            _url = _url + "&" + name + "=" + value;
        }

        function _addCategoriesFilterQueryStringParam(value) {
            if (_.isUndefined(value)) {
                return;
            }
            _addMultiValueQueryStringParam("filter=categories", value);
        }

        function _addProductFilterQueryStringParam(value) {
            if (_.isUndefined(value)) {
                return;
            }
            _addMultiValueQueryStringParam("filter=product", value);
        }

        function _addStateQueryParam(value) {
            if (_.isString(value) && value.length === 2) {
                _url = _url + "&state=" + value.toUpperCase();
            }
        }

        function _addInstockQueryStringParam(value) {
            if (arguments.length === 0 || value) {
                _url = _url + "&instock=true";
            }
        }

        function _addMultiValueQueryStringParam(prefix, ids) {
            if (_.isUndefined(ids)) {
                return;
            }
            var filteredIds = _filterIds(ids);
            if (filteredIds.length > 0) {
                _url = _url + "&" + prefix + "(" + filteredIds.join("+") + ")";
            }
        }

        function _addFromToQueryStringParam(prefix, value) {
            if (_.isUndefined(value)) {
                return;
            }
            if (_.isArray(value)) {
                if (value.length === 1 || value.length === 2) {
                    _url = _url + "&" + prefix + "(" + value.join("|") + ")";
                }
            } else {
                _url = _url + "&" + prefix + "(" + value + ")";
            }
        }

        function _addSearchQueryStringParam(searchTerms) {
            if (_.isUndefined(searchTerms)) {
                return;
            }
            var SPACE_CHAR = " ";
            var searchTermsWithCollapsedWhitespace = searchTerms.replace(/\s+/g, SPACE_CHAR).trim();
            var words = searchTermsWithCollapsedWhitespace.split(SPACE_CHAR);
            _url = _url + "&search=" + words.join("+");
        }

        function _filterIds(ids) {
            var filteredIds = [];
            if (_.isArray(ids)) {
                filteredIds = _.filter(ids, function (id) { return id !== ""; });
            } else {
                if (ids !== "") {
                    filteredIds.push(ids);
                }
            }
            return filteredIds;
        }

        function _addSortQueryStringParam(value) {
            if (_.isUndefined(value)) {
                return;
            }
            if (_.isArray(value)) {
                if (value.length === 1) {
                    _addSortQueryStringParamHelper(value[0], "descending");
                } else {
                    if (value.length === 2) {
                        _addSortQueryStringParamHelper(value[0], value[1]);
                    } else {
                        return;
                    }
                }
            } else {
                _addSortQueryStringParamHelper(value, "descending");
            }
        }

        function _addSortQueryStringParamHelper(sortOption, sortDirection) {

            var sortOptionIsValid = false;
            var sortDirectionIsValid = false;
            var i;

            sortOption = sortOption.toLowerCase();
            sortDirection = sortDirection.toLowerCase();

            for (i = 0; i < validSortOptions.length; i++) {
                if (sortOption === validSortOptions[i]) {
                    sortOptionIsValid = true;
                    break;
                }
            }

            for (i = 0; i < validSortDirections.length; i++) {
                if (sortDirection === validSortDirections[i]) {
                    sortDirectionIsValid = true;
                    break;
                }
            }

            if (sortOptionIsValid && sortDirectionIsValid) {
                _url = _url + "&sort=" + sortOption + "|" + sortDirection;
            }
        }

        if (arguments.length >= 1) {
            this.apiKey(apiKeyConstructorParam);
        }

        if (arguments.length === 2) {
            this.affiliateId(affiliateIdConstructorParam);
        }
    }
} ());
