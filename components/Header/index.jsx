const headerStyle = {
  backgroundColor: "#f8f9fa",
  padding: "1rem",
  borderBottom: "1px solid #dee2e6",
  fontFamily: "Arial, sans-serif",
};

export const Header = (props) => {
  return <header className="app-header" style={headerStyle}>
    <h1>this is header</h1>
  </header>;
};

export default Header;
