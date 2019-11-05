export const CALCULATE_WEEKLY_CHART = "CALCULATE_WEEKLY_CHART";
export const CALCULATE_MONTHLY_CHART = "CALCULATE_MONTHLY_CHART";
export const CALCULATE_YEARLY_CHART = "CALCULATE_YEARLY_CHART";

export const calculateWeeklyChart = (history, workouts) => {
  debugger
  return { type: CALCULATE_WEEKLY_CHART, history: history, workouts: workouts };
};

export const calculateMonthlyChart = (history, workouts) => {
  return { type: CALCULATE_MONTHLY_CHART, history: history, workouts: workouts };
};

export const calculateYearlyChart = (history, workouts) => {
  return { type: CALCULATE_YEARLY_CHART, history: history, workouts: workouts };
};
