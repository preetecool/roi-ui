type SkeletonProps = {
  className?: string;
};

export function AiChatSkeleton({ className }: SkeletonProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 280 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aiChatGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-75-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-50-bg)" />
        </linearGradient>
      </defs>
      {/* Card background */}
      <rect fill="url(#aiChatGrad)" height="120" rx="12" width="280" />
      {/* Textarea area */}
      <rect fill="var(--mix-card-15-bg)" height="50" rx="8" width="256" x="12" y="12" />
      <rect fill="var(--muted-foreground)" height="8" opacity="0.25" rx="4" width="100" x="22" y="33" />
      {/* Footer */}
      {/* Attachment button */}
      <circle cx="28" cy="92" fill="var(--mix-card-15-bg)" r="14" />
      <rect fill="var(--muted-foreground)" height="10" opacity="0.3" rx="1" width="2" x="27" y="87" />
      <rect fill="var(--muted-foreground)" height="2" opacity="0.3" rx="1" width="10" x="23" y="91" />
      {/* Mode selector */}
      <rect fill="var(--mix-card-15-bg)" height="26" rx="8" width="70" x="50" y="79" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.25" rx="3" width="40" x="60" y="89" />
      {/* Submit button */}
      <circle cx="252" cy="92" fill="var(--muted-foreground)" opacity="0.2" r="16" />
      <path d="M248 96L252 88L256 96" fill="none" stroke="var(--muted-foreground)" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export function CardImageSkeleton({ className }: SkeletonProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="imageCardGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-75-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-50-bg)" />
        </linearGradient>
        <linearGradient id="imagePlaceholder" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-33-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-15-bg)" />
        </linearGradient>
      </defs>
      {/* Card background */}
      <rect fill="url(#imageCardGrad)" height="240" rx="16" width="200" />
      {/* Image placeholder */}
      <rect fill="url(#imagePlaceholder)" height="120" rx="10" width="176" x="12" y="12" />
      <circle cx="100" cy="72" fill="var(--muted-foreground)" opacity="0.15" r="20" />
      <path d="M92 76L100 64L108 76" fill="var(--muted-foreground)" opacity="0.25" stroke="none" />
      <path d="M95 80L100 72L105 80" fill="var(--muted-foreground)" opacity="0.2" stroke="none" />
      {/* Title */}
      <rect fill="var(--muted-foreground)" height="12" opacity="0.35" rx="4" width="100" x="12" y="148" />
      {/* Description lines */}
      <rect fill="var(--muted-foreground)" height="8" opacity="0.2" rx="4" width="160" x="12" y="172" />
      <rect fill="var(--muted-foreground)" height="8" opacity="0.15" rx="4" width="120" x="12" y="186" />
      {/* Button */}
      <rect fill="var(--muted-foreground)" height="28" opacity="0.15" rx="8" width="90" x="12" y="206" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.3" rx="3" width="50" x="32" y="217" />
    </svg>
  );
}

export function CardLoginSkeleton({ className }: SkeletonProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 220 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="loginCardGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-75-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-50-bg)" />
        </linearGradient>
      </defs>
      {/* Card background */}
      <rect fill="url(#loginCardGrad)" height="280" rx="14" width="220" />
      {/* Title */}
      <rect fill="var(--muted-foreground)" height="14" opacity="0.4" rx="4" width="70" x="16" y="20" />
      {/* Email field */}
      <rect fill="var(--muted-foreground)" height="8" opacity="0.25" rx="4" width="40" x="16" y="50" />
      <rect fill="var(--mix-card-15-bg)" height="36" rx="8" width="188" x="16" y="62" />
      {/* Password field */}
      <rect fill="var(--muted-foreground)" height="8" opacity="0.25" rx="4" width="55" x="16" y="112" />
      <rect fill="var(--mix-card-15-bg)" height="36" rx="8" width="188" x="16" y="124" />
      {/* Remember me */}
      <rect fill="var(--mix-card-15-bg)" height="16" rx="4" width="16" x="16" y="172" />
      <rect fill="var(--muted-foreground)" height="8" opacity="0.2" rx="4" width="70" x="40" y="176" />
      {/* Sign in button */}
      <rect fill="var(--muted-foreground)" height="36" opacity="0.2" rx="8" width="188" x="16" y="200" />
      <rect fill="var(--muted-foreground)" height="8" opacity="0.35" rx="4" width="50" x="85" y="214" />
      {/* Divider */}
      <line stroke="var(--muted-foreground)" strokeOpacity="0.15" x1="16" x2="88" y1="250" y2="250" />
      <rect fill="var(--muted-foreground)" height="8" opacity="0.2" rx="4" width="20" x="100" y="246" />
      <line stroke="var(--muted-foreground)" strokeOpacity="0.15" x1="132" x2="204" y1="250" y2="250" />
    </svg>
  );
}

