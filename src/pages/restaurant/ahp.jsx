import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios";

export default function AhpInput() {
  const [criteria, setCriteria] = useState([]);
  const [comparisons, setComparisons] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  const [alternativeScores, setAlternativeScores] = useState({});
  const [numCriteria, setNumCriteria] = useState(0);
  const [numAlternatives, setNumAlternatives] = useState(0);
  const [error, setError] = useState("");

  const handleNumCriteriaChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumCriteria(value);
    setCriteria(Array(value).fill(""));
    setComparisons(
      Array(value).fill(
        Array(numAlternatives)
          .fill("")
          .map(() => Array(numAlternatives).fill("1/1"))
      )
    );
    setError("");
  };

  const handleNumAlternativesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumAlternatives(value);
    setAlternatives(Array(value).fill(""));
    setComparisons(
      Array(numCriteria).fill(
        Array(value)
          .fill("")
          .map(() => Array(value).fill("1/1"))
      )
    );
    setAlternativeScores({});
    setError("");
  };

  const handleCriteriaChange = (index, value) => {
    const newCriteria = [...criteria];
    newCriteria[index] = value;
    setCriteria(newCriteria);
  };

  const handleComparisonChange = (criteriaIndex, row, col, value) => {
    const newComparisons = [...comparisons];
    const updatedMatrix = [...newComparisons[criteriaIndex]];
    updatedMatrix[row][col] = value;
    newComparisons[criteriaIndex] = updatedMatrix;
    setComparisons(newComparisons);
  };

  const handleAlternativeChange = (index, value) => {
    const newAlternatives = [...alternatives];
    newAlternatives[index] = value;
    setAlternatives(newAlternatives);
  };

  const handleAlternativeScoreChange = (alternative, criterionIndex, value) => {
    const newScores = { ...alternativeScores };
    if (!newScores[alternative]) newScores[alternative] = Array(numCriteria).fill(0);
    newScores[alternative][criterionIndex] = parseFloat(value);
    setAlternativeScores(newScores);
  };

  const handleClick = () => {
    const requestBody = {
      criteria,
      comparisons,
      alternatives,
      alternativeScores,
    };

    console.log(requestBody);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ahp`,
        requestBody
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full h-fit bg-white items-center py-8 gap-4 font-['Poppins']">
        <div className="flex flex-col items-center justify-center font-['Poppins'] pt-2">
          <p className="font-bold text-[30px] text-center">
            AHP Input
          </p>
          <p className="text-[17px] py-2 text-center">
            Define the criteria, comparisons, and alternatives
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
              <label htmlFor="numAlternatives">Number of alternatives:</label>
              <input
                type="number"
                id="numAlternatives"
                value={numAlternatives}
                onChange={handleNumAlternativesChange}
                className="ml-2 p-1 border rounded"
              />
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}

          {/* Alternatives Form */}
          <div className="mb-4">
            <h3 className="font-bold text-lg mb-2">Alternatives</h3>
            {Array.from({ length: numAlternatives }, (_, i) => (
              <input
                key={i}
                type="text"
                value={alternatives[i]}
                onChange={(e) => handleAlternativeChange(i, e.target.value)}
                className="w-full p-1 border rounded mb-2"
                placeholder={`Alternative ${i + 1}`}
              />
            ))}
          </div>

          {/* Alternative Scores Form */}
          {alternatives.map((alternative, i) => (
            <div key={i} className="mb-4">
              <p className="font-bold">{alternative}</p>
              {criteria.map((criterion, j) => (
                <input
                  key={j}
                  type="number"
                  value={alternativeScores[alternative]?.[j] || ""}
                  onChange={(e) =>
                    handleAlternativeScoreChange(alternative, j, e.target.value)
                  }
                  className="w-full p-1 border rounded mb-2"
                  placeholder={`Score for ${criterion}`}
                />
              ))}
            </div>
          ))}

          {/* Criteria and Comparison Matrices */}
          {Array.from({ length: numCriteria }, (_, i) => (
            <div key={i} className="mb-4">
              <input
                type="text"
                value={criteria[i]}
                onChange={(e) => handleCriteriaChange(i, e.target.value)}
                className="w-full p-1 border rounded mb-2"
                placeholder={`Criterion ${i + 1}`}
              />
              <table className="min-w-full bg-white rounded-md overflow-hidden mb-2">
                <thead>
                  <tr className="bg-green-100 text-green-400 text-left text-sm leading-normal">
                    <th className="py-3 px-6">Alternatives</th>
                    {alternatives.map((alt, j) => (
                      <th key={j} className="py-3 px-6">
                        {alt || `Alternative ${j + 1}`}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-800 text-sm font-light">
                  {Array.from({ length: numAlternatives }, (_, row) => (
                    <tr key={row} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6">{alternatives[row] || `Alternative ${row + 1}`}</td>
                      {Array.from({ length: numAlternatives }, (_, col) => (
                        <td key={col} className="py-3 px-6">
                          <input
                            type="text"
                            value={comparisons[i]?.[row]?.[col] || "1/1"}
                            onChange={(e) =>
                              handleComparisonChange(i, row, col, e.target.value)
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
          ))}
        </div>
        <div className="flex flex-row-reverse justify-start w-full h-full px-8 py-8">
          <button
            onClick={handleClick}
            className="w-[90px] h-[85px] bg-green-400 rounded-full"
          >
            <p className="text-white text-[30px] font-bold">&gt;</p>
          </button>
        </div>
      </div>
    </>
  );
}
