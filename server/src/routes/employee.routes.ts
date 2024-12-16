import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database";

export const employeeRouter = express.Router();
employeeRouter.use(express.json());

// 🟢 GET /employees - Récupérer tous les employés
employeeRouter.get("/", async (_req, res) => {
  try {
    const employees = await collections?.employees?.find({}).toArray();
    res.status(200).send(employees);
  } catch (error) {
    res.status(500).send("Error retrieving employees");
  }
});

// 🔵 GET /employees/:id - Récupérer un employé par ID
employeeRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await collections?.employees?.findOne({
      _id: new ObjectId(id),
    });
    if (employee) {
      res.status(200).send(employee);
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (error) {
    res.status(500).send("Error retrieving employee");
  }
});

// 🟡 POST /employees - Créer un nouvel employé
employeeRouter.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newEmployee = req.body;
    const result = await collections?.employees?.insertOne(newEmployee);
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
});

// 🔴 PUT /employees/:id - Mettre à jour un employé
employeeRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await collections?.employees?.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

// ⚫ DELETE /employees/:id - Supprimer un employé
employeeRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await collections?.employees?.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(202).send(result);
  } catch (error) {
    res.status(400).send("Error deleting employee");
  }
});
