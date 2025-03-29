import React from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 2000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Tim = () => {
  return (
    <section id="tim">
      <div className="title-tim">
        <h2 className="fw-bold">OUR TEAM</h2>
        <p>Let's get to know the Rehatin Team</p>
      </div>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={1000}
        arrows={false}
        customTransition="transform 1000ms ease 0s"
        transitionDuration={1000}
        ltr={true}
      >
        <Card className="p-0">
          <Card.Img
            variant="top"
            src="../../../public/assets/images/About/foto-pm.png"
            className="p-0"
          />
          <Card.Body>
            <h5>M. Zahran Shahizidan S.</h5>
            <p>Project Manager</p>
          </Card.Body>
        </Card>

        <Card className="p-0">
          <Card.Img
            variant="top"
            src="../../../public/assets/images/About/foto-ui-1.jpg"
          />
          <Card.Body>
            <h5>Yuanda Zahra Aulia</h5>
            <p>UI/UX Designer</p>
          </Card.Body>
        </Card>

        <Card className="p-0">
          <Card.Img
            variant="top"
            src="../../../public/assets/images/About/foto-ui-2.png"
          />
          <Card.Body>
            <h5>Davin Erlan Pradana</h5>
            <p>UI/UX Designer</p>
          </Card.Body>
        </Card>

        <Card className="p-0">
          <Card.Img
            variant="top"
            src="../../../public/assets/images/About/foto-coder-1.png"
          />
          <Card.Body>
            <h5>Niswah Trias Qurotul A.</h5>
            <p>Programmer</p>
          </Card.Body>
        </Card>

        <Card className="p-0">
          <Card.Img
            variant="top"
            src="../../../public/assets/images/About/foto-coder-2.png"
          />
          <Card.Body>
            <h5>Maulana Hidayatulloh M.</h5>
            <p>Programmer</p>
          </Card.Body>
        </Card>
      </Carousel>
    </section>
  );
};

export default Tim;
