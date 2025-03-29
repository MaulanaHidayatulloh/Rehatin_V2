import React from "react";
import { Link } from "react-scroll";
import "./about.css";
import Container from "react-bootstrap/esm/Container";

function CardAbout() {
  return (
    <Container id="cardAbout">
      <ul className="list-unstyled d-flex">
        <li>
          <Link
            to="main-about"
            spy={true}
            smooth={true}
            hashSpy={true}
            offset={-100}
            duration={500}
            className="text-decoration-none text-white"
          >
            Our Overview
          </Link>
        </li>
        <li>
          <Link
            to="visimisi"
            spy={true}
            smooth={true}
            hashSpy={true}
            offset={-50}
            duration={500}
            className="text-decoration-none text-white"
          >
            Vision and Mission
          </Link>
        </li>
        <li>
          <Link
            to="tim"
            spy={true}
            smooth={true}
            hashSpy={true}
            offset={-50}
            duration={500}
            className="text-decoration-none text-white"
          >
            Our Team
          </Link>
        </li>
        <li>
          <Link
            to="kontak"
            spy={true}
            smooth={true}
            hashSpy={true}
            offset={-95}
            duration={500}
            className="text-decoration-none text-white"
          >
            Contact
          </Link>
        </li>
      </ul>
    </Container>
  );
}

export default CardAbout;
