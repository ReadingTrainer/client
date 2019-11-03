import React from "react";
import { connect } from "react-redux";
import {
  getTexts,
  createText,
  getOneText,
  deleteText
} from "../../store/actions/textsActions";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withStyles } from "@material-ui/styles";
import { red } from "@material-ui/core/colors";

import PropTypes from "prop-types";
const StyledTextAdder = styled.div``;

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
    const { classes } = this.props;

    return (
      <StyledTextAdder>
        {this.props.texts ? (
          <div className="all-texts">
            {this.props.texts.map((item, index) => {
              return (
                <div key={item.id} onClick={() => this.chooseText(item.id)}>
                  <Card className={classes.card}>
                    <CardHeader
                      // avatar={
                      //   <Avatar aria-label="recipe" className={classes.avatar}>
                      //     R
                      //   </Avatar>
                      // }
                      action={
                        // <IconButton aria-label="settings">
                        //   <MoreVertIcon />
                        // </IconButton>

                        <div className="close">
                          <i
                            onClick={() => this.props.deleteText(item.id)}
                            className="fa fa-window-close"
                          />
                        </div>
                      }
                      title={item.name}
                      subheader={item.date}
                    />
                    <CardMedia
                      // className={classes.media}
                      image="/static/images/cards/paella.jpg"
                      title="Paella dish"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {`This text has about ${
                          item.text.split(" ").length
                        } words.`}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
                //                                         <div key={index} className="text">
                //   <div className="close">
                //     <i
                //       onClick={() => this.props.deleteText(item.id)}
                //       className="fa fa-window-close"
                //     />
                //   </div>
                //   <p onClick={() => this.chooseText(item.id)}>{item.name}</p>
                // </div>
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

TextAdder.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  texts: state.texts.texts
});

export default connect(
  mapStateToProps,
  { getTexts, createText, getOneText, deleteText }
)(withStyles(styles)(TextAdder));
