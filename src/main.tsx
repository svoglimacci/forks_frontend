import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// Import the generated route tree
import App from "./App";
import AuthProvider from "./components/authProvider/authProvider";

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>,
  );
}
