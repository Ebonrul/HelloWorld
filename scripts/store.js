'use strict';



const store = (function() {

    const setError = function(error) {
      this.error = error;
    }
  
  function addBookmark(item) {
    this.bookmarks.push(item);;
  }

  function findByID(id) {
    return this.bookmarks.find(item => item.id === id);
  }

  function toggleExpandView(item) {
   if(item.expanded === false) {
      return item.expanded = true;
    } else if (item.expanded === true) {
      return item.expanded = false;
    } else {
      console.log('toggle expand failed');
      }
  }

  function findAndDelete(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  }


  function toggleFilterRatings(rating) {
    this.filters = parseInt(rating, 10);

  }

  return {
    bookmarks: [],
    adding: false,
    filters: 0,
    error: null, 

    setError,
    toggleExpandView,
    addBookmark,
    findAndDelete,
    toggleFilterRatings
    };

}());