import { useEffect } from "react";
import useLocalStorage from "use-local-storage";

export default function useDarkMode() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const newTheme = theme === "light" ? "dark" : "light";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add(theme);
    root.classList.remove(newTheme);
  }, [theme, setTheme, newTheme]);

  return [theme, setTheme, newTheme]
}
