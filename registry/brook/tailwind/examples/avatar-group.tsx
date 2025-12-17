import { Avatar, AvatarFallback, AvatarImage } from "@/registry/brook/tailwind/ui/avatar";

const users = [
  { name: "Emma Wilson", avatar: "/avatars/emma.png" },
  { name: "James Chen", avatar: "/avatars/james.png" },
  { name: "Sofia Garcia", avatar: "/avatars/sofia.png" },
  { name: "Marcus Johnson", avatar: "/avatars/marcus.png" },
  { name: "Aisha Patel", avatar: "/avatars/aisha.png" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export default function AvatarGroup() {
  const maxDisplay = 3;
  const displayUsers = users.slice(0, maxDisplay);
  const remainingCount = users.length - maxDisplay;

  return (
    <div className="p-8 max-sm:p-4">
      <div className="flex items-center">
        {displayUsers.map((user) => (
          <div className="-ml-2 rounded-full first:ml-0" key={user.name}>
            <Avatar className="size-10 border-2 border-background">
              <AvatarImage alt={`Profile picture of ${user.name}`} src={user.avatar} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="-ml-2 flex size-10 items-center justify-center rounded-full border-2 border-background bg-muted font-semibold text-muted-foreground text-xs">
            +{remainingCount}
          </div>
        )}
      </div>
    </div>
  );
}
