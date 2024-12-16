import axios from "axios";
import React from "react";

const CreateEmployee = () => {
  const [employee, setEmployee] = React.useState({
    name: "",
    position: "",
    level: "",
  });

  const createEmployee = (nom, position, level) => {
    axios.post(import.meta.env.VITE_API_URL + "/employees/", {
      name: nom,
      position: position,
      level: level.toLowerCase(),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  return (
    <form>
      <p>Crée un employé</p>
      <input
        type="text"
        name="name"
        placeholder="Nom"
        onChange={handleChange}
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        onChange={handleChange}
      />
      <select name="level" onChange={handleChange}>
        <option value="">Select Level</option>
        <option value="Junior">Junior</option>
        <option value="Mid">Mid</option>
        <option value="Senior">Senior</option>
      </select>
      <button
        type="button"
        onClick={() =>
          createEmployee(employee.name, employee.position, employee.level)
        }
      >
        Créer
      </button>
    </form>
  );
};

export default CreateEmployee;
