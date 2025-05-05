import React from 'react';


const ContactPage: React.FC = () => {
    return (

<div className="mt-5 mx-auto px-3 mb-5" style={{ maxWidth: '700px' }}>
  <div className="card shadow-sm rounded-4 p-4">
    <h2 className="mb-4 fw-bold text-primary" style={{ fontFamily: "'Georgia', serif" }}>
      Contact Us
    </h2>
    <p className="mb-4 text-secondary fs-5">
      We'd love to hear from you! Whether you have a question, feedback, or just want to say hello -
      feel free to reach out.
    </p>

    <div className="mb-3 pb-3 border-bottom">
      <h5 className="d-flex align-items-center fw-semibold text-dark">
        <i className="bi bi-geo-alt-fill me-3 fs-4 text-primary"></i> Address
      </h5>
      <p className="mb-0 text-muted">123 Main Street, City, Country</p>
    </div>

    <div className="mb-3 pb-3 border-bottom">
      <h5 className="d-flex align-items-center fw-semibold text-dark">
        <i className="bi bi-telephone-fill me-3 fs-4 text-primary"></i> Phone
      </h5>
      <p className="mb-0 text-muted">+212 6 12 34 56 78</p>
    </div>

    <div className="mb-3 pb-3 border-bottom">
      <h5 className="d-flex align-items-center fw-semibold text-dark">
        <i className="bi bi-envelope-fill me-3 fs-4 text-primary"></i> Email
      </h5>
      <p className="mb-0 text-muted">contact@example.com</p>
    </div>

    <div className="mb-4">
      <h5 className="d-flex align-items-center fw-semibold text-dark">
        <i className="bi bi-clock-fill me-3 fs-4 text-primary"></i> Business Hours
      </h5>
      <p className="mb-0 text-muted">Monday - Friday: 9am - 5pm</p>
    </div>

    <div className="text-center">
      <a href="mailto:contact@example.com" className="btn btn-primary btn-lg px-5 rounded-pill shadow-sm">
        Send Us a Message
      </a>
    </div>
  </div>
</div>
)
}
export default ContactPage;