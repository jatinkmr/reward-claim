import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorComponent, GiftComponent, NotFoundComponent, PrizeComponent, RewardComponent } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/contest/:contestId' element={<RewardComponent />} />
          <Route path='/contest/:contestId/gift' element={<GiftComponent />} />
          <Route path='/contest/:contestId/phase/:phaseId' element={<PrizeComponent />} />
          <Route path='*' element={<NotFoundComponent />} />
          <Route path="/error" element={<ErrorComponent />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
