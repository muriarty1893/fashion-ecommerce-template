import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
    <div className="mx-auto max-w-screen-2xl">
    <div className="bg-secondaryBrown flex justify-center items-center flex-col py-9 gap-3 mt-24 mx-5 max-[400px]:mx-3">
      <p className="text-base text-white font-light">Follow us on:</p>
      <div className="flex gap-2 text-white">
        {socialLinks.map(({ label, to, icon: Icon, className }) => (
          <Link
            key={label}
            to={to}
            aria-label={label}
            className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-white/15"
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
