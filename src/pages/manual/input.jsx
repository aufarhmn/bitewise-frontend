import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import axios from "axios";

export default function InputRestaurant() {
  const router = useRouter();
  const [algorithm, setAlgorithm] = useState("");
  const [numCriteria, setNumCriteria] = useState(0);
  const [numChoices, setNumChoices] = useState(0);
  const [criteria, setCriteria] = useState([]);
  const [choices, setChoices] = useState([]);
  const [weights, setWeights] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [negativityBias, setNegativityBias] = useState([]);
  const [error, setError] = useState("");
  const [modalContent, setModalContent] = useState("");

  const handleInfoClick = () => {
    document.getElementById("info_modal").showModal();
  };

  useEffect(() => {
    const storedAlgorithm = localStorage.getItem("algorithm");
    if (storedAlgorithm) {
      setAlgorithm(storedAlgorithm);
      generateModalContent(storedAlgorithm);
    } else {
      alert("Please choose algorithm!");
      router.replace("/manual");
    }

    const modal = document.getElementById("info_modal");
    if (modal) {
      modal.showModal();
    }
  }, [router]);

  const generateModalContent = (algorithm) => {
    let content = "";
    switch (algorithm) {
      case "topsis":
        content = `
        <div>
        <div style="text-align: center;">
          <h3><b>TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution)</b></h3>
          </div>
          <p><b>Choices:</b> Choices are the alternatives being evaluated, such as different food (chicken satay, bakso, etc).</p>
          <p><b>Criteria:</b> Criteria are the parameters or factors against which the choices (alternatives) are evaluated. Examples include price, location, service, ambiance, etc.</p>
          <p><b>Weights:</b> Weights represent the relative importance of each criterion. Each weight is a numerical value, between 0 and 1, and the sum of all weights should be 1. For example, if food quality is more important than location, food quality might have a weight of 0.5 and location might have a weight of 0.3.</p>
          <p><b>Bias:</b> Bias (negativity bias in this context) indicates whether a criterion is beneficial or non-beneficial. For example, lower price is better (beneficial), while higher distance is worse (non-beneficial).</p>
          </div>
        `;
        break;
      case "scoring":
        content = `
        <div>
          <div style="text-align: center;">
            <h3><b>Scoring Method</b></h3>
            </div>
            <p><b>Choices:</b> Choices are the alternatives being evaluated, such as different food (chicken satay, bakso, etc).</p>
            <p><b>Criteria:</b> Criteria are the parameters or factors against which choices are evaluated. Examples include price, location, food quality, service, ambiance, etc.</p>
            <p><b>Weights:</b> Weights in the scoring method represent the importance of each criterion. They are numerical values, typically between 0 and 1, summing to 1.</p>
            <p><b>Bias:</b> Bias in the scoring method refers to whether a higher score on a criterion is positive or negative. For instance, a lower score in "cost" is preferred.</p>
          </div>
        `;
        break;
    }
    setModalContent(content);
  };

  const handleClick = () => {
    if (validateWeights()) {
      const requestBody = {
        criteria,
        weights,
        negativityBias,
        choices,
        values: formatValues()
      };

      axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dss/${algorithm}`,
          requestBody
        )
        .then((res) => {
          console.log(res);
          localStorage.setItem(
            "restaurantResult",
            JSON.stringify(res.data.scores)
          );
          router.push("/manual/result");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleNumCriteriaChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumCriteria(value);
    setCriteria(Array(value).fill(""));
    setWeights(Array(value).fill(0));
    setNegativityBias(Array(value).fill(false));
    setInputValues({});
    setError("");
  };

  const handleNumChoicesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumChoices(value);
    setChoices(Array(value).fill(""));
    setInputValues({});
    setError("");
  };

  const handleCriteriaChange = (index, value) => {
    const newCriteria = [...criteria];
    newCriteria[index] = value;
    setCriteria(newCriteria);
  };

  const handleWeightChange = (index, value) => {
    const newWeights = [...weights];
    newWeights[index] = parseFloat(value);
    if (newWeights.some((weight) => weight < 0)) {
      setError("Weights must be non-negative");
    } else {
      setWeights(newWeights);
    }
  };

  const handleNegativityBiasChange = (index) => {
    const newNegativityBias = [...negativityBias];
    newNegativityBias[index] = !newNegativityBias[index];
    setNegativityBias(newNegativityBias);
  };

  const handleInputChange = (criterionIndex, choiceIndex, value) => {
    const newValue = { ...inputValues };
    if (!newValue[criterionIndex]) newValue[criterionIndex] = {};
    newValue[criterionIndex][choiceIndex] = value;
    setInputValues(newValue);
  };

  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const validateWeights = () => {
    const totalWeight = weights.reduce((acc, val) => acc + val, 0);
    if (totalWeight !== 1) {
      setError("Total weight must sum to exactly 1");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const formatValues = () => {
    const values = {};
    choices.forEach((choice, j) => {
      values[choice] = criteria.map((_, i) => inputValues[i]?.[j] || 0);
    });
    return values;
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full h-fit bg-white items-center py-8 gap-4 font-['Poppins']">
        <div className="flex flex-col items-center justify-center font-['Poppins'] pt-2">
          <p className="font-bold text-[30px] text-center">
            Define the choices and parameters
          </p>
          <p className="text-[17px] py-2 text-center">
            Heads up! A lot of consideration needed
          </p>
        </div>
        <div className="flex flex-col items-center px-8">
          <div className="flex flex-row gap-4 mb-4 justify-center">
            <div>
              <label htmlFor="numCriteria">Number of criteria:</label>
              <input
                type="number"
                id="numCriteria"
                value={numCriteria}
                onChange={handleNumCriteriaChange}
                className="ml-2 p-1 border rounded"
              />
            </div>
            <div>
              <label htmlFor="numChoices">Number of choices:</label>
              <input
                type="number"
                id="numChoices"
                value={numChoices}
                onChange={handleNumChoicesChange}
                className="ml-2 p-1 border rounded"
              />
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <table className="min-w-full bg-white rounded-md overflow-hidden">
            <thead>
              <tr className="bg-green-100 text-green-400 text-left text-sm leading-normal">
                <th className="py-3 px-6">Bias?</th>
                <th className="py-3 px-6">Criteria</th>
                <th className="py-3 px-6">Weight</th>
                {Array.from({ length: numChoices }, (_, i) => (
                  <th key={i} className="py-3 px-6">
                    <input
                      type="text"
                      value={choices[i]}
                      onChange={(e) => handleChoiceChange(i, e.target.value)}
                      className="w-full p-1 border rounded"
                      placeholder={`Choice ${i + 1} Name`}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm font-light">
              {Array.from({ length: numCriteria }, (_, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-6">
                    <input
                      type="checkbox"
                      checked={negativityBias[i]}
                      onChange={() => handleNegativityBiasChange(i)}
                    />
                  </td>
                  <td className="py-3 px-6">
                    <input
                      type="text"
                      value={criteria[i]}
                      onChange={(e) => handleCriteriaChange(i, e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="py-3 px-6">
                    <input
                      type="number"
                      step="0.01"
                      value={weights[i]}
                      onChange={(e) => handleWeightChange(i, e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  {Array.from({ length: numChoices }, (_, j) => (
                    <td key={j} className="py-3 px-6">
                      <input
                        type="text"
                        value={inputValues[i]?.[j] || ""}
                        onChange={(e) =>
                          handleInputChange(i, j, e.target.value)
                        }
                        className="w-full p-1 border rounded"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row-reverse justify-between w-full h-full px-8 py-8">
          <button
            onClick={handleClick}
            className="w-[90px] h-[85px] bg-green-400 rounded-full"
          >
            <p className="text-white text-[30px] font-bold">&gt;</p>
          </button>
          <button
            onClick={handleInfoClick}
            className="w-[90px] h-[85px] border-2 border-green-400 rounded-full"
          >
            <p className="text-green-400 text-[20px] font-semibold">?</p>
          </button>
        </div>
      </div>

      <dialog id="info_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div dangerouslySetInnerHTML={{ __html: modalContent }} />
        </div>
      </dialog>
    </>
  );
}
