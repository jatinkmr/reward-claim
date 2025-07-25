import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorComponent, NotFoundComponent, RewardComponent } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/contest/:contestId' element={<RewardComponent />} />
          <Route path='*' element={<NotFoundComponent />} />
          <Route path="/error" element={<ErrorComponent />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
