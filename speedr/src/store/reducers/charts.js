import * as type from "../actions/chartActions";

const initialState = {
  color: [
    "#f6f078",
    "#01d28e",
    "#434982",
    "#730068",
    "#a6e3e9",
    "#36A2EB",
    "#51dacf",
    "#edaaaa"
  ],
  weeklyChart: {
    labels: ["Red", "Green", "Yellow"],
    data: [1]
  },
  monthlyChart: {
    labels: ["Red", "Green", "Yellow"],
    data: [1, 5, 6, 7]
  },
  yearlyChart: {
    labels: ["Red", "Green", "Yellow"],
    data: [1, 5, 6, 7]
  },
};

let getDaysArray = function(s, e) {
  for (var a = [], d = s; d <= e; d.setDate(d.getDate() + 1)) {
    a.push(new Date(d));
  }
  return a;
};

function formatDate(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const charts = (state = initialState, action) => {
  switch (action.type) {
    case type.CALCULATE_WEEKLY_CHART:
      let workoutNames = [];
      let workouts = [];

      action.workouts.map(workout => {
        workoutNames.push(workout.name);
        workouts.push(workout);
        return workout;
      });

      let weekMap = [6, 0, 1, 2, 3, 4, 5];

      function startAndEndOfWeek(date) {
        let now = new Date(date);
        now.setHours(0, 0, 0, 0);
        let monday = new Date(now);
        monday.setDate(monday.getDate() - weekMap[monday.getDay()]);
        let sunday = new Date(now);
        sunday.setDate(sunday.getDate() - weekMap[sunday.getDay()] + 6);
        sunday.setHours(23, 59, 59, 999);
        return [monday, sunday];
      }

      let startAndEndWeek = startAndEndOfWeek(new Date());

      let daylist = getDaysArray(startAndEndWeek[0], startAndEndWeek[1]);
      daylist.map(v => v.toISOString().slice(0, 10)).join("");

      let daysInWeek = [];

      for (let i = 0; i < daylist.length; i++) {
        daysInWeek.push(
          formatDate(daylist[i])
            .split("-")
            .join("")
        );
      }

      let userHistory = action.history;
      let resultOfWeek = [];

      for (let j = 0; j < daysInWeek.length; j++) {
        for (let i = 0; i < userHistory.length; i++) {
          if (
            userHistory[i].session_start
              .match(/.{1,10}/g)[0]
              .split("-")
              .join("") === daysInWeek[j]
          ) {
            resultOfWeek.push(userHistory[i]);
          }
        }
      }

      let hashTable = {};

      for (let j = 0; j < workouts.length; j++) {
        hashTable[workouts[j].name] = 0;
      }

      for (let i = 0; i < resultOfWeek.length; i++) {
        for (let j = 0; j < workouts.length; j++) {
          if (resultOfWeek[i].text_id === workouts[j].id) {
            if (hashTable[workouts[j].name]) {
              hashTable[workouts[j].name] += 1;
            } else {
              hashTable[workouts[j].name] = 1;
            }
          }
        }
      }

      let valuesForDataset = [];

      for (var value in hashTable) {
        valuesForDataset.push(hashTable[value]);
      }

      let copyOfWeeklyChart = { ...state.weeklyChart };
      copyOfWeeklyChart.data = valuesForDataset;
      copyOfWeeklyChart.labels = workoutNames;

      return {
        ...state,
        weeklyChart: copyOfWeeklyChart
      };

    case type.CALCULATE_MONTHLY_CHART:
      let allWorkoutNames = [];
      let allWorkouts = [];

      action.workouts.map(workout => {
        allWorkoutNames.push(workout.name);
        allWorkouts.push(workout);
        return workout;
      });

      let date = new Date();
      let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      let theDaylist = getDaysArray(firstDay, lastDay);
      theDaylist.map(v => v.toISOString().slice(0, 10)).join("");

      let daysInMonth = [];

      for (let i = 0; i < theDaylist.length; i++) {
        daysInMonth.push(
          formatDate(theDaylist[i])
            .split("-")
            .join("")
        );
      }

      let theUserHistory = action.history;
      let theResultOfWeek = [];

      for (let j = 0; j < daysInMonth.length; j++) {
        for (let i = 0; i < theUserHistory.length; i++) {
          if (
            theUserHistory[i].session_start
              .match(/.{1,10}/g)[0]
              .split("-")
              .join("") === daysInMonth[j]
          ) {
            theResultOfWeek.push(theUserHistory[i]);
          }
        }
      }

      let theHashTable = {};

      for (let j = 0; j < allWorkouts.length; j++) {
        theHashTable[allWorkouts[j].name] = 0;
      }

      for (let i = 0; i < theResultOfWeek.length; i++) {
        for (let j = 0; j < allWorkouts.length; j++) {
          if (theResultOfWeek[i].text_id === allWorkouts[j].id) {
            if (theHashTable[allWorkouts[j].name]) {
              theHashTable[allWorkouts[j].name] += 1;
            } else {
              theHashTable[allWorkouts[j].name] = 1;
            }
          }
        }
      }

      let theValuesForDataset = [];

      for (var thisValue in theHashTable) {
        theValuesForDataset.push(theHashTable[thisValue]);
      }

      let CopyOfMonthlyChart = { ...state.yearlyChart };
      CopyOfMonthlyChart.data = theValuesForDataset;
      CopyOfMonthlyChart.labels = allWorkoutNames;

      return {
        ...state,
        monthlyChart: CopyOfMonthlyChart
      };

    case type.CALCULATE_YEARLY_CHART:
      let workoutName = [];
      let theWorkouts = [];

      action.workouts.map(workout => {
        workoutName.push(workout.name);
        theWorkouts.push(workout);
        return workout;
      });

      let year = new Date().getFullYear();
      let first_day_year = new Date(year, 0, 1);
      let last_day_year = new Date(year, 11, 31);

      let allDays = getDaysArray(first_day_year, last_day_year);
      allDays.map(v => v.toISOString().slice(0, 10)).join("");

      let daysInYear = [];

      for (let i = 0; i < allDays.length; i++) {
        daysInYear.push(
          formatDate(allDays[i])
            .split("-")
            .join("")
        );
      }

      let history = action.history;
      let resultOfYear = [];

      for (let j = 0; j < daysInYear.length; j++) {
        for (let i = 0; i < history.length; i++) {
          if (
            history[i].session_start
              .match(/.{1,10}/g)[0]
              .split("-")
              .join("") === daysInYear[j]
          ) {
            resultOfYear.push(history[i]);
          }
        }
      }

      let myHashTable = {};

      for (let j = 0; j < theWorkouts.length; j++) {
        myHashTable[theWorkouts[j].name] = 0;
      }

      for (let i = 0; i < resultOfYear.length; i++) {
        for (let j = 0; j < theWorkouts.length; j++) {
          if (resultOfYear[i].text_id === theWorkouts[j].id) {
            if (myHashTable[theWorkouts[j].name]) {
              myHashTable[theWorkouts[j].name] += 1;
            } else {
              myHashTable[theWorkouts[j].name] = 1;
            }
          }
        }
      }

      let allValuesForDataset = [];

      for (var objectValue in myHashTable) {
        allValuesForDataset.push(myHashTable[objectValue]);
      }

      let CopyOfYearlyChart = { ...state.yearlyChart };
      CopyOfYearlyChart.data = allValuesForDataset;
      CopyOfYearlyChart.labels = workoutName;

      return {
        ...state,
        yearlyChart: CopyOfYearlyChart
      };

    default:
      return state;
  }
};

export default charts;
