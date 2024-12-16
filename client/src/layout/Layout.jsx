import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div
      style={{ fontFamily: "Inter" }}
      className="min-h-[100vh] min-w-[100vw] bg-[#f0f4fc] text-white max-w-[100vw] overflow-x-hidden "
    >
      <Navbar />
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
