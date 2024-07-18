import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer-container">
      <p>© 2024 Crédit par ASD</p>
      <div className="icon-container">
        <a
          href="https://github.com/Sachdarras"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub size={40} />
        </a>
        <a
          href="https://www.linkedin.com/in/sacha-darras/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={40} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;