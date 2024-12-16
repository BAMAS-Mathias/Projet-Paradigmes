import * as mongodb from "mongodb";

export interface Employee {
    name: string;
    surname: string;
    salary: Number;
    position: string;
    level: "junior" | "mid" | "senior";
    _id?: mongodb.ObjectId;
}
