// ==UserScript==
// @name         Steam achievements page improvements
// @description  Show descriptions of hidden achievements for games you own
// @version      3
// @include      http://steamcommunity.com/stats/*/*
// @include      https://steamcommunity.com/stats/*/*
// @include      http://steamcommunity.com/*/stats/*
// @include      https://steamcommunity.com/*/stats/*
// @run-at       document-end
// @author       Oleh Prypin
// @namespace    http://blaxpirit.com/
// ==/UserScript==
// Generated by LiveScript 1.5.0
var $, newRow, id;
$ = jQuery;
newRow = '<div class="achieveRow"><div class="achieveImgHolder"><img width="64" height="64"></div><div class="achieveTxtHolder"><div class="achieveTxt"><h3 class="ellipsis"></h3><h5 class="ellipsis"></h5></div></div></div>';
id = window.location.href.match(/\/stats\/([^\/?]+)/)[1];
$.ajax({
  url: "//steamcommunity.com/my/stats/" + id + "/achievements/",
  headers: {
    "X-ValveUserAgent": "panorama Jun 14 2016 23:23:40"
  },
  success: function(data){
    var json, achs, rows, res$, i$, ref$, len$, row, key, ach, found, ref1$, name, desc, x$;
    json = data.match(/var\s+g_rgAchievements\s*=\s*(.+);/)[1];
    achs = $.parseJSON(json);
    res$ = [];
    for (i$ = 0, len$ = (ref$ = $('.achieveRow .achieveTxt')).length; i$ < len$; ++i$) {
      row = ref$[i$];
      res$.push([$(row).children().first().text().trim(), $(row).children().last()]);
    }
    rows = res$;
    for (key in ref$ = achs.open) {
      ach = ref$[key];
      found = false;
      for (i$ = 0, len$ = rows.length; i$ < len$; ++i$) {
        ref1$ = rows[i$], name = ref1$[0], desc = ref1$[1];
        if (name === ach.name) {
          desc.text(ach.desc);
          found = true;
        }
      }
      if (!found) {
        x$ = $(newRow);
        x$.find('img').attr({
          src: ach.icon_open
        });
        x$.find('h3').text(ach.name);
        x$.find('h5').text(ach.desc);
        x$.insertAfter('.achieveRow:last-child');
      }
    }
  }
});
