const Employee = ({ employee }) => {
  return (
    <div className="flex">
      <p>{employee.name}</p>
      <p>{employee.position}</p>
      <p>{employee.level}</p>
    </div>
  );
};

export default Employee;
