import { Link } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Award,
  Play,
  CheckCircle,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import { useTrainingStore } from '../../store/trainingStore';
import { courses } from '../../data/cnlopbData';

export default function MyCourses() {
  const { getEnrolledCourses, getCourseProgress, getProgress, isAuthenticated } =
    useTrainingStore();

  const enrolledCourses = getEnrolledCourses();

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-12 h-12 text-slate-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-4">
          Sign in to view your courses
        </h1>
        <p className="text-slate-400 mb-8">
          Access your enrolled courses and track your progress.
        </p>
        <Link
          to="/training/login"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (enrolledCourses.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-12 h-12 text-slate-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-4">
          No Courses Yet
        </h1>
        <p className="text-slate-400 mb-8">
          Start your offshore training journey by enrolling in a course.
        </p>
        <Link
          to="/training/courses"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  // Categorize courses
  const inProgress = enrolledCourses.filter((course) => {
    const progress = getCourseProgress(course.id);
    return progress > 0 && progress < 100;
  });

  const notStarted = enrolledCourses.filter((course) => {
    const progress = getCourseProgress(course.id);
    return progress === 0;
  });

  const completed = enrolledCourses.filter((course) => {
    const progress = getCourseProgress(course.id);
    return progress === 100;
  });

  const CourseCard = ({ course }: { course: typeof courses[0] }) => {
    const progress = getCourseProgress(course.id);
    const courseProgress = getProgress(course.id);

    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-blue-500/50 transition-all">
        <div className="h-32 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-4xl relative">
          {course.category === 'safety-regulations' && '🛡️'}
          {course.category === 'environmental-compliance' && '🌊'}
          {course.category === 'drilling-operations' && '🛢️'}
          {course.category === 'emergency-response' && '🚨'}
          {course.category === 'helicopter-operations' && '🚁'}
          {course.category === 'production-operations' && '⚙️'}

          {progress === 100 && (
            <div className="absolute top-3 right-3 bg-green-500 p-1.5 rounded-full">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-white font-semibold mb-2">{course.title}</h3>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-slate-400">{progress}% complete</span>
              <span className="text-slate-500">
                {courseProgress?.lessonsCompleted.length || 0}/{course.totalLessons} lessons
              </span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  progress === 100
                    ? 'bg-green-500'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-4 text-sm text-slate-400 mb-4">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {Math.round(course.totalDuration / 60)}h
            </span>
            {course.certification.available && (
              <span className="flex items-center">
                <Award className="w-4 h-4 mr-1" />
                Certificate
              </span>
            )}
          </div>

          {/* Last Accessed */}
          {courseProgress?.lastAccessedAt && (
            <p className="text-slate-500 text-xs mb-4 flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              Last accessed{' '}
              {new Date(courseProgress.lastAccessedAt).toLocaleDateString()}
            </p>
          )}

          {/* CTA Button */}
          <Link
            to={`/training/learn/${course.id}`}
            className={`w-full py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center ${
              progress === 100
                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {progress === 100 ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Review Course
              </>
            ) : progress > 0 ? (
              <>
                <Play className="w-4 h-4 mr-2" />
                Continue
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Course
              </>
            )}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">My Courses</h1>
        <p className="text-slate-400">
          {enrolledCourses.length} course{enrolledCourses.length !== 1 ? 's' : ''} enrolled
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Courses</p>
              <p className="text-2xl font-bold text-white">{enrolledCourses.length}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">In Progress</p>
              <p className="text-2xl font-bold text-white">{inProgress.length}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Completed</p>
              <p className="text-2xl font-bold text-white">{completed.length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Certificates</p>
              <p className="text-2xl font-bold text-white">{completed.length}</p>
            </div>
            <Award className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* In Progress */}
      {inProgress.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 text-yellow-400 mr-2" />
            Continue Learning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgress.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}

      {/* Not Started */}
      {notStarted.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <BookOpen className="w-5 h-5 text-blue-400 mr-2" />
            Not Started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notStarted.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
            Completed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completed.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
