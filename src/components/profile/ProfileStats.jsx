import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function ProfileStats({ patient }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const history = patient?.diagnosis_history || [];
  const displayData = history.length > 4 ? history.slice(-4) : history;
  const dataReversed = [...displayData].reverse();
  const hasEnoughData = displayData.length >= 3;
  const diagnosis = patient?.diagnostic_list || [];
  
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
      type: "bar", 
      data: {
        labels,
        datasets: [
          {
            label: "Systolic",
            borderColor: "#660000",
            backgroundColor: "#dd0000",
            data:  systolicData,
            borderWidth: 2,
            tension: 0.5,
          },
          {
            label: "Diastolic",
            borderColor: "#56726e",
            backgroundColor: "#24786c",
            data: diastolicData,
            borderWidth: 2,
            tension: 0.5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true, 
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
    <>
      <div className="profile-chart">
        <h2 className="__h1">History</h2>
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="diagnostic-history">
          <h2 className="__h1">Diagnosis</h2>
          <div className="diagnosis-list__grid">
            <div className="diagnosis-list__grid__header">
              <div className="diagnosis-list__grid__cell">Problem/Diagnosis</div>
              <div className="diagnosis-list__grid__cell">Description</div>
              <div className="diagnosis-list__grid__cell">Status</div>
            </div>
              <div className="diagnosis-list__grid__body">
                {/* 3. FIX: Properly mapping the diagnosis list */}
                {diagnosis.map((item, index) => (
                  <div key={index} className="diagnosis-list__grid__row">
                    <div className="cell">{item.name}</div>
                    <div className="cell">{item.description}</div>
                    <div className="cell">{item.status}</div>
                  </div>
                ))}
              </div>
          </div> 
      </div>
    </>
    
  );
}

export default ProfileStats;