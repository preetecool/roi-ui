"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./like-button.module.css";

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

type Particle = {
  id: number;
  type: "star" | "circle";
  angle: number;
  distance: number;
  delay: number;
  rotation: number;
  size: number;
  scale: number;
};

/**
 * LikeButton component with animated thumbs-up and particle effects.
 * Features smooth animations and visual feedback when clicked.
 *
 * @param isPlaying - Auto-play the animation continuously (default: false)
 * @param onClick - Callback function when the button is clicked
 * @param className - Optional CSS class names
 *
 * @example
 * ```tsx
 * <LikeButton onClick={() => console.log('Liked!')} />
 *
 * // Auto-playing version
 * <LikeButton isPlaying={true} />
 * ```
 */
function LikeButton({
  isPlaying = false,
  onClick,
  className,
}: {
  isPlaying?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isThumbAnimating, setIsThumbAnimating] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isFilled, setIsFilled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const createParticle = useCallback(
    (angleOffset: number, type: "star" | "circle", size: number): Particle => {
      const baseAngle = -Math.PI / 2;
      const angle = baseAngle + (angleOffset * Math.PI) / DEGREES_TO_RADIANS;

      return {
        id: Date.now() + angleOffset + size,
        type,
        angle,
        distance: 40,
        delay: (angleOffset + ANGLE_OFFSET_BASE) / DELAY_DIVISOR,
        rotation: angleOffset * ROTATION_MULTIPLIER,
        size,
        scale: SCALE_BASE + size / SCALE_DIVISOR,
      };
    },
    []
  );

  const createParticleSet = useCallback(
    (): Particle[] => [
      createParticle(PARTICLE_ANGLE_LEFT, "star", PARTICLE_SIZE_STAR_LARGE),
      createParticle(PARTICLE_ANGLE_CENTER, "star", PARTICLE_SIZE_STAR_MEDIUM),
      createParticle(PARTICLE_ANGLE_RIGHT, "star", PARTICLE_SIZE_STAR_LARGE),
      createParticle(
        PARTICLE_ANGLE_LEFT_SMALL,
        "circle",
        PARTICLE_SIZE_CIRCLE_LARGE
      ),
      createParticle(
        PARTICLE_ANGLE_CENTER,
        "circle",
        PARTICLE_SIZE_CIRCLE_LARGE
      ),
      createParticle(
        PARTICLE_ANGLE_RIGHT_SMALL,
        "circle",
        PARTICLE_SIZE_CIRCLE_MEDIUM
      ),
    ],
    [createParticle]
  );

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
    <div className={`${styles.container} ${className || ""}`}>
      <div className={styles.animationWrapper}>
        <div className={styles.particlesContainer}>
          {particles.map((particle) => (
            <div
              className={styles.particle}
              key={particle.id}
              style={
                {
                  "--angle": `${particle.angle}rad`,
                  "--distance": `${particle.distance}px`,
                  "--delay": `${particle.delay}s`,
                  "--scale": particle.scale,
                } as React.CSSProperties
              }
            >
              <div
                className={
                  particle.type === "star"
                    ? styles.starShape
                    : styles.circleShape
                }
                style={
                  {
                    "--rotation": `${particle.rotation}deg`,
                    "--size": `${particle.size}px`,
                  } as React.CSSProperties
                }
              />
            </div>
          ))}
        </div>

        <button
          aria-label={isLiked ? "Unlike" : "Like"}
          className={`${styles.thumbButton} ${isThumbAnimating ? styles.animateThumbTilt : ""}`}
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
          }}
          type="button"
        >
          <svg
            aria-label="Like"
            className={`${styles.thumbIcon} ${isPlaying ? styles.scaledIcon : ""}`}
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
    </div>
  );
}

export { LikeButton };
