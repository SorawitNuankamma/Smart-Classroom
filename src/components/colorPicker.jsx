import React, { useState, useEffect } from "react";

import "../styles/colors.css";

export default function ColorPicker(props) {
  const [colorSelector, setColorSelector] = useState([]);

  const colorList = ["green", "red", "blue", "yellow"];

  const handleColorSelector = (colorIndex) => {
    const selectedColor = colorList[colorIndex];
    if (selectedColor === props.state) {
      return;
    }
    let colorSelectorTemplate = [];
    for (let i = 0; i < colorList.length - 1; i++) {
      colorSelectorTemplate.push("");
    }
    colorSelectorTemplate[colorIndex] = "border-4 border-indigo-600";
    setColorSelector(colorSelectorTemplate);
    props.callback(selectedColor);
    return;
  };

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      const arrTemplate = [];
      arrTemplate.push("border-4 border-indigo-600");
      for (let i = 0; i < colorList.length - 1; i++) {
        arrTemplate.push("");
      }
      setColorSelector(arrTemplate);
    }
    initial();
  }, []);

  return (
    <div className="mt-8">
      <span>Color</span>
      <div className="flex flex-row gap-x-5 mt-1">
        {colorList.map((el, index) => (
          <button
            key={index}
            onClick={() => handleColorSelector(index)}
            className={`h-16 w-16 rounded-md shadow-lg color-${el} ${colorSelector[index]}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
