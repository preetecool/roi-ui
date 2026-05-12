type SkeletonProps = {
  className?: string;
};

function CardEffects({ prefix }: { prefix: string }) {
  return (
    <>
      <linearGradient id={`${prefix}-border`} x1="0%" x2="0%" y1="0%" y2="100%">
        <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.1" />
        <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0.02" />
      </linearGradient>
      <filter
        id={`${prefix}-shadow`}
        x="-15%"
        y="-15%"
        width="130%"
        height="130%"
        colorInterpolationFilters="sRGB"
      >
        <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="black" floodOpacity="0.06" />
      </filter>
    </>
  );
}

export function AiChatSkeleton({ className }: SkeletonProps) {
  return (
    <svg className={className} fill="none" overflow="visible" viewBox="0 0 280 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aiChatGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-75-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-50-bg)" />
        </linearGradient>
        <CardEffects prefix="aiChat" />
      </defs>
      {/* Card background */}
      <rect
        fill="url(#aiChatGrad)"
        height="120"
        rx="12"
        width="280"
        stroke="url(#aiChat-border)"
        strokeWidth="1"
        filter="url(#aiChat-shadow)"
      />
      {/* Textarea area */}
      <rect fill="var(--mix-card-15-bg)" height="50" rx="8" width="256" x="12" y="12" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.3" rx="3" width="110" x="22" y="22" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.18" rx="3" width="80" x="22" y="34" />
      {/* Attachment button */}
      <circle cx="28" cy="92" fill="var(--mix-card-15-bg)" r="14" />
      <rect fill="var(--muted-foreground)" height="10" opacity="0.3" rx="1" width="2" x="27" y="87" />
      <rect fill="var(--muted-foreground)" height="2" opacity="0.3" rx="1" width="10" x="23" y="91" />
      {/* Mode selector */}
      <rect fill="var(--mix-card-15-bg)" height="26" rx="8" width="70" x="50" y="79" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.3" rx="3" width="40" x="60" y="89" />
      {/* Submit button */}
      <circle cx="252" cy="92" fill="var(--muted-foreground)" opacity="0.25" r="16" />
      <path
        d="M248 96L252 88L256 96"
        fill="none"
        opacity="0.5"
        stroke="var(--muted-foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function CardImageSectionSkeleton({ className }: SkeletonProps) {
  return (
    <svg className={className} fill="none" overflow="visible" viewBox="0 0 280 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="imageFeatureCardGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-75-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-50-bg)" />
        </linearGradient>
        <linearGradient id="imageFeaturePlaceholder" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-33-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-15-bg)" />
        </linearGradient>
        <CardEffects prefix="imgSection" />
      </defs>
      {/* Header section — left aligned to match the real component */}
      <rect fill="var(--muted-foreground)" height="5" opacity="0.3" rx="2" width="46" x="16" y="6" />
      <rect fill="var(--muted-foreground)" height="10" opacity="0.4" rx="3" width="140" x="16" y="18" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.18" rx="2" width="180" x="16" y="34" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.18" rx="2" width="120" x="16" y="44" />
      {/* Card 1 - left column, tall */}
      <rect
        fill="url(#imageFeatureCardGrad)"
        height="100"
        rx="8"
        width="120"
        x="16"
        y="60"
        stroke="url(#imgSection-border)"
        strokeWidth="1"
        filter="url(#imgSection-shadow)"
      />
      <rect fill="url(#imageFeaturePlaceholder)" height="50" rx="5" width="104" x="24" y="68" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.3" rx="3" width="60" x="24" y="126" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.15" rx="2" width="90" x="24" y="138" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.15" rx="2" width="70" x="24" y="148" />
      {/* Card 2 - right column, short */}
      <rect
        fill="url(#imageFeatureCardGrad)"
        height="70"
        rx="8"
        width="120"
        x="144"
        y="60"
        stroke="url(#imgSection-border)"
        strokeWidth="1"
        filter="url(#imgSection-shadow)"
      />
      <rect fill="url(#imageFeaturePlaceholder)" height="30" rx="5" width="104" x="152" y="68" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.3" rx="3" width="55" x="152" y="106" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.15" rx="2" width="85" x="152" y="118" />
      {/* Card 3 - left column, short */}
      <rect
        fill="url(#imageFeatureCardGrad)"
        height="60"
        rx="8"
        width="120"
        x="16"
        y="168"
        stroke="url(#imgSection-border)"
        strokeWidth="1"
        filter="url(#imgSection-shadow)"
      />
      <rect fill="url(#imageFeaturePlaceholder)" height="25" rx="5" width="104" x="24" y="176" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.3" rx="3" width="50" x="24" y="208" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.15" rx="2" width="80" x="24" y="220" />
      {/* Card 4 - right column, tall */}
      <rect
        fill="url(#imageFeatureCardGrad)"
        height="90"
        rx="8"
        width="120"
        x="144"
        y="138"
        stroke="url(#imgSection-border)"
        strokeWidth="1"
        filter="url(#imgSection-shadow)"
      />
      <rect fill="url(#imageFeaturePlaceholder)" height="45" rx="5" width="104" x="152" y="146" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.3" rx="3" width="58" x="152" y="198" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.15" rx="2" width="88" x="152" y="210" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.15" rx="2" width="68" x="152" y="220" />
    </svg>
  );
}

