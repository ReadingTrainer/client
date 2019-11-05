import React from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
// import {} from "";

const StyledChartContainer = styled.div`

`;

class ChartContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount = () => {

  }
  
  render() { 
    return ( <StyledChartContainer>

    </StyledChartContainer> );
  }
}
 
export default connect(null, {})(ChartContainer);