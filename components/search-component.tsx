import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa"; // Ensure you have react-icons installed
import "@/styles/search-component.css";

const ScrollToTerm = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToTerm = () => {
    const term = inputRef.current?.value || "";
    if (term) {
      const regex = new RegExp(term, "i"); // 'i' for case-insensitive
      const textNodes = Array.from(
        document.body.getElementsByTagName("*")
      ).filter(
        (element) => element.firstChild && element.firstChild.nodeType === 3
      );
      setIsSearchVisible(false);
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      for (let node of textNodes) {
        if (node.textContent && node.textContent.match(regex)) {
          node.scrollIntoView({ behavior: "smooth", block: "center" });
          break;
        }
      }
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("Key pressed:", event.key); // Debugging line
    if (event.key === "Enter") {
      scrollToTerm();
    }
  };

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  // Add event listeners when the component mounts and remove them when it unmounts
  React.useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (
        isSearchVisible &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsSearchVisible(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (isSearchVisible && event.key === "Escape") {
        setIsSearchVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickAway);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickAway);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isSearchVisible]);

  return (
    <div className="search-container">
      <FaSearch className="search-icon" onClick={toggleSearchVisibility} />
      {isSearchVisible && (
        <div className="search-box">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            onKeyDown={handleKeyDown}
            className="search-input"
          />
        </div>
      )}
    </div>
  );
};

export default ScrollToTerm;