export function CardLoginSkeleton({ className }: SkeletonProps) {
  return (
    <svg className={className} fill="none" overflow="visible" viewBox="0 0 220 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="loginCardGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-75-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-50-bg)" />
        </linearGradient>
        <CardEffects prefix="login" />
      </defs>
      {/* Card background */}
      <rect
        fill="url(#loginCardGrad)"
        height="280"
        rx="14"
        width="220"
        stroke="url(#login-border)"
        strokeWidth="1"
        filter="url(#login-shadow)"
      />
      {/* Title */}
      <rect fill="var(--muted-foreground)" height="12" opacity="0.42" rx="3" width="64" x="16" y="20" />
      {/* Email field */}
      <rect fill="var(--muted-foreground)" height="6" opacity="0.28" rx="3" width="36" x="16" y="52" />
      <rect fill="var(--mix-card-15-bg)" height="34" rx="8" width="188" x="16" y="64" />
      {/* Password field */}
      <rect fill="var(--muted-foreground)" height="6" opacity="0.28" rx="3" width="50" x="16" y="112" />
      <rect fill="var(--mix-card-15-bg)" height="34" rx="8" width="188" x="16" y="124" />
      {/* Remember me */}
      <rect fill="var(--mix-card-15-bg)" height="14" rx="3" width="14" x="16" y="172" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.22" rx="3" width="68" x="36" y="176" />
      {/* Sign in button */}
      <rect fill="var(--muted-foreground)" height="34" opacity="0.22" rx="8" width="188" x="16" y="200" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.4" rx="3" width="44" x="88" y="214" />
      {/* Divider */}
      <line stroke="var(--muted-foreground)" strokeOpacity="0.15" x1="16" x2="92" y1="252" y2="252" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.25" rx="3" width="20" x="100" y="249" />
      <line stroke="var(--muted-foreground)" strokeOpacity="0.15" x1="128" x2="204" y1="252" y2="252" />
    </svg>
  );
}

