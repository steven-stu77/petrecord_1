import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dogImg from "../image/dog.png";
import TextType from "./TextType";
import { ScrollVelocity } from "./ScrollVelocity";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

const Button = ({ children, onClick, style: customStyle, size, ...props }) => {
  const baseStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    fontWeight: "500",
    transition: "background-color 0.2s ease, color 0.2s ease",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
  };

  const sizeStyle =
    size === "lg"
      ? {
          padding: "1.75rem 2.5rem",
          fontSize: "1.125rem",
        }
      : {};

  return (
    <button
      onClick={onClick}
      style={{ ...baseStyle, ...sizeStyle, ...customStyle }}
      {...props}
    >
      {children}
    </button>
  );
};

// Simple icon components
const ArrowRight = ({ style }) => <span style={style}>→</span>;
const Heart = ({ style }) => <span style={style}>❤️</span>;
const Sparkles = ({ style }) => <span style={style}>✨</span>;
const PawPrint = ({ style }) => <span style={style}>🐾</span>;

// Helper for color classes
const getColorClasses = (color) => {
  switch (color) {
    case "pink":
      return {
        bg: "rgb(253 242 248)", // pink-100
        text: "rgb(219 39 119)", // pink-600
      };
    case "yellow":
      return {
        bg: "rgb(254 252 232)", // yellow-100
        text: "rgb(202 138 4)", // yellow-600
      };
    case "blue":
      return {
        bg: "rgb(239 246 255)", // blue-100
        text: "rgb(37 99 235)", // blue-600
      };
    default:
      return {};
  }
};

// Extracted Feature Card Component
const FeatureCard = ({ icon: Icon, title, desc, color, i }) => {
  const colors = getColorClasses(color);

  const cardStyle = {
    background: "linear-gradient(to bottom right, #fff, rgb(249 250 251))",
    padding: 40,
    borderRadius: 24,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgb(229 231 235)",
    transition: "all 500ms ease",
    position: "relative",
    overflow: "hidden",
  };

  const iconContainerStyle = {
    width: 80,
    height: 80,
    backgroundColor: colors.bg,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    position: "relative",
    zIndex: 10,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.15 }}
      whileHover={{ y: -12, scale: 1.03 }}
      style={cardStyle}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom right, rgb(239, 246, 255), rgb(253, 242, 248))",
          opacity: 0,
          transition: "opacity 0.5s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
      />
      <div style={iconContainerStyle}>
        <Icon style={{ width: 40, height: 40, color: colors.text }} />
      </div>
      <h3
        style={{
          fontSize: 20,
          fontWeight: "600",
          marginBottom: 16,
          position: "relative",
          zIndex: 10,
          color: "rgb(31 41 55)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: "rgb(75 85 99)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {desc}
      </p>
    </motion.div>
  );
};

// Define feature data
const FEATURES = [
  {
    icon: Heart,
    title: "Built with Love",
    desc: "Designed by pet parents, for pet parents",
    color: "pink",
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    desc: "Smart insights that help you care better",
    color: "yellow",
  },
  {
    icon: PawPrint,
    title: "Simple & Beautiful",
    desc: "Intuitive design that gets out of your way",
    color: "blue",
  },
];

const STACK_ITEMS = [
  { title: "Pet Records Overview", color: "#c7ddffff" },
  { title: "Step 1: Log Activities", color: "#b1cfbcff" },
  { title: "Step 2: Track Health", color: "#c4b8d0ff" },
  { title: "Step 3: Get Insights", color: "#e6bb9dff" },
];

// --- Main Dashboard Component ---

