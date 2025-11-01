"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/tw-utils";

// Constants for animation calculations
const DEGREES_TO_RADIANS = 180;
const ANGLE_OFFSET_BASE = 90;
const DELAY_DIVISOR = 1000;
const ROTATION_MULTIPLIER = 6;
const SCALE_BASE = 0.8;
const SCALE_DIVISOR = 30;
const PARTICLE_SIZE_STAR_LARGE = 12;
const PARTICLE_SIZE_STAR_MEDIUM = 10;
const PARTICLE_SIZE_CIRCLE_LARGE = 6;
const PARTICLE_SIZE_CIRCLE_MEDIUM = 5;
const PARTICLE_ANGLE_LEFT = -60;
const PARTICLE_ANGLE_CENTER = 0;
const PARTICLE_ANGLE_RIGHT = 60;
const PARTICLE_ANGLE_LEFT_SMALL = -30;
const PARTICLE_ANGLE_RIGHT_SMALL = 30;
const THUMB_ANIMATION_DURATION = 1200;
const PARTICLE_ANIMATION_DURATION = 1000;
const LIKE_STATE_DELAY = 100;
const AUTO_PLAY_INTERVAL = 3000;
const PARTICLE_RETURN_DELAY_OUTER = 0;
const PARTICLE_RETURN_DELAY_INNER = 0.05;

type Particle = {
  id: number;
  type: "star" | "circle";
  angle: number;
  distance: number;
  delay: number;
  returnDelay: number;
  rotation: number;
  size: number;
  scale: number;
  color: string;
};

/**
 * LikeButton component with animated thumbs-up and particle effects.
 * Features smooth animations and visual feedback when clicked.
 *
 * @param isPlaying - Auto-play the animation continuously (default: false)
 * @param onClick - Callback function when the button is clicked
 * @param className - Optional CSS class names
 * @param particleCount - Number of particles to generate (default: 6)
 * @param colors - Array of colors for particles (default: ["var(--foreground)"])
 * @param colorMode - How to apply colors: "alternating" or "random" (default: "alternating")
 *
 * @example
 * ```tsx
 * <LikeButton onClick={() => console.log('Liked!')} />
 *
 * // Auto-playing version
 * <LikeButton isPlaying={true} />
 *
 * // Custom particles with colors
 * <LikeButton
 *   particleCount={10}
 *   colors={["#ff0000", "#00ff00", "#0000ff"]}
 *   colorMode="random"
 * />
 * ```
 */
