import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import "./CardCategory.css";
import React from "react";

const categoryMapping = {
  1: "Alam",
  2: "Budaya",
  3: "Kuliner",
  4: "Bermain",
};

function CardCategory() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="kategori">
      <div className="kategori-title">
        <img src="../src/assets/Home/Category/favorite_category.svg" alt="" />
        <h2 className="fw-bold">Choose your Favorite Categories!</h2>
      </div>
      <Container className="sec-card">
        <Row xs={1} sm={2} md={2} lg={4} className="g-4">
          {Object.keys(categoryMapping).map((categoryId) => (
            <Col
              className="card-kategori"
              key={categoryId}
              onClick={() => handleCategoryClick(categoryId)}
            >
              <Card className="text-white p-0">
                <Card.Img
                  className="img img-kategori"
                  src={`src/assets/Home/Category/Gambar-kategori/${categoryMapping[
                    categoryId
                  ].toLowerCase()}.png`}
                  alt="Card image"
                />
                <Card.ImgOverlay className="fw-bold text-wrap">
                  <Card.Text className="cardCategory-text">
                    {categoryMapping[categoryId]}
                  </Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default CardCategory;
