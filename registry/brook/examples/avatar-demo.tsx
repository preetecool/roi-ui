import { Avatar, AvatarImage, AvatarFallback } from "@/registry/brook/ui/avatar/avatar";

export default function AvatarDemo() {
  return (
    <div>
      <Avatar>
        <AvatarImage src="/preetecool.png" alt="@preetecool" />
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>
    </div>
  );
}
