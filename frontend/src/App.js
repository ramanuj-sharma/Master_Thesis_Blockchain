import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Note the updated import
import EnhancedAccountUI from './EnhancedAccountUI';
import OTPSetup from './components/OTPSetup'; // Ensure this path is correct

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> {/* Changed from Switch to Routes */}
          <Route path="/otp-setup" element={<OTPSetup />} /> {/* Updated syntax */}
          <Route path="/" element={<EnhancedAccountUI />} /> {/* Updated syntax */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;