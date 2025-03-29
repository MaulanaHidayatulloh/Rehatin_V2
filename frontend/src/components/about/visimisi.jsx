import React from "react";
import "./about.css";
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/esm/CardBody";

function VisiMisi() {
  return (
    <section id="visimisi">
      <div className="sec-card">
        <Card>
          <CardBody>
            <h3 className="fw-bold">Our Vision</h3>
            <p>
              To become the leading platform that inspires and facilitates users
              in discovering entertainment destinations that match their
              interests and needs, ensuring every holiday is an unforgettable
              experience.
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h3 className="fw-bold">Our Mission</h3>
            <p>
              We are committed to inspiring our users by providing a variety of
              recommendations for exciting entertainment venues they can visit.
              We aim to help them find destinations that match their interests
              and needs, making every holiday an unforgettable experience.
            </p>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default VisiMisi;