export function CardTaskSkeleton({ className }: SkeletonProps) {
  return (
    <svg className={className} fill="none" overflow="visible" viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="taskCardGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-75-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-50-bg)" />
        </linearGradient>
        <CardEffects prefix="task" />
      </defs>
      {/* Card background */}
      <rect
        fill="url(#taskCardGrad)"
        height="180"
        rx="14"
        width="200"
        stroke="url(#task-border)"
        strokeWidth="1"
        filter="url(#task-shadow)"
      />
      {/* Title and menu */}
      <rect fill="var(--muted-foreground)" height="9" opacity="0.42" rx="3" width="100" x="16" y="16" />
      <circle cx="180" cy="20" fill="var(--muted-foreground)" opacity="0.18" r="7" />
      {/* Description */}
      <rect fill="var(--muted-foreground)" height="6" opacity="0.22" rx="3" width="160" x="16" y="36" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.16" rx="3" width="120" x="16" y="48" />
      {/* Tags row */}
      <rect fill="var(--muted-foreground)" height="18" opacity="0.13" rx="9" width="46" x="16" y="68" />
      <rect fill="var(--muted-foreground)" height="18" opacity="0.09" rx="9" width="38" x="68" y="68" />
      {/* Avatar group */}
      <circle cx="152" cy="77" fill="var(--mix-card-15-bg)" r="10" />
      <circle cx="170" cy="77" fill="var(--mix-card-33-bg)" r="10" />
      {/* Divider */}
      <line stroke="var(--muted-foreground)" strokeOpacity="0.1" x1="16" x2="184" y1="106" y2="106" />
      {/* Stats row */}
      <rect fill="var(--mix-card-15-bg)" height="22" rx="11" width="36" x="16" y="120" />
      <rect fill="var(--mix-card-15-bg)" height="22" rx="11" width="36" x="58" y="120" />
      <rect fill="var(--mix-card-15-bg)" height="22" rx="11" width="36" x="100" y="120" />
      <rect fill="var(--mix-card-15-bg)" height="22" rx="11" width="42" x="142" y="120" />
    </svg>
  );
}

export function CardTrafficSkeleton({ className }: SkeletonProps) {
  return (
    <svg className={className} fill="none" overflow="visible" viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="trafficCardGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-75-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-50-bg)" />
        </linearGradient>
        <linearGradient id="chartLine1" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="var(--muted-foreground)" stopOpacity="0.1" />
          <stop offset="50%" stopColor="var(--muted-foreground)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--muted-foreground)" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="chartLine2" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="var(--muted-foreground)" stopOpacity="0.08" />
          <stop offset="50%" stopColor="var(--muted-foreground)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--muted-foreground)" stopOpacity="0.14" />
        </linearGradient>
        <CardEffects prefix="traffic" />
      </defs>
      {/* Card background */}
      <rect
        fill="url(#trafficCardGrad)"
        height="200"
        rx="14"
        width="280"
        stroke="url(#traffic-border)"
        strokeWidth="1"
        filter="url(#traffic-shadow)"
      />
      {/* Title */}
      <rect fill="var(--muted-foreground)" height="10" opacity="0.42" rx="3" width="100" x="16" y="16" />
      {/* Chart area */}
      <path
        d="M16 85 Q50 60 80 70 T140 50 T200 60 T264 45"
        fill="none"
        stroke="url(#chartLine1)"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <path
        d="M16 95 Q50 85 80 78 T140 72 T200 82 T264 68"
        fill="none"
        stroke="url(#chartLine2)"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      {/* Stats grid */}
      <line stroke="var(--muted-foreground)" strokeOpacity="0.1" x1="16" x2="264" y1="112" y2="112" />
      <line stroke="var(--muted-foreground)" strokeOpacity="0.1" x1="140" x2="140" y1="112" y2="188" />
      <line stroke="var(--muted-foreground)" strokeOpacity="0.1" x1="16" x2="264" y1="152" y2="152" />
      {/* Stat 1 */}
      <rect fill="var(--muted-foreground)" height="6" opacity="0.22" rx="3" width="40" x="16" y="122" />
      <rect fill="var(--muted-foreground)" height="12" opacity="0.38" rx="3" width="58" x="16" y="134" />
      {/* Stat 2 */}
      <rect fill="var(--muted-foreground)" height="6" opacity="0.22" rx="3" width="50" x="156" y="122" />
      <rect fill="var(--muted-foreground)" height="12" opacity="0.38" rx="3" width="52" x="156" y="134" />
      {/* Stat 3 */}
      <rect fill="var(--muted-foreground)" height="6" opacity="0.22" rx="3" width="58" x="16" y="162" />
      <rect fill="var(--muted-foreground)" height="12" opacity="0.38" rx="3" width="44" x="16" y="174" />
      {/* Stat 4 */}
      <rect fill="var(--muted-foreground)" height="6" opacity="0.22" rx="3" width="54" x="156" y="162" />
      <rect fill="var(--muted-foreground)" height="12" opacity="0.38" rx="3" width="36" x="156" y="174" />
    </svg>
  );
}

