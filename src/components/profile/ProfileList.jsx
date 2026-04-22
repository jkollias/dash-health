import { useEffect } from "react";
import useData from "../../hooks/useData"

function ProfileList({ onSelect, selectedPatient }) {
  const {patients, loading, error} = useData();

  useEffect(() => {
    if (patients?.length) {
      onSelect(patients[0]);
    }
  }, [patients, onSelect]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;
  
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
                <img src={patient.image_path} alt={patient.name} width="125" height="125" />
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