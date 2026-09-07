import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  CheckCircle2, 
  Search, 
  ShieldCheck, 
  LogIn, 
  LogOut, 
  RefreshCw, 
  Clock, 
  FileText,
  Building,
  User,
  Mail,
  Phone,
  Tag,
  Cloud,
  ExternalLink,
  HardDrive
} from 'lucide-react';
import { 
  auth, 
  db, 
  testFirestoreConnection, 
  handleFirestoreError, 
  OperationType,
  type InquiryData 
} from '../lib/firebase';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  type User as FirebaseUser 
} from 'firebase/auth';
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  serverTimestamp,
  query,
  orderBy,
  limit
} from 'firebase/firestore';

interface DatabasePortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatabasePortalModal: React.FC<DatabasePortalModalProps> = ({ isOpen, onClose }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [singleInquiry, setSingleInquiry] = useState<InquiryData | null>(null);
  const [searchError, setSearchError] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'lookup' | 'storage'>('all');

  useEffect(() => {
    // Monitor auth state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        loadInquiries();
      }
    });

    // Test connection
    testFirestoreConnection().then((connected) => {
      setIsConnected(connected);
    });

    return () => unsubscribe();
  }, []);

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'inquiries'), limit(50));
      const snap = await getDocs(q);
      const items: InquiryData[] = [];
      snap.forEach((docSnap) => {
        items.push({
          id: docSnap.id,
          ...(docSnap.data() as any)
        });
      });
      setInquiries(items);
    } catch (err) {
      console.warn('Could not list inquiries (requires staff authentication):', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      loadInquiries();
    } catch (err: any) {
      console.error('Google Sign In error:', err);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setInquiries([]);
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    setSingleInquiry(null);

    const cleanId = searchId.trim();
    if (!cleanId) return;

    setLoading(true);
    try {
      const docSnap = await getDoc(doc(db, 'inquiries', cleanId));
      if (docSnap.exists()) {
        setSingleInquiry({
          id: docSnap.id,
          ...(docSnap.data() as any)
        });
      } else {
        setSearchError('No record found for ID: ' + cleanId);
      }
    } catch (err) {
      setSearchError('Error querying Firestore for ID ' + cleanId);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'inquiries', id), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      setInquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus as any } : item));
      if (singleInquiry && singleInquiry.id === id) {
        setSingleInquiry(prev => prev ? { ...prev, status: newStatus as any } : null);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `inquiries/${id}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col z-10 overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="p-6 bg-[#0F172A] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-bold text-white">Firestore Database Records</h3>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                  isConnected ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-700 text-slate-300'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                  {isConnected ? 'Connected' : 'Syncing'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Trendy Constructions Pty Ltd • Real-time Cloud Firestore
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab & Auth Status Bar */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeTab === 'all' 
                  ? 'bg-[#1A2434] text-white shadow-xs' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Inquiries {currentUser && `(${inquiries.length})`}
            </button>
            <button
              onClick={() => setActiveTab('lookup')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeTab === 'lookup' 
                  ? 'bg-[#1A2434] text-white shadow-xs' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Lookup by ID
            </button>
            <button
              onClick={() => setActiveTab('storage')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center space-x-1.5 ${
                activeTab === 'storage' 
                  ? 'bg-[#1A2434] text-white shadow-xs' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Cloud className="w-3.5 h-3.5 text-amber-500" />
              <span>Firebase Storage</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <span className="text-slate-600 font-medium truncate max-w-[150px] sm:max-w-[200px]">
                  {currentUser.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="px-2.5 py-1 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold flex items-center space-x-1"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 font-bold border border-slate-300 shadow-xs flex items-center space-x-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-600" />
                <span>Staff Sign In (Google)</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {activeTab === 'lookup' && (
            <div className="space-y-4">
              <form onSubmit={handleLookup} className="flex gap-2">
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter Inquiry Document ID (e.g. inq_174131...)"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-[#1A2434] hover:bg-slate-800 text-white font-bold rounded-xl text-sm flex items-center space-x-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </form>

              {searchError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                  {searchError}
                </div>
              )}

              {singleInquiry && (
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Record ID</span>
                      <p className="font-mono text-xs font-bold text-slate-800">{singleInquiry.id}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 uppercase">
                      {singleInquiry.status || 'new'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500">Client Name:</span>
                      <p className="font-bold text-slate-800">{singleInquiry.fullName}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Email:</span>
                      <p className="font-bold text-slate-800">{singleInquiry.email}</p>
                    </div>
                    {singleInquiry.phone && (
                      <div>
                        <span className="text-slate-500">Phone:</span>
                        <p className="font-bold text-slate-800">{singleInquiry.phone}</p>
                      </div>
                    )}
                    {singleInquiry.projectType && (
                      <div>
                        <span className="text-slate-500">Scope:</span>
                        <p className="font-bold text-slate-800">{singleInquiry.projectType}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="text-slate-500 text-xs">Client Message:</span>
                    <p className="mt-1 p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 whitespace-pre-wrap">
                      {singleInquiry.message}
                    </p>
                  </div>

                  {singleInquiry.attachmentUrl && (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2 overflow-hidden">
                        <Cloud className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <div>
                          <span className="text-xs font-bold text-slate-800 block truncate">
                            {singleInquiry.attachmentName || 'Tender Attachment Document'}
                          </span>
                          <span className="text-[10px] text-emerald-700 font-bold">
                            Stored in Firebase Storage bucket
                          </span>
                        </div>
                      </div>
                      <a
                        href={singleInquiry.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#1A2434] text-white hover:bg-slate-800 text-xs font-bold flex items-center space-x-1.5 flex-shrink-0 transition-colors"
                      >
                        <span>Open Document</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'all' && (
            <div className="space-y-4">
              {!currentUser ? (
                <div className="text-center py-12 px-6 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-800">Protected Client Records</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                      In accordance with data privacy security rules, full client listings are restricted to authenticated Trendy Constructions directors.
                    </p>
                  </div>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={handleGoogleSignIn}
                      className="px-4 py-2.5 rounded-xl bg-[#1A2434] hover:bg-slate-800 text-white text-xs font-bold shadow-md flex items-center space-x-2"
                    >
                      <LogIn className="w-4 h-4 text-amber-400" />
                      <span>Authenticate with Google</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('lookup')}
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold"
                    >
                      <span>Lookup Single Record by ID</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Live Inquiries ({inquiries.length})
                    </span>
                    <button
                      onClick={loadInquiries}
                      disabled={loading}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 flex items-center space-x-1 text-xs"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </button>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
                      No inquiries in the database yet. Submit a quote or contact form above to test!
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-amber-400/60 shadow-xs transition-all space-y-2.5"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <span className="font-bold text-sm text-slate-900">{inq.fullName}</span>
                              <span className="text-xs text-slate-500 ml-2">({inq.email})</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <select
                                value={inq.status || 'new'}
                                onChange={(e) => inq.id && handleUpdateStatus(inq.id, e.target.value)}
                                className="text-[11px] font-bold uppercase rounded-lg border border-slate-200 px-2 py-1 bg-slate-50 text-slate-700 focus:outline-hidden"
                              >
                                <option value="new">New</option>
                                <option value="reviewed">Reviewed</option>
                                <option value="contacted">Contacted</option>
                                <option value="quoted">Quoted</option>
                                <option value="archived">Archived</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                            {inq.phone && (
                              <span className="flex items-center space-x-1">
                                <Phone className="w-3 h-3 text-amber-600" />
                                <span>{inq.phone}</span>
                              </span>
                            )}
                            {inq.projectType && (
                              <span className="flex items-center space-x-1">
                                <Building className="w-3 h-3 text-amber-600" />
                                <span>{inq.projectType}</span>
                              </span>
                            )}
                            {inq.budget && (
                              <span className="flex items-center space-x-1">
                                <Tag className="w-3 h-3 text-emerald-600" />
                                <span>{inq.budget}</span>
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                            {inq.message}
                          </p>

                          {inq.attachmentUrl && (
                            <div className="p-2.5 bg-amber-50/80 rounded-xl border border-amber-200 flex items-center justify-between gap-2">
                              <div className="flex items-center space-x-2 overflow-hidden">
                                <Cloud className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                <span className="text-xs font-bold text-slate-800 truncate">
                                  {inq.attachmentName || 'Tender Attachment Document'}
                                </span>
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded flex-shrink-0">
                                  Firebase Storage
                                </span>
                              </div>
                              <a
                                href={inq.attachmentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded-lg bg-[#1A2434] text-white hover:bg-slate-800 text-[11px] font-bold flex items-center space-x-1 flex-shrink-0 transition-colors"
                              >
                                <span>View</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          )}

                          <div className="text-[10px] text-slate-400 font-mono">
                            Doc ID: {inq.id}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'storage' && (
            <div className="space-y-5">
              {/* Storage Overview Card */}
              <div className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                      <HardDrive className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Google Cloud Firebase Storage</h4>
                      <p className="text-xs text-slate-400">Production Mode Bucket Integration</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Production Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                    <span className="text-[11px] text-slate-400 block">Storage Bucket Endpoint</span>
                    <span className="font-mono font-bold text-amber-300 break-all text-xs">
                      gen-lang-client-0415155844.firebasestorage.app
                    </span>
                  </div>
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                    <span className="text-[11px] text-slate-400 block">Project ID</span>
                    <span className="font-mono font-bold text-slate-200 text-xs">
                      gen-lang-client-0415155844
                    </span>
                  </div>
                </div>
              </div>

              {/* Connected Cloud Directories */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Active Storage Paths & File Handlers
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <h6 className="text-xs font-bold text-slate-900">Leadership Portraits</h6>
                        <span className="text-[10px] font-mono text-slate-500">/team_photos/</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Uploaded director portraits (e.g. Sohail, John) are stored directly in this cloud bucket folder with metadata synced to Firestore.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h6 className="text-xs font-bold text-slate-900">Tender Drawings & Specs</h6>
                        <span className="text-[10px] font-mono text-slate-500">/inquiries/attachments/</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Client architectural plans, IFC drawings, and tender specifications uploaded through Quote/Tender requests are transmitted to this secure cloud folder.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Database: Firestore Enterprise (ai-studio-trendyconstructi)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
