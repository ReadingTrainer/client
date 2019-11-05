import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
// core components
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import GridItem from '../../components/Grid/GridItem.js';
import Button from '../../components/CustomButtons/Button.js';
import Parallax from '../../components/Parallax/Parallax.js';
import ListItem from "@material-ui/core/ListItem";
// sections for this page
import HeaderLinks from '../../components/Header/HeaderLinks.js';
import SectionCarousel from './Sections/SectionCarousel.js';
import Pricing from '../../components/Pricing/Pricing.js';

import styles from '../../assets/jss/material-kit-react/views/components.js';
import "../../assets/scss/material-kit-react.scss?v=1.8.0";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="SpeedR"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: 'white'
        }}
        {...rest}
      />
      {/* <SectionNavbars /> */}
      <Parallax image={require('../../assets/img/speedr.gif')}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h2 className={(classes.title, classes.left)}>SpeedR</h2>
                This is a two in one App where users can get both a learning
                experience and also help in improving your general skills, We
                include a a free game. Our App is always ivloving with a lot
                more ideas to come.
                <ListItem className={classes.listItem}>
                  <Button
                    href="/sign_up"
                    className={classes.registerNavLink}
                    color="rose"
                    round
                  >
                    Sign Up
                  </Button>
                </ListItem>
              </div>
            </GridItem>
            <GridItem>
              <div className={classes.brand}>
                This is a two in one App where users can get both a learning
                experience and also help in improving your general skills, We
                include a a free game. Our App is always ivloving with a lot
                more ideas to come.
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionCarousel />
        <Pricing />
      </div>
      <Footer />
    </div>
  );
}
