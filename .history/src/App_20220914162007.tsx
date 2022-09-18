import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import AppRoutes from "./router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-gray-50">
      <AppRoutes />
    </div>
  );
}

export default App;
