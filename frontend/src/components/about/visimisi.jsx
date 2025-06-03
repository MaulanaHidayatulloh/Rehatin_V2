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
            <h3 className="fw-bold">Visi Kami</h3>
            <p>
              Menjadi platform terdepan yang menginspirasi dan memfasilitasi
              pengguna dalam menemukan tempat wisata yang sesuai dengan minat
              dan kebutuhan mereka, memastikan setiap liburan menjadi pengalaman
              yang tak terlupakan.
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h3 className="fw-bold">Misi Kami</h3>
            <p>
              Kami berkomitmen untuk menginspirasi pengguna untuk memberikan
              berbagai rekomendasi tempat wisata menarik yang dapat mereka
              kunjungi. Kami bertujuan untuk membantu mereka menemukan destinasi
              yang sesuai dengan minat dan kebutuhan mereka.
            </p>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default VisiMisi;
