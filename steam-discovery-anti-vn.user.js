// ==UserScript==
// @name         Discovery Queue Anti-Trash
// @description  Skip non-games in Steam's Discovery Queue
// @version      7
// @include      *://store.steampowered.com/app/*
// @grant        none
// @run-at       document-end
// @author       Oleh Prypin
// @namespace    http://blaxpirit.com/
// ==/UserScript==
// Generated by LiveScript 1.6.0
var $, ignore, id;
$ = jQuery;
ignore = function(){
  var i$, ref$, len$, tag, ref1$;
  if ($('.platform_img.streamingvideo').length) {
    return true;
  }
  for (i$ = 0, len$ = (ref$ = $('a.app_tag').slice(0, 7)).length; i$ < len$; ++i$) {
    tag = ref$[i$];
    if ((ref1$ = $.trim(tag.innerHTML)) === "Choose Your Own Adventure" || ref1$ === "Visual Novel" || ref1$ === "Text-Based" || ref1$ === "FMV") {
      return true;
    }
  }
  if ((ref$ = $.trim($('#developers_list').text())) === "Choice of Games" || ref$ === "Hosted Games" || ref$ === "ALEKSANDER CHEPAIKIN" || ref$ === "Sly" || ref$ === "GGG Games" || ref$ === "Kedronic UAB" || ref$ === "Cool Girls Games" || ref$ === "Team Spikkeee") {
    return true;
  }
  if ($('#purchase_note').text().includes("English language not supported")) {
    return true;
  }
  if (((ref$ = $('.communitylink_achivement_plusmore').text().match(/[0-9]+/)) != null ? ref$[0] : void 8) > 500) {
    return true;
  }
}();
if (ignore) {
  id = window.location.href.match(/[0-9]+/)[0];
  $('.queue_btn_ignore .queue_btn_inactive').hide();
  $.post('/recommended/ignorerecommendation/', {
    sessionid: g_sessionID,
    appid: id
  }, function(){
    $('.queue_btn_ignore .queue_btn_active').show();
    $('.btn_next_in_queue').click();
  });
}
