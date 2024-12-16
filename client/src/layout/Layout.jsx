import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div
      style={{ fontFamily: "Inter" }}
      className="min-h-[100vh] min-w-[100vw] bg-[#171716] text-white"
    >
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
