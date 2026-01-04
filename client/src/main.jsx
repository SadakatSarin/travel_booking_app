import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SearchContextProvider } from './context/SearchContext.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx'; // <--- Import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider> {/* <--- Wrap here */}
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)