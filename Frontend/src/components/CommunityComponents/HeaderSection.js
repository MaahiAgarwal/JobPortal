import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { headlines } from "../../constants/constants";

const HeaderSection = ({ isDarkMode }) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const soundRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    soundRef.current = new Audio("/typing-sound.mp3");

    const handleUserInteraction = () => {
      setSoundEnabled(true);
      window.removeEventListener("click", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);

    return () => window.removeEventListener("click", handleUserInteraction);
  }, []);

  useEffect(() => {
    const current = headlines[index % headlines.length];
    const typingSpeed = isDeleting ? 50 : 100;
    const delayBeforeStart = 1000;

    const type = setTimeout(() => {
      if (soundEnabled && soundRef.current) {
        soundRef.current.currentTime = 0;
        soundRef.current.play().catch(() => {});
      }

      if (!isDeleting && text.length < current.length) {
        setText(current.slice(0, text.length + 1));
      } else if (isDeleting && text.length > 0) {
        setText(current.slice(0, text.length - 1));
      } else {
        if (!isDeleting) {
          setTimeout(() => setIsDeleting(true), 1000);
        } else {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % headlines.length);
        }
      }
    }, text === "" && !isDeleting ? delayBeforeStart : typingSpeed);

    return () => clearTimeout(type);
  }, [text, isDeleting, index, soundEnabled]);

  return (
    <section
      className="flex flex-col items-center justify-center px-4 py-8 text-center"
      data-aos="zoom-in"
    >
      <motion.h1
        className={`text-3xl sm:text-5xl font-extrabold tracking-tight mb-2 ${
          isDarkMode
            ? "text-amber-300"
            : "text-indigo-700"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {text}
        <span className="animate-blink ml-1 text-violet-500">|</span>
      </motion.h1>

      <p className={`text-sm sm:text-base font-medium mt-2 max-w-md tracking-wide ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        Your all-in-one platform for jobs, hiring, and connections.
      </p>
    </section>
  );
};

export default HeaderSection;