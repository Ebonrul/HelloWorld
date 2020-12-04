'use strict';

const bookmarkList = (function() {

  function handleError(err) {
    let errorMessage = '';
    if (err.responseJSON && err.responseJSON.message) {
      errorMessage = err.responseJSON.message;
    } else {
      errorMessage = `${err.code} Server Error`;
    }
    return `
      <section class ="error-body">
        <button id="close-error">X</button>
        <p>${errorMessage}</p>
      </section>
    `;
  }

  function generateBookmarkElement(item) {
    let bookmarkItem = '';
    
    let ratingCss = '';
    for(let i = 0; i < item.rating; i++) {
      ratingCss += '<i class="fa fa-star filled-star"></i>';
    }
    
    const viewStateIcon = item.expanded ?  'mdi-minus' : 'mdi-arrow-expand';
    let expandedItem = '';
    if(item.expanded) {
      expandedItem = `
        <div class="bookmark-extra">
          <p class="bookmark-description">${item.desc}</p>
          <a href="${item.url}" target="_blank" class="form-button margin-top">Get it!</a>
        </div>
      `;
    }
    let newRowStart = '';
    let newRowEnd = '';

    if (store.bookmarks.indexOf(item) !== 0 && store.bookmarks.indexOf(item) %3 === 0 ){
      newRowStart = '<div class="row">';
      newRowEnd = '</div>';
    }

    if(store.bookmarks.indexOf(item) === 0) {
      newRowStart = '<div class="row">';
      newRowEnd = '';
    }

    bookmarkItem = `
      ${newRowEnd}
      ${newRowStart}
        <div class="col-4">
          <div class=" bookmark js-bookmark-element" data-bookmark-id="${item.id}">  
            <div class="bookmark-heading">
              <h3 class="bookmark-title">${item.title}</h3>
            <div class="bookmark-control">
              <i class="mdi ${viewStateIcon} js-bookmark-toggle"></i>
              <i class="mdi mdi-close js-bookmark-delete"></i>
            </div>
          </div>
          ${expandedItem}
          <div class="bookmark-rating">
            ${ratingCss}
          </div> 
          </div>
        </div>
      `;  

      return bookmarkItem;
  }

  function generateBookmarkItemsString(bookmarkList) {
    const items = bookmarkList.map((item) => generateBookmarkElement(item));
    return items.join('');
  }
    function render() {
    if(store.error) {
      const el = handleError(store.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').html('');
    }

    let items = store.bookmarks;
    items = items.filter(item => item.rating >= store.filters);
    const bookmarkListItemsString = generateBookmarkItemsString(items);
    $('.js-bookmark-list').html(bookmarkListItemsString);
  }

  function handleNewBookmarkSubmit() {
    $('#js-create-bookmark').submit(function(event) {
      event.preventDefault();
      const newBookmark = {
        title: $('.js-bookmark-title-entry').val(),
        url: $('.js-bookmark-url-entry').val(),
        desc: $('.js-bookmark-description-entry').val(),
        rating: $('.js-bookmark-rating-entry').val()
      };
      $('.js-bookmark-title-entry').val('');
      $('.js-bookmark-url-entry').val('');
      $('.js-bookmark-description-entry').val('');
      $('.js-bookmark-rating-entry').val('');

      api.createBookmark(newBookmark, (newItem) => {
        store.addBookmark(newItem);
        render();
      }, (err) => {
        store.setError(err);
        render();
        }
      );

    });
  }

  function getBookmarkIdFromElement(item){
    return $(item)
      .closest('.js-bookmark-element')
      .data('bookmark-id');
  }

  function handleBookmarkExpand() {
    $('.js-bookmark-list').on('click', '.js-bookmark-toggle', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      const updateBookmark = store.bookmarks.find(item => item.id === id);
      store.toggleExpandView(updateBookmark);
      render();
    });

  }

  function handleDeleteBookmarkClick() {
    $('.js-bookmark-list').on('click', '.js-bookmark-delete', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      const deleteBookmark = store.bookmarks.find(item => item.id === id);
      api.deleteBookmark(id, () => {
        store.findAndDelete(id);
        render();
      });
    });
  }

  function handleFilterBookmarksClick() {
    $('#rating-select').on('change', function(event){
      const selectedVal = $(event.currentTarget).find(':selected').val();
     store.toggleFilterRatings(selectedVal);
      render();
    });
  }

  function handleCloseError() {
    $('.error-container').on('click', '#close-error', () => {
      store.setError(null);
      render();
    })
  }

  function bindEventListeners() {
    handleNewBookmarkSubmit(),
    handleBookmarkExpand(),
    handleDeleteBookmarkClick(),
    handleFilterBookmarksClick(),
    handleCloseError();
  }

  return {
    render: render,
    bindEventListeners, bindEventListeners,
  };


}());

