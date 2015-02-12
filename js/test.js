
$(function(){

$.getJSON("http://cors.io/spreadsheets.google.com/feeds/list/1DbyWSpmUlfygdhQe6q6HSvDukGjIYwKC2WSznRzdQpU/od6/public/values?alt=json", function(data) {
  //first row "title" column
  console.log(data.feed.entry[0]['gsx$title']['$t']);
});
})