"use client";

import { motion, AnimatePresence } from "framer-motion";

import { pageLinks } from "@/src/shared/data/global.data";
import { useSidebarContext } from "@/src/context/Sidebar";

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const Sidebar = () => {
  const [sidebar] = useSidebarContext();
  return (
    <AnimatePresence>
      {sidebar.isOpen && (
        <motion.aside
          initial={{ width: 0 }}
          animate={{
            width: 300,
          }}
          exit={{
            width: 0,
            transition: { delay: 0.7, duration: 0.3 },
          }}
          className="h-screen absolute border-2 border-dark bg-light right-0"
        >
          <motion.div
            className="container"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sideVariants}
          >
            <div className="flex flex-col">
              {pageLinks.map(({ label, href }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  whileHover={{ scale: 1.1 }}
                  variants={itemVariants}
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;