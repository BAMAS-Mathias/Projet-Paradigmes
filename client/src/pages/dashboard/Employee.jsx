import "./employee.css";

const Employee = ({ employee, onclick }) => {
  const levelColor = {
    mid: "yellow-500",
    junior: "green-500",
    senior: "red-500",
  };
  return (
    <div
      className="flex size-64 bg-white text-[#100e0e] rounded h-[250px] w-full flex-col py-6 px-6 cursor-pointer transition-all "
      onClick={onclick}
    >
      <div className="flex gap-2">
        <p className="bg-red-500 font-extrabold w-10 py-2 h-fit  rounded-full bg-opacity-25 text-center">
          {employee.name[0].toUpperCase()}
        </p>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <p className="font-medium">{employee.name}</p>
              <p className="opacity-70 text-sm">{employee.surname}</p>
            </div>
          </div>
          <p className=" text-sm opacity-60">{employee.position}</p>
        </div>

        <span
          className={
            "rounded-full ml-auto mt-1 opacity-75 size-4 bg-" +
            levelColor[employee.level]
          }
        ></span>
      </div>
      <p className="mt-5 text-sm font-medium">{employee.description}</p>

      <div className="flex mt-auto gap-2">
        <div className="flex">
          <p className="font-semibold">{employee.salary?.min + "€"}</p>
          <p className="opacity-70">{"/an"}</p>
        </div>
        à
        <div className="flex">
          <p className="font-semibold">{employee.salary?.max + "€"}</p>
          <p className="opacity-70">{"/an"}</p>
        </div>
      </div>
    </div>
  );
};

export default Employee;
