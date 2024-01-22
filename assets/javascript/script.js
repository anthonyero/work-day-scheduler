// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  for (i = 9; i < 18; i++){
    renderHours(i)
  }

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

    // Check if local storage contains a workdaySchedule, if not create one that is an empty object
    var currentDay = dayjs().format("MM/DD/YYYY");

  if (localStorage.getItem("workdaySchedule") === null || JSON.parse(localStorage.getItem("workdaySchedule"))["date"] !== currentDay) { // Second condition check's if local storage is for today's date, if not, will clear
    localStorage.setItem("workdaySchedule", JSON.stringify({
      date: currentDay,
      hour9: "",
      hour10: "",
      hour11: "",
      hour12: "",
      hour13: "",
      hour14: "",
      hour15: "",
      hour16: "",
      hour17: ""}
      ));
  }



  
  $(".container-lg").on("click", ".saveBtn", function (event) {

    let target = event.target;
    console.log($(target).parent().attr("id")); // Finds the id of the target's parent element
    // Add a function to retrieve the local storage object, update key values, and save to local storage again
    // event.preventDefault(); 

 
  // Finds the ID of the target's parent element, providing us the id of the hour block
  var targetParentId = $(target).parent().attr("id");
  //console.log("targetParentId: " + targetParentId  + "typeof: " + typeof(targetParentId))
  var userInputTarget = ("#" + targetParentId + " > .description"); // Finds the text box of the 
  //console.log("userInputTarget: " + userInputTarget + "typeof: " + typeof(userInputTarget));

  // 
  var keyTarget = targetParentId;
  keyTarget = keyTarget.split("-").join("");
  console.log("keyTarget: " + keyTarget)

  // Pulls from local storage, updates key values, and places the values back into local storage
  currentWorkdaySchedule = JSON.parse(localStorage.getItem("workdaySchedule"));
  currentWorkdaySchedule[keyTarget] = $(userInputTarget).val();
  localStorage.setItem("workdaySchedule", JSON.stringify(currentWorkdaySchedule));

  // Writing to HTML


  })




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
 
function recordResponse (event) {
  event.preventDefault(); 

  // Check if local storage contains a workdaySchedule, if not create one that is an empty object
  if (localStorage.getItem("workdaySchedule") === null) {
    localStorage.setItem("workdaySchedule", JSON.stringify({}));
  }

  var targetParentId = $(target).parent().attr("id");
  var userInputTarget = $("#" + targetParentId + "> description");

  var keyTarget = targetParentId;
  keyTarget = keyTarget.split("-").join("");

  currentWorkdaySchedule = JSON.parse(localStorage.getItem("workdaySchedule"));
  currentWorkdaySchedule[keyTarget] = $(userInputTarget).val();
  currentWorkdaySchedule = currentWorkdaySchedule.sort(function(a, b){return a - b});
  localStorage.setItem("workdaySchedule", JSON.stringify(currentWorkdaySchedule));

}