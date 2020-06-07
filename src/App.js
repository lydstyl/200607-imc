import React, { useState } from "react";
import "./App.css";

const interpretations = new Map();
interpretations.set(16.5, "dénutrition ou anorexie");
interpretations.set(18.5, "maigreur");
interpretations.set(25, "poids normal");
interpretations.set(30, "surpoids");
interpretations.set(35, "obésité modérée");
interpretations.set(40, "obésité sévère");
interpretations.set("infinity", "obésité morbide ou massive");

function App() {
  const [imc, setImc] = useState(undefined);

  const handleChange = (evt) => {
    const weight = document.querySelector("[name=weight]").value;
    const size = document.querySelector("[name=size]").value;

    if (!weight || !size) {
      return;
    } else {
      const imc = (weight / Math.pow(size, 2)).toFixed(2);

      let theInterpretation = null;

      interpretations.forEach((interpretation, imcKey) => {
        if (!theInterpretation && imc < imcKey) {
          //console.log(interpretation);
          theInterpretation = interpretation;
        }
      });

      setImc(imc + " " + theInterpretation);
    }
  };

  return (
    <div className="App">
      <h1>IMC</h1>
      <form>
        <input
          onChange={handleChange}
          name="weight"
          type="number"
          placeholder="poids en kg"
        />
        <input
          onChange={handleChange}
          name="size"
          type="number"
          placeholder="taille en m"
        />
        <button>Sauver</button>
      </form>

      <div className="interpretation">
        onChange --> imc xx --> interprétation
        {imc && <div>{imc}</div>}
      </div>

      <ul>
        <li>Date xx/xx/xxxx imc interpretation x</li>
        <li>Date xx/xx/xxxx imc interpretation x</li>
      </ul>
    </div>
  );
}

export default App;
