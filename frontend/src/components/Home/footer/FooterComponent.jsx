import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
// import Subscribe from "./subscribe";
import "./footer.css";

function Footer() {
  return (
    <div>
      {/* <Subscribe /> */}
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
                    <a href="/category/1">Alam</a>
                  </li>
                  <li>
                    <a href="/category/2">Budaya</a>
                  </li>
                  <li>
                    <a href="/category/3">Kuliner</a>
                  </li>
                  <li>
                    <a href="/category/4">Bermain</a>
                  </li>
                </ul>
              </Col>
              <Col sm={2}>
                <h5>Tentang Rehatin</h5>
                <ul>
                  <li>
                    <a href="/aboutUs#main-about">Tentang Kami</a>
                  </li>
                  <li>
                    <a href="/aboutUs#visimisi">Visi Misi</a>
                  </li>
                  <li>
                    <a href="/aboutUs#kontak">Kontak Kami</a>
                  </li>
                </ul>
              </Col>

              <Col sm={2}>
                <h5>Ikuti Kami</h5>
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
                <h5>Alamat</h5>
                <p className="text-align-justify">
                  JL Semanan Raya RT 01/ RW 02, Kecamatan Kalideres, Kota
                  Jakarta Barat
                </p>
              </Col>
            </Row>
          </Container>
        </Navbar>

        <Navbar className="copyright">
          <Container>
            <Navbar.Collapse className="justify-content-center">
              <Navbar.Text className="copyright-text text-white">
                Copyright &#169; 2025. All rights reserved.
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default Footer;
