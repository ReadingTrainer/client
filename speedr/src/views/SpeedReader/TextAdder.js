import React from "react";
import { connect } from "react-redux";
// import {
//   fetchTexts,
//   addText,
//   chooseThisText,
//   deleteText
// } from "../../../Store/actions";
import {
  getTexts,
  createText,
  getOneText
} from "../../store/actions/textsActions";

class TextAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      name: ""
    };
  }

  componentDidMount = () => {
    this.props.getTexts();
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addText = () => {
    this.props.createText(this.state.name, this.state.text);

    this.setState({
      text: "",
      name: ""
    });
  };

  chooseText = textId => {
    this.props.getOneText(textId);
  };

  render() {
    return (
      <StyledTextAdder>
        {this.props.texts ? (
          <div className="all-texts">
            {this.props.texts.map((item, index) => {
              return (
                <div key={index} className="text">
                  <div className="close">
                    <i
                      // onClick={() => this.props.deleteText(item.id)}
                      className="fa fa-window-close"
                    />
                  </div>
                  <p onClick={() => this.chooseText(item.id)}>{item.name}</p>
                </div>
              );
            })}
          </div>
        ) : null}
        <h1>Add text to train your reading skills !</h1>
        <div className="input-plus">
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.changeHandler}
            placeholder="Name"
          />
          <input
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.changeHandler}
            placeholder="Text"
          />
          <i onClick={this.addText} className="fa fa-plus-square" />
        </div>
      </StyledTextAdder>
    );
  }
}

const mapStateToProps = state => ({
  texts: state.texts.texts
});

export default connect(
  mapStateToProps,
  { getTexts, createText, getOneText }
)(TextAdder);
