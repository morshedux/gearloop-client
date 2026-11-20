"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const KEY = "gearloop-theme";

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState("gearloop");

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "gearloop");
  }, []);

  const toggle = () => {
    const next = theme === "gearloop" ? "gearloop-dark" : "gearloop";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    setTheme(next);
  };

  const dark = theme === "gearloop-dark";
  return (
    <button
      type="button"
      onClick={toggle}
      className={`btn btn-ghost btn-circle ${className}`}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
    >
      {dark ? <FiSun size={19} /> : <FiMoon size={19} />}
    </button>
  );
}
