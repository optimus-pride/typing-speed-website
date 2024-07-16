import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Graph from '../Components/Graph';

const ComparePage = () => {
    const { username } = useParams();
    const [loggedinUserData, setLoggedinUserData] = useState([]);
    const [loggedinUserGraphData, setLoggedinUserGraphData] = useState([]);

    const [compareUserData, setCompareUserData] = useState([]);
    const [compareUserGraphData, setCompareUserGraphData] = useState([]);

    const getUID = async () => {
        try {
            const response = await axios.get(`/api/users/username/${username}`);
            return response.data.uid;
        } catch (error) {
            console.error('Error fetching UID:', error);
        }
    };

    const getData = async () => {
        try {
            const compareUserUID = await getUID();
            const loggedinUserResponse = await axios.get('/api/results/user/me');
            const compareUserResponse = await axios.get(`/api/results/user/${compareUserUID}`);

            setLoggedinUserData(loggedinUserResponse.data);
            setLoggedinUserGraphData(loggedinUserResponse.data.map(result => [result.timeStamp, result.wpm]).reverse());

            setCompareUserData(compareUserResponse.data);
            setCompareUserGraphData(compareUserResponse.data.map(result => [result.timeStamp, result.wpm]).reverse());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div className="graph">
                <Graph graphData={loggedinUserGraphData} type='date' />
            </div>
            <div className="graph">
                <Graph graphData={compareUserGraphData} type='date' />
            </div>
        </div>
    );
};

export default ComparePage;