function LikeButton({
  isPlaying = false,
  onClick,
  className,
  particleCount = 6,
  colors = ["var(--foreground)"],
  colorMode = "alternating",
}: {
  isPlaying?: boolean;
  onClick?: () => void;
  className?: string;
  particleCount?: number;
  colors?: string[];
  colorMode?: "alternating" | "random";
}) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isThumbAnimating, setIsThumbAnimating] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isFilled, setIsFilled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const createParticle = useCallback(
    (
      angleOffset: number,
      type: "star" | "circle",
      size: number,
      color: string
    ): Particle => {
      const baseAngle = -Math.PI / 2;
      const angle = baseAngle + (angleOffset * Math.PI) / DEGREES_TO_RADIANS;

      // Calculate return delay based on absolute angle (outside-in pattern)
      // ±60° (outermost) → delay 0 (return first)
      // ±30° (middle) → delay 0.05s (return second)
      // 0° (center) → delay 0.05s (return last)
      const absAngle = Math.abs(angleOffset);
      let returnDelay = PARTICLE_RETURN_DELAY_OUTER;
      if (absAngle === PARTICLE_ANGLE_CENTER) {
        returnDelay = PARTICLE_RETURN_DELAY_INNER; // Center particles return last
      } else if (absAngle === Math.abs(PARTICLE_ANGLE_LEFT_SMALL)) {
        returnDelay = PARTICLE_RETURN_DELAY_INNER; // Mid particles return second
      } else if (absAngle === Math.abs(PARTICLE_ANGLE_LEFT)) {
        returnDelay = PARTICLE_RETURN_DELAY_OUTER; // Outer particles return first
      }

      return {
        id: Date.now() + angleOffset + size + Math.random(),
        type,
        angle,
        distance: 40,
        delay: (angleOffset + ANGLE_OFFSET_BASE) / DELAY_DIVISOR,
        returnDelay,
        rotation: angleOffset * ROTATION_MULTIPLIER,
        size,
        scale: SCALE_BASE + size / SCALE_DIVISOR,
        color,
      };
    },
    []
  );

  const createParticleSet = useCallback((): Particle[] => {
    const particles: Particle[] = [];
    const angleSpread = 120; // Total spread in degrees (60 on each side)
    const angleStep = particleCount > 1 ? angleSpread / (particleCount - 1) : 0;
    const startAngle = -angleSpread / 2;

    for (let i = 0; i < particleCount; i++) {
      const angleOffset = startAngle + i * angleStep;
      const type: "star" | "circle" = i % 2 === 0 ? "star" : "circle";
      const size =
        type === "star"
          ? i % 3 === 0
            ? PARTICLE_SIZE_STAR_LARGE
            : PARTICLE_SIZE_STAR_MEDIUM
          : i % 3 === 0
            ? PARTICLE_SIZE_CIRCLE_LARGE
            : PARTICLE_SIZE_CIRCLE_MEDIUM;

      // Select color based on colorMode
      let color: string;
      if (colorMode === "random") {
        color = colors[Math.floor(Math.random() * colors.length)];
      } else {
        // alternating
        color = colors[i % colors.length];
      }

      particles.push(createParticle(angleOffset, type, size, color));
    }

    return particles;
  }, [particleCount, colors, colorMode, createParticle]);

  const startThumbAnimation = useCallback(() => {
    setIsThumbAnimating(true);
    setIsFilled(true);
    setIsAnimating(true);
    setTimeout(() => {
      setIsThumbAnimating(false);
      setIsFilled(false);
      setIsAnimating(false);
    }, THUMB_ANIMATION_DURATION);
  }, []);

  const startParticleAnimation = useCallback(() => {
    setParticles(createParticleSet());
    setTimeout(() => {
      setParticles([]);
    }, PARTICLE_ANIMATION_DURATION);
  }, [createParticleSet]);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAnimating || isPlaying) {
      return;
    }

    const newLikedState = !isLiked;

    if (newLikedState) {
      startThumbAnimation();
      startParticleAnimation();
      setTimeout(() => {
        setIsLiked(true);
      }, LIKE_STATE_DELAY);
    } else {
      setIsLiked(false);
      setIsFilled(false);
    }

    onClick?.();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startThumbAnimation();
      startParticleAnimation();

      intervalRef.current = setInterval(() => {
        startThumbAnimation();
        startParticleAnimation();
      }, AUTO_PLAY_INTERVAL);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, startThumbAnimation, startParticleAnimation]);

  return (
    <div
      className={cn(
        "box-border flex min-h-[200px] w-full flex-col items-center justify-center py-[30px]",
        "[-webkit-overflow-scrolling:touch]",
        className
      )}
    >
      <div className="relative flex w-full max-w-[240px] flex-col items-center justify-center overflow-visible px-5 py-5">
        <div className="pointer-events-none absolute inset-x-[-40px] inset-y-[-60px] z-[1] overflow-visible">
          {particles.map((particle) => (
            <div
              className={cn(
                "absolute top-1/2 left-1/2 will-change-[transform,opacity]"
              )}
              key={particle.id}
              style={
                {
                  "--angle": `${particle.angle}rad`,
                  "--distance": `${particle.distance}px`,
                  "--delay": `${particle.delay}s`,
                  "--return-delay": `${particle.returnDelay}s`,
                  "--scale": particle.scale,
                  opacity: 0,
                  transform: "translate(-50%, -50%) scale(0)",
                  animation: `like-button-particle-out 0.5s ease-out var(--delay) forwards, like-button-particle-return 0.5s ease-out calc(0.65s + var(--return-delay)) forwards`,
                } as React.CSSProperties
              }
            >
              <div
                className={cn(
                  particle.type === "star"
                    ? "relative block before:absolute before:top-0 before:left-0 before:h-full before:w-full before:content-[''] before:[clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)] before:[background:var(--particle-color,var(--foreground))]"
                    : "rounded-full"
                )}
                style={
                  {
                    "--rotation": `${particle.rotation}deg`,
                    "--size": `${particle.size}px`,
                    "--scale": particle.scale,
                    "--particle-color": particle.color,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    transform:
                      particle.type === "circle"
                        ? `scale(${particle.scale})`
                        : `rotate(${particle.rotation}deg)`,
                    backgroundColor: particle.type === "circle" ? particle.color : undefined,
                  } as React.CSSProperties
                }
              />
            </div>
          ))}
        </div>

        <button
          aria-label={isLiked ? "Unlike" : "Like"}
          className={cn(
            "rounded-full p-4 transition-transform duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
            "relative z-10 flex cursor-pointer items-center justify-center border-0 bg-transparent",
            "touch-[manipulation] select-none [-webkit-touch-callout:none] [-webkit-user-select:none]",
            "[-webkit-tap-highlight-color:transparent] [tap-highlight-color:transparent]",
            "transform-[translateZ(0)] [-webkit-transform:translateZ(0)]",
            "[-webkit-perspective:1000] [perspective:1000]",
            "[-webkit-backface-visibility:hidden] [backface-visibility:hidden]",
            "my-1 overflow-visible outline-none will-change-[transform,opacity]",
            "hover:scale-105",
            "focus:outline-none focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
            "max-md:transform-[translate3d(0,0,0)] max-md:min-h-12 max-md:min-w-12 max-md:p-4 max-md:[-webkit-transform:translate3d(0,0,0)]",
            "max-md:[-webkit-backface-visibility:hidden] max-md:[backface-visibility:hidden] max-md:[transform-origin:center]",
            "max-md:[-webkit-transform-style:preserve-3d] max-md:[transform-style:preserve-3d]"
          )}
          data-slot="like-button"
          disabled={isAnimating}
          onClick={handleClick}
          onTouchEnd={handleClick}
          onTouchStart={handleTouchStart}
          style={{
            pointerEvents: isAnimating ? "none" : "auto",
            visibility: "visible",
            opacity: 1,
            transform: "translateZ(0)",
            WebkitTransform: "translateZ(0)",
            animation: isThumbAnimating
              ? "like-button-thumb-tilt 1.15s cubic-bezier(0.455, 0.03, 0.515, 0.955)"
              : undefined,
          }}
          type="button"
        >
          <svg
            aria-label="Like"
            className={cn(
              "h-6 w-6 transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
              "transform-[translateZ(0)] will-change-[transform,opacity] [-webkit-transform:translateZ(0)]",
              isPlaying && "scale-110",
              "max-md:[-webkit-backface-visibility:hidden] max-md:[backface-visibility:hidden] max-md:[transform-origin:center]",
              "max-md:[-webkit-transform-style:preserve-3d] max-md:[transform-style:preserve-3d]"
            )}
            height="24"
            role="img"
            style={{
              visibility: "visible",
              opacity: 1,
            }}
            viewBox="-1 -1 18 18"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111z"
              style={{
                fill: isFilled || isLiked ? "var(--primary)" : "none",
                stroke: isFilled || isLiked ? "none" : "var(--foreground)",
                strokeWidth: 1,
                transition: "fill 0.2s ease-out, stroke 0.2s ease-out",
              }}
            />
          </svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes like-button-particle-out {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
          }
          100% {
            transform: translate(
                calc(-50% + (cos(var(--angle)) * var(--distance))),
                calc(-50% + (sin(var(--angle)) * var(--distance)))
              )
              scale(1);
            opacity: 0.9;
          }
        }

        @keyframes like-button-particle-return {
          0% {
            transform: translate(
                calc(-50% + (cos(var(--angle)) * var(--distance))),
                calc(-50% + (sin(var(--angle)) * var(--distance)))
              )
              scale(1);
            opacity: 0.9;
          }
          50% {
            transform: translate(
                calc(-50% + (cos(var(--angle)) * var(--distance) * 0.1)),
                calc(-50% + (sin(var(--angle)) * var(--distance) * 0.1))
              )
              scale(0.3);
            opacity: 0.25;
          }
          100% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
        }

        @keyframes like-button-thumb-tilt {
          0% {
            transform: rotate(0deg) scale(1) translateZ(0);
          }
          50% {
            transform: rotate(-30deg) scale(1.2) translateZ(0);
          }
          100% {
            transform: rotate(0deg) scale(1) translateZ(0);
          }
        }

        @-webkit-keyframes like-button-thumb-tilt {
          0% {
            -webkit-transform: rotate(0deg) scale(1) translateZ(0);
          }
          50% {
            -webkit-transform: rotate(-30deg) scale(1.2) translateZ(0);
          }
          100% {
            -webkit-transform: rotate(0deg) scale(1) translateZ(0);
          }
        }
      `}</style>
    </div>
  );
}

export { LikeButton };
