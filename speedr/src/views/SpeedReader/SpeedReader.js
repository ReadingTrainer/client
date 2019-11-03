import React from "react";
import { connect } from "react-redux";
import TextAdder from "./TextAdder";
import {
  showTextAfterPause,
  makePause,
  showNextWord
} from "../../store/actions/textsActions";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";

const StyledSpeedReader = styled.div``;

const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class SpeedReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      number: 240,
      textBackgroundColor: "grey",
      textFontSize: "",
      textHeight: "",
      textWidth: "",
      textColor: "white",
      interval: null
    };
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  start = () => {
    const wordsPerSecond = this.state.number / 60;
    const resultForSetInterval = 1000 / wordsPerSecond;

    const intervalVariable = setInterval(this.timer, resultForSetInterval);

    this.setState({ interval: intervalVariable });
  };

  timer = () => {
    if (this.props.currentIndexOfWord + 1 !== this.props.text.length) {
      this.props.showNextWord();
    } else {
      clearInterval(this.state.interval);
    }
  };

  pause = () => {
    clearInterval(this.state.interval);
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { classes } = this.props;

    const styleTextSection = {
      color: this.state.textColor,
      background: this.state.textBackgroundColor,
      fontSize: `${this.state.textFontSize}px`,
      height: `${this.state.textHeight}px`,
      width: `${this.state.textWidth}px`
    };
    return (
      <StyledSpeedReader>
        <Card className={classes.card}>
          <CardContent style={styleTextSection}>
            <div className="word-section">
              <h1 className="text">
                {this.props.currentWord
                  ? this.props.currentWord
                  : "Create or choose a text to start your training"}
              </h1>
            </div>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <i onClick={this.start} className="fa fa-play" />
            </IconButton>
            <IconButton aria-label="share">
              <i className="fa fa-pause" onClick={this.pause} />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <div className="settings">
              <div className="row">
                <p>Words per minute</p>
                <input
                  type="number"
                  name="number"
                  value={this.state.number}
                  onChange={this.changeHandler}
                  placeholder="number"
                  min="60"
                />
              </div>
              <div className="row">
                <p>Text Color</p>
                <input
                  type="text"
                  name="textColor"
                  value={this.state.textColor}
                  onChange={this.changeHandler}
                  placeholder="Text Color"
                />
              </div>
              <div className="row">
                <p>Background Color</p>
                <input
                  type="text"
                  name="textBackgroundColor"
                  value={this.state.textBackgroundColor}
                  onChange={this.changeHandler}
                  placeholder="Background Color"
                />
              </div>
              <div className="row">
                <p>Fontsize</p>
                <input
                  type="number"
                  name="textFontSize"
                  value={this.state.textFontSize}
                  onChange={this.changeHandler}
                  placeholder="Fontsize"
                />
              </div>
              <div className="row">
                <p>Height</p>
                <input
                  type="number"
                  name="textHeight"
                  value={this.state.textHeight}
                  onChange={this.changeHandler}
                  placeholder="Height"
                />
              </div>
              <div className="row">
                <p>Width</p>
                <input
                  type="number"
                  name="textWidth"
                  value={this.state.textWidth}
                  onChange={this.changeHandler}
                  placeholder="Width"
                />
              </div>
            </div>
          </Collapse>
        </Card>
        <TextAdder />
      </StyledSpeedReader>
    );
  }
}

SpeedReader.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentWord: state.texts.currentWord,
  text: state.texts.text,
  currentIndexOfWord: state.texts.currentIndexOfWord
});

export default connect(
  mapStateToProps,
  { showTextAfterPause, makePause, showNextWord }
)(withStyles(styles)(SpeedReader));
