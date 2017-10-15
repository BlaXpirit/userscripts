// ==UserScript==
// @name         Precise Steam Store ratings
// @description  Replace vague descriptions like "Mostly Positive" with percentages
// @version      1
// @include      http://store.steampowered.com/app/*
// @grant        none
// @run-at       document-end
// @author       Oleh Prypin
// @namespace    http://blaxpirit.com/
// ==/UserScript==
// Generated by LiveScript 1.5.0
var $, toNum, steamReviewsLabel, allReviews, reviews, res$, i$, ref$, len$, kind, x$, delay, this$ = this;
$ = jQuery;
toNum = function(it){
  return it.replace(/\D/g, '');
};
$('.user_reviews_summary_row').each(function(){
  $(this).find('.game_review_summary').text((function(){
    try {
      return $(this).data('store-tooltip').match(/\d+%/)[0];
    } catch (e$) {}
  }.call(this)));
  $(this).find('.responsive_hidden').text(function(i, text){
    return " of " + toNum(
    text);
  });
});
steamReviewsLabel = $('.user_reviews_summary_row .all');
allReviews = steamReviewsLabel.parent().clone();
steamReviewsLabel.text("Steam reviews:");
allReviews.insertAfter(steamReviewsLabel.parent());
res$ = {};
for (i$ = 0, len$ = (ref$ = ['positive', 'all']).length; i$ < len$; ++i$) {
  kind = ref$[i$];
  res$[kind] = toNum(
  $('.user_reviews_filter_menu label[for="review_type_' + kind + '"] .user_reviews_count').text());
}
reviews = res$;
allReviews.find('.responsive_hidden').remove();
x$ = allReviews.find('.game_review_summary');
x$.text(Math.round(reviews.positive / reviews.all * 100) + "%");
x$.after($('<span class="responsive_hidden">').text(" of " + reviews.all));
$('<style>').html('.glance_ctn .user_reviews,.steamdb_last_update a {color: #8f98a0 !important;}').appendTo('head');
for (i$ = 0, len$ = (ref$ = [0.5, 1.5, 2.5]).length; i$ < len$; ++i$) {
  delay = ref$[i$];
  setTimeout(fn$, delay * 1000);
}
function fn$(){
  $('.user_reviews_summary_row:contains(SteamDB)').remove();
}
