import { motion } from "framer-motion";
import { FaLaptopCode } from "react-icons/fa"; // Importing a laptop icon

const SplashScreen = () => {
  return (
    <motion.div
      className="flex h-screen items-center justify-center bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center">
        <motion.h1
          className="text-4xl font-bold"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to DevTinder{" "}
          <motion.span
            className="inline-block"
            initial={{ scale: 1, rotateX: 0 }}
            animate={{
              scale: [1, 1.1, 1], // Animate the laptop opening and closing
              rotateX: [0, -10, 10, 0], // Rotate the laptop to create opening effect
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity, // Infinite loop for opening and closing
              repeatDelay: 1, // Delay before starting the next animation
            }}
          >
            <FaLaptopCode size={60} /> {/* Laptop icon */}
          </motion.span>
        </motion.h1>
        <motion.p
          className="mt-4 text-xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Connect with your fellow developers
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
