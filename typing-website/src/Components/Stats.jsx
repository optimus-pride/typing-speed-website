import React, { useEffect } from "react";
import Graph from "./Graph";
import { useAlert } from "../Context/AlertContext";
import axios from "axios";
const Stats = ({
  wpm,
  resetTest,
  accuracy,
  correctChars,
  incorrectChars,
  missedChars,
  extraChars,
  graphData,
}) => {
  var timeSet = new Set(); //store unique values of time
  const { setAlert } = useAlert();
  const newGraph = graphData.filter((i) => {
    if (!timeSet.has(i[0])) {
      timeSet.add(i[0]);
      return i;
    }
  });
  const pushResultToDatabase = async () => {
    try {
      const response = await axios.post("/api/results", {
        wpm: wpm,
        accuracy: accuracy,
        characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
        timeStamp: new Date(),
      });
      setAlert({
        open: true,
        type: "success",
        message: "Result saved to database",
      });
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        message: "Failed to save result to database",
      });
    }
  };
  useEffect(() => {
    pushResultToDatabase();
  }, []);
  return (
    <div className="stats-box">
      <div className="left-stats">
        <div className="title">WPM</div>
        <div className="subtitle">{wpm}</div>
        <div className="title">Accuracy</div>
        <div className="subtitle">{accuracy}%</div>
        <div className="title">Characters</div>
        <div className="subtitle">
          {correctChars}/{incorrectChars}/{missedChars}/{extraChars}
        </div>
        <div className="subtitle" onClick={resetTest}>
          Restart
        </div>
      </div>
      <div className="right-stats">
        <Graph graphData={newGraph} />
      </div>
    </div>
  );
};
export default Stats;
