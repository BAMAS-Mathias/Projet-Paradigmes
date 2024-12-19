import React, { useState } from "react";

const EmployeeInfo = ({ employee, onclick, setDeleting }) => {
  const [editableEmployee, setEditableEmployee] = useState(employee);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const levelColor = {
    mid: "yellow-500",
    junior: "green-500",
    senior: "red-500",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableEmployee({ ...editableEmployee, [name]: value });
  };

  const updateEmployee = async () => {
    try {
      // On conserve l'ID et on inclut les données dans une seule requête
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/employees/edit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editableEmployee), // Inclut _id et les données à modifier
        }
      );

      if (!response.ok) {
        throw new Error(
          `Échec de la mise à jour de l'employé avec l'ID ${editableEmployee._id}`
        );
      }

      setIsPopupOpen(false);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Erreur lors de la mise à jour de l'employé");
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <p className="bg-red-500 font-extrabold w-10 py-2 h-fit rounded-full bg-opacity-25 text-center">
          {editableEmployee.name[0].toUpperCase()}
        </p>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <p className="font-medium">{editableEmployee.name}</p>
              <p className="opacity-70 text-sm">{editableEmployee.surname}</p>
            </div>
          </div>
          <div className="flex gap-2 justify-between w-full">
            <p className="text-sm opacity-60">{editableEmployee.position}</p>
            <p className="text-sm opacity-80 font-bold">
              {editableEmployee.city}
            </p>
          </div>
        </div>
        <span
          className={
            "rounded-full ml-auto mt-1 opacity-75 size-4 bg-" +
            levelColor[editableEmployee.level]
          }
        ></span>
        <svg
          onClick={setDeleting}
          className="size-6 fill-red-500 ml-auto z-90 cursor-pointer"
          viewBox="0 -960 960 960"
        >
          <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" />
        </svg>
      </div>
      {editableEmployee.telework && (
        <p className="bg-yellow-500 bg-opacity-20 px-4 w-fit text-xs py-[2px] font-medium rounded-full mt-2">
          Télétravail
        </p>
      )}
      <p className="mt-2 text-sm font-medium">{editableEmployee.description}</p>
      <div className="flex gap-1 mt-auto items-center">
        <div className="flex">
          <p className="font-semibold">{editableEmployee.salary?.min + "€"}</p>
          <p className="opacity-70">/an</p>
        </div>
        à
        <div className="flex">
          <p className="font-semibold">{editableEmployee.salary?.max + "€"}</p>
          <p className="opacity-70">/an</p>
        </div>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="ml-auto bg-blue-500 text-white px-4 py-2 rounded"
        >
          Modifier
        </button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-96 relative">
            <h2 className="text-lg font-bold mb-4">
              Modifier les informations
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={editableEmployee.name}
                onChange={handleInputChange}
                placeholder="Nom"
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                name="surname"
                value={editableEmployee.surname}
                onChange={handleInputChange}
                placeholder="Prénom"
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                name="position"
                value={editableEmployee.position}
                onChange={handleInputChange}
                placeholder="Poste"
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                name="city"
                value={editableEmployee.city}
                onChange={handleInputChange}
                placeholder="Ville"
                className="border border-gray-300 p-2 rounded"
              />
              <textarea
                name="description"
                value={editableEmployee.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="border border-gray-300 p-2 rounded"
              />
              <button
                onClick={updateEmployee}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Enregistrer
              </button>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeInfo;
