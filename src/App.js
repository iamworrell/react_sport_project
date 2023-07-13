import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './components/Homepage';
import Football from './components/sports/Football/Football';
import AddPlayerForm from './components/sports/Football/AddPlayerForm';
import PlayerDetails from './components/sports/Football/singlePlayer/PlayerDetails';
import UpdatePlayer from './components/sports/Football/updateSinglePlayer/UpdatePlayer';
import React from 'react';
import './App.css';
import Login from './components/login';
import Register from './components/registration';



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Homepage></Homepage>}></Route>
          <Route path='/football' element={<Football></Football>}></Route>
          <Route path='/footballAddPlayer' element={<AddPlayerForm></AddPlayerForm>}></Route>
          <Route path='/singlefootballplayer/:id' element={<PlayerDetails></PlayerDetails>}></Route>
          <Route path='/updatefootballplayer/:id' element={<UpdatePlayer></UpdatePlayer>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/registration' element={<Register></Register>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;