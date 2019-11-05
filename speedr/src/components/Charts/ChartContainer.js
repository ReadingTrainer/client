import React from "react";
import WeeklyChart from "./WeeklyChart";
import MonthlyChart from "./MonthlyChart";
import YearlyChart from "./YearlyChart";
import styled from "styled-components";
import { fetchTextsHistory } from "../../store/actions/historyActions";
import { getTexts } from "../../store/actions/textsActions";
import {
  calculateWeeklyChart,
  calculateMonthlyChart,
  calculateYearlyChart
} from "../../store/actions/chartActions";
import { connect } from "react-redux";

const StyledChartContainer = styled.div`
  padding: 1.5rem 3rem;

  @media (max-width: 1000px) {
    padding: 0.5rem 2rem;
  }

  @media (max-width: 720px) {
    padding: 0.5rem 0rem;
  }

  .chart-row {
    display: flex;
    justify-content: space-between;

    @media (max-width: 1000px) {
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }
  }

  .chart {
    text-align: center;
    width: 30%;
    border: 0;
    display: flex;
    font-size: 0.875rem;
    min-width: 0;
    word-wrap: break-word;
    background: #fff;
    margin-top: 3rem;
    border-radius: 0.6rem;
    margin-bottom: 3rem;
    flex-direction: column;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    }

    @media (max-width: 1000px) {
      width: 60%;
      margin: 1rem;
    }

    @media (max-width: 800px) {
      width: 70%;
    }

    @media (max-width: 600px) {
      width: 80%;
    }
  }

  .ant-card-head-title {
    text-align: left;
  }

  .calendar,
  .history {
    color: rgba(0, 0, 0, 0.87);
    width: 70%;
    border: 0;
    font-size: 0.875rem;
    text-align: center;
    position: relative;
    min-width: 0;
    word-wrap: break-word;
    padding: 3rem;
    border-radius: 0.6rem;
    margin-bottom: 3rem;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 850px) {
      width: 90%;
    }

    @media (max-width: 720px) {
      padding: 0;
    }

    &:hover {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    }
  }

  .info {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    i {
      font-size: 1.3rem;
      color: #fff;

      @media (max-width: 1000px) {
        font-size: 1.5rem;
      }
      &:hover {
        color: green;
      }
    }
  }
`;

class ChartContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.getTexts();
    this.props.fetchTextsHistory();
    setTimeout(() => {
      this.props.calculateWeeklyChart(this.props.history, this.props.texts);
      this.props.calculateMonthlyChart(this.props.history, this.props.texts);
      this.props.calculateYearlyChart(this.props.history, this.props.texts);
    }, 2000)
  };

  render() {
    return (
      <StyledChartContainer>
        <div className="chart-row">
          <WeeklyChart />

          <MonthlyChart />

          <YearlyChart />
        </div>

      </StyledChartContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    history: state.history.history,
    texts: state.texts.texts,
  };
};

export default connect(
  mapStateToProps,
  {
    getTexts,
    fetchTextsHistory,
    calculateWeeklyChart,
    calculateMonthlyChart,
    calculateYearlyChart
  }
)(ChartContainer);
