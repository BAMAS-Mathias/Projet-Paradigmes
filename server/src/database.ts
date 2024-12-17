import * as mongodb from "mongodb";
import { Employee } from "./employee";

export const collections: {
  employees?: mongodb.Collection<Employee>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("meanStackExample");
  await applySchemaValidation(db);

  const employeesCollection = db.collection<Employee>("employees");
  collections.employees = employeesCollection;
  collections.employees.createIndex({ position: 1 }, {name: "position_idx"});
  collections.employees.createIndex({ city: 1 }, {name: "city_idx"});
}

async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "surname", "position", "level", "salary"],
      additionalProperties: false,
      properties: {
        _id: {},
        name: {
          bsonType: "string",
          description: "'name' is required and is a string",
        },
        surname: {
          bsonType: "string",
          description: "'surname' is required and is a string",
        },
        salary: {
          bsonType: "object",
          required: ["min", "max"],
          properties: {
            min: {
              bsonType: "int", 
              min: 0,
              description: "'salary.min' is required and is a number",
            },
            max: {
              bsonType: "int", // or "double" if you expect floating point numbers
              min: 0,
              description: "'salary.max' is required and is a number",
            },
          },
        },
        description: {
          bsonType: "string",
          description: "'description' is required and is a string",
        },
        position: {
          bsonType: "string",
          description: "'position' is required and is a string",
          minLength: 5,
        },
        level: {
          bsonType: "string",
          description:
            "'level' is required and is one of 'junior', 'mid', or 'senior'",
          enum: ["junior", "mid", "senior"],
        },
        city: {
          bsonType: "string",
          description: "'ville' is required and is a string",
        },
        telework: {
          bsonType: "bool",
          description: "'teletravail' is required and is a boolean",
        },
      },
    },
  };

  await db
    .command({
      collMod: "employees",
      validator: jsonSchema,
    })
    .catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection("employees", { validator: jsonSchema });
      }
    });
}
