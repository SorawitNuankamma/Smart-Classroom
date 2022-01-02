import React, { useState } from "react";

function GraderSetup(props) {
  const [gradeSelected, setGradeSelected] = useState("A");
  const [gradeMinScore, setGradeMinScore] = useState(-1);
  const [gradeSelectValidator, setGradeSelectValidator] = useState("invisible");

  const handleCallback = () => {
    const scoreMin = parseInt(gradeMinScore);
    if (scoreMin > 100 || scoreMin < 0) {
      setGradeSelectValidator("visible");
      return;
    }
    setGradeSelectValidator("invisible");
    props.callback({
      grade: gradeSelected,
      score: scoreMin,
    });
  };

  return (
    <div className="mt-8">
      <span className="text-lg">Set Grading Policy</span>
      <div>
        <div className="w-32 inline-block">
          <span>Grade</span>
        </div>
        <div className="w-40 inline-block">
          <select
            class="
                  mt-2
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
            onChange={(e) => {
              setGradeSelected(e.target.value);
            }}
          >
            <option>A</option>
            <option>B+</option>
            <option>B</option>
            <option>C+</option>
            <option>C</option>
            <option>D+</option>
            <option>D</option>
          </select>
        </div>
      </div>
      <div>
        <div className="w-32 inline-block">
          <span>Minimum Score</span>
        </div>
        <div className="w-40 inline-block">
          <input
            type="number"
            className="
                    mt-2
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
            placeholder="example 60"
            onChange={(e) => {
              setGradeMinScore(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div>
        <button
          className="bg-iron p-4 text-lg text-liture rounded-md shadow-md mt-5"
          onClick={handleCallback}
        >
          Add Grading Policy
        </button>
        <span className={`ml-6 text-red-600 ${gradeSelectValidator}`}>
          Score must be in the range
        </span>
      </div>
    </div>
  );
}

export default GraderSetup;

/* Code for handle the object

const handleGradePolicyForm = (gradeObj) => {
    const gradePolicyList = gradePolicies;
    let isDuplicatePolicy = false;
    for (let i in gradePolicyList) {
      if (gradePolicyList[i].grade === gradeObj.grade) {
        gradePolicyList[i].score = gradeObj.score;
        isDuplicatePolicy = true;
      }
    }
    if (!isDuplicatePolicy) {
      gradePolicyList.push(gradeObj);
    }
    setGradePolicies(gradePolicyList);
    setRenderState(!renderState);
  };


const handleRemoveGradePolicy = (index) => {
    const gradePolicyList = gradePolicies;
    gradePolicyList.splice(index, 1);
    setGradePolicies(gradePolicyList);
    setRenderState(!renderState);
  };

gradePolicieList.sort(compareGrader);


function compareGrader(a, b) {
  if (a.grade < b.grade) {
    return -1;
  }
  if (a.grade > b.grade) {
    return 1;
  }
  return 0;
}

<GraderSetup callback={handleGradePolicyForm} />
              <div className="mt-3 w-128">
                {gradePolicies.map((el, index) => (
                  <button
                    onClick={() => handleRemoveGradePolicy(index)}
                    className={`p-3 rounded-md shadow-lg  mr-3 mt-2 bg-teal-400`}
                  >{`${el.grade} >= ${el.score} `}</button>
                ))}
              </div>
*/