export function CardTaskSkeleton({ className }: SkeletonProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="taskCardGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-75-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-50-bg)" />
        </linearGradient>
      </defs>
      {/* Card background */}
      <rect fill="url(#taskCardGrad)" height="180" rx="14" width="200" />
      {/* Title and menu */}
      <rect fill="var(--muted-foreground)" height="10" opacity="0.4" rx="4" width="100" x="16" y="16" />
      <circle cx="180" cy="21" fill="var(--muted-foreground)" opacity="0.15" r="8" />
      {/* Description */}
      <rect fill="var(--muted-foreground)" height="8" opacity="0.2" rx="4" width="160" x="16" y="38" />
      <rect fill="var(--muted-foreground)" height="8" opacity="0.15" rx="4" width="120" x="16" y="52" />
      {/* Tags row */}
      <rect fill="var(--muted-foreground)" height="20" opacity="0.12" rx="10" width="50" x="16" y="72" />
      <rect fill="var(--muted-foreground)" height="20" opacity="0.08" rx="10" width="40" x="72" y="72" />
      {/* Avatar group */}
      <circle cx="152" cy="82" fill="var(--mix-card-15-bg)" r="11" />
      <circle cx="170" cy="82" fill="var(--mix-card-33-bg)" r="11" />
      {/* Divider */}
      <line stroke="var(--muted-foreground)" strokeOpacity="0.1" x1="16" x2="184" y1="108" y2="108" />
      {/* Stats row */}
      <rect fill="var(--mix-card-15-bg)" height="24" rx="12" width="38" x="16" y="120" />
      <rect fill="var(--mix-card-15-bg)" height="24" rx="12" width="38" x="60" y="120" />
      <rect fill="var(--mix-card-15-bg)" height="24" rx="12" width="38" x="104" y="120" />
      <rect fill="var(--mix-card-15-bg)" height="24" rx="12" width="42" x="148" y="120" />
    </svg>
  );
}

export function CardTrafficSkeleton({ className }: SkeletonProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="trafficCardGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-75-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-50-bg)" />
        </linearGradient>
        <linearGradient id="chartLine1" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="var(--muted-foreground)" stopOpacity="0.1" />
          <stop offset="50%" stopColor="var(--muted-foreground)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--muted-foreground)" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="chartLine2" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="var(--muted-foreground)" stopOpacity="0.08" />
          <stop offset="50%" stopColor="var(--muted-foreground)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--muted-foreground)" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      {/* Card background */}
      <rect fill="url(#trafficCardGrad)" height="200" rx="14" width="280" />
      {/* Title */}
      <rect fill="var(--muted-foreground)" height="12" opacity="0.4" rx="4" width="100" x="16" y="16" />
      {/* Chart area */}
      <path d="M16 85 Q50 60 80 70 T140 50 T200 60 T264 45" fill="none" stroke="url(#chartLine1)" strokeLinecap="round" strokeWidth="2.5" />
      <path d="M16 95 Q50 85 80 78 T140 72 T200 82 T264 68" fill="none" stroke="url(#chartLine2)" strokeLinecap="round" strokeWidth="2.5" />
      {/* Stats grid */}
      <line stroke="var(--muted-foreground)" strokeOpacity="0.1" x1="0" x2="280" y1="110" y2="110" />
      <line stroke="var(--muted-foreground)" strokeOpacity="0.1" x1="140" x2="140" y1="110" y2="200" />
      <line stroke="var(--muted-foreground)" strokeOpacity="0.1" x1="0" x2="280" y1="155" y2="155" />
      {/* Stat 1 */}
      <rect fill="var(--muted-foreground)" height="8" opacity="0.2" rx="4" width="40" x="16" y="120" />
      <rect fill="var(--muted-foreground)" height="14" opacity="0.35" rx="4" width="60" x="16" y="134" />
      {/* Stat 2 */}
      <rect fill="var(--muted-foreground)" height="8" opacity="0.2" rx="4" width="50" x="156" y="120" />
      <rect fill="var(--muted-foreground)" height="14" opacity="0.35" rx="4" width="55" x="156" y="134" />
      {/* Stat 3 */}
      <rect fill="var(--muted-foreground)" height="8" opacity="0.2" rx="4" width="60" x="16" y="165" />
      <rect fill="var(--muted-foreground)" height="14" opacity="0.35" rx="4" width="45" x="16" y="179" />
      {/* Stat 4 */}
      <rect fill="var(--muted-foreground)" height="8" opacity="0.2" rx="4" width="55" x="156" y="165" />
      <rect fill="var(--muted-foreground)" height="14" opacity="0.35" rx="4" width="35" x="156" y="179" />
    </svg>
  );
}

