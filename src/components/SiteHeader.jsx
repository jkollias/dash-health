import SiteNavigation from "./SiteNavigation"
import logo from "../assets/img/dash-health-logo.webp"

function SiteHeader() {
  return (
    <div className="site-header__grid">
      <div className="site-header__logo">
        <img src={logo} width="100" height="15" alt="Dash Health" className="site-logo" />
      </div>
      <div className="site-header__navigation"><SiteNavigation/></div>
      <div className="site-header__user-profile-actions">Actions</div>
    </div>
  )
}
export default SiteHeader