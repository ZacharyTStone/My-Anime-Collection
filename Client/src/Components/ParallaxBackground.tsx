import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-[1] overflow-hidden">
      <motion.div
        className="w-full h-[120%] opacity-15"
        style={{
          y,
          background:
            "linear-gradient(to bottom, var(--color-primary-800), var(--color-primary-900))",
        }}
      />
    </div>
  );
};

export default ParallaxBackground;