export function ExpandableCardSkeleton({ className }: SkeletonProps) {
  return (
    <svg className={className} fill="none" overflow="visible" viewBox="0 0 180 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="expandCardGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-75-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-50-bg)" />
        </linearGradient>
        <linearGradient id="expandImageGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-50-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-33-bg)" />
        </linearGradient>
        <CardEffects prefix="expand" />
      </defs>
      {/* Card background */}
      <rect
        fill="url(#expandCardGrad)"
        height="220"
        rx="16"
        width="180"
        stroke="url(#expand-border)"
        strokeWidth="1"
        filter="url(#expand-shadow)"
      />
      {/* Image placeholder */}
      <rect fill="url(#expandImageGrad)" height="160" rx="12" width="164" x="8" y="8" />
      <circle cx="90" cy="80" fill="var(--muted-foreground)" opacity="0.12" r="24" />
      <path d="M82 84L90 68L98 84" fill="var(--muted-foreground)" opacity="0.2" stroke="none" />
      <path d="M85 88L90 78L95 88" fill="var(--muted-foreground)" opacity="0.15" stroke="none" />
      {/* Title row */}
      <rect fill="var(--muted-foreground)" height="10" opacity="0.38" rx="3" width="92" x="16" y="184" />
      {/* Expand button */}
      <circle cx="152" cy="190" fill="var(--muted-foreground)" opacity="0.18" r="13" />
      <line
        opacity="0.45"
        stroke="var(--muted-foreground)"
        strokeLinecap="round"
        strokeWidth="2"
        x1="146"
        x2="158"
        y1="190"
        y2="190"
      />
      <line
        opacity="0.45"
        stroke="var(--muted-foreground)"
        strokeLinecap="round"
        strokeWidth="2"
        x1="152"
        x2="152"
        y1="184"
        y2="196"
      />
    </svg>
  );
}

export function KanbanBoardSkeleton({ className }: SkeletonProps) {
  return (
    <svg className={className} fill="none" overflow="visible" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kanbanBg" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-75-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-50-bg)" />
        </linearGradient>
        <linearGradient id="kanbanColumn" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-33-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-15-bg)" />
        </linearGradient>
        <CardEffects prefix="kanban" />
      </defs>
      {/* Background */}
      <rect
        fill="url(#kanbanBg)"
        height="200"
        rx="12"
        width="320"
        stroke="url(#kanban-border)"
        strokeWidth="1"
        filter="url(#kanban-shadow)"
      />

      {/* Column 1 - To Do */}
      <rect fill="url(#kanbanColumn)" height="176" rx="8" width="92" x="12" y="12" />
      <rect fill="var(--muted-foreground)" height="8" opacity="0.35" rx="4" width="40" x="20" y="22" />
      <circle cx="80" cy="26" fill="var(--muted-foreground)" opacity="0.2" r="8" />
      {/* Cards in column 1 */}
      <rect fill="var(--mix-card-50-bg)" height="36" rx="6" width="76" x="20" y="42" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.25" rx="3" width="50" x="28" y="52" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.15" rx="2" width="35" x="28" y="64" />
      <rect fill="var(--mix-card-50-bg)" height="36" rx="6" width="76" x="20" y="86" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.25" rx="3" width="45" x="28" y="96" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.15" rx="2" width="55" x="28" y="108" />
      <rect fill="var(--mix-card-50-bg)" height="36" rx="6" width="76" x="20" y="130" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.25" rx="3" width="55" x="28" y="140" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.15" rx="2" width="40" x="28" y="152" />

      {/* Column 2 - In Progress */}
      <rect fill="url(#kanbanColumn)" height="176" rx="8" width="92" x="114" y="12" />
      <rect fill="var(--muted-foreground)" height="8" opacity="0.35" rx="4" width="45" x="122" y="22" />
      <circle cx="182" cy="26" fill="var(--muted-foreground)" opacity="0.2" r="8" />
      {/* Cards in column 2 */}
      <rect fill="var(--mix-card-50-bg)" height="44" rx="6" width="76" x="122" y="42" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.25" rx="3" width="55" x="130" y="52" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.15" rx="2" width="40" x="130" y="64" />
      <circle cx="140" cy="78" fill="var(--muted-foreground)" opacity="0.15" r="5" />
      <rect fill="var(--mix-card-50-bg)" height="36" rx="6" width="76" x="122" y="94" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.25" rx="3" width="48" x="130" y="104" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.15" rx="2" width="58" x="130" y="116" />

      {/* Column 3 - Done */}
      <rect fill="url(#kanbanColumn)" height="176" rx="8" width="92" x="216" y="12" />
      <rect fill="var(--muted-foreground)" height="8" opacity="0.35" rx="4" width="35" x="224" y="22" />
      <circle cx="284" cy="26" fill="var(--muted-foreground)" opacity="0.2" r="8" />
      {/* Cards in column 3 */}
      <rect fill="var(--mix-card-50-bg)" height="36" rx="6" width="76" x="224" y="42" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.25" rx="3" width="52" x="232" y="52" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.15" rx="2" width="38" x="232" y="64" />
      <rect fill="var(--mix-card-50-bg)" height="36" rx="6" width="76" x="224" y="86" />
      <rect fill="var(--muted-foreground)" height="6" opacity="0.25" rx="3" width="42" x="232" y="96" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.15" rx="2" width="50" x="232" y="108" />
    </svg>
  );
}

