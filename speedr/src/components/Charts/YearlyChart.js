import React from "react";
import { Pie } from "react-chartjs-2";
import { Modal, Button, Card } from "antd";
import { connect } from "react-redux";
import uuid from "uuidv4";

const { Meta } = Card;

class YearlyChart extends React.Component {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
      workoutsForDate: null
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <Card
        hoverable
        className="chart chart-three"
        cover={
          <Card
            className="chart-card"
            style={{
              backgroundColor: "#FC940C",
              borderRadius: ".6rem"
            }}
          >
            <div className="info">
              <i onClick={this.showModal} className="fa fa-info-circle" />
              <Modal
                maskStyle={{ opacity: ".2" }}
                title="Workout List"
                visible={this.state.visible}
                onCancel={this.handleCancel}
                footer={[
                  <Button key={uuid()} type="primary" onClick={this.handleOk}>
                    OK
                  </Button>
                ]}
              >
                <div
                  className="legend"
                  style={{
                    fontWeight: "600",
                    color: "white",
                    textAlign: "center"
                  }}
                >
                  {this.props.yearlyChart.labels.map((workout, index) =>
                    this.props.yearlyChart.data[index] ? (
                      <p
                        key={index}
                        style={{
                          backgroundColor: `${this.props.color[index]}`
                        }}
                      >
                        {workout}
                      </p>
                    ) : null
                  )}
                </div>
              </Modal>
            </div>
            <Pie
              data={{
                labels: this.props.yearlyChart.labels,
                datasets: [
                  {
                    data: this.props.yearlyChart.data,
                    backgroundColor: this.props.color,
                    hoverBackgroundColor: this.props.color
                  }
                ]
              }}
            />
          </Card>
        }
      >
        <Meta
          title="Yearly Result"
          description={
            <div>
              <i className="fa fa-fire"></i>{" "}
              {` You made ${this.props.yearlyChart.data.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
              )} ${
                this.props.yearlyChart.data.reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0
                ) === 1
                  ? "workout"
                  : "workouts"
              } this year.`}{" "}
            </div>
          }
        />
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    color: state.charts.color,
    yearlyChart: state.charts.yearlyChart
  };
};

export default connect(mapStateToProps)(YearlyChart);
