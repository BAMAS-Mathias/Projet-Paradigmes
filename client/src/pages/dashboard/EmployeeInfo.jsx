import React from "react";

const EmployeeInfo = ({ employee, onclick, setDeleting }) => {
  const levelColor = {
    mid: "yellow-500",
    junior: "green-500",
    senior: "red-500",
  };

  return (
    <>
      <div className="flex gap-2" onClick={setDeleting}>
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
      {!employee.telework && (
        <p className="bg-yellow-500 bg-opacity-20 px-4 w-fit text-xs py-[2px] font-medium rounded-full mt-2">
          Télétravail
        </p>
      )}
      <p className="mt-2 text-sm font-medium">{employee.description}</p>

      <div className="flex gap-1 mt-auto items-center">
        <div className="flex">
          <p className="font-semibold">
            {employee.salary?.min.toString() + "€"}
          </p>
          <p className="opacity-70">{"/an"}</p>
        </div>
        à
        <div className="flex">
          <p className="font-semibold">
            {employee.salary?.max.toString() + "€"}
          </p>
          <p className="opacity-70">{"/an"}</p>
        </div>
        <p className="text-xs ml-auto opacity-80 font-medium">
          {employee.city}
        </p>
      </div>
    </>
  );
};

export default EmployeeInfo;
