import { Link } from 'react-router-dom';
import { CheckCircle, BookOpen, ArrowRight } from 'lucide-react';
import { useTrainingStore } from '../../store/trainingStore';

export default function CheckoutSuccess() {
  const { getEnrolledCourses } = useTrainingStore();
  const enrolledCourses = getEnrolledCourses();

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-12 h-12 text-green-400" />
      </div>

      <h1 className="text-3xl font-bold text-white mb-4">
        Thank You for Your Purchase!
      </h1>
      <p className="text-slate-400 mb-8">
        Your enrollment has been confirmed. You now have full access to your courses.
      </p>

      {/* Order Confirmation */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-8 text-left">
        <h2 className="text-lg font-semibold text-white mb-4">What's Next?</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-400 font-semibold">1</span>
            </div>
            <div>
              <p className="text-white font-medium">Start Learning</p>
              <p className="text-slate-400 text-sm">
                Jump into your courses and begin your training journey
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-400 font-semibold">2</span>
            </div>
            <div>
              <p className="text-white font-medium">Complete Modules</p>
              <p className="text-slate-400 text-sm">
                Work through lessons and pass quizzes to progress
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-400 font-semibold">3</span>
            </div>
            <div>
              <p className="text-white font-medium">Earn Your Certificate</p>
              <p className="text-slate-400 text-sm">
                Complete all modules to receive your certification
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled Courses */}
      {enrolledCourses.length > 0 && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 text-left">
            Your Courses
          </h2>
          <div className="space-y-3">
            {enrolledCourses.slice(0, 3).map((course) => (
              <Link
                key={course.id}
                to={`/training/learn/${course.id}`}
                className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl mr-3">
                    {course.category === 'safety-regulations' && '🛡️'}
                    {course.category === 'environmental-compliance' && '🌊'}
                    {course.category === 'drilling-operations' && '🛢️'}
                    {course.category === 'emergency-response' && '🚨'}
                    {course.category === 'helicopter-operations' && '🚁'}
                    {course.category === 'production-operations' && '⚙️'}
                  </div>
                  <span className="text-white font-medium">{course.title}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <Link
          to="/training/my-courses"
          className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center"
        >
          <BookOpen className="w-5 h-5 mr-2" />
          Go to My Courses
        </Link>
        <Link
          to="/training"
          className="w-full sm:w-auto px-6 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
