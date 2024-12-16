import * as express from 'express';
import { ObjectId } from 'mongodb';
import { collections } from '../database';

export const employeeRouter = express.Router();
employeeRouter.use(express.json());

// 🟢 GET /employees - Récupérer tous les employés
employeeRouter.get('/', async (_req, res) => {
    try {
        const employees = await collections?.employees?.find({}).toArray();
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).send('Error retrieving employees');
    }
});

// 🔵 GET /employees/:id - Récupérer un employé par ID
employeeRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await collections?.employees?.findOne({ _id: new ObjectId(id) });
        if (employee) {
            res.status(200).send(employee);
        } else {
            res.status(404).send('Employee not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving employee');
    }
});

// 🟡 POST /employees - Créer un nouvel employé
employeeRouter.post('/', async (req, res) => {
    try {
        const newEmployee = req.body;
        const result = await collections?.employees?.insertOne(newEmployee);
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send('Error creating employee');
    }
});

// 🔴 PUT /employees/:id - Mettre à jour un employé
employeeRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const result = await collections?.employees?.updateOne({ _id: new ObjectId(id) }, { $set: updates });
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send('Error updating employee');
    }
});

// ⚫ DELETE /employees/:id - Supprimer un employé
employeeRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await collections?.employees?.deleteOne({ _id: new ObjectId(id) });
        res.status(202).send(result);
    } catch (error) {
        res.status(400).send('Error deleting employee');
    }
    employeeRouter.get('/search', async (req, res) => {
        try {
            const { name, position } = req.query;
            const query: any = {};
            if (name) query.name = { $regex: name, $options: 'i' }; // Recherche partielle
            if (position) query.position = { $regex: position, $options: 'i' };
    
            const employees = await collections?.employees?.find(query).toArray();
            res.status(200).send(employees);
        } catch (error) {
            res.status(500).send('Error searching for employees');
        }
    });

    employeeRouter.get('/stats/count', async (_req, res) => {
        try {
            const count = await collections?.employees?.countDocuments();
            res.status(200).send({ total: count });
        } catch (error) {
            res.status(500).send('Error counting employees');
        }
    });
    
    
});
