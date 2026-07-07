import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Users,
  BarChart3,
  Settings,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  MapPin,
  Award,
  Scissors,
  FileText,
  StickyNote,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  User,
  Mail,
  Phone,
  Globe,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Tab = 'verifications' | 'users' | 'analytics' | 'settings';
type Status = 'Pending' | 'Verified' | 'Rejected';
type DetailTab = 'overview' | 'equipment' | 'documents' | 'notes';

interface Application {
  id: number;
  company: string;
  location: string;
  date: string;
  status: Status;
  matchScore: number;
  contact: string;
  email: string;
  phone: string;
  website: string;
  yearsInBusiness: string;
  facilitySize: string;
  certifications: string[];
  equipment: string[];
  serviceType: string;
  specializations: string[];
}

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const APPLICATIONS: Application[] = [
  {
    id: 1,
    company: 'Pacific Cut & Sew Inc.',
    location: 'Los Angeles, CA',
    date: '2024-01-15',
    status: 'Pending',
    matchScore: 94,
    contact: 'John Martinez',
    email: 'john@pacificcutsew.com',
    phone: '(213) 555-0142',
    website: 'www.pacificcutsew.com',
    yearsInBusiness: '12 years',
    facilitySize: '25,000 sq ft',
    certifications: ['WRAP', 'OEKO-TEX'],
    equipment: ['Single Needle Lockstitch', 'Overlock/Serger', 'Coverstitch', 'Barudan Embroidery'],
    serviceType: 'Full Package',
    specializations: ['Knits', 'Activewear', 'T-Shirts'],
  },
  {
    id: 2,
    company: 'Metro Apparel Solutions',
    location: 'New York, NY',
    date: '2024-01-14',
    status: 'Verified',
    matchScore: 88,
    contact: 'Sarah Chen',
    email: 'sarah@metroapparel.com',
    phone: '(212) 555-0287',
    website: 'www.metroapparel.com',
    yearsInBusiness: '8 years',
    facilitySize: '15,000 sq ft',
    certifications: ['GOTS', 'BSCI'],
    equipment: ['Single Needle Lockstitch', 'Flatlock', 'CNC Cutting', 'Screen Printing'],
    serviceType: 'CMT',
    specializations: ['Wovens', 'Outerwear', 'Denim'],
  },
  {
    id: 3,
    company: 'Denim Craft USA',
    location: 'Austin, TX',
    date: '2024-01-13',
    status: 'Pending',
    matchScore: 91,
    contact: 'Mike Rodriguez',
    email: 'mike@denimcraftusa.com',
    phone: '(512) 555-0198',
    website: 'www.denimcraftusa.com',
    yearsInBusiness: '5 years',
    facilitySize: '10,000 sq ft',
    certifications: ['OEKO-TEX'],
    equipment: ['Single Needle Lockstitch', 'Overlock/Serger', 'Laser Cutting'],
    serviceType: 'Full Package',
    specializations: ['Denim', 'Jeans', 'Washes'],
  },
  {
    id: 4,
    company: 'Carolina Stitch Works',
    location: 'Charlotte, NC',
    date: '2024-01-12',
    status: 'Rejected',
    matchScore: 72,
    contact: 'Lisa Thompson',
    email: 'lisa@carolinastitch.com',
    phone: '(704) 555-0334',
    website: 'www.carolinastitch.com',
    yearsInBusiness: '3 years',
    facilitySize: '5,000 sq ft',
    certifications: [],
    equipment: ['Single Needle Lockstitch', 'Coverstitch'],
    serviceType: 'CMT',
    specializations: ['Knitwear', 'Sweaters'],
  },
  {
    id: 5,
    company: 'Southeast Sewing Co.',
    location: 'Atlanta, GA',
    date: '2024-01-11',
    status: 'Verified',
    matchScore: 86,
    contact: 'David Park',
    email: 'david@southeastsewing.com',
    phone: '(404) 555-0412',
    website: 'www.southeastsewing.com',
    yearsInBusiness: '20 years',
    facilitySize: '50,000 sq ft',
    certifications: ['WRAP', 'BSCI', 'ISO 9001'],
    equipment: ['Single Needle Lockstitch', 'Overlock/Serger', 'Coverstitch', 'Bartack', 'Buttonhole', 'Heat Press'],
    serviceType: 'Both',
    specializations: ['Full Package', 'Sportswear', 'Uniforms'],
  },
  {
    id: 6,
    company: 'LA Pattern & Stitch',
    location: 'Commerce, CA',
    date: '2024-01-10',
    status: 'Pending',
    matchScore: 79,
    contact: 'Anna Kim',
    email: 'anna@lapattern.com',
    phone: '(323) 555-0567',
    website: 'www.lapattern.com',
    yearsInBusiness: '7 years',
    facilitySize: '8,000 sq ft',
    certifications: ['OEKO-TEX', 'GOTS'],
    equipment: ['Single Needle Lockstitch', 'Barudan Embroidery', 'CNC Cutting'],
    serviceType: 'Full Package',
    specializations: ['Pattern Making', 'Sampling', 'Luxury'],
  },
  {
    id: 7,
    company: 'Texas Threadworks',
    location: 'Dallas, TX',
    date: '2024-01-09',
    status: 'Pending',
    matchScore: 83,
    contact: 'Robert Hayes',
    email: 'robert@txthreadworks.com',
    phone: '(214) 555-0789',
    website: 'www.txthreadworks.com',
    yearsInBusiness: '15 years',
    facilitySize: '30,000 sq ft',
    certifications: ['WRAP'],
    equipment: ['Single Needle Lockstitch', 'Overlock/Serger', 'Screen Printing', 'Heat Press'],
    serviceType: 'CMT',
    specializations: ['T-Shirts', 'Hoodies', 'Activewear'],
  },
  {
    id: 8,
    company: 'NY Couture Makers',
    location: 'New York, NY',
    date: '2024-01-08',
    status: 'Verified',
    matchScore: 90,
    contact: 'Elena Vasquez',
    email: 'elena@nycouture.com',
    phone: '(212) 555-0923',
    website: 'www.nycouture.com',
    yearsInBusiness: '18 years',
    facilitySize: '12,000 sq ft',
    certifications: ['GOTS', 'OEKO-TEX', 'SA8000'],
    equipment: ['Single Needle Lockstitch', 'Coverstitch', 'Flatlock', 'Laser Cutting'],
    serviceType: 'Full Package',
    specializations: ['Luxury', 'Dresses', 'Outerwear'],
  },
];