export function ExpandableCardSkeleton({ className }: SkeletonProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 180 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="expandCardGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-75-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-50-bg)" />
        </linearGradient>
        <linearGradient id="expandImageGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-50-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-33-bg)" />
        </linearGradient>
      </defs>
      {/* Card background */}
      <rect fill="url(#expandCardGrad)" height="220" rx="16" width="180" />
      {/* Image placeholder */}
      <rect fill="url(#expandImageGrad)" height="160" rx="12" width="164" x="8" y="8" />
      <circle cx="90" cy="80" fill="var(--muted-foreground)" opacity="0.12" r="24" />
      <path d="M82 84L90 68L98 84" fill="var(--muted-foreground)" opacity="0.2" stroke="none" />
      <path d="M85 88L90 78L95 88" fill="var(--muted-foreground)" opacity="0.15" stroke="none" />
      {/* Title row */}
      <rect fill="var(--muted-foreground)" height="12" opacity="0.35" rx="4" width="100" x="16" y="180" />
      {/* Expand button */}
      <circle cx="152" cy="190" fill="var(--muted-foreground)" opacity="0.15" r="14" />
      <line stroke="var(--muted-foreground)" opacity="0.4" strokeLinecap="round" strokeWidth="2" x1="146" x2="158" y1="190" y2="190" />
      <line stroke="var(--muted-foreground)" opacity="0.4" strokeLinecap="round" strokeWidth="2" x1="152" x2="152" y1="184" y2="196" />
    </svg>
  );
}

export function ProfileMenuSkeleton({ className }: SkeletonProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="profileMenuGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-75-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-50-bg)" />
        </linearGradient>
      </defs>
      {/* Dropdown menu (above trigger) */}
      <rect fill="url(#profileMenuGrad)" height="124" rx="10" width="160" x="20" y="0" />
      {/* Profile section */}
      <circle cx="48" cy="26" fill="var(--muted-foreground)" opacity="0.15" r="14" />
      <rect fill="var(--muted-foreground)" height="8" opacity="0.35" rx="4" width="50" x="70" y="18" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.2" rx="3" width="70" x="70" y="32" />
      {/* Separator */}
      <line stroke="var(--muted-foreground)" strokeOpacity="0.1" x1="28" x2="172" y1="52" y2="52" />
      {/* Menu items */}
      <rect fill="var(--muted-foreground)" height="8" opacity="0.2" rx="4" width="80" x="36" y="66" />
      <rect fill="var(--muted-foreground)" height="8" opacity="0.2" rx="4" width="60" x="36" y="86" />
      <rect fill="var(--muted-foreground)" height="8" opacity="0.2" rx="4" width="70" x="36" y="106" />
      {/* Trigger button (below menu) */}
      <rect fill="var(--mix-card-33-bg)" height="44" rx="10" width="140" x="30" y="132" />
      <circle cx="54" cy="154" fill="var(--muted-foreground)" opacity="0.15" r="14" />
      <rect fill="var(--muted-foreground)" height="8" opacity="0.35" rx="4" width="60" x="76" y="144" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.2" rx="3" width="45" x="76" y="158" />
    </svg>
  );
}

export const blockSkeletons: Record<string, React.ComponentType<SkeletonProps>> = {
  "ai-chat": AiChatSkeleton,
  "card-image": CardImageSkeleton,
  "card-login": CardLoginSkeleton,
  "card-task": CardTaskSkeleton,
  "card-traffic": CardTrafficSkeleton,
  "expandable-card": ExpandableCardSkeleton,
  "profile-menu": ProfileMenuSkeleton,
};
