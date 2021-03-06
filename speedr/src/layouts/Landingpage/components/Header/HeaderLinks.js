/*eslint-disable*/
import React from "react";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import {  Games } from "@material-ui/icons";

// core components
// import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "../CustomButtons/Button.js";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          // href="https"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <Games /> Free Tool
        </Button>
      </ListItem>
      

      <ListItem className={classes.listItem}>
        <Button
          href="/login"
          className={classes.registerNavLink}
          color="rose"
          round
        >
          Login
        </Button>
      </ListItem>
    </List>
  );
}
