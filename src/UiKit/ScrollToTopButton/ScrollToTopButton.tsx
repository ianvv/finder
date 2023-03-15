import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import styled from "styled-components";

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 76) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const handleOnClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <Button onClick={handleOnClick}>
          <FaArrowUp size={20} />
        </Button>
      )}
    </>
  );
};

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: black;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 0;

  &:hover {
    background-image: linear-gradient(45deg, #5b5aff, #89db33);
    background-position: right center;
    animation: buttonGradient 3s ease-in-out infinite;
  }

  @keyframes buttonGradient {
    0% {
      background-position: left center;
    }
    50% {
      background-position: top center;
    }
    100% {
      background-position: right center;
    }
  }
`;
