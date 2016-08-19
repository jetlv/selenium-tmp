/// <reference path="./include.d.ts" />

var webdriver = require('selenium-webdriver');
var proxy = require('selenium-webdriver/proxy');
var firefox = require('selenium-webdriver/firefox');
var phantomJs = require('selenium-webdriver/phantomjs');
var by = webdriver.By;
var fs = require('fs');
var async = require('async');



/**
 * define Date tool
 */

/**
 * Date extension
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


/**
 * Single query. Pass the expand Array
 */

function singleQuery() {

    //Define the screenshot function
    webdriver.WebDriver.prototype.saveScreenshot = function (filename) {
        return driver.takeScreenshot().then(function (data) {
            fs.writeFile(filename, data.replace(/^data:image\/png;base64,/, ''), 'base64', function (err) {
                if (err) throw err;
            });
        })
    };

    //setProxy(proxy.manual({http: '127.0.0.1:2099'})).
    // var driver = new webdriver.Builder().forBrowser('BROWSERNAME').usingServer('http://127.0.0.1:4444/wd/hub').build();
    var driver = new webdriver.Builder().forBrowser('firefox').build();



    driver.get('http://www.google.com').then(function () {
        driver.wait(function () {
            return driver.isElementPresent(by.xpath('XPATH')).then(function (present) {
                return present;
            })
        }, 50000);
    });
}

singleQuery();