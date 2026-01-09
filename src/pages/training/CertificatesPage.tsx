import { Link } from 'react-router-dom';
import {
  Award,
  Download,
  ExternalLink,
  Calendar,
  Clock,
  CheckCircle,
  Share2,
} from 'lucide-react';
import { useTrainingStore } from '../../store/trainingStore';
import { courses } from '../../data/cnlopbData';

export default function CertificatesPage() {
  const { certificates, isAuthenticated, user } = useTrainingStore();

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center mx-auto mb-6">
          <Award className="w-12 h-12 text-slate-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-4">
          Sign in to view your certificates
        </h1>
        <Link
          to="/training/login"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center mx-auto mb-6">
          <Award className="w-12 h-12 text-slate-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-4">
          No Certificates Yet
        </h1>
        <p className="text-slate-400 mb-8">
          Complete your enrolled courses to earn certificates.
        </p>
        <Link
          to="/training/my-courses"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          View My Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">My Certificates</h1>
        <p className="text-slate-400">
          {certificates.length} certificate{certificates.length !== 1 ? 's' : ''} earned
        </p>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((certificate) => {
          const course = courses.find((c) => c.id === certificate.courseId);
          const isExpired = new Date(certificate.expiryDate) < new Date();
          const daysUntilExpiry = Math.ceil(
            (new Date(certificate.expiryDate).getTime() - Date.now()) /
              (1000 * 60 * 60 * 24)
          );

          return (
            <div
              key={certificate.id}
              className={`bg-slate-800 rounded-xl border ${
                isExpired ? 'border-red-500/50' : 'border-slate-700'
              } overflow-hidden`}
            >
              {/* Certificate Preview */}
              <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6 relative">
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                <div className="relative text-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-blue-200 text-sm uppercase tracking-wide">
                    Certificate of Completion
                  </p>
                  <h3 className="text-white font-bold text-lg mt-2">
                    {certificate.courseName}
                  </h3>
                  <p className="text-blue-100 mt-2">{certificate.userName}</p>
                  <p className="text-blue-200 text-sm mt-4">
                    Certificate #{certificate.certificateNumber}
                  </p>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-5">
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  {isExpired ? (
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-medium flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Expired
                    </span>
                  ) : daysUntilExpiry < 30 ? (
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Expires in {daysUntilExpiry} days
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Valid
                    </span>
                  )}
                </div>

                {/* Dates */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Issued
                    </span>
                    <span className="text-white">
                      {new Date(certificate.issueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Expires
                    </span>
                    <span className={isExpired ? 'text-red-400' : 'text-white'}>
                      {new Date(certificate.expiryDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Accreditation */}
                {course && (
                  <p className="text-slate-500 text-xs mb-4">
                    Accredited by: {course.certification.accreditedBy}
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  <button className="flex-1 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center justify-center">
                    <Download className="w-4 h-4 mr-1" />
                    Download PDF
                  </button>
                  <button className="p-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <a
                    href={certificate.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Verification Note */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-2">Certificate Verification</h3>
        <p className="text-slate-400 text-sm">
          All certificates can be verified online using the verification URL or
          certificate number. Employers and regulatory bodies can confirm the
          validity of your certification at any time.
        </p>
      </div>
    </div>
  );
}
