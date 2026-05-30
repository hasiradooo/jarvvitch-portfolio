import Link from "next/link";
import { SolidLogoText } from "../icons/Icons";
import { SolidHeart } from "../icons/assets/user_interface/Heart";


export function Footer() {
  return (
    <footer className="py-10 text-sm text-foreground">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-4">
          <SolidLogoText size={80} />
          <div className="flex flex-col">
            <div className="inline">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ">
                Gecko Creative
              </h3>
            </div>
            <p className="text-sm opacity-75 flex items-center gap-1">
              Made with<SolidHeart className="text-red-400" size={16} /> <Link className="underline" target="_blank" href="https://hasira.me">Hasira</Link>
            </p>
            <p className="text-sm opacity-75">&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://tiktok.com/@jarvvitch" target="_blank" className="underline">TikTok</Link>
          <Link href="https://bsky.app/profile/jarvvitch.bsky.social" target="_blank" className="underline">BSky</Link>
          <Link href="https://telegram.com/jarvvitch" target="_blank" className="underline">Telegram</Link>
          <Link href="https://ko-fi.com/jarvvitch" target="_blank" className="underline">Ko-fi</Link>
        </div>
      </div>
    </footer>
  );
}
