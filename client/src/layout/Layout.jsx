import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div
      style={{ fontFamily: "Inter" }}
      className="min-h-[100vh] min-w-[100vw] bg-[#171716] text-white"
    >
      <Navbar />
      <div className="px-12 py-12">{children}</div>
    </div>
  );
};

export default Layout;
