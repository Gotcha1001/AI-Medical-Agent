"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { FeatureBentoGrid } from "./_components/FeatureBentoGrid";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const specialists = [
  {
    name: "Dr. Sarah Chen",
    specialty: "Cardiology",
    icon: "❤️",
    experience: "15+ years",
  },
  {
    name: "Dr. Michael Torres",
    specialty: "Neurology",
    icon: "🧠",
    experience: "12+ years",
  },
  {
    name: "Dr. Emma Wilson",
    specialty: "Dermatology",
    icon: "🌟",
    experience: "10+ years",
  },
  {
    name: "Dr. James Kim",
    specialty: "Orthopedics",
    icon: "🦴",
    experience: "18+ years",
  },
  {
    name: "Dr. Lisa Rodriguez",
    specialty: "Pediatrics",
    icon: "👶",
    experience: "14+ years",
  },
  {
    name: "Dr. David Park",
    specialty: "Psychiatry",
    icon: "🧘",
    experience: "11+ years",
  },
];

export default function HeroSectionOne() {
  const [selectedSpecialist, setSelectedSpecialist] = useState<number | null>(
    null
  );
  const [isListening, setIsListening] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Handle window size for floating icons
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    updateWindowSize();

    // Add event listener
    window.addEventListener("resize", updateWindowSize);

    // Cleanup
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  const handleStartDiagnosis = () => {
    setIsListening(true);
    setTimeout(() => setIsListening(false), 3000);
  };

  return (
    <div className="relative my-10 flex flex-col items-center justify-center overflow-hidden">
      <Navbar />

      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(16, 185, 129, 0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating Medical Icons - Only render when window size is available */}
      {windowSize.width > 0 &&
        [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            initial={{
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
              rotate: 0,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {["🩺", "💊", "🏥", "🔬", "🧬", "⚕️"][i]}
          </motion.div>
        ))}

      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <motion.div
          className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-emerald-500 to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <motion.div
          className="absolute h-40 w-px bg-gradient-to-b from-transparent via-emerald-500 to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <motion.div
          className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      <div className="px-4 py-10 md:py-20 relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 flex justify-center"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity },
            }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-3xl shadow-lg"
          >
            ⚕️
          </motion.div>
        </motion.div>

        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"AI Medical Assistant That Understands Your Symptoms"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{
                  opacity: 0,
                  filter: "blur(4px)",
                  y: 20,
                  rotateX: -90,
                }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.05,
                  color: "#10b981",
                  transition: { duration: 0.2 },
                }}
                className="mr-2 inline-block cursor-pointer"
              >
                {word}
              </motion.span>
            ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Describe your symptoms in natural language and receive intelligent
          medical insights. Our AI analyzes your condition, provides preliminary
          diagnosis, and guides you to appropriate care - all through voice
          conversation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            onClick={handleStartDiagnosis}
            className="relative w-60 transform rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
              style={{ opacity: 0.1 }}
            />
            <AnimatePresence mode="wait">
              {isListening ? (
                <motion.span
                  key="listening"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="w-3 h-3 bg-white rounded-full"
                  />
                  Listening...
                </motion.span>
              ) : (
                <Link href={"/sign-in"}>
                  <motion.span
                    key="start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    🎤 Get Started
                  </motion.span>
                </Link>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            className="w-60 transform rounded-lg border-2 border-emerald-600 px-6 py-3 font-medium text-emerald-600 transition-all duration-300 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950"
            whileHover={{
              scale: 1.05,
              borderColor: "#059669",
              boxShadow: "0 5px 15px rgba(16, 185, 129, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            💬 Talk to AI Doctor
          </motion.button>
        </motion.div>

        {/* Specialist Selection */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16"
        >
          <motion.h2
            className="text-center text-2xl font-bold text-slate-700 dark:text-slate-300 mb-8"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Choose Your Specialist 👨‍⚕️👩‍⚕️
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {specialists.map((specialist, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedSpecialist === index
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950"
                    : "border-neutral-200 dark:border-neutral-700 hover:border-emerald-300"
                }`}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 1.4 + index * 0.1,
                  type: "spring",
                  stiffness: 300,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSpecialist(index)}
              >
                <motion.div
                  className="text-3xl mb-2"
                  animate={{
                    rotate: selectedSpecialist === index ? [0, 10, -10, 0] : 0,
                    scale: selectedSpecialist === index ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {specialist.icon}
                </motion.div>
                <h3 className="font-bold text-slate-700 dark:text-slate-300">
                  {specialist.name}
                </h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {specialist.specialty}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {specialist.experience}
                </p>

                <AnimatePresence>
                  {selectedSpecialist === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-emerald-200"
                    >
                      <motion.button
                        className="w-full bg-emerald-500 text-white py-2 rounded-lg font-medium"
                        whileHover={{ backgroundColor: "#059669" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Book Consultation 📅
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
          whileHover={{
            y: -10,
            boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
          }}
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <motion.div
              className="aspect-[16/9] bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 flex items-center justify-center relative"
              animate={{
                background: [
                  "linear-gradient(45deg, #ecfdf5, #eff6ff)",
                  "linear-gradient(45deg, #f0fdf4, #f0f9ff)",
                  "linear-gradient(45deg, #ecfdf5, #eff6ff)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {/* Animated pulse rings */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-40 h-40 border-4 border-emerald-300 rounded-full" />
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1.2, 1.4, 1.2], opacity: [0.2, 0.05, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <div className="w-40 h-40 border-4 border-blue-300 rounded-full" />
              </motion.div>

              <div className="text-center p-8 relative z-10">
                <motion.div
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-emerald-500 flex items-center justify-center"
                  animate={{
                    rotate: 360,
                    boxShadow: [
                      "0 0 20px rgba(16, 185, 129, 0.3)",
                      "0 0 40px rgba(16, 185, 129, 0.6)",
                      "0 0 20px rgba(16, 185, 129, 0.3)",
                    ],
                  }}
                  transition={{
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    boxShadow: { duration: 2, repeat: Infinity },
                  }}
                >
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </motion.div>

                <motion.h3
                  className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  AI Medical Consultation Interface
                </motion.h3>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Voice-enabled symptom analysis and diagnostic assistance
                </p>

                <div className="flex justify-center space-x-4">
                  {[
                    { label: "Voice Recognition", color: "emerald" },
                    { label: "Smart Diagnosis", color: "blue" },
                    { label: "24/7 Available", color: "purple" },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      className={`px-4 py-2 bg-${feature.color}-100 dark:bg-${feature.color}-900 rounded-full text-${feature.color}-700 dark:text-${feature.color}-300 text-sm font-medium`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.5 + i * 0.2, type: "spring" }}
                      whileHover={{
                        scale: 1.1,
                        y: -2,
                      }}
                    >
                      {feature.label}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <FeatureBentoGrid />
    </div>
  );
}

const Navbar = () => {
  const { user } = useUser();

  return (
    <motion.nav
      className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800 relative z-40"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="size-7 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center"
          animate={{
            rotate: [0, 360],
            boxShadow: [
              "0 0 10px rgba(16, 185, 129, 0.3)",
              "0 0 20px rgba(16, 185, 129, 0.6)",
              "0 0 10px rgba(16, 185, 129, 0.3)",
            ],
          }}
          transition={{
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            boxShadow: { duration: 2, repeat: Infinity },
          }}
        >
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </motion.div>
        <h1 className="text-base font-bold md:text-2xl">MediAI Assistant</h1>
      </motion.div>

      {!user ? (
        <Link href={"/sign-in"}>
          <motion.button
            className="w-24 transform rounded-lg bg-emerald-600 px-6 py-2 font-medium text-white md:w-32"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#059669",
              boxShadow: "0 5px 15px rgba(16, 185, 129, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Login
          </motion.button>
        </Link>
      ) : (
        <div className="flex items-center gap-5 relative z-50">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
                userButtonPopoverCard: "z-50",
                userButtonPopoverActions: "z-50",
              },
            }}
          />
          <Link href={"/dashboard"}>
            <motion.button
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Dashboard
            </motion.button>
          </Link>
        </div>
      )}
    </motion.nav>
  );
};
