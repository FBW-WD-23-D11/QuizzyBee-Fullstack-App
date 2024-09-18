import React, { useState, useEffect } from "react";

const Quiz = ({ currentQuestion }) => {
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        if (timeLeft === 0) {
            // Logik, wenn die Zeit abgelaufen ist (z.B. Frage automatisch als falsch markieren)
            alert("Zeit abgelaufen!");
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        // Timer bei Komponentenausblendung aufräumen
        return () => clearInterval(timer);
    }, [timeLeft]);

    return (
        <div>
            <div>Frage: {currentQuestion.text}</div>
            <div>Verbleibende Zeit: {timeLeft}s</div>
            {/* Restlicher Quiz-Code */}
        </div>
    );
};

export default Quiz;
