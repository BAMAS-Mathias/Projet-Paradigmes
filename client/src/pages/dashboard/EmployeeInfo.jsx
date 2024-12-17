import React from "react";

const EmployeeInfo = ({employee, onclick, setDeleting}) => {
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
      {employee.telework && (
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
        <svg
          onClick={setDeleting}
          className="size-6 fill-red-500 ml-auto z-90"
          viewBox="0 -960 960 960"
        >
          <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" />
        </svg>
        <a href={`/employee/edit/${employee._id}`}>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    height="24px" 
    viewBox="0 -960 960 960" 
    width="24px" 
    fill="#5f6368" 
    className="cursor-pointer"
  >
    <path d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z"/>
  </svg>
</a>

        
      </div>
    </>
  );
};

export default EmployeeInfo;
