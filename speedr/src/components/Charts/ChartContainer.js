import React from "react";
import MonthlyGraph from "./MonthlyGraph";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchTextsHistory } from "../../store/actions/historyActions";
import { getTexts } from "../../store/actions/textsActions";

const StyledChartContainer = styled.div``;

class ChartContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.fetchTextsHistory();
    this.props.getTexts();
  };

  render() {
    return (
      <StyledChartContainer>
        <MonthlyGraph />
      </StyledChartContainer>
    );
  }
}

export default connect(
  null,
  { fetchTextsHistory, getTexts }
)(ChartContainer);
