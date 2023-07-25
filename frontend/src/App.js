import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Nav from './layouts/Nav';
import Router from './router/Router';
import { Box, Container } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>{/* <Nav></Nav> */}</header>
        <div>
          <Container maxWidth="xl" sx={{ display: 'flex', bgcolor: 'gold', height: '100vh' }}>
            <Router></Router>
          </Container>
        </div>

        <footer></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
