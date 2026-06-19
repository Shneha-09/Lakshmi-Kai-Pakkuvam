import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Facebook,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-cream-100">
      {/* Background Image */}
      <Image
        src="/images/Home/footer.png"
        alt="Footer Background"
        fill
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-brown-900/85" />

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Lakshmi
              </h3>

              <p className="text-gold-400 text-xs tracking-widest uppercase font-semibold mb-4">
                Kai Pakkuvam
              </p>

              <p className="text-cream-200 text-sm leading-relaxed mb-5">
                Handcrafted with love in our kitchen, bringing you the authentic
                taste of South Indian homes since 2018.
              </p>

              <div className="flex gap-3">
                <a
                  href="#"
                  className="p-2 bg-white/10 rounded-lg hover:bg-gold-500 transition"
                >
                  <Instagram size={18} />
                </a>

                <a
                  href="#"
                  className="p-2 bg-white/10 rounded-lg hover:bg-gold-500 transition"
                >
                  <Facebook size={18} />
                </a>

                <a
                  href="mailto:hariniganesan00@gmail.com"
                  className="p-2 bg-white/10 rounded-lg hover:bg-gold-500 transition"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">
                Quick Links
              </h4>

              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/shop" className="hover:text-gold-400">
                    Shop All
                  </Link>
                </li>

                <li>
                  <Link href="/shop?category=Pickles" className="hover:text-gold-400">
                    Pickles
                  </Link>
                </li>

                <li>
                  <Link href="/shop?category=Karuvadu" className="hover:text-gold-400">
                    Karuvadu
                  </Link>
                </li>

                <li>
                  <Link href="/shop?category=Combo+Packs" className="hover:text-gold-400">
                    Combo Packs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <h4 className="font-semibold text-white mb-4">
                Information
              </h4>

              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/about" className="hover:text-gold-400">
                    About Us
                  </Link>
                </li>

                <li>
                  <Link href="/contact" className="hover:text-gold-400">
                    Contact
                  </Link>
                </li>

                <li>
                  <Link href="/faq" className="hover:text-gold-400">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">
                Get In Touch
              </h4>

              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <Phone className="text-gold-400" size={16} />
                  <span>+91 80721 15228</span>
                </li>

                <li className="flex gap-3">
                  <Mail className="text-gold-400" size={16} />
                  <span>hariniganesan00@gmail.com</span>
                </li>

                <li className="flex gap-3">
                  <MapPin className="text-gold-400" size={16} />
                  <span>Burmanagar, Ennore, Chennai</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-cream-200">
            <p>
              © {new Date().getFullYear()} Lakshmi Kai Pakkuvam. All rights
              reserved.
            </p>

            <p className="flex items-center gap-1">
              Made with
              <Heart
                size={13}
                className="text-red-500 fill-red-500"
              />
              
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}