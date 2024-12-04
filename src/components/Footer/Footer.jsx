import "./Footer.css";

function Footer() {
  return (
<section className="footer-container">
  <article className="info-container">
    <div className="small-info">
      <small>© 2024 IronHub. All rights reserved.</small>
      <small>Built with ❤️ by Ironhack students:</small>
    </div>
    <div className="social-info">
      <div className="social-member">
        <p>Dani</p>
        <div className="social-links">
          <p>Icon to linkedin</p>
          <p>Icon to github</p>
        </div>
      </div>
      <div className="social-member">
        <p>Piet</p>
        <div className="social-links">
          <p>Icon to linkedin</p>
          <p>Icon to github</p>
        </div>
      </div>
      <div className="social-member">
        <p>Nigel</p>
        <div className="social-links">
          <p>Icon to linkedin</p>
          <p>Icon to github</p>
        </div>
      </div>
    </div>
  </article>
  <div className="links-info">
    <article className="github-repositories">
      <p>Icon of github frontend</p>
      <p>icon of github backend</p>
    </article>
    <article className="homepage-btn">
      <button>Back to top</button>
    </article>
  </div>
</section>

  );
}

export default Footer;
