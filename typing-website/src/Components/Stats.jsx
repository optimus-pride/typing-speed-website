import React, { useEffect } from 'react'
import { useAlert } from '../Context/AlertContext';

const Stats = ({wpm, resetTest, accuracy, correctChars, incorrectChars, missedChars, extraChars}) => {
    return (
        <div className="stats-box">
            <div className="left-stats">
                <div className="title">WPM</div>
                <div className="subtitle">{wpm}</div>
                <div className="title">Accuracy</div>
                <div className="subtitle">{accuracy}%</div>
                <div className="title">Characters</div>
                <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
                <div className='subtitle' onClick={resetTest}>Restart</div>
            </div>
            <div className="right-stats">
                {/* graph comp will go here */}
            </div>
        </div>
    )
}
    

export default Stats