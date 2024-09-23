import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ClientList from './components/ClientList';
import CreateClient from './components/CreateClient';
import CreateUser from './components/CreateUser';
import UserList from './components/UserList';
import Navbar from './components/Navbar';
import EditClient from './components/EditClient'; // Import EditClient component
import EditUser from './components/EditUser'; // Import EditUser component
// import MISReport from './components/MISReport';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/create-client" element={<CreateClient />} />
          <Route path="/create-user/:clientId" element={<CreateUser />} />
          <Route path="/users/:clientId" element={<UserList />} />
          <Route path="/edit-client/:clientId" element={<EditClient />} /> {/* Route for editing a client */}
          <Route path="/edit-user/:userId" element={<EditUser />} /> {/* Route for editing a user */}
          {/* <Route path="/mis-report" element={<MISReport />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
