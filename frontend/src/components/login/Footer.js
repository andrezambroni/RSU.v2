import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="login_footer">
      <div className="login_footer_wrap">
        
        <Link to="/" className="footer_square">
          <i className="plus_icon"></i>
        </Link>
      </div>
      <div className="footer_splitter"></div>
      <div className="login_footer_wrap">
       
        <Link to="/">
          Google ADS
          <i className="adChoices_icon"></i>
        </Link>
        
      </div>
      <div className="login_footer_wrap">
        <Link to="/" style={{ fontSize: "12px", marginTop: "10px" }}>
          
        </Link>
      </div>
    </footer>
  );
}