export function PricingSectionSkeleton({ className }: SkeletonProps) {
  return (
    <svg className={className} fill="none" overflow="visible" viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pricingCardGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-75-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-50-bg)" />
        </linearGradient>
        <CardEffects prefix="pricing" />
      </defs>

      {/* Card 1 - Starter (right corners unrounded) */}
      <path
        d="M12 38 Q12 28 22 28 L107 28 L107 152 L22 152 Q12 152 12 142 Z"
        fill="url(#pricingCardGrad)"
        stroke="url(#pricing-border)"
        strokeWidth="1"
        filter="url(#pricing-shadow)"
      />
      {/* Plan name */}
      <rect fill="var(--muted-foreground)" height="6" opacity="0.38" rx="3" width="38" x="22" y="40" />
      {/* Price */}
      <rect fill="var(--muted-foreground)" height="14" opacity="0.42" rx="3" width="28" x="22" y="54" />
      <rect fill="var(--muted-foreground)" height="5" opacity="0.18" rx="2" width="20" x="54" y="62" />
      {/* Features */}
      <circle cx="27" cy="84" fill="var(--muted-foreground)" opacity="0.15" r="4" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.2" rx="2" width="50" x="36" y="82" />
      <circle cx="27" cy="96" fill="var(--muted-foreground)" opacity="0.15" r="4" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.2" rx="2" width="42" x="36" y="94" />
      <circle cx="27" cy="108" fill="var(--muted-foreground)" opacity="0.15" r="4" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.2" rx="2" width="55" x="36" y="106" />
      {/* Button */}
      <rect fill="var(--muted-foreground)" height="16" opacity="0.14" rx="5" width="75" x="22" y="124" />

      {/* Card 2 - Pro (taller, highlighted) */}
      <rect
        fill="url(#pricingCardGrad)"
        height="164"
        rx="10"
        width="96"
        x="112"
        y="8"
        stroke="url(#pricing-border)"
        strokeWidth="1"
        filter="url(#pricing-shadow)"
      />
      {/* Badge */}
      <rect fill="var(--muted-foreground)" height="12" opacity="0.28" rx="6" width="50" x="135" y="2" />
      {/* Plan name */}
      <rect fill="var(--muted-foreground)" height="6" opacity="0.42" rx="3" width="28" x="122" y="24" />
      {/* Price */}
      <rect fill="var(--muted-foreground)" height="14" opacity="0.46" rx="3" width="30" x="122" y="38" />
      <rect fill="var(--muted-foreground)" height="5" opacity="0.2" rx="2" width="20" x="156" y="46" />
      {/* Features */}
      <circle cx="127" cy="70" fill="var(--muted-foreground)" opacity="0.18" r="4" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.24" rx="2" width="55" x="136" y="68" />
      <circle cx="127" cy="82" fill="var(--muted-foreground)" opacity="0.18" r="4" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.24" rx="2" width="45" x="136" y="80" />
      <circle cx="127" cy="94" fill="var(--muted-foreground)" opacity="0.18" r="4" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.24" rx="2" width="50" x="136" y="92" />
      <circle cx="127" cy="106" fill="var(--muted-foreground)" opacity="0.18" r="4" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.24" rx="2" width="48" x="136" y="104" />
      {/* Button (primary style) */}
      <rect fill="var(--muted-foreground)" height="16" opacity="0.24" rx="5" width="76" x="122" y="146" />

      {/* Card 3 - Enterprise (left corners unrounded) */}
      <path
        d="M213 28 L298 28 Q308 28 308 38 L308 142 Q308 152 298 152 L213 152 Z"
        fill="url(#pricingCardGrad)"
        stroke="url(#pricing-border)"
        strokeWidth="1"
        filter="url(#pricing-shadow)"
      />
      {/* Plan name */}
      <rect fill="var(--muted-foreground)" height="6" opacity="0.38" rx="3" width="50" x="223" y="40" />
      {/* Price */}
      <rect fill="var(--muted-foreground)" height="14" opacity="0.42" rx="3" width="30" x="223" y="54" />
      <rect fill="var(--muted-foreground)" height="5" opacity="0.18" rx="2" width="20" x="257" y="62" />
      {/* Features */}
      <circle cx="228" cy="84" fill="var(--muted-foreground)" opacity="0.15" r="4" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.2" rx="2" width="52" x="237" y="82" />
      <circle cx="228" cy="96" fill="var(--muted-foreground)" opacity="0.15" r="4" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.2" rx="2" width="46" x="237" y="94" />
      <circle cx="228" cy="108" fill="var(--muted-foreground)" opacity="0.15" r="4" />
      <rect fill="var(--muted-foreground)" height="4" opacity="0.2" rx="2" width="40" x="237" y="106" />
      {/* Button */}
      <rect fill="var(--muted-foreground)" height="16" opacity="0.14" rx="5" width="75" x="223" y="124" />
    </svg>
  );
}

