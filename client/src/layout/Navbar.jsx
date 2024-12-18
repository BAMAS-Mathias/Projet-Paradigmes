const Navbar = () => {
  return (
    <div className="bg-[#100e0e] h-20 w-full flex items-center justify-start px-12 gap-2">
      <a href="/" className="flex items-center gap-2 cursor-pointer">
        <svg className="h-8 w-8 fill-white" viewBox="0 -960 960 960">
          <path d="M160-80q-33 0-56.5-23.5T80-160v-440q0-33 23.5-56.5T160-680h200v-120q0-33 23.5-56.5T440-880h80q33 0 56.5 23.5T600-800v120h200q33 0 56.5 23.5T880-600v440q0 33-23.5 56.5T800-80H160Zm80-160h240v-18q0-17-9.5-31.5T444-312q-20-9-40.5-13.5T360-330q-23 0-43.5 4.5T276-312q-17 8-26.5 22.5T240-258v18Zm320-60h160v-60H560v60Zm-200-60q25 0 42.5-17.5T420-420q0-25-17.5-42.5T360-480q-25 0-42.5 17.5T300-420q0 25 17.5 42.5T360-360Zm200-60h160v-60H560v60ZM440-600h80v-200h-80v200Z" />
        </svg>
        <p className="font-bold text-xl mt-1">MRMR</p>
      </a>

      <div className="flex justify-self-center w-full justify-end ">
        <a href="/employee/create" className="opacity-80">
          Créer un employé
        </a>
      </div>
    </div>
  );
};

export default Navbar;
