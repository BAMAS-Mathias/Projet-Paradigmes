const Employee = ({ employee, onclick }) => {
  const levelColor = {
    mid: "bg-yellow-500",
    junior: "bg-green-500",
    senior: "bg-red-500",
  };
  return (
    <div
      className="flex size-64 bg-white bg-opacity-10 rounded h-[100px] w-[450px] flex-col py-4 px-4 cursor-pointer hover:bg-opacity-20   transition-all "
      onClick={onclick}
    >
      <div className="flex justify-between">
        <div className="">
          <p className="font-bold text-xl">{employee.name}</p>
          <p className="opacity-70 text-sm">{employee.surname}</p>
        </div>
        <p
          className={
            "px-10 text-sm py-1 rounded font-medium " +
            levelColor[employee.level]
          }
        >
          {employee.level}
        </p>
      </div>
      <p>{employee.salary}</p>
      <p>{employee.position}</p>
    </div>
  );
};

export default Employee;
