import React from "react";
import { connect } from "react-redux";
import TextAdder from "./TextAdder";
import { showNextWord } from "../../store/actions/textsActions";
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
      textBackgroundColor: "grey",
      textFontSize: "",
      textHeight: "",
      textWidth: "",
      textColor: "white",
      interval: null,
      succesMessage: false
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

  handleClick = () => {
    this.setState({ succesMessage: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ succesMessage: false });
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
        <TextAdder handleClick={this.handleClick} />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.succesMessage}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            message="This is a success message!"
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
  currentIndexOfWord: state.texts.currentIndexOfWord
});

export default connect(
  mapStateToProps,
  { showNextWord }
)(withStyles(styles)(SpeedReader));


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

// MySnackbarContentWrapper.propTypes = {
//   className: PropTypes.string,
//   message: PropTypes.string,
//   onClose: PropTypes.func,
//   variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
// };

// const useStyles2 = makeStyles(theme => ({
//   margin: {
//     margin: theme.spacing(1),
//   },
// }));

// export default function CustomizedSnackbars() {
//   const classes = useStyles2();
//   const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen(true);
//   };

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setOpen(false);
//   };

//   return (
//     <div>
//       <Button variant="outlined" className={classes.margin} onClick={handleClick}>
//         Open success snackbar
//       </Button>
//       <Snackbar
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//         open={open}
//         autoHideDuration={6000}
//         onClose={handleClose}
//       >
//         <MySnackbarContentWrapper
//           onClose={handleClose}
//           variant="success"
//           message="This is a success message!"
//         />
//       </Snackbar>
//       <MySnackbarContentWrapper
//         variant="error"
//         className={classes.margin}
//         message="This is an error message!"
//       />
//       <MySnackbarContentWrapper
//         variant="warning"
//         className={classes.margin}
//         message="This is a warning message!"
//       />
//       <MySnackbarContentWrapper
//         variant="info"
//         className={classes.margin}
//         message="This is an information message!"
//       />
//       <MySnackbarContentWrapper
//         variant="success"
//         className={classes.margin}
//         message="This is a success message!"
//       />
//     </div>
//   );
// }
