/*!
 * spa-router.js -http://cloudezin.com
 * Version - 0.0.1 alpha
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2018 Faizan Hashmi
 */
var route = {
    method: {},
    application: {
        DefaultPage: '?page=Dashboard-Dashboard',
        ContentWrapper: '#main-container',
        htmlPageName: ''
    }
};

route.method.routeInit = function() {
    route.method.loadPageAsync();    
    window.onpopstate = function(){
        route.method.loadPageAsync();
    }
    if(!route.method.getParameterByName('page')){
        route.method.loadNewBtnPage(route.application.DefaultPage);
    }
}

/*url routing */
$(document.body).on('click', "a.int-link", function(event) {
    if (!event.ctrlKey) {
        event.preventDefault();
        url = $(this).attr("href");
        route.method.loadNewBtnPage(url);
    } else {
        url = $(this).attr("href");
    }
});

route.method.loadPageAsync = function() {
    var queryPageName = route.method.getParameterByName('page');
    if (queryPageName) {
        var directoryName = queryPageName.split("-").shift();
        htmlPageName = queryPageName.split("-").pop();
        var htmlPageUrl = 'views/' + directoryName + '/' + htmlPageName + '.html';

        /* UI -- navbar & subnavbar active */
        $('.menu-nav ul li a').removeClass('nav-active');
        $("[data-dir='"+ directoryName +"']").addClass('nav-active');
        
        /* UI -- navbar & subnavbar active ends */

        $(route.application.ContentWrapper).load(htmlPageUrl);
    }
}

route.method.loadNewBtnPage = function(pageName) {
    var query = pageName;
    window.history.pushState('', '', query);
    route.method.loadPageAsync();
}

route.method.getParameterByName = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

route.method.goBack = function(){
    console.log(window.history);
    window.history.back();
}

route.application.updateURLParameterByName = function (param, paramVal) {
    var BeforeAnchorPath = window.location.href.split('#').shift();
    var AfterAnchorPath = window.location.href.split('#').pop();
    var Query = AfterAnchorPath.split('?').pop();
    var QueryArray = Query.split('&');
    
    var URLParams = [];
    var URLParts;
    
    var NewParams = '#' + AfterAnchorPath.split('?').shift() + '?';
    
    for (var i = 0; i < QueryArray.length; i++)
    {
        URLParts = QueryArray[i].split('=');
        URLParams[URLParts[0]] = URLParts[1];
    }
    URLParams[param] = paramVal;
    //If parameter passed is new
    if (!URLParams[param]) {
        QueryArray.push(param + '=' + paramVal);
    }
    
    for (var i = 0; i < QueryArray.length ; i++) {
        NewParams += QueryArray[i].split('=').shift() + '=' + URLParams[QueryArray[i].split('=').shift()];

        if(i != (QueryArray.length - 1)){
            NewParams += '&';
        }
    }
    
    window.history.pushState('', '', NewParams);
}

/*url routing ends*/

