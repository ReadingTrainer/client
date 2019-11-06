import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import Card from "../../../components/Card/Card.js";
import Typography from "@material-ui/core/Typography";

// Pictures
// import image1 from "../../../assets/img/bg.jpg";
// import image2 from "../../../assets/img/bg2.jpg";
// import image3 from "../../../assets/img/bg3.jpg";
import image1 from "./george.jpg";
import image2 from "./john.jpg";
import image3 from "./jimmy.jpg";
import image4 from "./abraham.jpg";
import image5 from "./harvard.jpg";
import image6 from "./cambridge.jpg";
import styled from "styled-components";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

import styles from "../../../assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";

// const useStyles = makeStyles(styles);

const StyledSectionCaroussel = styled.div`

img {
    max-width: 100%;
    max-height: 100%;
}

.picture {
  height: 300px;
  width: 80%;
}
`; 

// export default function SectionCarousel() {
//   const classes = useStyles();
//   const settings = {
//     // dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true
//   };
//   return (
//     <StyledSectionCaroussel className={classes.section}>
//       <div className={classes.container}>
//       {/* <Typography
//           component="h1"
//           variant="h2"
//           align="center"
//           color="textPrimary"
//           gutterBottom
//         >
//         </Typography> */}
//         <Typography
//           variant="h3"
//           align="center"
//           color="textSecondary"
//           component="p"
//         >
//           Speed reader and Universities
//         </Typography>
//         <GridContainer>
//           <GridItem xs={12} sm={12} md={8} className={classes.marginAuto}>
//             <Card carousel>
//               <Carousel {...settings}>
//                 <div className="picture">
//                   <img src={image1} alt="First slide" className="slick-image" />
//                   <div className="slick-caption">
//                     <h4>
//                       <LocationOn className="slick-icons" />
//                       George Washington, United States
//                     </h4>
//                   </div>
//                 </div>
//                 <div className="picture">
//                   <img
//                     src={image2}
//                     alt="Second slide"
//                     className="slick-image"
//                   />
//                   <div className="slick-caption">
//                     <h4>
//                       <LocationOn className="slick-icons" />
//                       President John F. Kennedy, United States
//                     </h4>
//                   </div>
//                 </div>
//                 <div className="picture">
//                   <img src={image3} alt="Third slide" className="slick-image" />
//                   <div className="slick-caption">
//                     <h4>
//                       <LocationOn className="slick-icons" />
//                       President Jimmy Carter, United States
//                     </h4>
//                   </div>
//                 </div>
//                 <div className="picture">
//                   <img src={image4} alt="First slide" className="slick-image" />
//                   <div className="slick-caption">
//                     <h4>
//                       <LocationOn className="slick-icons" />
//                       Abraham Lincoln, United States
//                     </h4>
//                   </div>
//                 </div>
//                 <div className="picture">
//                   <img src={image5} alt="First slide" className="slick-image" />
//                   <div className="slick-caption">
//                     <h4>
//                       <LocationOn className="slick-icons" />
//                       Harvard University, United States
//                     </h4>
//                   </div>
//                 </div><div className="picture">
//                   <img src={image6} alt="First slide" className="slick-image" />
//                   <div className="slick-caption">
//                     <h4>
//                       <LocationOn className="slick-icons" />
//                       Cambridge University, England
//                     </h4>
//                   </div>
//                 </div>
//               </Carousel>
//             </Card>
//           </GridItem>
//         </GridContainer>
//       </div>
//     </StyledSectionCaroussel>
//   );
// }

class SectionCaroussel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount = () => {
    document.getElementsByClassName("slick-arrow slick-prev").style.display = "none";
  }

  render() { 
    const settings = {
      // dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };

    const { classes } = this.props;
    
    return (     <StyledSectionCaroussel className={classes.section}>
      <div className={classes.container}>
      {/* <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
        </Typography> */}
        <Typography
          variant="h3"
          align="center"
          color="textSecondary"
          component="p"
        >
          Speed reader and Universities
        </Typography>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8} className={classes.marginAuto}>
            <Card carousel>
              <Carousel {...settings}>
                <div className="picture">
                  <img src={image1} alt="First slide" className="slick-image" />
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" />
                      George Washington, United States
                    </h4>
                  </div>
                </div>
                <div className="picture">
                  <img
                    src={image2}
                    alt="Second slide"
                    className="slick-image"
                  />
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" />
                      President John F. Kennedy, United States
                    </h4>
                  </div>
                </div>
                <div className="picture">
                  <img src={image3} alt="Third slide" className="slick-image" />
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" />
                      President Jimmy Carter, United States
                    </h4>
                  </div>
                </div>
                <div className="picture">
                  <img src={image4} alt="First slide" className="slick-image" />
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" />
                      Abraham Lincoln, United States
                    </h4>
                  </div>
                </div>
                <div className="picture">
                  <img src={image5} alt="First slide" className="slick-image" />
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" />
                      Harvard University, United States
                    </h4>
                  </div>
                </div><div className="picture">
                  <img src={image6} alt="First slide" className="slick-image" />
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" />
                      Cambridge University, England
                    </h4>
                  </div>
                </div>
              </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </StyledSectionCaroussel> );
  }
}


SectionCaroussel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SectionCaroussel);