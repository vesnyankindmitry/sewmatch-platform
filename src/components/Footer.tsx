import { Link } from 'react-router'
import { Factory } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">
                <Factory className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-playfair">
                Sew<span className="text-teal">Match</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Connecting Private Label brands with verified OEM textile manufacturers across the United States.
            </p>
          </div>

          {/* For Brands */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">For Brands</h4>
            <ul className="space-y-3">
              <li><Link to="/brand-register" className="text-white/60 hover:text-teal text-sm transition-colors">Create Tech Spec</Link></li>
              <li><Link to="/dashboard" className="text-white/60 hover:text-teal text-sm transition-colors">Find Manufacturers</Link></li>
              <li><Link to="/pricing" className="text-white/60 hover:text-teal text-sm transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* For Manufacturers */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">For Manufacturers</h4>
            <ul className="space-y-3">
              <li><Link to="/manufacturer-register" className="text-white/60 hover:text-teal text-sm transition-colors">List Your Factory</Link></li>
              <li><Link to="/dashboard" className="text-white/60 hover:text-teal text-sm transition-colors">Manage Capacity</Link></li>
              <li><Link to="/pricing" className="text-white/60 hover:text-teal text-sm transition-colors">Get Verified</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-white/60 hover:text-teal text-sm transition-colors">About</Link></li>
              <li><Link to="/pricing" className="text-white/60 hover:text-teal text-sm transition-colors">Pricing</Link></li>
              <li><span className="text-white/60 text-sm">Contact: hello@sewmatch.com</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/40 text-sm">
          &copy; 2026 SewMatch. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
