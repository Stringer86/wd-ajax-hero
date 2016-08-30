(function() {
  'use strict';

  var movies = [];

  var renderMovies = function() {
    $('#listings').empty();

    for (var movie of movies) {
      var $col = $('<div class="col s6">');
      var $card = $('<div class="card hoverable">');
      var $content = $('<div class="card-content center">');
      var $title = $('<h6 class="card-title truncate">');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.Title
      });

      $title.tooltip({ delay: 50, });
      $title.text(movie.Title);

      var $poster = $('<img class="poster">');

      $poster.attr({
        src: movie.Poster,
        alt: `${movie.Poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      var $action = $('<div class="card-action center">');
      var $plot = $('<a class="waves-effect waves-light btn modal-trigger">');

      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      var $modal = $(`<div id="${movie.id}" class="modal">`);
      var $modalContent = $('<div class="modal-content">');
      var $modalHeader = $('<h4>').text(movie.Title);
      var $movieYear = $('<h6>').text(`Released in ${movie.Year}`);
      var $modalText = $('<p>').text(movie.Plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  var $search = $('#search');

  var $button = $('button');

 $button.click(function(event) {
  event.preventDefault();
  var $movie = $search.val();
  var $xhr = $.getJSON(`http://www.omdbapi.com/?s=${$movie}`);
  $xhr.done(function(movie) {
  if ($xhr.status !== 200) {
      return;
  }
  for (var i = 0; i < movie.Search.length; i++) {
    movies.push(movie.Search[i]);

  }
  console.log(movie);
  renderMovies();
  movies.length = 0;
    });
  });

})();
