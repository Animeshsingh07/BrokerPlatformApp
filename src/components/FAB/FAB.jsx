import { useState, useRef, useEffect } from "react";
import "./FAB.css";

function FAB({ stockList, onAction, navbarRef }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(() => {
    const padding = 10;
    const fabSize = 31;
    return {
      top: window.innerHeight - fabSize - padding,
      left: window.innerWidth - fabSize - padding - 20,
    };
  });

  const [expandDirection, setExpandDirection] = useState("up");
  const [alignDirection, setAlignDirection] = useState("right");

  const wrapperRef = useRef(null);
  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const toggleFAB = () => {
    if (!isOpen && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const requiredSpace = 100;
      const padding = 10;
      const hasSpaceAbove = rect.top - requiredSpace > padding;
      setExpandDirection(hasSpaceAbove ? "up" : "down");
    }
    setIsOpen((prev) => !prev);
  };

  const handleAction = (type) => {
    const stock =
      stockList?.[0] ||
      [...(stockList || [])].sort((a, b) => a.symbol.localeCompare(b.symbol))[0];

    if (stock) {
      onAction(stock, type);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onMouseDown = (e) => {
      const rect = wrapper.getBoundingClientRect();
      offsetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      draggingRef.current = true;
      setPosition({ left: rect.left, top: rect.top });
      e.preventDefault();
    };

    const onMouseMove = (e) => {
      if (!draggingRef.current || !wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const fabWidth = rect.width;
      const fabHeight = rect.height;
      const padding = 8;
      const navbarHeight = 40;

      const minX = padding;
      const maxX = window.innerWidth - fabWidth - padding;
      const minY = navbarHeight + padding;
      const maxY = window.innerHeight - fabHeight - padding;

      const newLeft = Math.min(
        Math.max(e.clientX - offsetRef.current.x, minX),
        maxX
      );
      const newTop = Math.min(
        Math.max(e.clientY - offsetRef.current.y, minY),
        maxY
      );

      const fabMidX = newLeft + fabWidth / 2;
      const viewportWidth = window.innerWidth;

      if (viewportWidth - fabMidX < 100) {
        setAlignDirection("right");
      } else if (fabMidX < 100) {
        setAlignDirection("left");
      } else {
        setAlignDirection("center");
      }

      setPosition({ left: newLeft, top: newTop });
    };

    const onMouseUp = () => {
      draggingRef.current = false;
    };

    const fabButton = wrapper.querySelector(".fab-main-btn");
    if (fabButton) fabButton.addEventListener("mousedown", onMouseDown);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      if (fabButton) fabButton.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const padding = 10;
      const fabSize = 31;
      setPosition({
        top: window.innerHeight - fabSize - padding,
        left: window.innerWidth - fabSize - padding,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fab-wrapper"
      style={{
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 1000,
      }}
    >
      <div
        className={`fab-options ${isOpen ? "open" : ""} ${expandDirection} ${alignDirection}`}
      >
        <button className="fab-btn buy" onClick={() => handleAction("buy")}>Buy</button>
        <button className="fab-btn sell" onClick={() => handleAction("sell")}>Sell</button>
      </div>
      <button
        className={`fab-main-btn ${isOpen ? "rotate" : ""}`}
        onClick={toggleFAB}
      >
        <img src="src/assets/Icons/add.svg" alt="add" />
      </button>
    </div>
  );
}

export default FAB;