export function ExpandableCardCarouselSkeleton({ className }: SkeletonProps) {
  return (
    <svg className={className} fill="none" overflow="visible" viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="expandCarouselCardGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-75-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-50-bg)" />
        </linearGradient>
        <linearGradient id="expandCarouselImageGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-50-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-33-bg)" />
        </linearGradient>
        <CardEffects prefix="carousel" />
      </defs>

      {/* Card 1 */}
      <rect
        fill="url(#expandCarouselCardGrad)"
        height="140"
        rx="12"
        width="100"
        x="12"
        y="5"
        stroke="url(#carousel-border)"
        strokeWidth="1"
        filter="url(#carousel-shadow)"
      />
      <rect fill="url(#expandCarouselImageGrad)" height="90" rx="8" width="84" x="20" y="13" />
      <circle cx="62" cy="52" fill="var(--muted-foreground)" opacity="0.14" r="14" />
      <path d="M56 56L62 44L68 56" fill="var(--muted-foreground)" opacity="0.22" stroke="none" />
      <rect fill="var(--muted-foreground)" height="8" opacity="0.38" rx="3" width="50" x="20" y="112" />
      <circle cx="92" cy="120" fill="var(--muted-foreground)" opacity="0.18" r="9" />
      <line
        opacity="0.45"
        stroke="var(--muted-foreground)"
        strokeLinecap="round"
        strokeWidth="1.5"
        x1="88"
        x2="96"
        y1="120"
        y2="120"
      />
      <line
        opacity="0.45"
        stroke="var(--muted-foreground)"
        strokeLinecap="round"
        strokeWidth="1.5"
        x1="92"
        x2="92"
        y1="116"
        y2="124"
      />

      {/* Card 2 */}
      <rect
        fill="url(#expandCarouselCardGrad)"
        height="140"
        rx="12"
        width="100"
        x="120"
        y="5"
        stroke="url(#carousel-border)"
        strokeWidth="1"
        filter="url(#carousel-shadow)"
      />
      <rect fill="url(#expandCarouselImageGrad)" height="90" rx="8" width="84" x="128" y="13" />
      <circle cx="170" cy="52" fill="var(--muted-foreground)" opacity="0.14" r="14" />
      <path d="M164 56L170 44L176 56" fill="var(--muted-foreground)" opacity="0.22" stroke="none" />
      <rect fill="var(--muted-foreground)" height="8" opacity="0.38" rx="3" width="50" x="128" y="112" />
      <circle cx="200" cy="120" fill="var(--muted-foreground)" opacity="0.18" r="9" />
      <line
        opacity="0.45"
        stroke="var(--muted-foreground)"
        strokeLinecap="round"
        strokeWidth="1.5"
        x1="196"
        x2="204"
        y1="120"
        y2="120"
      />
      <line
        opacity="0.45"
        stroke="var(--muted-foreground)"
        strokeLinecap="round"
        strokeWidth="1.5"
        x1="200"
        x2="200"
        y1="116"
        y2="124"
      />

      {/* Card 3 */}
      <rect
        fill="url(#expandCarouselCardGrad)"
        height="140"
        rx="12"
        width="100"
        x="228"
        y="5"
        stroke="url(#carousel-border)"
        strokeWidth="1"
        filter="url(#carousel-shadow)"
      />
      <rect fill="url(#expandCarouselImageGrad)" height="90" rx="8" width="84" x="236" y="13" />
      <circle cx="278" cy="52" fill="var(--muted-foreground)" opacity="0.14" r="14" />
      <path d="M272 56L278 44L284 56" fill="var(--muted-foreground)" opacity="0.22" stroke="none" />
      <rect fill="var(--muted-foreground)" height="8" opacity="0.38" rx="3" width="50" x="236" y="112" />
      <circle cx="308" cy="120" fill="var(--muted-foreground)" opacity="0.18" r="9" />
      <line
        opacity="0.45"
        stroke="var(--muted-foreground)"
        strokeLinecap="round"
        strokeWidth="1.5"
        x1="304"
        x2="312"
        y1="120"
        y2="120"
      />
      <line
        opacity="0.45"
        stroke="var(--muted-foreground)"
        strokeLinecap="round"
        strokeWidth="1.5"
        x1="308"
        x2="308"
        y1="116"
        y2="124"
      />
    </svg>
  );
}

