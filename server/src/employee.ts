import * as mongodb from "mongodb";

export interface Employee {
  name: string;
  surname: string;
  salary: {
    min: number;
    max: number;
  };
  description: string;
  datecreate: Date;
  position: string;
  city: string;
  telework: boolean;
  level: "junior" | "mid" | "senior";
  _id?: mongodb.ObjectId;
}
