import { Link } from 'react-router-dom';
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  Play,
  ChevronRight,
  Target,
  Users,
  Shield,
  Anchor,
} from 'lucide-react';
import { useTrainingStore } from '../../store/trainingStore';
import { getFeaturedCourses, avatars } from '../../data/cnlopbData';
import AIAvatar from '../../components/training/AIAvatar';

export default function TrainingDashboard() {
  const { isAuthenticated, user, getEnrolledCourses, getCourseProgress, certificates } =
    useTrainingStore();

  const enrolledCourses = getEnrolledCourses();
  const featuredCourses = getFeaturedCourses();
  const welcomeAvatar = avatars.find((a) => a.id === 'safety-officer-maria')!;

  // Calculate stats
  const totalCertificates = certificates.length;
  const coursesInProgress = enrolledCourses.filter(
    (c) => getCourseProgress(c.id) > 0 && getCourseProgress(c.id) < 100
  ).length;
  const completedCourses = enrolledCourses.filter(
    (c) => getCourseProgress(c.id) === 100
  ).length;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-blue-200 mb-3">
              <Anchor className="w-5 h-5" />
              <span className="text-sm font-medium">C-NLOER Certified Training</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              {isAuthenticated
                ? `Welcome back, ${user?.name}!`
                : 'Offshore Training Platform'}
            </h1>
            <p className="text-blue-100 mb-6">
              Master C-NLOER regulations with interactive AI-powered training.
              Get certified and stay compliant with Canada-Newfoundland and Labrador
              offshore petroleum industry standards.
            </p>
            <div className="flex items-center space-x-4">
              <Link
                to="/training/courses"
                className="px-6 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Browse Courses
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/training/login"
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          <div className="hidden lg:block">
            <AIAvatar
              avatar={welcomeAvatar}
              size="large"
              showControls={false}
              isActive={true}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      {isAuthenticated && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Enrolled Courses</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {enrolledCourses.length}
                </p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {coursesInProgress}
                </p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Completed</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {completedCourses}
                </p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Certificates</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {totalCertificates}
                </p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Continue Learning Section */}
      {isAuthenticated && enrolledCourses.length > 0 && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Continue Learning</h2>
            <Link
              to="/training/my-courses"
              className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledCourses.slice(0, 3).map((course) => {
              const progress = getCourseProgress(course.id);
              return (
                <Link
                  key={course.id}
                  to={`/training/learn/${course.id}`}
                  className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-colors group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl">
                      {course.category === 'safety-regulations' && '🛡️'}
                      {course.category === 'environmental-compliance' && '🌊'}
                      {course.category === 'drilling-operations' && '🛢️'}
                      {course.category === 'emergency-response' && '🚨'}
                      {course.category === 'helicopter-operations' && '🚁'}
                      {course.category === 'production-operations' && '⚙️'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate group-hover:text-blue-400 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-slate-400 text-sm mt-1">
                        {progress}% complete
                      </p>
                      <div className="mt-2 h-1.5 bg-slate-600 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <Play className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Featured Courses */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Featured Courses</h2>
          <Link
            to="/training/courses"
            className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
          >
            View All Courses <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <Link
              key={course.id}
              to={`/training/course/${course.slug}`}
              className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-blue-500/50 transition-all group"
            >
              <div className="h-40 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-5xl">
                {course.category === 'safety-regulations' && '🛡️'}
                {course.category === 'environmental-compliance' && '🌊'}
                {course.category === 'drilling-operations' && '🛢️'}
                {course.category === 'emergency-response' && '🚨'}
                {course.category === 'helicopter-operations' && '🚁'}
                {course.category === 'production-operations' && '⚙️'}
              </div>

              <div className="p-5">
                <div className="flex items-center space-x-2 mb-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      course.level === 'beginner'
                        ? 'bg-green-500/20 text-green-400'
                        : course.level === 'intermediate'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : course.level === 'advanced'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    {course.level}
                  </span>
                  {course.certification.available && (
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-500/20 text-purple-400">
                      Certificate
                    </span>
                  )}
                </div>

                <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  {course.title}
                </h3>

                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4 text-slate-500">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {Math.round(course.totalDuration / 60)}h
                    </span>
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {course.totalLessons} lessons
                    </span>
                  </div>
                  <span className="text-white font-semibold">
                    ${course.pricing.basePrice}
                  </span>
                </div>

                <div className="flex items-center mt-4 pt-4 border-t border-slate-700">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(course.rating)
                            ? 'text-yellow-400'
                            : 'text-slate-600'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-slate-400">
                      {course.rating} ({course.reviewCount})
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          Why Choose C-NLOER Training Platform?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">C-NLOER Compliant</h3>
            <p className="text-slate-400 text-sm">
              All courses align with current C-NLOER regulations and standards
            </p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">AI Instructors</h3>
            <p className="text-slate-400 text-sm">
              Interactive AI avatars provide personalized learning experiences
            </p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <Award className="w-7 h-7 text-green-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Certification</h3>
            <p className="text-slate-400 text-sm">
              Earn recognized certificates upon successful course completion
            </p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 rounded-xl bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
              <Target className="w-7 h-7 text-yellow-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Practical Focus</h3>
            <p className="text-slate-400 text-sm">
              Real-world scenarios and practical applications for offshore work
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Safety', icon: '🛡️', slug: 'safety-regulations', count: 2 },
            { name: 'Environmental', icon: '🌊', slug: 'environmental-compliance', count: 1 },
            { name: 'Drilling', icon: '🛢️', slug: 'drilling-operations', count: 1 },
            { name: 'Emergency', icon: '🚨', slug: 'emergency-response', count: 1 },
            { name: 'Helicopter', icon: '🚁', slug: 'helicopter-operations', count: 1 },
            { name: 'Production', icon: '⚙️', slug: 'production-operations', count: 1 },
          ].map((category) => (
            <Link
              key={category.slug}
              to={`/training/courses?category=${category.slug}`}
              className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-blue-500/50 transition-all text-center group"
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                {category.name}
              </h3>
              <p className="text-slate-500 text-sm">{category.count} courses</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
