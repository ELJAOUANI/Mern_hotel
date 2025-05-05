import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-4">
            <h5>Luxury Stays</h5>
            <p>Experience unparalleled hospitality and world-class service at our award-winning hotels.</p>
          </div>
          <div className="col-md-3 mb-4">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-light">About Us</a></li>
              <li><a href="/careers" className="text-light">Careers</a></li>
              <li><a href="/press" className="text-light">Press</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h6>Support</h6>
            <ul className="list-unstyled">
              <li><a href="/contact" className="text-light">Contact</a></li>
              <li><a href="/faq" className="text-light">FAQ</a></li>
              <li><a href="/privacy" className="text-light">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h6>Newsletter</h6>
            <form className="d-flex flex-column">
              <input type="email" className="form-control mb-2" placeholder="Your email address" />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
        <hr className="border-secondary" />
        <div className="text-center">
          <small>&copy; {new Date().getFullYear()} Luxury Stays. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
