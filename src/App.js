import React, { useState } from "react";

import { Li } from "./components/Li/Li";

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
  const [imcs, setImcs] = useState(
    window.localStorage.getItem("imcs")
      ? JSON.parse(window.localStorage.getItem("imcs"))
      : []
  );
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

      setImc(
        new Date().toLocaleDateString("fr-FR") +
          " " +
          imc +
          " " +
          theInterpretation
      );
    }
  };

  const handleClick = (evt) => {
    evt.preventDefault();

    const newImcs = [imc, ...imcs];

    setImcs(newImcs);

    window.localStorage.setItem("imcs", JSON.stringify(newImcs));
  };

  return (
    <div className="App">
      <h1>IMC</h1>

      <div className="wrapper">
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
          <button onClick={handleClick}>Sauver</button>
        </form>

        <div className="interpretation">{imc && <div>{imc}</div>}</div>

        <ul>
          {imcs.map((i) => (
            <Li key={i} imc={i} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
