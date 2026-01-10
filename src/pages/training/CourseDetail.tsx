import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  BookOpen,
  Award,
  Star,
  Users,
  Play,
  Check,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  Lock,
  FileText,
  Target,
  CheckCircle,
} from 'lucide-react';
import { useTrainingStore } from '../../store/trainingStore';
import { courses, avatars } from '../../data/cnlopbData';
import AIAvatar from '../../components/training/AIAvatar';

export default function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const { addToCart, cart, isEnrolled, isAuthenticated } =
    useTrainingStore();

  const course = courses.find((c) => c.slug === slug);
  const instructor = course
    ? avatars.find((a) => a.id === course.instructorAvatarId)
    : null;

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-white mb-4">Course not found</h2>
        <Link to="/training/courses" className="text-blue-400 hover:text-blue-300">
          Browse all courses
        </Link>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);
  const inCart = cart.some((item) => item.id === course.id);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/training/login');
      return;
    }

    if (!enrolled && !inCart) {
      addToCart({
        type: 'course',
        id: course.id,
        name: course.title,
        price: course.pricing.basePrice,
      });
    }
  };

  const handleStartCourse = () => {
    navigate(`/training/learn/${course.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="flex-1">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-slate-400 mb-4">
              <Link to="/training" className="hover:text-white">
                Training
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/training/courses" className="hover:text-white">
                Courses
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-slate-300">{course.title}</span>
            </div>

            {/* Tags */}
            <div className="flex items-center space-x-2 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                  Certificate Included
                </span>
              )}
              {course.featured && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-white mb-4">{course.title}</h1>

            {/* Description */}
            <p className="text-slate-300 text-lg mb-6">{course.description}</p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-6">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="text-white font-medium">{course.rating}</span>
                <span className="ml-1">({course.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-1" />
                {course.enrollmentCount.toLocaleString()} enrolled
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-1" />
                {Math.round(course.totalDuration / 60)} hours
              </div>
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-1" />
                {course.totalLessons} lessons
              </div>
            </div>

            {/* Instructor */}
            {instructor && (
              <div className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg">
                <AIAvatar avatar={instructor} size="small" showControls={false} />
                <div>
                  <p className="text-white font-medium">{instructor.name}</p>
                  <p className="text-slate-400 text-sm">{instructor.role}</p>
                </div>
              </div>
            )}
          </div>

          {/* Purchase Card */}
          <div className="lg:w-80 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-6xl">
              {course.category === 'safety-regulations' && '🛡️'}
              {course.category === 'environmental-compliance' && '🌊'}
              {course.category === 'drilling-operations' && '🛢️'}
              {course.category === 'emergency-response' && '🚨'}
              {course.category === 'helicopter-operations' && '🚁'}
              {course.category === 'production-operations' && '⚙️'}
            </div>

            <div className="p-6">
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold text-white">
                  ${course.pricing.basePrice}
                </span>
                <span className="text-slate-400 ml-2">CAD</span>
              </div>

              {enrolled ? (
                <button
                  onClick={handleStartCourse}
                  className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Continue Learning
                </button>
              ) : inCart ? (
                <Link
                  to="/training/cart"
                  className="w-full py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-colors flex items-center justify-center"
                >
                  <Check className="w-5 h-5 mr-2" />
                  View Cart
                </Link>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
              )}

              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Lifetime access
                </div>
                <div className="flex items-center text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  AI avatar instruction
                </div>
                {course.certification.available && (
                  <div className="flex items-center text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Certificate of completion
                  </div>
                )}
                <div className="flex items-center text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Mobile access
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Long Description */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              About This Course
            </h2>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {course.longDescription}
            </p>
          </div>

          {/* Learning Objectives */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-400" />
              What You'll Learn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.learningObjectives.map((objective, index) => (
                <div key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{objective}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Curriculum */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
              Course Curriculum
            </h2>

            <div className="space-y-4">
              {course.modules.map((module, index) => (
                <div
                  key={module.id}
                  className="border border-slate-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center justify-between p-4 bg-slate-700/50 hover:bg-slate-700 transition-colors"
                  >
                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </span>
                      <div className="text-left">
                        <h3 className="text-white font-medium">{module.title}</h3>
                        <p className="text-slate-400 text-sm">
                          {module.lessons.length} lessons · {module.estimatedTime}{' '}
                          min
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${
                        expandedModules.includes(module.id) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedModules.includes(module.id) && (
                    <div className="p-4 space-y-2">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-700/50"
                        >
                          <div className="flex items-center">
                            {enrolled ? (
                              <Play className="w-4 h-4 text-blue-400 mr-3" />
                            ) : (
                              <Lock className="w-4 h-4 text-slate-500 mr-3" />
                            )}
                            <span className="text-slate-300">{lesson.title}</span>
                          </div>
                          <span className="text-slate-500 text-sm">
                            {lesson.duration} min
                          </span>
                        </div>
                      ))}

                      {/* Quiz indicator */}
                      <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 text-purple-400 mr-3" />
                          <span className="text-purple-300">Module Quiz</span>
                        </div>
                        <span className="text-purple-400 text-sm">
                          {module.quiz.questions.length} questions
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Target Audience */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Who This Course Is For
            </h3>
            <ul className="space-y-2">
              {course.targetAudience.map((audience, index) => (
                <li key={index} className="flex items-start text-slate-300 text-sm">
                  <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  {audience}
                </li>
              ))}
            </ul>
          </div>

          {/* Certification Info */}
          {course.certification.available && (
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 text-purple-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Certification</h3>
              </div>
              <div className="space-y-3 text-sm">
                <p className="text-slate-300">{course.certification.name}</p>
                <div className="flex justify-between text-slate-400">
                  <span>Validity Period</span>
                  <span className="text-white">
                    {course.certification.validityPeriod} months
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Accredited By</span>
                  <span className="text-white">
                    {course.certification.accreditedBy}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Course Tags */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/training/courses?search=${tag}`}
                  className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm hover:bg-slate-600 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
