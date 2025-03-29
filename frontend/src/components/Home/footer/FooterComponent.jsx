import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Subscribe from "./subscribe";
import "./footer.css";

function Footer() {
  return (
    <div>
      <Subscribe />
      <div className="footer-page">
        <Navbar className="sec-footer">
          <Container>
            <Row className="gap-3">
              <Col sm={4}>
                <h5>
                  <img src="..\public\logo\logo-rehatin-w.png" />
                </h5>
                <p className="text-align-justify me-5">
                  "Temukan kebahagiaan di setiap sudut kota! Nikmati rekomendasi
                  tempat hiburan terbaik untuk pengalaman tak terlupakan. "
                </p>
              </Col>
              <Col sm={1} className="me-4">
                <h5>Place</h5>
                <ul>
                  <li>
                    <a href="/category/1">Park</a>
                  </li>
                  <li>
                    <a href="/category/2">Museum</a>
                  </li>
                  <li>
                    <a href="/category/3">Eatry</a>
                  </li>
                  <li>
                    <a href="/category/4">Playground</a>
                  </li>
                </ul>
              </Col>
              <Col sm={2}>
                <h5>About Rehatin</h5>
                <ul>
                  <li>
                    <a href="/aboutUs">About Us</a>
                  </li>
                  <li>
                    <a href="">Contact Us</a>
                  </li>
                  <li>
                    <a href="">Help center</a>
                  </li>
                </ul>
              </Col>

              <Col sm={2}>
                <h5>Follow Us On</h5>
                <ul>
                  <li className="icon-follow">
                    <a href="">
                      <img
                        src="../public/logos_tiktok-icon.svg"
                        alt=""
                        style={{ width: "15px" }}
                      />{" "}
                      Tiktok
                    </a>
                  </li>
                  <li className="icon-follow">
                    <a href="">
                      <img
                        src="../public/logos_youtube-icon.svg"
                        alt=""
                        style={{ width: "15px" }}
                      />{" "}
                      Youtube
                    </a>
                  </li>
                  <li className="icon-follow">
                    <a href="">
                      <img
                        src="../public/skill-icons_instagram.svg"
                        alt=""
                        style={{ width: "15px" }}
                      />{" "}
                      Instagram
                    </a>
                  </li>
                </ul>
              </Col>

              <Col sm={2}>
                <h5>Address</h5>
                <p className="text-align-justify">
                  JL TB Simatupang Kav 1-S, Cilandak Timur, Kota Jakarta Selatan
                </p>
              </Col>
            </Row>
          </Container>
        </Navbar>

        <Navbar className="copyright">
          <Container>
            <Navbar.Collapse className="justify-content-center">
              <Navbar.Text className="copyright-text text-white">
                Copyright &#169; 2024. All rights reserved.
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default Footer;