export function CardProgressSkeleton({ className }: SkeletonProps) {
  return (
    <svg className={className} fill="none" overflow="visible" viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="progressCardGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-75-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-50-bg)" />
        </linearGradient>
        <CardEffects prefix="progress" />
      </defs>
      {/* Card background */}
      <rect
        fill="url(#progressCardGrad)"
        height="180"
        rx="12"
        width="200"
        stroke="url(#progress-border)"
        strokeWidth="1"
        filter="url(#progress-shadow)"
      />

      {/* Step 1 - Complete */}
      <circle cx="28" cy="28" fill="var(--muted-foreground)" opacity="0.42" r="8" />
      <path
        d="M24 28L27 31L33 25"
        fill="none"
        opacity="0.7"
        stroke="var(--background)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <rect fill="var(--muted-foreground)" height="7" opacity="0.28" rx="3" width="80" x="46" y="24" />
      {/* Connector line */}
      <rect fill="var(--muted-foreground)" height="24" opacity="0.16" rx="0.5" width="1" x="28" y="40" />

      {/* Step 2 - In Progress (spinner) */}
      <circle cx="28" cy="72" fill="none" opacity="0.22" r="8" stroke="var(--muted-foreground)" strokeWidth="2" />
      <path
        d="M28 64 A8 8 0 0 1 36 72"
        fill="none"
        opacity="0.55"
        stroke="var(--muted-foreground)"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <rect fill="var(--muted-foreground)" height="7" opacity="0.38" rx="3" width="100" x="46" y="66" />
      <rect fill="var(--muted-foreground)" height="5" opacity="0.16" rx="2" width="70" x="46" y="79" />
      {/* Connector line */}
      <rect fill="var(--muted-foreground)" height="24" opacity="0.1" rx="0.5" width="1" x="28" y="84" />

      {/* Step 3 - Pending */}
      <circle cx="28" cy="116" fill="none" opacity="0.18" r="8" stroke="var(--muted-foreground)" strokeWidth="2" />
      <rect fill="var(--muted-foreground)" height="7" opacity="0.18" rx="3" width="90" x="46" y="110" />
      <rect fill="var(--muted-foreground)" height="5" opacity="0.12" rx="2" width="60" x="46" y="123" />
      {/* Connector line */}
      <rect fill="var(--muted-foreground)" height="24" opacity="0.1" rx="0.5" width="1" x="28" y="128" />

      {/* Step 4 - Pending */}
      <circle cx="28" cy="160" fill="none" opacity="0.18" r="8" stroke="var(--muted-foreground)" strokeWidth="2" />
      <rect fill="var(--muted-foreground)" height="7" opacity="0.18" rx="3" width="50" x="46" y="156" />
    </svg>
  );
}

