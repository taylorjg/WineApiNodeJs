# WineApi

Provides a fluent API for building URL's for Wine.com's API.

## Links

* [Wine.com](http://www.wine.com)
* [Wine.com Public API](https://api.wine.com)
* [Signup to obtain a key](https://api.wine.com/signup)

## Installation

```
npm install WineApi
```

## Example

```js
var $ = require("jquery");
var WineApi = require("WineApi");

var wineApi = new WineApi("insert-your-key-here");

var url = wineApi.catalogService()
    .categoriesFilter(124)
	.search("gamay")
	.state("CA")
	.instock()
    .url();

console.log("Invoking wine.com catalog service...");
$.ajax(
    {
        dataType: "json",
        url: url,
        success: function (data) {
            if (data.Status.ReturnCode === 0) {
                console.log("Products.Total: " + data.Products.Total);
                for (var productIndex = 0; productIndex < data.Products.List.length; productIndex++) {
                    console.log("\t" + data.Products.List[productIndex].Name);
                }
            } else {
                for (var messageIndex = 0; messageIndex < data.Status.Messages.length; messageIndex++) {
                    console.log(data.Status.Messages[messageIndex]);
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("An error occurred invoking the wine.com catalog service: " + errorThrown);
        }
    });
```
