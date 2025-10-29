import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/brook/tailwind/ui/avatar";
import {
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/brook/tailwind/ui/tooltip";

type User = {
  value: string;
  label: string;
  email: string;
  avatar: string;
};

type AvatarGroupProps = {
  users: User[];
  maxDisplay?: number;
};

export function AvatarGroup({ users, maxDisplay = 3 }: AvatarGroupProps) {
  const displayUsers = users.slice(0, maxDisplay);
  const remainingCount = users.length - maxDisplay;

  return (
    <TooltipProvider>
      <div className="flex items-center">
        {displayUsers.map((user, index) => (
          <Tooltip key={user.value}>
            <TooltipTrigger
              render={
                <div className={index > 0 ? "-ml-[6px]" : ""}>
                  <Avatar
                    className="border-2 border-[var(--card)]"
                    style={{ width: "24px", height: "24px" }}
                  >
                    <AvatarImage
                      alt={`profile image for ${user.label}`}
                      src={user.avatar}
                    />
                    <AvatarFallback>
                      {user.label
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("") || "??"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              }
            />
            <TooltipPortal>
              <TooltipPositioner>
                <TooltipPopup>
                  <TooltipArrow />
                  {user.label}
                </TooltipPopup>
              </TooltipPositioner>
            </TooltipPortal>
          </Tooltip>
        ))}
        {remainingCount > 0 && (
          <div className="-ml-[6px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--card)] bg-[var(--muted)] font-semibold text-[0.625rem] text-[var(--muted-foreground)]">
            +{remainingCount}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
