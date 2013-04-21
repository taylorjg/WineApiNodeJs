/// <reference path="../WineApi.js" />
/// <reference path="node_modules/jquery/lib/node-jquery.js" />

/* global require */

(function() {

    "use strict";

    // ReSharper disable UseOfImplicitGlobalInFunctionScope
    var $ = require("jquery");
    // ReSharper restore UseOfImplicitGlobalInFunctionScope

    // ReSharper disable UseOfImplicitGlobalInFunctionScope
    // ReSharper disable InconsistentNaming
    var WineApi = require("../WineApi.js");
    // ReSharper restore InconsistentNaming
    // ReSharper restore UseOfImplicitGlobalInFunctionScope

    var wineApi = new WineApi("insert-your-key-here");

    var url = wineApi.referenceService()
        .categoriesFilter(2089)
        .url();

    console.log("Invoking the wine.com reference service...");
    $.ajax({
        dataType: "json",
        url: url,
        success: function(data) {
            if (data.Status.ReturnCode === 0) {
                console.log(data);
            } else {
                for (var messageIndex = 0; messageIndex < data.Status.Messages.length; messageIndex++) {
                    console.log(data.Status.Messages[messageIndex]);
                }
            }
        },
        error: function(xhr, typeOfError, httpStatusText) {
            console.log("An error occurred invoking the wine.com reference service");
            console.log("typeOfError: " + typeOfError);
            if (httpStatusText) {
                console.log("httpStatusText: " + httpStatusText);
            }
        }
    });
}());
