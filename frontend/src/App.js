import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EnhancedAccountUI from './EnhancedAccountUI';
import OTPSetup from './components/OTPSetup';
import Settings from './components/Settings';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from "./styles/themes";

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/otp-setup" element={<OTPSetup />} />
            <Route path="/settings" element={<Settings setTheme={setTheme} />} />
            <Route path="/" element={<EnhancedAccountUI />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
