import React, { useState, useEffect } from "react";

export default function IntervalPicker(props) {
  const [refresh, callRefresh] = useState(false);
  const [dateSelected, setDateSelected] = useState("Monday");
  const [startTime, setStartTime] = useState("");
  const [timeScheduleValidator, setTimeScheduleValidator] =
    useState("invisible");
  const [endTime, setEndTime] = useState("");

  const handleTimeSchedules = () => {
    if (startTime > endTime || startTime === "" || endTime === "") {
      setTimeScheduleValidator("visible");
      return;
    }
    setTimeScheduleValidator("invisible");
    const timeScheduleList = props.state;
    timeScheduleList.push([
      dateSelected,
      {
        start: startTime,
        end: endTime,
      },
    ]);
    props.callback(timeScheduleList);
    callRefresh(!refresh);
  };

  const handleRemoveTimeSchedule = (index) => {
    const timeScheduleList = props.state;
    timeScheduleList.splice(index, 1);
    props.callback(timeScheduleList);
    callRefresh(!refresh);
  };

  // ComponentDidMount
  useEffect(() => {
    async function initial() {}
    initial();
  }, []);

  return (
    <div className="mt-8">
      <span className="text-lg">Set Class Schedule</span>
      <div className="mt-3">
        <div>
          <span>Day</span>
          <select
            className="
                  mt-2
                  ml-16
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
            onChange={(e) => {
              setDateSelected(e.target.value);
            }}
          >
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </select>
        </div>
        <div>
          <span>Start Time</span>
          <input
            type="time"
            className="
                    mt-2
                    ml-5
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
            placeholder="example 09:30"
            onChange={(e) => {
              setStartTime(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <span>End Time</span>
          <input
            type="time"
            className="
                    mt-2
                    ml-7
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
            placeholder="example 12:01"
            onChange={(e) => {
              setEndTime(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div>
        <button
          className="bg-iron p-4 text-lg text-liture rounded-md shadow-md mt-5"
          onClick={handleTimeSchedules}
        >
          Add Schedule
        </button>
        <span className={`ml-6 text-red-600 ${timeScheduleValidator}`}>
          Invalid time format
        </span>
      </div>
      <div className="mt-3 w-128">
        {props.state.map((el, index) => (
          <button
            key={index}
            onClick={() => handleRemoveTimeSchedule(index)}
            className={`p-3 rounded-md shadow-lg color-${el[0]} mr-3 mt-2`}
          >{`${el[0]} ${el[1].start} - ${el[1].end}`}</button>
        ))}
      </div>
    </div>
  );
}
