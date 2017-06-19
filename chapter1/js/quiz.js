$(document).ready(function()
{
  createQuizLayout();
  initQuiz();
});

function createQuizLayout()
{
  //declare countries
  var countries = ["USA", "China", "India", "UK", "German", "Turkey", "France",
                   "Japan", "Korea", "Italy"];
  //declare capitals
  var capitals = ["Washington", "Beijin", "Dehli", "London", "Berlin", "Istanbul",
                  "Paris", "Tokyo", "Seoul", "Roma"];

  var arrCountry = [];
  for(var i = 0; i < countries.length; i++)
    arrCountry.push('<li data-index = "' + (i + 1) + '">' + countries[i] + '</li>');

  var arrCapital = [];
  for(var i = 0; i < capitals.length; i++)
    arrCapital.push('<li data-index = "' + (i + 1) + '">' + capitals[i] + '</li>');

  //shuffle the data
  arrCountry = shuffle(arrCountry);
  arrCapital = shuffle(arrCapital);

  //once country and capital items are ready, insert them into DOM
  $('#source').html(arrCountry.join(''));
  $('#target').html(arrCapital.join(''));
}

function shuffle(o)
{
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i],
      o[i] = o[j], o[j] = x);
  return o;
}

function initQuiz()
{
  $('#source li').draggable(
    {
      revert: true,
      revertDuration: 200,
      cursor: "move",
    }
  );

  var totalScore = 0;
  $('#score').text(totalScore + ' points.');
  $('#target li').droppable(
    {
      accept: function(draggable)
      {
        console.log(draggable.data('index'));
        console.log($(this).data('index'));

        if(parseInt(draggable.data('index'), 10) === parseInt($(this).data('index'), 10))
        {
          return true;
        }
        else
        {
          return false;
        }
      },
      drop: function(event, ui)
      {
        var that = $(this);
        that.addClass("ui-state-highlight").html('Correct!').effect('bounce');
        that.droppable('disable');
        ui.draggable.addClass('correct ui-state-error');
        (ui.draggable).draggable('disable');

        totalScore++;
        $("#score").text(totalScore + ' points.');

        if($('li.correct').length == 10)
        {
          $("#dialog-complete").dialog({
            resizable: false,
            modal: true
          });
        }
      }
    });
}
