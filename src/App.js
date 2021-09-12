import React, { useState } from "react";
import CurrencyTable from "./components/currency/CurrencyTable";
import NoteApp from "./components/notes/Router";
import data from "./data";
const App = () => {
  const [state, setState] = useState("notes");

  return (
    <div className="App">
      <div style={{ margin: "1rem" }}>
        {["notes", "currency"].map((app, index) => (
          <button key={index} onClick={() => setState(app)}>
            {app}
          </button>
        ))}
      </div>
      {state === "currency" && <CurrencyTable currencies={data.currencies} />}
      {state === "notes" && <NoteApp />}
    </div>
  );
};

export default App;
