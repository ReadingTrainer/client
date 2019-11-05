import React from "react";
import { connect } from "react-redux";
import TextAdder from "./TextAdder";
import {
  showNextWord,
  createText,
  getOneText,
  deleteText,
  startTextSession,
  endTextSession
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// BEGIN NEW ADDED
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { amber, green } from "@material-ui/core/colors";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";
//// END NEW ADDED
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
      textBackgroundColor: "black",
      textFontSize: "",
      textHeight: "",
      textWidth: "",
      textColor: "white",
      interval: null,
      succesMessage: false,
      infoMessage: false,
      text: "",
      name: ""
    };
  }

  start = () => {
    this.props.startTextSession(this.props.currentIdOfText);
    const wordsPerSecond = this.state.number / 60;
    const resultForSetInterval = 1000 / wordsPerSecond;

    const intervalVariable = setInterval(this.timer, resultForSetInterval);

    this.setState({ interval: intervalVariable });
  };

  timer = () => {
    if (this.props.currentIndexOfWord + 1 !== this.props.text.length) {
      this.props.showNextWord();
    } else {
      this.props.endTextSession(this.props.currentIdOfText, this.props.currentIdOfSession);
      clearInterval(this.state.interval);
    }
  };

  pause = () => {
    clearInterval(this.state.interval);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addText = () => {
    this.props.createText(this.state.name, this.state.text);

    this.setState({
      text: "",
      name: "",
      succesMessage: true
    });
  };

  chooseText = textId => {
    this.props.getOneText(textId);

    this.setState({
      infoMessage: true
    });
  };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleDeletion = textId => {
    this.props.deleteText(textId);
    this.setState({ succesMessage: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ succesMessage: false, infoMessage: false });
  };

  componentWillUnmount() {
    this.props.endTextSession(this.props.currentIdOfText, this.props.currentIdOfSession);
  }

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
            <IconButton onClick={this.start} aria-label="add to favorites">
              <i className="fa fa-play" />
            </IconButton>
            <IconButton onClick={this.pause} aria-label="share">
              <i className="fa fa-pause" />
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                  placeholder="Text Color"
                />
              </div>
              <div className="row">
                <p>Background Color</p>
                <input
                  type="text"
                  name="textBackgroundColor"
                  value={this.state.textBackgroundColor}
                  onChange={this.handleChange}
                  placeholder="Background Color"
                />
              </div>
              <div className="row">
                <p>Fontsize</p>
                <input
                  type="number"
                  name="textFontSize"
                  value={this.state.textFontSize}
                  onChange={this.handleChange}
                  placeholder="Fontsize"
                />
              </div>
              <div className="row">
                <p>Height</p>
                <input
                  type="number"
                  name="textHeight"
                  value={this.state.textHeight}
                  onChange={this.handleChange}
                  placeholder="Height"
                />
              </div>
              <div className="row">
                <p>Width</p>
                <input
                  type="number"
                  name="textWidth"
                  value={this.state.textWidth}
                  onChange={this.handleChange}
                  placeholder="Width"
                />
              </div>
            </div>
          </Collapse>
        </Card>
        <TextAdder
          handleDeletion={this.handleDeletion}
          name={this.state.name}
          text={this.state.text}
          handleChange={this.handleChange}
          addText={this.addText}
          chooseText={this.chooseText}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={this.state.succesMessage}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            message={"Your action was successful"}
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={this.state.infoMessage}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            variant="info"
            className={classes.margin}
            message="You text is ready to read!"
          />
        </Snackbar>
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
  currentIndexOfWord: state.texts.currentIndexOfWord,
  currentIdOfText: state.texts.currentIdOfText,
  currentIdOfSession: state.texts.currentIdOfSession
});

export default connect(
  mapStateToProps,
  {
    showNextWord,
    createText,
    getOneText,
    deleteText,
    startTextSession,
    endTextSession
  }
)(withStyles(styles)(SpeedReader));

//////////////// MAKE COMPONENT OUTSIDE
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}
