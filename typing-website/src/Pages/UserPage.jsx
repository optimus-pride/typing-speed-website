import React, { useEffect, useState } from "react";
import axios from "axios";
import ResultTable from "../Components/ResultTable";
import Graph from "../Components/Graph";
import UserInfo from "../Components/UserInfo";
import { useTheme } from "../Context/ThemeContext";
import { CircularProgress } from '@mui/material';
const UserPage = () => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const { theme } = useTheme();
  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/results/user/me");
      const results = response.data;
      const tempGraphData = results
        .map((result) => [result.timeStamp, result.wpm])
        .reverse();
      setData(results);
      setGraphData(tempGraphData);
      setDataLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setDataLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  if (dataLoading) {
    return (
      <div className="center-of-screen">
        <CircularProgress size={300} color={theme.title} />
      </div>
    );
  }
  if (!dataLoading && data.length === 0) {
    return (
      <div className="center-of-screen">
        <span>Take some tests then come back!!</span>
      </div>
    );
  }
  return (
    <div className="canvas">
      <UserInfo totalTestTaken={data.length} />
      <div className="graph">
        <Graph graphData={graphData} type="date" />
      </div>
      <ResultTable data={data} />
    </div>
  );
};
export default UserPage;
