import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/brook/ui/avatar/avatar";
import {
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/brook/ui/tooltip/tooltip";

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
      <div style={{ display: "flex", alignItems: "center" }}>
        {displayUsers.map((user, index) => (
          <Tooltip key={user.value}>
            <TooltipTrigger
              render={
                <div style={{ marginLeft: index > 0 ? "-6px" : "0" }}>
                  <Avatar
                    style={{
                      width: "24px",
                      height: "24px",
                      border: "2px solid var(--card)",
                    }}
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
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "var(--muted)",
              color: "var(--muted-foreground)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.625rem",
              fontWeight: 600,
              marginLeft: "-6px",
              border: "2px solid var(--card)",
            }}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
