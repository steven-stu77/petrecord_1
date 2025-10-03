import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dogImg from "../image/dog.png";
import TextType from "./TextType";
import { ScrollVelocity } from "./ScrollVelocity";
import ScrollStack, { ScrollStackItem } from './ScrollStack'   

// Simple Button component - Keeping Tailwind for complex styling (hover, size, responsive)
const Button = ({ children, onClick, className, size }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md font-medium transition-colors ${className}`}
  >
    {children}
  </button>
);

// Simple icon components
const ArrowRight = ({ className }) => <span className={className}>→</span>;
const Heart = ({ className }) => <span className={className}>❤️</span>;
const Activity = ({ className }) => <span className={className}>📊</span>;
const Sparkles = ({ className }) => <span className={className}>✨</span>;
const PawPrint = ({ className }) => <span className={className}>🐾</span>;
const BarChart = ({ className }) => <span className={className}>📈</span>;
const FileCheck = ({ className }) => <span className={className}>📋</span>;

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

  return (
    <div style={{ minHeight: "100vh", overflow: "hidden" }}>
      {/* Hero Section with Advanced Parallax */}
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Gradient Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom right, rgba(219, 234, 254, 0.5), rgba(253, 230, 246, 0.5), rgba(254, 252, 232, 0.5))",
          }}
        />
        {/* Animated Paw Prints with Mouse Tracking */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08, // from opacity-8
            x: pawX,
            y: pawY,
          }}
        >
          <motion.div
            style={{ position: "absolute", top: 40, left: 40, fontSize: 36 }} // text-6xl is roughly 36px in some configs
            animate={{ rotate: [0, 5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            🐾
          </motion.div>
          <motion.div
            style={{
              position: "absolute",
              top: 160,
              right: 80,
              fontSize: 32,
            }} // text-5xl is roughly 32px
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
            }} // text-7xl is roughly 42px
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
        <motion.div
          style={{ position: "absolute", inset: 0, opacity: 0.05, y: y1 }}
        >
          <div
            style={{ position: "absolute", top: 80, right: 40, fontSize: 32 }}
          >
            🦴
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 160,
              left: 80,
              fontSize: 36,
            }}
          >
            🦴
          </div>
          <div
            style={{ position: "absolute", top: "50%", left: 40, fontSize: 24 }}
          >
            🦴
          </div>
        </motion.div>
        <motion.div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: 1024,
            margin: "0 auto",
            paddingLeft: 16,
            paddingRight: 16,
            textAlign: "center",
            opacity,
            scale,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              style={{ marginBottom: 48, position: "relative" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={dogImg}
                alt="Pets"
                style={{
                  width: 320,
                  height: 320,
                  margin: "0 auto",
                  objectFit: "cover",
                  borderRadius: "50%",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", // shadow-2xl
                  border: "8px solid rgba(255, 255, 255, 0.5)", // border-8 border-white/50
                  backdropFilter: "blur(4px)", // backdrop-blur (simulated)
                }}
              />
              <motion.div
                style={{
                  position: "absolute",
                  top: -16,
                  right: -16,
                  backgroundColor: "rgb(253 224 71)", // bg-yellow-300
                  borderRadius: "50%",
                  padding: 12,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", // shadow-lg
                }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles
                  style={{ width: 24, height: 24, color: "rgb(120 53 15)" }}
                />{" "}
                {/* w-6 h-6 text-yellow-900 */}
              </motion.div>
            </motion.div>

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
                  background: "linear-gradient(to right, #60a5fa, #f472b6)", // from-blue-400 to-pink-400
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline",
                }}
              >
                beautifully
              </span>
            </div>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed" // Keeping complex classes
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Every wag, every purr, every moment — tracked with care
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Button
                size="lg"
                onClick={() => onNavigate("pets")}
                className="bg-gradient-to-r from-blue-400 to-pink-400 hover:shadow-2xl text-white px-10 py-7 rounded-full shadow-xl transition-all duration-500 hover:scale-105 relative overflow-hidden group" // Keeping complex classes
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
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to right, #f472b6, #60a5fa)", // from-pink-400 to-blue-400
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
          }} // absolute bottom-8 left-1/2 -translate-x-1/2
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div
            style={{
              width: 24,
              height: 40,
              border: "2px solid rgb(156 163 175)", // border-2 border-gray-400
              borderRadius: 9999, // rounded-full
              display: "flex",
              justifyContent: "center",
              paddingTop: 8,
            }}
          >
            <motion.div
              style={{
                width: 6,
                height: 6,
                backgroundColor: "rgb(75 85 99)", // bg-gray-600
                borderRadius: 9999, // rounded-full
              }}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      {/* Why This App Section */}
      <motion.div
        style={{
          position: "relative",
          padding: "128px 0",
          backgroundColor: "#fff",
          y: y2,
        }}
      >
        <div
          style={{
            maxWidth: 1152,
            margin: "0 auto",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: "center", marginBottom: 80 }}
          >
            <h2
              style={{
                fontSize: 48,
                marginBottom: 24,
                fontWeight: "bold",
                color: "rgb(17 24 39)",
              }}
            >
              Why PetRecord?
            </h2>
            <p
              style={{
                fontSize: 20,
                color: "rgb(75 85 99)",
                maxWidth: 800,
                margin: "0 auto",
              }}
            >
              Because every pet deserves thoughtful care and every moment
              deserves to be remembered
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 32,
            }}
          >
            {[
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
            ].map((item, i) => {
              const colors = getColorClasses(item.color);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  whileHover={{ y: -12, scale: 1.03 }}
                  className="group" // Keep group for hover effects
                  style={{
                    background:
                      "linear-gradient(to bottom right, #fff, rgb(249 250 251))", // from-white to-gray-50
                    padding: 40,
                    borderRadius: 24,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", // shadow-lg
                    border: "1px solid rgb(229 231 235)", // border border-gray-200
                    transition: "all 500ms ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div
                    style={{
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
                    }}
                  >
                    <item.icon
                      style={{ width: 40, height: 40, color: colors.text }}
                    />
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
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: "rgb(75 85 99)",
                      position: "relative",
                      zIndex: 10,
                    }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh", // full screen height
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <ScrollVelocity
          texts={["⋆˚🐾˖°🦴𓃥𓃠", "DROCERTEP", "⋆˚🐾˖°🦴𓃥𓃠"]}
          velocity={30}
          scrollerStyle={{
            fontSize: 48,
            lineHeight: 1.2,
            justifyContent: "center",
          }}
        />
        <h2
          style={{
            fontSize: 48,
            marginBottom: 24,
            fontWeight: "bold",
            color: "rgb(17 24 39)",
          }}
        >
          How It Works
        </h2>
        <p style={{ fontSize: 20, color: "rgb(75 85 99)" }}>
          Four simple steps to better pet care
        </p>
      </div>

      {/* How It Works Section */}
      <div
        style={{
          position: "relative",
          padding: "128px 0",
          background: "linear-gradient(to bottom, #fff, rgb(239 246 255))",
        }}
      >
        {/* <div
          style={{
            maxWidth: 1152,
            margin: "0 auto",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
            }}
          >
            {[
              {
                step: "01",
                icon: PawPrint,
                title: "Add Pet",
                desc: "Create a profile for your furry friend",
              },
              {
                step: "02",
                icon: Activity,
                title: "Record",
                desc: "Log daily activities and moments",
              },
              {
                step: "03",
                icon: BarChart,
                title: "Analyze",
                desc: "See patterns and insights emerge",
              },
              {
                step: "04",
                icon: FileCheck,
                title: "Report",
                desc: "Get AI-powered care recommendations",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ position: "relative" }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  style={{
                    backgroundColor: "#fff",
                    padding: 32,
                    borderRadius: 24,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", // shadow-lg
                    border: "1px solid rgb(243 244 246)", // Assuming 'border' is a light gray
                    transition: "all 300ms ease",
                  }}
                >
                  <div
                    style={{
                      fontSize: 48,
                      marginBottom: 16,
                      backgroundImage:
                        "linear-gradient(to right, #60a5fa, #f472b6)", // from-blue-400 to-pink-400
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      opacity: 0.2,
                    }}
                  >
                    {item.step}
                  </div>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      backgroundImage:
                        "linear-gradient(to bottom right, rgb(219 234 254), rgb(220 252 231))", // from-blue-100 to-green-100
                      borderRadius: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                    }}
                  >
                    <item.icon
                      style={{ width: 32, height: 32, color: "rgb(37 99 235)" }}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: 20,
                      fontWeight: "600",
                      marginBottom: 12,
                      color: "rgb(31 41 55)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "rgb(75 85 99)" }}>
                    {item.desc}
                  </p>
                </motion.div>
                {i < 3 && (
                  <div
                    style={{ display: "none" }}
                    className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-400 to-transparent"
                  />
                  // Note: The arrow is hidden on small screens and uses Tailwind for responsiveness (md:block)
                )}
              </motion.div>
            ))}
          </div>
        </div> */}

      </div>



      {/* Final CTA Section */}
      <motion.div
        style={{
          position: "relative",
          padding: "128px 0",
          background:
            "linear-gradient(to bottom right, rgb(239 246 255), rgb(253 242 248), rgb(254 252 232))", // from-blue-50 via-pink-50 to-yellow-50
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div
          style={{
            maxWidth: 896,
            margin: "0 auto",
            paddingLeft: 16,
            paddingRight: 16,
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              style={{
                fontSize: 48,
                marginBottom: 24,
                fontWeight: "bold",
                color: "rgb(17 24 39)",
              }}
            >
              Ready to get started?
            </h2>
            <p
              style={{
                fontSize: 20,
                color: "rgb(75 85 99)",
                marginBottom: 48,
                maxWidth: 800,
                margin: "0 auto",
              }}
            >
              Join thousands of pet parents who trust PetRecord to keep their
              furry friends happy and healthy
            </p>
            <Button
              size="lg"
              onClick={() => onNavigate("pets")}
              className="bg-gradient-to-r from-blue-400 to-pink-400 hover:shadow-2xl text-white px-12 py-7 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 relative overflow-hidden group" // Keeping complex classes
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
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
