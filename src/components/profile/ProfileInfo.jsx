
function ProfileInfo({patient}) {
  if(!patient) return <p>Select a patient</p>; 
  return (
    <div className="patients-info"> 
      <figure className="patients-info__image">
        <div><img src={patient.image_path} alt={patient.name} /></div>
         <figcaption className="patients-info__name __h1">{patient.name}</figcaption>
      </figure>
      
      <div className="patients-info__dob">Date Of Birth<br/><strong>{patient.date_of_birth}</strong></div>
      <div className="patients-info__gender">Gender<br/><strong>{patient.gender}</strong></div>
      <div className="patients-info__contact-info">Contact Info<br/><strong>{patient.emergency_contact}</strong></div>
      <div className="patients-info__emergency-info">Emergency Info<br/><strong>{patient.emergency_contact}</strong></div>
      <div className="patients-info__insurance">Insurance Provider Info<br/><strong>{patient.insurance_type}</strong></div>
    </div>
     
  )
}

export default ProfileInfo