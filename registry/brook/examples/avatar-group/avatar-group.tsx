import { Avatar, AvatarFallback, AvatarImage } from "@/registry/brook/ui/avatar/avatar";
import styles from "./avatar-group.module.css";

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
    <div className={styles.container}>
      <div className={styles.group}>
        {displayUsers.map((user) => (
          <div className={styles.avatarWrapper} key={user.name}>
            <Avatar className={styles.avatar}>
              <AvatarImage alt={`Profile picture of ${user.name}`} src={user.avatar} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
          </div>
        ))}
        {remainingCount > 0 && <div className={styles.overflow}>+{remainingCount}</div>}
      </div>
    </div>
  );
}
