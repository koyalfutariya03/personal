/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        // Quiz-specific animations
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "pulse-slow": "pulse 3s infinite",
        "bounce-subtle": "bounceSubtle 0.6s ease-in-out",
        "scale-in": "scaleIn 0.2s ease-out",
        confetti: "confetti 0.5s ease-out",
        "timer-warning": "timerWarning 1s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        // Quiz-specific keyframes
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        confetti: {
          "0%": { transform: "scale(0) rotate(0deg)" },
          "100%": { transform: "scale(1) rotate(360deg)" },
        },
        timerWarning: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        // Quiz-specific brand colors
        brand: {
          primary: "#1B4168",
          secondary: "#2FA9EC",
          accent: "#ffffff",
          dark: "#0F2A44",
          light: "#E6F4FF",
        },
        // Quiz state colors
        quiz: {
          correct: "#10B981",
          incorrect: "#EF4444",
          warning: "#F59E0B",
          info: "#3B82F6",
          neutral: "#6B7280",
          success: "#059669",
          danger: "#DC2626",
        },
        // Difficulty level colors
        difficulty: {
          beginner: "#10B981",
          intermediate: "#F59E0B",
          advanced: "#EF4444",
          expert: "#7C3AED",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // Quiz-specific radius
        quiz: "12px",
        "quiz-lg": "16px",
      },
      // Quiz-specific spacing
      spacing: {
        18: "4.5rem",
        88: "22rem",
        112: "28rem",
        128: "32rem",
      },
      // Quiz-specific shadows
      boxShadow: {
        quiz: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "quiz-lg":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "quiz-xl":
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "quiz-inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        brand: "0 4px 14px 0 rgba(27, 65, 104, 0.15)",
        "brand-lg": "0 8px 25px 0 rgba(27, 65, 104, 0.2)",
      },
      // Quiz-specific background images
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "quiz-pattern": "linear-gradient(135deg, #1B4168 0%, #2FA9EC 100%)",
        "quiz-subtle": "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)",
        "success-gradient": "linear-gradient(135deg, #10B981 0%, #059669 100%)",
        "warning-gradient": "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
        "danger-gradient": "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
      },
      // Quiz-specific font sizes
      fontSize: {
        "quiz-xs": ["0.75rem", { lineHeight: "1rem" }],
        "quiz-sm": ["0.875rem", { lineHeight: "1.25rem" }],
        "quiz-base": ["1rem", { lineHeight: "1.5rem" }],
        "quiz-lg": ["1.125rem", { lineHeight: "1.75rem" }],
        "quiz-xl": ["1.25rem", { lineHeight: "1.75rem" }],
        "quiz-2xl": ["1.5rem", { lineHeight: "2rem" }],
        "quiz-3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      // Quiz-specific transitions
      transitionProperty: {
        quiz: "all",
        "quiz-colors": "color, background-color, border-color",
        "quiz-transform": "transform, box-shadow",
      },
      transitionDuration: {
        250: "250ms",
        350: "350ms",
        400: "400ms",
      },
      transitionTimingFunction: {
        quiz: "cubic-bezier(0.4, 0, 0.2, 1)",
        "quiz-bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      // Quiz-specific z-index
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
      // Quiz-specific screens for responsive design
      screens: {
        xs: "475px",
        "quiz-sm": "640px",
        "quiz-md": "768px",
        "quiz-lg": "1024px",
        "quiz-xl": "1280px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),
    require("@tailwindcss/typography"),
  ],
};
