import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Arjun's headshot.
 *
 * The source is a transparent-background cutout, so the same file works on the
 * cream page background and on the blue CTA band without a second asset. The
 * original photo had a bright azure backdrop that clashed with the site navy;
 * the subject is greyscale and the backdrop was saturated blue, which made them
 * cleanly separable.
 *
 * blurDataURL is a 12px inline preview — no extra network request, and it
 * removes the layout flash on slow connections, which is the common case here.
 */
const BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOCAYAAAAbvf3sAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAB/0lEQVR4nH2RO4gaURSGJ5tAIEVSbpEyCLJYiKKVmPGFg0/Ex4iNTTCbMBFBcJQUQ0AMwiAoqIVCCpk1CmshVipKQCJpTDVNwMD2IcUuBow6f7iTBBZ2kwMX7uG/33/OuYeiKIrabDaPeZ7/GA6H9yzLrjqdToj6X0iS9Nzn8yGVSu1CoRACgYAyGo28RItGo3dvALIsB/v9Pmaz2aHT6WytVisKrwvv/shHtwArzftud9vtdjEej382Gg1IklQmWr/fv1lhuVweDwaDq9VqheFwiPPB+WGHnfOfwGQyeSSK4jdRFFGtViGdnckA7hNNEIR7FEXduf5eTcRK5U0ul0Ov1zssFgs0m82316AjAL8hRVEe5vP5lxzHfW6325BlWZnP5wr5rVQqtW61Ws/+gmpkMpkPJpMJHMcdisUiiHupVILZbD7QNK2wLIt8ofBpvV4fq0A4ErnUaDSo1Wr7crmM6XSKSCQCmqbhcrn2DMNsk8kkKhXxlQrY7fbLk5MTkIEFQUC9XofNZoPb7SYLBNl+LBYDz/NdFXhK09/1ej2y2azC8zzS6TScTif8fj88Hg+8Xu+BzHP64vQrgAeUw+m8MhgMSCQSar/kEGdSQavVwmKxKASMx+M/vlxcPKEcDsdWp9OBYRjVORgMqgC5k1aNRqPCMIwSjUbRarU8vwBb4hsLNqPmrwAAAABJRU5ErkJggg==";

export default function Headshot({
  priority = false,
  className,
  sizes = "(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 70vw",
}: {
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <Image
      src="/arjun-basnet.png"
      alt="Arjun Basnet, digital and AI consultant based in Kathmandu, Nepal"
      width={1000}
      height={1206}
      priority={priority}
      placeholder="blur"
      blurDataURL={BLUR}
      sizes={sizes}
      className={cn("h-auto w-full select-none", className)}
    />
  );
}
