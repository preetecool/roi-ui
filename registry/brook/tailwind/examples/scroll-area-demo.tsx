import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@/registry/brook/tailwind/ui/scroll-area";

export default function ScrollAreaDemo() {
  return (
    <ScrollArea>
      <ScrollAreaViewport className="outline outline-1 outline-border">
        <ScrollAreaContent>
          <p className="m-0 text-foreground text-sm leading-[1.375rem] max-[640px]:text-[0.9375rem] max-[640px]:leading-6">
            She looked up at the night sky and smiled at a secret the universe
            had been keeping for 13.8 billion years. Every star she could see
            was actually a time machine, showing her not what is, but what was.
            The light from Proxima Centauri, our nearest stellar neighbor, had
            been traveling for over four years just to reach her eyes tonight.
          </p>
          <p className="m-0 text-foreground text-sm leading-[1.375rem] max-[640px]:text-[0.9375rem] max-[640px]:leading-6">
            But here was the beautiful part: she was made of stars too. The iron
            in her blood, the calcium in her bones, the oxygen in every breath,
            all of it was forged in the nuclear furnaces of dying stars billions
            of years ago. When ancient supernovae exploded in spectacular
            deaths, they scattered these elements across the cosmos like cosmic
            seeds, eventually finding their way into planets, oceans, and
            somehow, into her.
          </p>
          <p className="m-0 text-foreground text-sm leading-[1.375rem] max-[640px]:text-[0.9375rem] max-[640px]:leading-6">
            She thought about the Milky Way, that great spiral of 200 billion
            stars spinning slowly through space. From Earth, we see it edge on,
            like looking at a dinner plate from the side, which is why it
            appears as a glowing band across the sky. We are not observers of
            the galaxy. We are inside it, riding a small blue marble around an
            ordinary yellow star, racing through space at 828,000 kilometers per
            hour.
          </p>
          <p className="m-0 text-foreground text-sm leading-[1.375rem] max-[640px]:text-[0.9375rem] max-[640px]:leading-6">
            The philosopher in her wondered: if we are the universe experiencing
            itself, then perhaps consciousness was not an accident but an
            inevitability. Perhaps matter had always been destined to organize
            itself into patterns complex enough to look back at the stars and
            ask why. Perhaps the atoms in her brain, once scattered across the
            void, had finally found a way to contemplate their own journey home.
          </p>
          <p className="m-0 text-foreground text-sm leading-[1.375rem] max-[640px]:text-[0.9375rem] max-[640px]:leading-6">
            And in that moment, standing beneath the ancient light of distant
            suns, she realized the profound truth that she was neither separate
            from the cosmos nor insignificant within it. She was exactly what
            happens when stars dream, when the universe learns to think, when
            infinity folds itself into a single point of awareness and whispers:
            I am here, I am alive, I am home.
          </p>
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </ScrollArea>
  );
}
