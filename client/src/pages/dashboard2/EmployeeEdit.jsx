
import axios from "axios";
import { useState, useEffect } from "react";

const EmployeeEdit = () => {
  const { id } = useParams(); // ✅ Capture l'ID de l'URL
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: '',
    position: '',
    level: '',
    salary: 0,
  });

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + `/employees/${id}`) 
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data: ", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(import.meta.env.VITE_API_URL + `/employees/${id}`, employee) 
      .then(() => {
        alert('Profil mis à jour avec succès !');
        navigate('/'); 
      })
      .catch((error) => {
        console.error("Error updating employee: ", error);
      });
  };

  return (
    <div className="edit-employee-container">
      <h1>Modifier le profil de {employee.name}</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Poste</label>
          <input
            type="text"
            name="position"
            value={employee.position}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Expérience</label>
          <select
            name="level"
            value={employee.level}
            onChange={handleChange}
          >
            <option value="">Choisir...</option>
            <option value="junior">Junior</option>
            <option value="mid">Intermédiaire</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        <div className="form-group">
          <label>Salaire</label>
          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default EmployeeEdit;
