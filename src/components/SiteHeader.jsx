import SiteNavigation from "./SiteNavigation"
import logo from "../assets/img/dash-health-logo_400.webp"

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__grid">
          <div className="site-header__logo">
            <img src={logo} width="200" height="28" alt="Dash Health" className="site-logo" />
          </div>
          <div className="site-header__navigation"><SiteNavigation/></div>
          {/* <div className="site-header__user-profile-actions">Actions</div> */}
      </div>
    </header>
    
  )
}
export default SiteHeader

 