import { useEffect, useState, useCallback, useRef } from "react";
import {
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    image:
      "https://images.unsplash.com/3/www.madebyvadim.com.jpg?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Latest Technology",
    title: "Upgrade Your",
    highlight: "Digital Lifestyle",
    description:
      "Discover the latest smartphones, gadgets, and accessories designed for your everyday life.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1600",
    tag: "Power Meets Performance",
    title: "Power Up Your",
    highlight: "Productivity",
    description:
      "Explore powerful laptops built for work, creativity, gaming, and everything in between.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600",
    tag: "Immersive Audio",
    title: "Experience Sound",
    highlight: "Like Never Before",
    description:
      "Discover premium headphones and audio accessories for an immersive listening experience.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600",
    tag: "Smart Technology",
    title: "Technology On",
    highlight: "Your Wrist",
    description:
      "Stay connected, track your goals, and manage your day with the latest smart watches.",
  },
];

const AUTOPLAY_MS = 5000;

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);
  const goTo = useCallback((index) => {
    setCurrentIndex(((index % slides.length) + slides.length) % slides.length);
  }, []);
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  //  AUTOPLAY
  useEffect(() => {
    if (isPaused) return;

    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, AUTOPLAY_MS);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, isPaused, nextSlide]);

  //  PRELOAD IMAGES
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        px-3
        pt-3
        sm:px-5
        sm:pt-5
      "
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =========================================
          HERO CONTAINER
      ========================================= */}

      <div className="relative mx-auto max-w-360 overflow-hidden rounded-3xl">
        {/* =========================================
            SLIDES
        ========================================= */}

        <div className="relative h-130 sm:h-145 lg:h-162.5">
          {slides.map((slide, index) => (
            <div
              key={slide.image}
              className={`
                absolute
                inset-0
                transition-all
                duration-1000
                ease-out

                ${
                  index === currentIndex
                    ? "z-10 scale-100 opacity-100"
                    : "z-0 scale-[1.04] opacity-0"
                }
              `}
            >
              {/* IMAGE */}

              <img
                src={slide.image}
                alt={slide.title}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                "
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* =================================
                  IMAGE OVERLAY
              ================================= */}

              <div
                className="
                  absolute
                  inset-0
                  bg-linear-to
                  from-black/65
                  via-black/35
                  to-black/5
                "
              />

              {/* Subtle bottom gradient */}

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-40
                  bg-linear-to
                  from-black/30
                  to-transparent
                "
              />

              {/* =================================
                  CONTENT
              ================================= */}

              <div className="relative z-10 flex h-full items-center">
                <div
                  className={`
                    mx-auto
                    w-full
                    max-w-7xl
                    px-6
                    sm:px-10
                    lg:px-14

                    transition-all
                    duration-700
                    delay-200

                    ${
                      index === currentIndex
                        ? "translate-y-0 opacity-100"
                        : "translate-y-5 opacity-0"
                    }
                  `}
                >
                  <div className="max-w-2xl text-white">
                    {/* TAG */}

                    <div
                      className="
                        mb-5
                        inline-flex
                        items-center
                        rounded-full
                        border
                        border-white/20
                        bg-white/10
                        px-4
                        py-2
                        backdrop-blur-md
                      "
                    >
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-400" />

                      <span
                        className="
                          text-xs
                          font-medium
                          tracking-wide
                          text-white/90
                          sm:text-sm
                        "
                      >
                        {slide.tag}
                      </span>
                    </div>

                    {/* HEADING */}

                    <h1
                      className="
                        text-4xl
                        font-semibold
                        leading-[1.05]
                        tracking-[-0.03em]

                        sm:text-5xl
                        md:text-6xl
                        lg:text-7xl
                      "
                    >
                      {slide.title}

                      <span
                        className="
                          block
                          text-blue-300
                        "
                      >
                        {slide.highlight}
                      </span>
                    </h1>

                    {/* DESCRIPTION */}

                    <p
                      className="
                        mt-5
                        max-w-xl
                        text-sm
                        leading-6
                        text-white/75

                        sm:mt-6
                        sm:text-base
                        sm:leading-7

                        lg:text-lg
                      "
                    >
                      {slide.description}
                    </p>

                    {/* =================================
                        BUTTONS
                    ================================= */}

                    <div
                      className="
                        mt-7
                        flex
                        flex-wrap
                        items-center
                        gap-3
                        sm:mt-8
                      "
                    >
                      {/* PRIMARY */}

                      <Link
                        to="/products"
                        className="
                          group
                          inline-flex
                          items-center
                          gap-2
                          rounded-full
                          bg-white
                          px-5
                          py-3
                          text-sm
                          font-medium
                          text-gray-900

                          shadow-lg
                          shadow-black/10

                          transition-all
                          duration-200

                          hover:-translate-y-0.5
                          hover:bg-gray-100

                          sm:px-6
                        "
                      >
                        <ShoppingBag size={17} />
                        Shop Now
                        <ArrowRight
                          size={15}
                          className="
                            transition-transform
                            duration-200
                            group-hover:translate-x-0.5
                          "
                        />
                      </Link>

                      {/* SECONDARY */}

                      <Link
                        to="/products"
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-full
                          border
                          border-white/25
                          bg-white/10
                          px-5
                          py-3
                          text-sm
                          font-medium
                          text-white

                          backdrop-blur-md

                          transition-all
                          duration-200

                          hover:bg-white/20

                          sm:px-6
                        "
                      >
                        Explore Products
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* =========================================
              PREVIOUS BUTTON
          ========================================= */}

          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="
              absolute
              left-4
              top-1/2
              z-30
              hidden
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              rounded-full

              border
              border-white/20

              bg-white/10
              text-white

              backdrop-blur-md

              transition-all
              duration-200

              hover:bg-white/20

              sm:flex
              lg:left-6
            "
          >
            <ChevronLeft size={20} strokeWidth={1.7} />
          </button>

          {/* =========================================
              NEXT BUTTON
          ========================================= */}

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="
              absolute
              right-4
              top-1/2
              z-30
              hidden
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              rounded-full

              border
              border-white/20

              bg-white/10
              text-white

              backdrop-blur-md

              transition-all
              duration-200

              hover:bg-white/20

              sm:flex
              lg:right-6
            "
          >
            <ChevronRight size={20} strokeWidth={1.7} />
          </button>

          {/* =========================================
              SLIDE INDICATORS
          ========================================= */}

          <div
            className="
              absolute
              bottom-6
              left-1/2
              z-30
              flex
              -translate-x-1/2
              items-center
              gap-2
            "
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`
                  relative
                  h-1.5
                  overflow-hidden
                  rounded-full
                  transition-all
                  duration-300

                  ${
                    index === currentIndex
                      ? "w-10 bg-white/30"
                      : "w-1.5 bg-white/50 hover:bg-white/80"
                  }
                `}
              >
                {index === currentIndex && !isPaused && (
                  <span
                    key={currentIndex}
                    className="
                      absolute
                      inset-y-0
                      left-0
                      rounded-full
                      bg-white
                      animate-[progress_5s_linear_forwards]
                    "
                  />
                )}

                {index === currentIndex && isPaused && (
                  <span
                    className="
                      absolute
                      inset-0
                      rounded-full
                      bg-white
                    "
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================
          PROGRESS ANIMATION
      ========================================= */}

      <style>{`
        @keyframes progress {
          from {
            width: 0%;
          }

          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
