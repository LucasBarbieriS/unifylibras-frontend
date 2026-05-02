import Hero from '../components/home/Hero';
import Pricing from '../components/home/Pricing';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Pricing />
    </motion.div>
  );
}
