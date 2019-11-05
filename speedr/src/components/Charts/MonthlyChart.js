import React from "react";
import { connect } from "react-redux";
import { Pie } from "react-chartjs-2";
import { Modal, Button, Card } from "antd";
import uuid from "uuidv4";

const { Meta } = Card;

class MonthlyChart extends React.Component {
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
        className="chart chart-two"
        cover={
          <Card
            className="chart-card"
            style={{
              backgroundColor: "#E94340",
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
                  {this.props.monthlyChart.labels.map((workout, index) =>
                    this.props.monthlyChart.data[index] ? (
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
                labels: this.props.monthlyChart.labels,

                datasets: [
                  {
                    data: this.props.monthlyChart.data,
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
          title="Monthly Result"
          description={
            <div>
              <i className="fa fa-fire"></i>{" "}
              {`You made ${this.props.monthlyChart.data.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
              )} ${
                this.props.monthlyChart.data.reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0
                ) === 1
                  ? "workout"
                  : "workouts"
              }  this Month.`}{" "}
            </div>
          }
        />
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    monthlyChart: state.charts.monthlyChart,
    color: state.charts.color
  };
};

export default connect(mapStateToProps)(MonthlyChart);
