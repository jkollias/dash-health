import useData from "../hooks/useData"
import { useEffect, useState,  useRef, useCallback } from "react"
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"; 

function SiteNavigation() {
   const { siteNavLinks, loading, error } = useData();
   const [isOpen, setIsOpen] = useState(false);
   const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
   const buttonRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    }; 

    const closeMenu = useCallback(() => {
        setIsOpen(false);
        buttonRef.current?.focus();
    }, []);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1000);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
    }, [isOpen,closeMenu]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong.</p>;

    if (!isMobile) {
        return (
            <nav className="site-navigation__nav--desktop" aria-label="Main navigation">
                <ul className="site-navigation__links">
                    {siteNavLinks.map((link) => (
                        <li key={link.tag}>
                            {/* <a href={link.url} className="site-navigation__link">{link.tag}</a> */}
                            <a href="https://www.google.com" className="site-navigation__link">{link.tag}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
  
    return (  
    <div className="site-navigation">
        <button 
            ref={buttonRef}
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
            {...(!isOpen && { inert: "" })}
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