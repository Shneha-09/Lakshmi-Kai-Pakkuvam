import Link from "next/link";
import { Instagram, Facebook, Mail, Phone, MapPin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brown-800 text-cream-100">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">Lakshmi</h3>
            <p className="text-gold-400 text-xs tracking-widest uppercase font-semibold mb-4">Kai Pakkuvam</p>
            <p className="text-cream-200 text-sm leading-relaxed mb-5">
              Handcrafted with love in our kitchen, bringing you the authentic taste of South Indian homes since 2018.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-brown-700 rounded-lg hover:bg-maroon-700 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-brown-700 rounded-lg hover:bg-maroon-700 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="mailto:hello@lakshmikai.com" className="p-2 bg-brown-700 rounded-lg hover:bg-maroon-700 transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/shop", label: "Shop All" },
                { href: "/shop?category=Pickles", label: "Pickles" },
                { href: "/shop?category=Thokku", label: "Thokku" },
                { href: "/shop?category=Podis", label: "Podis" },
                { href: "/shop?category=Snacks", label: "Snacks" },
                { href: "/shop?category=Combo+Packs", label: "Combo Packs" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream-200 hover:text-gold-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Information</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/faq", label: "FAQ" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream-200 hover:text-gold-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Get In Touch</h4>
            <ul className="space-y-3 text-sm text-cream-200">
              <li className="flex gap-3">
                <Phone size={15} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-3">
                <Mail size={15} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <span>hello@lakshmikai.com</span>
              </li>
              <li className="flex gap-3">
                <MapPin size={15} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <span>Salem District, Tamil Nadu, India — 636 001</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-brown-700 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-cream-300">
          <p>© {new Date().getFullYear()} Lakshmi Kai Pakkuvam. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={12} className="text-maroon-500 fill-maroon-500" /> in Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
  );
}
