$(document).ready(function() {
  var $listOfTiles = $('#list-of-tiles'),
      $tile = $('<li onclick="$(this).fadeOut(400)">&times;</li>'),
      $tileButton = $('#tile-button'),
      $tileCount = $('#tile-count'),
      $tileControl = $('#tile-control'),
      numTiles = 5,
      
      disabled = function() {
        return false;
      },
      
      buildTiles = function() {
        if (numTiles == $listOfTiles.children().length) {
          return;
        }
        $listOfTiles.empty();
        // add appropriate # of tiles
        var df = document.createDocumentFragment();
        for (var i = 0; i < numTiles; i++) {
          df.appendChild($tile.clone()[0]);
        }
        $listOfTiles[0].appendChild(df);
      };
      
  $tileControl.bind('submit', function() {
    numTiles = parseInt($tileCount.val()) || 5;
    
    $tileButton.val('...tiling...').bind('click', disabled);
    
    if ($listOfTiles.find('li:visible').length) {
      //untile and then retile
      cb.transition.tile(
        $listOfTiles.children(),
        function() {
          buildTiles();
          cb.transition.tile(
            $listOfTiles.children(),
            function(){
              $tileButton.val('Start').unbind('click');
            }
          );
        }
      );
    } else {
      //just tile
      buildTiles();
      cb.transition.tile(
        $listOfTiles.children(),
        function() {
          $tileButton.val('Start').unbind('click');
        }
      );
    }
    
    return false;
  });
  

});