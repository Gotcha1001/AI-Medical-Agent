import { cn } from "@/lib/utils";
import React from "react";
import { motion, AnimatePresence } from "motion/react";

import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export function FeatureBentoGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2.5 }}
      className="max-w-7xl mx-auto mt-20 px-4"
    >
      <motion.h2
        className="text-center text-3xl font-bold text-slate-700 dark:text-slate-300 mb-12"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🏥 Advanced Medical AI Features
      </motion.h2>
      <BentoGrid className="max-w-4xl mx-auto">
        {medicalItems.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </motion.div>
  );
}

// Medical AI Skeleton Components
const VoiceWaveform = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 p-4 flex items-center justify-center">
    <div className="flex items-center gap-1">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-emerald-500 rounded-full"
          animate={{
            height: [10, Math.random() * 40 + 10, 10],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 0.5 + Math.random() * 0.5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  </div>
);

const HeartMonitor = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950 p-4 flex items-center justify-center">
    <motion.svg
      width="120"
      height="40"
      viewBox="0 0 120 40"
      className="text-red-500"
    >
      <motion.path
        d="M0,20 L20,20 L25,10 L30,30 L35,5 L40,35 L45,20 L120,20"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.svg>
  </div>
);

const BrainScan = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 p-4 flex items-center justify-center">
    <motion.div
      className="w-12 h-12 rounded-full border-4 border-purple-500 relative"
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    >
      <motion.div
        className="absolute inset-2 rounded-full bg-purple-400"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
        🧠
      </div>
    </motion.div>
  </div>
);

const DataAnalysis = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-4">
    <div className="flex flex-col justify-between w-full">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="h-2 bg-blue-400 rounded-full"
          initial={{ width: "20%" }}
          animate={{ width: `${Math.random() * 80 + 20}%` }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  </div>
);

const PillReminder = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 p-4 flex items-center justify-center">
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{ duration: 2, repeat: Infinity }}
      className="text-4xl"
    >
      💊
    </motion.div>
  </div>
);

const AppointmentCalendar = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950 p-4">
    <div className="grid grid-cols-4 gap-1 w-full">
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          className="aspect-square bg-green-200 dark:bg-green-800 rounded"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: i % 5 === 0 ? 1 : 0.3 }}
          transition={{
            duration: 0.5,
            delay: i * 0.1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  </div>
);

const EmergencyAlert = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 p-4 flex items-center justify-center">
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 10, -10, 0],
      }}
      transition={{ duration: 1, repeat: Infinity }}
      className="text-3xl"
    >
      🚨
    </motion.div>
  </div>
);

// Medical AI Features Data
const medicalItems = [
  {
    title: "Voice Symptom Analysis",
    description:
      "Advanced AI processes your spoken symptoms in real-time, understanding context and medical terminology for accurate preliminary assessment.",
    header: <VoiceWaveform />,
    icon: <div className="text-emerald-500">🎤</div>,
  },
  {
    title: "Vital Signs Monitoring",
    description:
      "Continuous health monitoring through smart devices, tracking heart rate, blood pressure, and other critical health metrics.",
    header: <HeartMonitor />,
    icon: <div className="text-red-500">❤️</div>,
  },
  {
    title: "AI Diagnostic Engine",
    description:
      "Machine learning algorithms analyze symptoms against vast medical databases to provide intelligent diagnostic suggestions.",
    header: <BrainScan />,
    icon: <div className="text-purple-500">🧠</div>,
  },
  {
    title: "Comprehensive Health Analytics",
    description:
      "Transform your health data into actionable insights with advanced analytics, trend analysis, and personalized health recommendations for better outcomes.",
    header: <DataAnalysis />,
    icon: <div className="text-blue-500">📊</div>,
  },
  {
    title: "Smart Medication Management",
    description:
      "AI-powered medication reminders, drug interaction checks, and dosage optimization based on your health profile.",
    header: <PillReminder />,
    icon: <div className="text-orange-500">💊</div>,
  },
  {
    title: "Intelligent Appointment Scheduling",
    description:
      "Seamlessly book appointments with specialists based on AI analysis of your symptoms and medical history.",
    header: <AppointmentCalendar />,
    icon: <div className="text-green-500">📅</div>,
  },
  {
    title: "24/7 Emergency Response System",
    description:
      "Instant emergency detection and response coordination with medical professionals, ensuring immediate care when you need it most.",
    header: <EmergencyAlert />,
    icon: <div className="text-red-500">🚨</div>,
  },
];

const Navbar = () => {
  return (
    <motion.nav
      className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800"
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
    </motion.nav>
  );
};
