var rows = 4;
var cols = 4;
$(document).ready(function()
{
  var sliceStr = createSlices(true);
  $(#puzzleContainer).html(sliceStr);

  $('start').on('click', function{
    var divs = $('#puzzleContainer > div');
    var allDivs = shuffle(divs);

    $('#pieceBox').empty();

    allDivs.each(function(){
      var leftDistance = Math.floor((Math.random()*208)) + 'px';
      var topDistance = Math.floor((Math.random()*208)) + 'px';

      $(this)
      .addClass('imagDraggable')
      .css(
        {
          position: 'absolute',
          left: leftDistance,
          top: topDistance,
        }
      );
      $('#pieceBox').append($(this));

      var sliceStr = createSlices(false);
      $('#puzzleContainer').html(sliceStr);

      $(this).hide();
      $('#reset').show();
    });
  });
});

function shuffle(o)
{
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i],
      o[i] = o[j], o[j] = x);
  return o;
}

function createSlices(useImg)
{
  var sliceAtt = [];
  for(var i = 0, top = 0, c = 0; i < rows; top -= 100, i++)
    for(var j = 0, left = 0; j < cols; j++, left -= 100, c++)
    {
      if(useImg)
      {
        sliceAtt.push('<div style="background-position=' + left + 'px ' + top +
          'px;" class="img" data-sequence=' + c + '">' );
      }
      else
      {
        sliceAtt.push('<dive style="background-image = none;" class="img imgDroppable">')
      }
      sliceAtt.push('</div>')
    }

  return sliceAtt.joint('');
}
