// ==UserScript==
// @id             iitc-plugin-highlight-portals-with-full-resonators
// @name           IITC plugin: highlight portals with full resonators
// @author         c88tm
// @category       Highlighter
// @version        0.1.1.0
// @namespace      IITC_plugin
// @updateURL      https://github.com/c88tm/IITC_plugin/raw/master/fullRes_Higher.user.js
// @downloadURL    https://github.com/c88tm/IITC_plugin/raw/master/fullRes_Higher.user.js
// @description    highlight portals with full resonators, and colored higher level portals
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @include        https://*.ingress.com/mission/*
// @include        http://*.ingress.com/mission/*
// @match          https://*.ingress.com/mission/*
// @match          http://*.ingress.com/mission/*
// @grant          none
// ==/UserScript==


function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
//plugin_info.buildName = 'iitc';
//plugin_info.dateTimeVersion = '20170108.21732';
//plugin_info.pluginId = 'portal-highlighter-missing-resonators';
//END PLUGIN AUTHORS NOTE



// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.portalWithFullResonators = function() {};

window.plugin.portalWithFullResonators.highlight = function(data) {

    console.log(data);
    if(data.portal.options.team != TEAM_NONE) {
        var portal_level = data.portal.options.data.level;
        var res_count = data.portal.options.data.resCount;
        var color;
        var opacity = 0.7;
        switch (portal_level) {
            case 6: color='orange'; break;
            case 7: color='red'; break;
            case 8: color='magenta'; break;
        }
        if(res_count !== undefined && res_count < 8) {
            data.portal.setStyle({radius: 0});
        }else{
            if (color) {
                data.portal.setStyle({fillColor: color, fillOpacity: opacity});
            }
        }
    }else{
        data.portal.setStyle({radius: 0});
    }
}

var setup =  function() {
  window.addPortalHighlighter('Portals With Ful Resonators', window.plugin.portalWithFullResonators.highlight);
}

// PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);