/* ------------------------------------------------------------------ */
/*  Status Badge                                                       */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: Status }) {
  const colors = {
    Pending: 'bg-amber-100 text-amber-700',
    Verified: 'bg-emerald-100 text-emerald-700',
    Rejected: 'bg-red-100 text-red-700',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${colors[status]}`}
    >
      {status === 'Pending' && <Clock size={12} />}
      {status === 'Verified' && <CheckCircle size={12} />}
      {status === 'Rejected' && <XCircle size={12} />}
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Detail Modal                                                       */
/* ------------------------------------------------------------------ */

function DetailModal({
  application,
  onClose,
}: {
  application: Application;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');
  const [notes, setNotes] = useState('');

  const tabs: { key: DetailTab; label: string; icon: React.ElementType }[] = [
    { key: 'overview', label: 'Overview', icon: Building2 },
    { key: 'equipment', label: 'Equipment', icon: Scissors },
    { key: 'documents', label: 'Documents', icon: FileText },
    { key: 'notes', label: 'Notes', icon: StickyNote },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-mist flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center">
              <Building2 size={20} className="text-teal" />
            </div>
            <div>
              <h3 className="font-bold text-navy">{application.company}</h3>
              <div className="flex items-center gap-2 text-xs text-slate">
                <MapPin size={12} />
                {application.location}
                <span className="mx-1">·</span>
                <StatusBadge status={application.status} />
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={18} className="text-slate" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-mist">
          <div className="flex gap-1">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition ${
                  activeTab === key
                    ? 'border-teal text-teal'
                    : 'border-transparent text-slate hover:text-navy'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* --- Overview --- */}
          {activeTab === 'overview' && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-sm text-slate mb-1">
                    <User size={14} />
                    Contact Name
                  </div>
                  <p className="font-medium text-navy">{application.contact}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-sm text-slate mb-1">
                    <Mail size={14} />
                    Email
                  </div>
                  <p className="font-medium text-navy">{application.email}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-sm text-slate mb-1">
                    <Phone size={14} />
                    Phone
                  </div>
                  <p className="font-medium text-navy">{application.phone}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-sm text-slate mb-1">
                    <Globe size={14} />
                    Website
                  </div>
                  <p className="font-medium text-navy">{application.website}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs text-slate mb-1">Years in Business</div>
                  <p className="font-bold text-navy">{application.yearsInBusiness}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs text-slate mb-1">Facility Size</div>
                  <p className="font-bold text-navy">{application.facilitySize}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs text-slate mb-1">Service Type</div>
                  <p className="font-bold text-navy">{application.serviceType}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-navy mb-3 flex items-center gap-2">
                  <Award size={16} className="text-teal" />
                  Certifications
                </h4>
                {application.certifications.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {application.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="px-3 py-1.5 bg-teal/10 text-teal rounded-full text-sm font-medium"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate">No certifications listed</p>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-navy mb-3 flex items-center gap-2">
                  <Scissors size={16} className="text-teal" />
                  Specializations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {application.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="px-3 py-1.5 bg-gray-100 text-navy rounded-full text-sm"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* --- Equipment --- */}
          {activeTab === 'equipment' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-slate uppercase tracking-wider">
                    <th className="pb-3 font-medium">Equipment</th>
                    <th className="pb-3 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-mist">
                  {application.equipment.map((eq) => (
                    <tr key={eq}>
                      <td className="py-3 text-sm text-navy">{eq}</td>
                      <td className="py-3 text-right">
                        <Check size={16} className="text-emerald-500 inline" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {/* --- Documents --- */}
          {activeTab === 'documents' && (
            <motion.div
              className="grid grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {['Business License', 'Insurance Cert', 'Facility Photos', 'Equipment List', 'Certifications'].map(
                (doc, i) => (
                  <div
                    key={doc}
                    className="border-2 border-dashed border-mist rounded-xl p-6 text-center hover:border-teal/50 transition cursor-pointer"
                  >
                    <FileText size={32} className="text-slate mx-auto mb-2" />
                    <p className="text-xs text-navy font-medium">{doc}</p>
                    <p className="text-[10px] text-slate mt-1">
                      {i < 3 ? 'Uploaded' : 'Pending'}
                    </p>
                  </div>
                )
              )}
            </motion.div>
          )}

          {/* --- Notes --- */}
          {activeTab === 'notes' && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <textarea
                rows={8}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add review notes here..."
                className="w-full px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition resize-none"
              />
              <motion.button
                className="bg-teal text-white px-6 py-2 rounded-xl font-medium hover:opacity-90 transition"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save Notes
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Decision Buttons */}
        <div className="px-6 py-4 border-t border-mist flex gap-3">
          <motion.button
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 text-white font-medium hover:opacity-90 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Check size={18} />
            Verify
          </motion.button>
          <motion.button
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-500 text-white font-medium hover:opacity-90 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Request Info
          </motion.button>
          <motion.button
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500 text-white font-medium hover:opacity-90 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <X size={18} />
            Reject
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar Nav Item                                                   */
/* ------------------------------------------------------------------ */

function NavItem({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
        active
          ? 'bg-teal text-white'
          : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>('verifications');
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const filteredApps = APPLICATIONS.filter((app) => {
    const matchesFilter = filter === 'All' || app.status === filter;
    const matchesSearch =
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    pending: APPLICATIONS.filter((a) => a.status === 'Pending').length,
    verified: APPLICATIONS.filter((a) => a.status === 'Verified').length,
    rejected: APPLICATIONS.filter((a) => a.status === 'Rejected').length,
    total: APPLICATIONS.length,
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-charcoal text-white flex flex-col flex-shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <Shield size={24} className="text-teal" />
            <span className="font-bold text-lg">SewMatch Admin</span>
          </div>
          <p className="text-xs text-white/50">Moderation Dashboard</p>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          <NavItem
            active={activeTab === 'verifications'}
            onClick={() => setActiveTab('verifications')}
            icon={Shield}
            label="Verifications"
          />
          <NavItem
            active={activeTab === 'users'}
            onClick={() => setActiveTab('users')}
            icon={Users}
            label="Users"
          />
          <NavItem
            active={activeTab === 'analytics'}
            onClick={() => setActiveTab('analytics')}
            icon={BarChart3}
            label="Analytics"
          />
          <NavItem
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
            icon={Settings}
            label="Settings"
          />
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-white font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-medium">Alex Johnson</p>
              <p className="text-xs text-white/50">Super Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-mist px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-navy">
            Manufacturer Verifications
          </h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate"
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition text-sm"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition text-sm bg-white"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Verified</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        <div className="p-6">
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              {
                label: 'Pending',
                value: stats.pending,
                icon: Clock,
                color: 'text-amber-600',
                bg: 'bg-amber-50',
              },
              {
                label: 'Verified',
                value: stats.verified,
                icon: CheckCircle,
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
              },
              {
                label: 'Rejected',
                value: stats.rejected,
                icon: XCircle,
                color: 'text-red-600',
                bg: 'bg-red-50',
              },
              {
                label: 'Total',
                value: stats.total,
                icon: Building2,
                color: 'text-slate-600',
                bg: 'bg-gray-50',
              },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className={`${stat.bg} rounded-xl p-4`}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon size={18} className={stat.color} />
                  <span className="text-xs text-slate">{stat.label}</span>
                </div>
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-mist overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs text-slate uppercase tracking-wider">
                    <th className="px-4 py-3 font-medium">
                      <input type="checkbox" className="rounded accent-teal" />
                    </th>
                    <th className="px-4 py-3 font-medium">Company</th>
                    <th className="px-4 py-3 font-medium">Location</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Match Score</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-mist">
                  {filteredApps.map((app) => (
                    <motion.tr
                      key={app.id}
                      className="hover:bg-gray-50/50 transition"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          className="rounded accent-teal"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-navy text-sm">
                          {app.company}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate">
                        {app.location}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate">
                        {app.date}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={app.status} />
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-sm font-bold ${
                            app.matchScore >= 90
                              ? 'text-emerald-600'
                              : app.matchScore >= 80
                              ? 'text-teal'
                              : 'text-amber-600'
                          }`}
                        >
                          {app.matchScore}%
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <motion.button
                          className="px-4 py-1.5 rounded-lg bg-teal/10 text-teal text-sm font-medium hover:bg-teal hover:text-white transition"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedApp(app)}
                        >
                          Review
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-mist flex items-center justify-between">
              <p className="text-xs text-slate">
                Showing {filteredApps.length} of {APPLICATIONS.length}{' '}
                applications
              </p>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition text-slate">
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm text-navy font-medium">1</span>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition text-slate">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <DetailModal
            application={selectedApp}
            onClose={() => setSelectedApp(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
