import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/brook/tailwind/ui/avatar";

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