export function ExpandableCardSpreadSkeleton({ className }: SkeletonProps) {
  return (
    <svg className={className} fill="none" overflow="visible" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="spreadCardGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--mix-card-75-bg)" />
          <stop offset="100%" stopColor="var(--mix-card-50-bg)" />
        </linearGradient>
        <CardEffects prefix="spread" />
      </defs>

      {/* Card 1 (back) */}
      <rect
        fill="url(#spreadCardGrad)"
        height="130"
        rx="14"
        width="90"
        x="50"
        y="15"
        stroke="url(#spread-border)"
        strokeWidth="1"
        filter="url(#spread-shadow)"
      />
      <circle cx="72" cy="40" fill="var(--muted-foreground)" opacity="0.18" r="10" />
      <rect fill="var(--muted-foreground)" height="7" opacity="0.22" rx="3" width="50" x="62" y="115" />
      <rect fill="var(--muted-foreground)" height="5" opacity="0.16" rx="2" width="34" x="62" y="128" />

      {/* Card 2 */}
      <rect
        fill="url(#spreadCardGrad)"
        height="130"
        rx="14"
        width="90"
        x="95"
        y="15"
        stroke="url(#spread-border)"
        strokeWidth="1"
        filter="url(#spread-shadow)"
      />
      <circle cx="117" cy="40" fill="var(--muted-foreground)" opacity="0.22" r="10" />
      <rect fill="var(--muted-foreground)" height="7" opacity="0.27" rx="3" width="55" x="107" y="115" />
      <rect fill="var(--muted-foreground)" height="5" opacity="0.2" rx="2" width="40" x="107" y="128" />

      {/* Card 3 */}
      <rect
        fill="url(#spreadCardGrad)"
        height="130"
        rx="14"
        width="90"
        x="140"
        y="15"
        stroke="url(#spread-border)"
        strokeWidth="1"
        filter="url(#spread-shadow)"
      />
      <circle cx="162" cy="40" fill="var(--muted-foreground)" opacity="0.24" r="10" />
      <rect fill="var(--muted-foreground)" height="7" opacity="0.32" rx="3" width="48" x="152" y="115" />
      <rect fill="var(--muted-foreground)" height="5" opacity="0.22" rx="2" width="60" x="152" y="128" />

      {/* Card 4 (front) */}
      <rect
        fill="url(#spreadCardGrad)"
        height="130"
        rx="14"
        width="90"
        x="185"
        y="15"
        stroke="url(#spread-border)"
        strokeWidth="1"
        filter="url(#spread-shadow)"
      />
      <circle cx="207" cy="40" fill="var(--muted-foreground)" opacity="0.28" r="10" />
      <rect fill="var(--muted-foreground)" height="7" opacity="0.38" rx="3" width="52" x="197" y="115" />
      <rect fill="var(--muted-foreground)" height="5" opacity="0.27" rx="2" width="38" x="197" y="128" />
    </svg>
  );
}

export const blockSkeletons: Record<string, React.ComponentType<SkeletonProps>> = {
  "ai-chat": AiChatSkeleton,
  "card-image-section": CardImageSectionSkeleton,
  "card-login": CardLoginSkeleton,
  "card-task": CardTaskSkeleton,
  "card-traffic": CardTrafficSkeleton,
  "expandable-card-carousel": ExpandableCardCarouselSkeleton,
  "expandable-card-spread": ExpandableCardSpreadSkeleton,
  "kanban-board": KanbanBoardSkeleton,
  "pricing-section": PricingSectionSkeleton,
  "card-progress": CardProgressSkeleton,
};
