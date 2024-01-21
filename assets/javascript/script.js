// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  
  /*
  $(".container-lg").append('<div id = "hour-' + 12 + '" class= "row time-block present">')
  $("#hour-12").append('<div class="col-2 col-md-1 hour text-center py-3">' + 12 + 'PM</div>');
  $("#hour-12").append('<textarea class="col-8 col-md-10 description" rows="3"> TEXT</textarea>');
  $("#hour-12").append('<button class="btn saveBtn col-2 col-md-1" aria-label="save">');
  $("#hour-12 > button").append('<i class="fas fa-save" aria-hidden="true"></i>');
  $("#hour-12").append('</button>');
  $(".container-lg").append('</div>');
  */
  for (i = 9; i < 18; i++){
    renderHours(i)
  }


  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  var today = dayjs();
  $("#currentDay").text(today.format("dddd, MMMM D")); // Did not see formatting options for adding the suffix st, rd, th, etc. from DayJS documentation
});

function renderHours (hour) {
  $(".container-lg").append('<div id = "hour-' + hour + '" class= "row time-block">') // Removed past,present,future for the general function
  if (hour < 12) {
    $("#hour-" + hour).append('<div class="col-2 col-md-1 hour text-center py-3">' + hour + 'AM</div>');
  } else if (hour === 12) {
    $("#hour-" + hour).append('<div class="col-2 col-md-1 hour text-center py-3">' + hour + 'PM</div>');
  }   else {
    $("#hour-" + hour).append('<div class="col-2 col-md-1 hour text-center py-3">' + (hour - 12) + 'PM</div>');
  }
  $("#hour-" + hour).append('<textarea class="col-8 col-md-10 description" rows="3"></textarea>');
  $("#hour-" + hour).append('<button class="btn saveBtn col-2 col-md-1" aria-label="save">');
  $("#hour-" + hour + "> button").append('<i class="fas fa-save" aria-hidden="true"></i>'); // "> button" means button in #hour-i
  $("#hour-" + hour).append('</button>');
  $(".container-lg").append('</div>');
  }
 
