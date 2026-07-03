import useTheme from "../hooks/useTheme";
import BrightnessMediumIcon from '@mui/icons-material/BrightnessMedium';

function DarkModeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
        onClick={ toggleTheme } 
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark" } mode`}
        aria-pressed={theme === "dark"}
        className="toggle-theme-btn"
    >
        <BrightnessMediumIcon  />
        {theme === "dark" ? "Dark" : "Light"} Mode
    </button>
  )
}
export default DarkModeSwitcher