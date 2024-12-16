const UserDetails = ({ _id, closeMenu, deleteUser }) => {
  return (
    <>
      {_id != null && (
        <>
          <div
            className="absolute left-0 top-0 h-screen w-screen bg-black opacity-60 "
            onClick={closeMenu}
          ></div>
          <div className="fixed h-screen w-[550px] bg-[#303030] left-0 top-0 z-10 px-4 py-4">
            <p className="bg-[#faa316] px-2 py-2 text-lg font-bold rounded text-center">
              Modification de l'employé
            </p>
            <h1>User Details</h1>
            <p>Details for user with id: {_id}</p>
            <button
              className="bg-red-500 w-full py-1 cursor-pointer hover:bg-red-600 transition-all"
              onClick={() => deleteUser(_id)}
            >
              Supprimer
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default UserDetails;
