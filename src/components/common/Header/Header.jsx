import { Link } from "react-router-dom";
import "../../common/Header/Header.module.scss";
import EVLogo from "../../styles/EV-Black-Version.png"; 

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <img src={EVLogo} alt="EV Logo" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
 


