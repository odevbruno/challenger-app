import { useCallback, useState } from "react";

export default function useHover() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouse = useCallback((parameter) => {
    setHoveredIndex(parameter);
  }, []);

  return {
    hoveredIndex,
    setHoveredIndex,
    handleMouse,
  }
}