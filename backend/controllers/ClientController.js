// Correct the import of the Client model
const Client = require('../models/client');  // Not destructuring, use direct import

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const { name, industry, contactInfo } = req.body;
    const newClient = await Client.create({ name, industry, contactInfo });  // Use "Client" not "client"
    res.status(201).json(newClient);
  } catch (error) {
    console.error('Error creating client:', error); // Log error for debugging
    res.status(500).json({ message: 'Error creating client', error: error.message });
  }
};

// Read all clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find(); // Use "Client"
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error); // Log error for debugging
    res.status(500).json({ message: 'Error fetching clients', error: error.message });
  }
};

// Update a client
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, industry, contactInfo } = req.body;
    const updatedClient = await Client.findByIdAndUpdate(id, { name, industry, contactInfo }, { new: true, runValidators: true }); // Use "Client"
    
    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({ message: 'Client updated successfully', updatedClient });
  } catch (error) {
    console.error('Error updating client:', error); // Log error for debugging
    res.status(500).json({ message: 'Error updating client', error: error.message });
  }
};

// Delete a client
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClient = await Client.findByIdAndDelete(id); // Use "Client"
    
    if (!deletedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Error deleting client:', error); // Log error for debugging
    res.status(500).json({ message: 'Error deleting client', error: error.message });
  }
};
