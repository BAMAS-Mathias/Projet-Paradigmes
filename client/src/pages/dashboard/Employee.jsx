import React, { useState } from "react";
import EmployeeInfo from "./EmployeeInfo";
import axios from "axios";
import "./employee.css";
const Employee = ({ employee, onclick, handleDeleteEmployee }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleting(true);
  };

  const handleCancelClick = () => {
    setIsDeleting(false);
  };

  const deleteEmployee = () => {
    handleDeleteEmployee(employee._id);
  };

  return (
    <div
      className="flex size-64 bg-white relative text-[#100e0e] rounded h-[250px] w-full flex-col py-6 px-6 cursor-pointer transition-all"
      onClick={onclick}
    >
      {isDeleting ? (
        <>
          <p className="text-center font-medium text-xl">
            Supprimer l'employé ?
          </p>
          <div className="gap-1 flex flex-col mt-auto">
            <button
              className="bg-red-500 rounded text-white py-2"
              onClick={deleteEmployee}
            >
              Supprimer
            </button>
            <button
              className="bg-[#100e0e] text-white rounded py-2"
              onClick={handleCancelClick}
            >
              Annuler
            </button>
          </div>
        </>
      ) : (
        <EmployeeInfo
          employee={employee}
          onclick={onclick}
          setDeleting={handleDeleteClick}
        />
      )}
    </div>
  );
};

export default Employee;
