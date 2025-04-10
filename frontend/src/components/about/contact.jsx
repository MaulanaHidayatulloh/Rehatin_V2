import React, { useRef, useState } from "react";
import {
  XCircleFill,
  InfoCircleFill,
  PersonCircle,
  EnvelopeAt,
  Telephone,
  ChatDots,
} from "react-bootstrap-icons";
import "./about.css";

function Kontak() {
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyqrk8s1WehvYe5dGLHZZebrTv9kjpsaw3bRTaTl-5J39wWPNp5b3BxbSGhrGbywzxu/exec";

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch(scriptURL, {
      method: "POST",
      body: new FormData(formRef.current),
    })
      .then((response) => {
        setIsLoading(false);
        setShowAlert(true);
        formRef.current.reset();
        console.log("Success!", response);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error!", error.message);
      });
  };

  return (
    <section id="kontak" className="contact">
      <h2 className="fw-bold">CALL OR VISIT</h2>
      <div className="row">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d312.3957489756764!2d106.70462109177844!3d-6.159430578786205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f815dcec4e59%3A0xcf6752eb8443babf!2sToko.%20Jaja!5e0!3m2!1sid!2sid!4v1685219699170!5m2!1sid!2sid"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="map"
          title="Lokasi Toko Jaja"
        ></iframe>

        <form ref={formRef} onSubmit={handleSubmit} name="rehatin-contact-form">
          {showAlert && (
            <div className="alert active">
              <InfoCircleFill size={25} />
              <span>
                <strong>Terima Kasih!</strong> Pesan anda sudah kami terima
              </span>
              <button
                type="button"
                className="close"
                onClick={() => setShowAlert(false)}
              >
                <XCircleFill size={25} />
              </button>
            </div>
          )}

          <div className="input-group">
            <PersonCircle size={35} />
            <input type="text" placeholder="Nama" name="nama" required />
          </div>
          <div className="input-group">
            <EnvelopeAt size={35} />
            <input type="email" placeholder="Email" name="email" required />
          </div>
          <div className="input-group">
            <Telephone size={35} />
            <input
              type="text"
              placeholder="No Handphone"
              name="nomor-handphone"
              required
            />
          </div>
          <div className="input-group-pesan">
            <ChatDots size={35} />
            <textarea
              name="pesan"
              required
              rows={6}
              style={{ resize: "none" }}
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className={`btn ${isLoading ? "active" : ""}`}
              disabled={isLoading}
            >
              Kirim Pesan
            </button>
            <div className={`loader ${isLoading ? "active" : ""}`}></div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Kontak;
