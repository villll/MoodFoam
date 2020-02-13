var timeline = [];

// Welcome
var welcome = {
  type: "html-button-response",
  stimulus: "Welcome to the experiment, press any key to continue.",
  choices: ["Start"]
};

timeline.push(welcome);

// Introduction?

// Who are you?
var participant_types = ["Student", "Researcher", "Staff", "Visitor"];
var test_who = {
  type: "survey-multi-choice",
  questions: [
    {
      prompt: "Who are you?",
      name: "Role",
      options: participant_types,
      required: true
    }
  ]
};

timeline.push(test_who);

// What activities are you doing right now?
var activities = [
  "Working alone",
  "Working together",
  "Eating or drinking",
  "Avoiding work",
  "Relaxing"
];
var test_activities = {
  type: "survey-multi-select",
  questions: [
    {
      prompt: "What are you doing right now?",
      name: "Activities",
      options: activities,
      required: true
    }
  ]
};

timeline.push(test_activities);

// What size is the group you're in right now?
var group_size = ["Alone", "2", "3", "4", "5 or more"];
var test_groupsize = {
  type: "survey-multi-choice",
  questions: [
    {
      prompt: "What size is the group you're in right now?",
      name: "Group size",
      options: group_size,
      required: true
    }
  ]
};

timeline.push(test_groupsize);

// Where are you now?
var test_location = {
  type: "location",
  stimulus: "./images/Tellus pohja small.png",
  stimulus_width: 400,
  stimulus_height: 400,
  stimulus_zoom: 11,
  preamble: "Where are you now?",
  required: true
};

timeline.push(test_location);

// How well does this spot support your current activity?
var scale_1 = [
  "Extremely poorly",
  "Somewhat poorly",
  "Neutral",
  "Somewhat well",
  "Extremely well"
];

var test_space_fit = {
  type: "survey-likert",
  questions: [
    {
      prompt: "How well does this spot support your current activity?",
      labels: scale_1,
      required: true,
      name: "Spot suitability"
    }
  ]
};
timeline.push(test_space_fit);

// Affect grid
var test_affect_grid = {
  stimulus: "Please rate how you are feeling right now.",
  type: "affect-grid",
  prompt: "Click the mouse in a cell.",
  choices: new Array(81 - 1 + 1).fill().map((d, i) => i + 1),
  show_labels: true,
  show_sub_labels: false
};

timeline.push(test_affect_grid);

// How do you feel about the following statements?
var test_likert_intro = {
  type: "html-button-response",
  stimulus: "How do you feel about the following statements?",
  choices: ["Next"]
};

timeline.push(test_likert_intro);

// The sound level
var scale_2 = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree"
];

var test_sound_level = {
  type: "survey-likert",
  questions: [
    {
      prompt: "The sound level doesn't bother me.",
      labels: scale_2,
      required: true,
      name: "Sounds"
    }
  ]
};

timeline.push(test_sound_level);

// The smells
var test_smells = {
  type: "survey-likert",
  questions: [
    {
      prompt: "There aren't any distracting smells.",
      labels: scale_2,
      required: true,
      name: "Smells"
    }
  ]
};

timeline.push(test_smells);

// The temperature
var test_temperature = {
  type: "survey-likert",
  questions: [
    {
      prompt: "The temperature level is just fine.",
      labels: scale_2,
      required: true,
      name: "Temperature"
    }
  ]
};

timeline.push(test_temperature);

// Thank you for participating in the study
var test_end = {
  type: "html-button-response",
  stimulus: "Thank you for participating in the study!",
  choices: ["Submit"]
};

timeline.push(test_end);

jsPsych.init({
  timeline: timeline,
  on_finish: function() {
    saveData();
  }
});

function saveData() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function() {
    if (xhr.status == 200) {
      let response = JSON.parse(xhr.responseText);
      console.log(response.success);
    }
  };

  let response = jsPsych.data.get().json();
  if (IsValidJSONString(response)) {
    xhr.send(response);
  } else console.error("Invalid response: ", response);
}

function IsValidJSONString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
