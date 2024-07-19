const mongodb = require('../database/monge'); // Ensure this is the correct path to your MongoDB connection file
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const db = mongodb.getDatabase();
        const result = await db.collection('contacts').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const result = await db.collection('contacts').findOne({ _id: contactId });
        res.setHeader('Content-Type', 'application/json');
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createUser = async (req, res) => {
    try {
        const db = mongodb.getDatabase();
        const contact = {
            contact_id: req.body.contact_id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        // Validate required fields
        if (!contact.firstName || !contact.lastName || !contact.email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const response = await db.collection('contacts').insertOne(contact);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Contact created successfully', id: response.insertedId });
        } else {
            res.status(500).json({ error: 'Some error occurred while creating contact' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const contact = {
            contact_id: req.body.contact_id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        // Validate required fields
        if (!contact.firstName || !contact.lastName || !contact.email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const response = await db.collection('contacts').replaceOne({ _id: contactId }, contact);
        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Contact updated successfully' });
        } else {
            res.status(304).json({ message: 'No changes made to the contact' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const response = await db.collection('contacts').deleteOne({ _id: contactId });
        if (response.deletedCount > 0) {
            res.status(204).json({ error: 'Contact deleted' });
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };
