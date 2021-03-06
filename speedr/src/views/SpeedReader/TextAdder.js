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
// import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withStyles } from "@material-ui/styles";
import { red } from "@material-ui/core/colors";

import PropTypes from "prop-types";

const StyledTextAdder = styled.div`
.all-texts {
 display: flex;
 flex-wrap: wrap;
}

.text-card {
 width: 20%;
}
`;

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

  componentDidMount = () => {
    this.props.getTexts();
  };

  render() {
    const { classes } = this.props;

    return (
      <StyledTextAdder>
        {this.props.texts ? (
          <div className="all-texts">
            {this.props.texts.map((item, index) => {
              return (
                <div className="text-card" key={item.id} onClick={() => this.props.chooseText(item.id)}>
                  <Card className={classes.card} >
                    <CardHeader
                      action={
                        <IconButton
                          onClick={() => this.props.handleDeletion(item.id)}
                          aria-label="add to favorites"
                        >
                          <div className="close">
                            <i className="fa fa-window-close" />
                          </div>
                        </IconButton>
                      }
                      title={item.name}
                      subheader={item.date}
                    />
                    <CardMedia
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
              );
            })}
          </div>
        ) : null}
        <h1>Add a text to train your reading skills !</h1>
        <div className="input-plus">
          <input
            type="text"
            name="name"
            value={this.props.name}
            onChange={this.props.handleChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="text"
            value={this.props.text}
            onChange={this.props.handleChange}
            placeholder="Text"
          />
          <i onClick={this.props.addText} className="fa fa-plus-square" />
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
