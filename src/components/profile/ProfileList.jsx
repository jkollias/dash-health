import { useEffect } from "react";
import useData from "../../hooks/useData"

function ProfileList({ onSelect, selectedPatient }) {
  const {patients, loading, error} = useData();

  useEffect(() => {
    if (patients?.length) {
      onSelect(patients[0]);
    }
  }, [patients, onSelect]);

  if (loading) return <p className="__message loading-message">Loading...</p>;
  if (error) return <p className="__message error-message">Something went wrong.</p>;
  
  return (
    <> 
      <h2 className="__h2">Patients</h2>
      <ul className="profile-list">
        <li className="__spacer"></li>
        
        {
          patients.map((patient) => (
            <li key={patient.name}> 
              <button className={`select-profile-btn
                ${
                  selectedPatient?.name === patient.name ? "active_profile-btn" : ""
                }`}
                onClick={()=> onSelect(patient)}>
                <img src={patient.image_path} alt={`Select profile for ${patient.name}`} width="100" height="100" className="select-profile-btn__img" />
                <div className="select-profile-btn__name">{patient.name}</div>
              </button>
            </li>
          ))
        } 
        <li className="__spacer"></li>
      </ul>
       
    </>
  )
}
export default ProfileList