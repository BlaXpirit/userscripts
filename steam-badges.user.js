// ==UserScript==
// @name         Steam badges page improvements
// @description  Display showcase links on Steam badges page
// @version      3
// @include      *://steamcommunity.com/id/*/badges/
// @grant        none
// @run-at       document-end
// @author       Oleh Prypin
// @namespace    http://blaxpirit.com/
// ==/UserScript==
// Generated by LiveScript 1.6.0
var i$, ref$, len$, row, link, id, html;
for (i$ = 0, len$ = (ref$ = document.querySelectorAll('.badge_row')).length; i$ < len$; ++i$) {
  row = ref$[i$];
  link = row.querySelector('a').href;
  id = link.match(/\/([0-9]+)\/?(\?|$)/)[1];
  link = "http://www.steamcardexchange.net/index.php?gamepage-appid-" + id;
  html = "<div class=\"badge_title\" style=\"clear: both; z-index: 1000\">\n    <a href=\"" + link + "\">Showcase</a>\n</div>";
  row.querySelector('.badge_current').innerHTML += " " + html;
  row.querySelector('.badge_row_overlay').style.zIndex = 0;
}
