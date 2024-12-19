import * as express from "express";
import { MongoError, ObjectId } from "mongodb";
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
    const newEmployee = req.body;
    const result = await collections?.employees?.insertOne(newEmployee);
    res.status(201).send(result);
  } catch (error: MongoError | any) {
    res.status(400).send({ error: error });
    console.log(error.errInfo.details.schemaRulesNotSatisfied[0]);
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

employeeRouter.get("/stats/count", async (_req, res) => {
  try {
    const count = await collections?.employees?.countDocuments();
    res.status(200).send({ total: count });
  } catch (error) {
    res.status(500).send("Error counting employees");
  }
});

employeeRouter.post("/search", async (req, res) => {
  try {
    const { poste, level, salaire, telework, city, sort } = req.body;
    const query: any = {};
    const sortQuery: any = {};

    if (poste && poste.length > 0) {
      query.position = { $regex: ".*" + poste + ".*", $options: "i" };
    }

    if (level && level.length > 0) {
      query.level = { $in: level };
    }

    if (salaire && salaire.min && salaire.max && salaire.min <= salaire.max) {
      query["salary.min"] = { $gte: salaire.min };
      query["salary.max"] = { $gte: salaire.max };
    }

    if (telework) {
      query.telework = telework;
    }

    if (city) {
      query.city = { $regex: ".*" + city + ".*", $options: "i" };
    }

    if (sort && sort.field && sort.order) {
      sortQuery[sort.field] = sort.order === "asc" ? 1 : -1;
    }

    const employees = await collections?.employees
      ?.find(query)
      .sort(sortQuery)
      .toArray();
    res.status(200).send(employees);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error searching for employees");
  }
});

employeeRouter.post("/edit", async (req, res) => {
  try {
    const employee = req.body;
    const query = { _id: new ObjectId(employee._id) };

    delete employee._id;

    const result = await collections?.employees?.updateOne(query, {
      $set: employee,
    });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated an employee: ID ${employee._id}.`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`Failed to find an employee: ID ${employee._id}`);
    } else {
      res.status(304).send(`Failed to update an employee: ID ${employee._id}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    res.status(400).send(message);
  }
});
