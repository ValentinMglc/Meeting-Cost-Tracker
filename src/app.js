let startTime;
let intervalId;
let totalCost = 0;

function calculateCost() {
  let attendees = document.getElementsByClassName("attendee");
  let cost = 0;
  for (let i = 0; i < attendees.length; i++) {
    let hourlyRate = parseFloat(attendees[i].children[0].value);
    if (!isNaN(hourlyRate) && hourlyRate > 0) {
      cost += (Date.now() - startTime) / 3600000 * hourlyRate;
    }
  }
  totalCost = cost;
  document.getElementById("totalCost").innerHTML = totalCost.toFixed(2);

  let timePassed = (Date.now() - startTime) / 1000;
  let hours = Math.floor(timePassed / 3600);
  timePassed = timePassed % 3600;
  let minutes = Math.floor(timePassed / 60);
  let seconds = Math.floor(timePassed % 60);
  document.getElementById("timePassed").innerHTML =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");
}

function startTimer() {
  if (document.getElementsByClassName("attendee").length === 0) {
    alert("Please add at least one attendee with a valid hourly rate.");
    return;
  }
  startTime = Date.now();
  intervalId = setInterval(calculateCost, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
}

function addAttendee() {
  let attendeeContainer = document.getElementById("attendeeContainer");
  let attendee = document.createElement("div");
  attendee.className = "attendee";
  attendee.innerHTML = `Hourly Rate: <input type="text" placeholder="0.00" /><button type="button" onclick="removeAttendee(this)">Remove</button><br /><br />`;
  attendeeContainer.appendChild(attendee);
}

function removeAttendee(button) {
  let attendee = button.parentElement;
  attendee.remove();
}