export function Dashboard({ onNavigate }) {
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const pawX = (mousePosition.x - window.innerWidth / 2) * 0.02;
  const pawY = (mousePosition.y - window.innerHeight / 2) * 0.02;

  // Extracted styles object for better readability
  const styles = {
    // Shared
    container: {
      maxWidth: 1024,
      margin: "0 auto",
      paddingLeft: 16,
      paddingRight: 16,
    },
    sectionTitle: {
      fontSize: 48,
      marginBottom: 24,
      fontWeight: "bold",
      color: "rgb(17 24 39)",
    },
    sectionDescription: {
      fontSize: 20,
      color: "rgb(75 85 99)",
      maxWidth: 800,
      margin: "0 auto",
    },

    // Hero Section
    heroSection: {
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    heroGradient: {
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to bottom right, rgba(219, 234, 254, 0.5), rgba(253, 230, 246, 0.5), rgba(254, 252, 232, 0.5))",
    },
    heroContentContainer: {
      position: "relative",
      zIndex: 10,
      maxWidth: 1024,
      margin: "0 auto",
      paddingLeft: 16,
      paddingRight: 16,
      textAlign: "center",
    },
    dogImage: {
      width: 320,
      height: 320,
      margin: "0 auto",
      objectFit: "cover",
      borderRadius: "50%",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      border: "8px solid rgba(255, 255, 255, 0.5)",
      backdropFilter: "blur(4px)",
    },
    heroSubtitle: {
      fontSize: "1.25rem",
      color: "rgb(107, 114, 128)",
      marginBottom: "3rem",
      maxWidth: "32rem",
      margin: "0 auto 3rem auto",
      lineHeight: "1.625",
    },
    // Why PetRecord Section
    whySection: {
      position: "relative",
      padding: "128px 0",
      backgroundColor: "#fff",
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: 32,
    },
    // How It Works Section
    howItWorksSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      textAlign: "center",
      padding: "1rem",
    },
    // Scroll Stack Section
    scrollStackSection: {
      position: "relative",
      background: "black",
    },
    // CTA Section
    ctaSection: {
      position: "relative",
      padding: "128px 0",
      background:
        "linear-gradient(to bottom right, rgb(239 246 255), rgb(253 242 248), rgb(254 252 232))",
    },
    ctaContentContainer: {
      maxWidth: 896,
      margin: "0 auto",
      paddingLeft: 16,
      paddingRight: 16,
      textAlign: "center",
    },
    ctaButton: {
      background:
        "linear-gradient(to right, rgb(96 165 250), rgb(244 114 182))",
      color: "white",
      padding: "28px 48px",
      borderRadius: 9999,
      boxShadow:
        "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
      fontSize: 16,
      cursor: "pointer",
      transition: "all 0.5s ease",
      position: "relative",
      overflow: "hidden",
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      border: "none",
    },
  };

  return (
    <div style={{ minHeight: "100vh", overflow: "hidden" }}>
      {/* Hero Section with Advanced Parallax */}
      <div style={styles.heroSection}>
        {/* Gradient Background */}
        <div style={styles.heroGradient} />

        {/* Animated Paw Prints with Mouse Tracking (Parallax Layer 1) */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            x: pawX,
            y: pawY,
          }}
        >
          {/* Paw Prints with Jiggle Animation */}
          <motion.div
            style={{ position: "absolute", top: 40, left: 40, fontSize: 36 }}
            animate={{ rotate: [0, 5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            🐾
          </motion.div>
          <motion.div
            style={{ position: "absolute", top: 160, right: 80, fontSize: 32 }}
            animate={{ rotate: [0, -5, 0], scale: [1, 1.15, 1] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            🐾
          </motion.div>
          <motion.div
            style={{
              position: "absolute",
              bottom: 80,
              left: "25%",
              fontSize: 42,
            }}
            animate={{ rotate: [0, 3, 0], y: [0, -10, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            🐾
          </motion.div>
        </motion.div>

        {/* Bone Icons (Parallax Layer 2) */}
        <motion.div
          style={{ position: "absolute", inset: 0, opacity: 0.05, y: y1 }}
        >
          <div
            style={{ position: "absolute", top: 80, right: 40, fontSize: 32 }}
          >
            🦴
          </div>
          <div
            style={{ position: "absolute", bottom: 160, left: 80, fontSize: 36 }}
          >
            🦴
          </div>
          <div
            style={{ position: "absolute", top: "50%", left: 40, fontSize: 24 }}
          >
            🦴
          </div>
        </motion.div>

        {/* Hero Content (Scroll Fade/Scale) */}
        <motion.div
          style={{
            ...styles.heroContentContainer,
            opacity,
            scale,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Dog Image with Bubble */}
            <motion.div
              style={{ marginBottom: 48, position: "relative" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={dogImg} alt="Pets" style={styles.dogImage} />
              <motion.div
                style={{
                  position: "absolute",
                  top: -16,
                  right: -16,
                  backgroundColor: "rgb(253 224 71)",
                  borderRadius: "50%",
                  padding: 12,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles
                  style={{ width: 24, height: 24, color: "rgb(120 53 15)" }}
                />
              </motion.div>
            </motion.div>

            {/* Title with TextType */}
            <div
              style={{
                fontSize: 32,
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <TextType
                text={[
                  "Track your pet's life",
                  "Track your pet's health",
                  "Track your pet's moments",
                ]}
                typingSpeed={100}
                deletingSpeed={60}
                pauseDuration={1500}
                loop
                style={{ display: "inline", color: "#000" }}
                textColors={["#000000ff"]}
              />
              <span style={{ margin: "0 4px" }}>&nbsp;</span>
              <span
                style={{
                  background: "linear-gradient(to right, #60a5fa, #f472b6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline",
                }}
              >
                beautifully
              </span>
            </div>

            {/* Subtitle */}
            <motion.p
              style={styles.heroSubtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Every wag, every purr, every moment — tracked with care
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Button
                size="lg"
                onClick={() => onNavigate("pets")}
                style={{
                  ...styles.ctaButton,
                  padding: "1.75rem 2.5rem",
                  fontSize: "1.125rem",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 25px 50px -12px rgba(0, 0, 0, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
                }}
              >
                <span
                  style={{
                    position: "relative",
                    zIndex: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  Start Now
                  <ArrowRight
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </span>
                {/* Hover overlay for color shift effect */}
                <motion.div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to right, #f472b6, #60a5fa)",
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
          }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div
            style={{
              width: 24,
              height: 40,
              border: "2px solid rgb(156 163 175)",
              borderRadius: 9999,
              display: "flex",
              justifyContent: "center",
              paddingTop: 8,
            }}
          >
            <motion.div
              style={{
                width: 6,
                height: 6,
                backgroundColor: "rgb(75 85 99)",
                borderRadius: 9999,
              }}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      {/* Why This App Section */}
      <motion.div style={{ ...styles.whySection, y: y2 }}>
        <div style={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: "center", marginBottom: 80 }}
          >
            <h2 style={styles.sectionTitle}>Why PetRecord?</h2>
            <p style={styles.sectionDescription}>
              Because every pet deserves thoughtful care and every moment
              deserves to be remembered
            </p>
          </motion.div>

          <div style={styles.featuresGrid}>
            {FEATURES.map((item, i) => (
              <FeatureCard key={i} {...item} i={i} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <div style={styles.howItWorksSection}>
        <ScrollVelocity
          texts={["⋆˚🐾˖°🦴𓃥𓃠", "DROCERTEP", "⋆˚🐾˖°🦴𓃥𓃠"]}
          velocity={30}
          scrollerStyle={{
            fontSize: 48,
            lineHeight: 1.2,
            justifyContent: "center",
          }}
        />
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <p style={styles.sectionDescription}>
          Four simple steps to better pet care
        </p>
      </div>

      {/* Scroll Stack Section (Simulated App Screens) */}
      <div style={styles.scrollStackSection}>
        <ScrollStack
          itemDistance={120}
          itemScale={0.04}
          itemStackDistance={40}
          stackPosition="25%"
          scaleEndPosition="15%"
          baseScale={0.8}
          rotationAmount={2}
          blurAmount={2}
          useWindowScroll={true}
        >
          {STACK_ITEMS.map((item) => (
            <ScrollStackItem key={item.title}>
              <div
                style={{
                  backgroundColor: item.color,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  fontSize: "1.5rem",
                  borderRadius: "20px",
                }}
              >
                {item.title}
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

      {/* Final CTA Section */}
      <motion.div
        style={styles.ctaSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div style={styles.ctaContentContainer}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={styles.sectionTitle}>
              Give your pet the care they deserve
            </h2>
            <p style={{ ...styles.sectionDescription, marginBottom: 48 }}>
              Join thousands of pet parents who trust PetRecord to keep their
              furry friends happy and healthy
            </p>
            <button
              onClick={() => onNavigate("pets")}
              style={styles.ctaButton}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.10)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <span
                style={{
                  position: "relative",
                  zIndex: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Sparkles style={{ width: 20, height: 20 }} />
                Start Your Journey
                <ArrowRight
                  style={{
                    width: 20,
                    height: 20,
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateX(8px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                />
              </span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}