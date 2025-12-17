import { Avatar, AvatarFallback, AvatarImage } from "@/registry/brook/ui/avatar/avatar";

export default function AvatarDemo() {
  return (
    <div>
      <Avatar>
        <AvatarImage alt="@preetecool" src="/preetecool.png" />
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>
    </div>
  );
}
