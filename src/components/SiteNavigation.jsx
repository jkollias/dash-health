import useData from "../hooks/useData"
import { useEffect, useState,  useRef } from "react"
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"; 

function SiteNavigation() {
   const { siteNavLinks, loading, error } = useData();
   const [isOpen, setIsOpen] = useState(false);
   const buttonRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
        //prev => !prev Takes whatever the current open/closed state is, and flip it.
    };

    const closeMenu = () => {
        setIsOpen(false);
        buttonRef.current?.focus(); // return focus to button
    };

    useEffect(() => {
        function handleEsc(e) {
            if (e.key === "Escape") {
                closeMenu();
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong.</p>;

   
  
    return (  
    <div className="site-navigation">
        <button 
            className="site-navigation__open-btn"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation"
            onClick={toggleMenu}
        >
            <MenuIcon />
            <span className="site-navigation__open-btn__label">Open Menu</span>
        </button>

        <nav 
            className="site-navigation__nav" 
            id="mobile-menu"
            aria-label="Main navigation"
            aria-hidden={!isOpen}
        >
            <button 
                className="site-navigation__close-btn"
                onClick={closeMenu}
            >
                <CloseIcon />
                <span className="site-navigation__close-btn__label">Close Menu </span> 
            </button>
            <ul className="site-navigation__links">
                {siteNavLinks.map((siteNavLink) => (
                    <li 
                        key={siteNavLink.tag} >
                        <a 
                            href={siteNavLink.url} 
                            className="site-navigation__link">
                                {siteNavLink.tag}
                        </a> 
                    </li> 
                ))}
            </ul>
        </nav>
    </div>  
       
  )
}
export default SiteNavigation