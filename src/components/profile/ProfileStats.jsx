import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function ProfileStats({ patient }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const history = patient?.diagnosis_history || [];
  const displayData = history.length > 4 ? history.slice(-4) : history;
  const dataReversed = [...displayData].reverse();
  const hasEnoughData = displayData.length >= 3;
  
  useEffect(() => {
    if (!hasEnoughData || !chartRef.current) return;
    const ctx = chartRef.current.getContext("2d"); 
 
    const labels = dataReversed.map( 
      (entry)=> `${entry.month?.slice(0,3)} ${entry.year}`
    );
    const systolicData = dataReversed.map(
      (entry) => entry?.blood_pressure?.systolic?.value
    );

    const diastolicData = dataReversed.map(
      (entry) => entry?.blood_pressure?.diastolic?.value
    );

    // destroy previous chart (VERY important)
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line", 
      data: {
        labels,
        datasets: [
          {
            label: "Systolic",
            borderColor: "#ff0000",
            backgroundColor: "#660000",
            data:  systolicData,
            borderWidth: 2,
            tension: 0.5,
          },
          {
            label: "Diastolic",
            borderColor: "#00ff00",
            backgroundColor: "#006600",
            data: diastolicData,
            borderWidth: 2,
            tension: 0.5,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };

  }, [patient]);  

  if (!patient) return <p>Select a patient</p>;
  if (history.length < 2) return <p className="__error-message">Not enough data</p>;

  return (
    <div className="profile-chart">
      <h2 className="__h1">History</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default ProfileStats;