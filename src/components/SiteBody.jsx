import { useState } from "react";
import ProfileList from './profile/ProfileList'
import ProfileStats from './profile/ProfileStats'
import ProfileInfo from './profile/ProfileInfo'

function SiteBody() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  return ( 
      <div className="site-body__grid">
          <div className="__panel site-body__grid__profile-list ">
            <ProfileList onSelect={setSelectedPatient} selectedPatient={selectedPatient} />
          </div>
          <div className="__panel site-body__grid__profile-stats ">
            <ProfileStats patient={selectedPatient} />
          </div>
          <div className="__panel site-body__grid__profile-info ">
            <ProfileInfo patient={selectedPatient} />
          </div>
      </div> 
  )
}
export default SiteBody