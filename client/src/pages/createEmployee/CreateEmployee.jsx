import axios from "axios";
import React from "react";
import { useState } from "react";
import Input from "./Input";

const CreateEmployee = () => {
  const [sucessMessage, setSucessMessage] = useState("");
  const [employee, setEmployee] = React.useState({
    name: "",
    position: "",
    level: "",
    salary: {
      min: 0,
      max: 0,
    },
    description: "",
    surname: "",
    city: "",
    telework: false,
  });

  const [isCreating, setIsCreating] = useState(false);

  const createEmployee = (
    nom,
    prenom,
    position,
    level,
    salaryMin,
    salaryMax,
    description,
    city,
    telework
  ) => {
    setIsCreating(true);
    axios
      .post(import.meta.env.VITE_API_URL + "/employees/", {
        name: nom,
        position: position,
        level: level.toLowerCase(),
        salary: {
          min: parseInt(salaryMin),
          max: parseInt(salaryMax),
        },
        description: description,
        surname: prenom,
        city: city,
        telework: telework,
      })
      .then(() => {
        setIsCreating(false);
        setSucessMessage("Employé créé avec succès");
      })
      .catch((error) => {
        setIsCreating(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
    console.log(employee.telework);
  };

  return (
    <form className="flex flex-col p-5 gap-y-2 w-full justify-center items-center ">
      <p className="font-bold text-2xl self-center mb-2 text-[#100e0e]">
        Créer un employé
      </p>
      {sucessMessage && (
        <p className="w-[400px] bg-green-600">{sucessMessage}</p>
      )}
      <p className="text-[#100e0e] font-semibold">Information personnel</p>
      <Input name={"name"} placeholder={"Nom"} onChange={handleChange} />
      <Input name={"surname"} placeholder={"Prénom"} onChange={handleChange} />
      <Input name={"city"} placeholder={"Ville"} onChange={handleChange} />
      <p className="text-[#100e0e] font-semibold mt-3">Télétravail</p>
      <Input
        type="checkbox"
        name={"telework"}
        onChange={() =>
          setEmployee({ ...employee, telework: !employee.telework })
        }
        checked={employee.telework}
      />

      <p className="text-[#100e0e] font-semibold mt-3">Salaire</p>
      <Input
        type="number"
        name={"salaryMin"}
        placeholder={"Salaire min"}
        onChange={handleChange}
      />
      <Input
        type="number"
        name={"salaryMax"}
        placeholder={"Salaire max"}
        onChange={handleChange}
      />

      <p className="text-[#100e0e] font-semibold">Information emplois</p>
      <Input name={"position"} placeholder={"Poste"} onChange={handleChange} />
      <textarea
        onChange={handleChange}
        name="description"
        placeholder="Description"
        className="w-[400px] text-black rounded-md p-1"
      ></textarea>

      <select
        name="level"
        onChange={handleChange}
        className="w-max text-[#000000] rounded-md p-1 w-[400px]"
      >
        <option value="">Select Level</option>
        <option value="junior">Junior</option>
        <option value="mid">Mid</option>
        <option value="senior">Senior</option>
      </select>
      <button
        type="button"
        className={
          " self-center mt-2 bg-[#0084f8] w-[400px]  rounded-lg p-2 " +
          (isCreating && "opacity-50")
        }
        onClick={() =>
          createEmployee(
            employee.name,
            employee.surname,
            employee.position,
            employee.level,
            employee.salaryMin,
            employee.salaryMax,
            employee.description,
            employee.city,
            employee.telework,
          )
        }
      >
        {isCreating ? "Création..." : "Créer"}
      </button>
    </form>
  );
};

export default CreateEmployee;
