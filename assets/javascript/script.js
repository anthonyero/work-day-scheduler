// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  // Renders divs to HTML markup by calling the `renderHours` function
  for (i = 9; i < 18; i++){
    renderHours(i)
  }

  // Check if local storage contains a workdaySchedule, if not create one that is an empty object
  var currentDay = dayjs().format("MM/DD/YYYY");

  if (localStorage.getItem("workdaySchedule") === null || JSON.parse(localStorage.getItem("workdaySchedule"))["date"] !== currentDay) { // Second condition checkss if local storage is for today's date, if not, will clear
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

  // If a user refreshes the page or revisits the page, the following code will write stored values to the description 
  todaysWorkdaySchedule = JSON.parse(localStorage.getItem("workdaySchedule"));

  for (key in todaysWorkdaySchedule) {
    if (key != "date"){
      idName = key;
      idName = idName.slice(0,4) + "-" + idName.slice(4) // Adds a hyphen to coincide with block id names. Hyphens are not used in the object saved in local storage
      $("#" + idName + " > .description").text(todaysWorkdaySchedule[key]);
    }
  }

  // Applying eventListeners to each save button element and defining a function to update local storage
  
  $(".container-lg").on("click", ".saveBtn", function (event) {

    let target = event.target;
    // event.preventDefault(); 

    // Finds the ID of the target's parent element, providing us the id of the hour block
    var targetParentId = $(target).parent().attr("id"); // Returns a string of the parent element's id attribute
    var userInputTarget = ("#" + targetParentId + " > .description"); // Finds the text box of the hour's row/container

    // Removes the hyphen from the retrieved id because the keys in local storage do not contain the hyphen
    var keyTarget = targetParentId;
    keyTarget = keyTarget.split("-").join("");

    // Pulls from local storage, updates key values, and places the values back into local storage
    currentWorkdaySchedule = JSON.parse(localStorage.getItem("workdaySchedule"));
    currentWorkdaySchedule[keyTarget] = $(userInputTarget).val();
    localStorage.setItem("workdaySchedule", JSON.stringify(currentWorkdaySchedule));

  // Not necessary to rewrite from local storage. When a user types or updates a value and saves, their text will remain within the container. If the page is refreshed, the updated text will also be published 
  })

  // Applies formatting by adding/removing classes past/present/future
  var currentHour = dayjs().hour()

  for (i = 9; i < 18; i++){
    if (i < currentHour) {
      $("#hour-" + i).removeClass("present future").addClass("past");
    } else if (i === currentHour) {
      $("#hour-" + i).removeClass("past future").addClass("present");
    } else {
      $("#hour-" + i).removeClass("past present").addClass("future");
    }
  }

  // Retrieves the current date and assigns it to the HTML markup 
  var today = dayjs();
  $("#currentDay").text(today.format("dddd, MMMM D")); // Did not see formatting options for adding the suffix st, rd, th, etc. from DayJS documentation
});

// Function Definitions

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
 
