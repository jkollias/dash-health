
function ProfileInfo({patient}) {
  if(!patient) return <p>Select a patient</p>; 
  return (
    <div className="patients-info"> 
      <figure className="patients-info__image">
        <div><img src={patient.image_path} alt={patient.name} width="260" height="260" /></div>
         <figcaption className="patients-info__name __h1">{patient.name}</figcaption>
      </figure>
      
      <div className="patients-info__dob">Dob: <strong>{patient.date_of_birth}</strong></div>
      <div className="patients-info__gender">Gender: <strong>{patient.gender}</strong></div>
      <div className="patients-info__contact-info">Contact:<br/> <strong>{patient.emergency_contact}</strong></div>
      <div className="patients-info__emergency-info">Emergency:<br/> <strong>{patient.emergency_contact}</strong></div>
      <div className="patients-info__insurance">Ins: <strong>{patient.insurance_type}</strong></div>
    </div>
     
  )
}

export default ProfileInfo