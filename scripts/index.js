'use strict';

$(document).ready(function() {
  bookmarkList.bindEventListeners();
  bookmarkList.render();

  api.getBookmarks((bookmarks) => {
    bookmarks.forEach(function(item) {
      item.expanded = false;
      store.addBookmark(item);
      bookmarkList.render();
    });
  });
});