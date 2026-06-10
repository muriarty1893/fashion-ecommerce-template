import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import Link from "next/link";

const socialLinks = [
  { label: "Facebook", to: "/info/facebook", icon: FaFacebookF, className: "w-3" },
  { label: "Instagram", to: "/info/instagram", icon: FaInstagram, className: "w-4" },
  { label: "TikTok", to: "/info/tiktok", icon: FaTiktok, className: "w-4" },
  { label: "LinkedIn", to: "/info/linkedin", icon: FaLinkedinIn, className: "w-4" },
  { label: "Pinterest", to: "/info/pinterest", icon: FaPinterestP, className: "w-4" },
  { label: "YouTube", to: "/info/youtube", icon: FaYoutube, className: "w-4" },
];

const SocialMediaFooter = () => {
  return (
    <div className="mx-auto mt-20 max-w-screen-2xl px-5">
      <div className="flex flex-col items-center justify-center gap-4 rounded-[2rem] border border-stone-200 bg-white px-5 py-8 text-center shadow-[0_18px_45px_rgba(28,25,23,0.05)]">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9b6b43]">
          Follow us on
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-stone-950">
          {socialLinks.map(({ label, to, icon: Icon, className }) => (
            <Link
              key={label}
              href={to}
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full border border-stone-200 bg-[#fbfaf8] transition hover:border-stone-950 hover:bg-white"
            >
              <Icon className={className} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
export default SocialMediaFooter
