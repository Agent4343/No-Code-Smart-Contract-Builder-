import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  Clock,
  BookOpen,
  Award,
  Star,
  ShoppingCart,
  Check,
  Users,
  ChevronDown,
} from 'lucide-react';
import { useTrainingStore } from '../../store/trainingStore';
import { courses, courseBundles, pricingPackages } from '../../data/cnlopbData';
import type { Course, CourseCategory } from '../../types/training';

const categories: { value: CourseCategory | 'all'; label: string; icon: string }[] = [
  { value: 'all', label: 'All Categories', icon: '📚' },
  { value: 'safety-regulations', label: 'Safety Regulations', icon: '🛡️' },
  { value: 'environmental-compliance', label: 'Environmental Compliance', icon: '🌊' },
  { value: 'drilling-operations', label: 'Drilling Operations', icon: '🛢️' },
  { value: 'emergency-response', label: 'Emergency Response', icon: '🚨' },
  { value: 'helicopter-operations', label: 'Helicopter Operations', icon: '🚁' },
  { value: 'production-operations', label: 'Production Operations', icon: '⚙️' },
];

const levels = [
  { value: 'all', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export default function CourseCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'all'
  );
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'courses' | 'bundles' | 'pricing'>('courses');

  const { addToCart, cart, isEnrolled } = useTrainingStore();

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        searchQuery === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === 'all' || course.category === selectedCategory;

      const matchesLevel =
        selectedLevel === 'all' ||
        course.level === selectedLevel ||
        course.level === 'all-levels';

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

  const isInCart = (id: string) => cart.some((item) => item.id === id);

  const handleAddToCart = (course: Course) => {
    if (!isInCart(course.id) && !isEnrolled(course.id)) {
      addToCart({
        type: 'course',
        id: course.id,
        name: course.title,
        price: course.pricing.basePrice,
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Course Catalog</h1>
          <p className="text-slate-400 mt-1">
            Comprehensive C-NLOER regulatory training courses
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2 bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode('courses')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'courses'
                ? 'bg-blue-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Courses
          </button>
          <button
            onClick={() => setViewMode('bundles')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'bundles'
                ? 'bg-blue-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Bundles
          </button>
          <button
            onClick={() => setViewMode('pricing')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'pricing'
                ? 'bg-blue-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Plans
          </button>
        </div>
      </div>

      {/* Courses View */}
      {viewMode === 'courses' && (
        <>
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSearchParams(
                      e.target.value === 'all'
                        ? {}
                        : { category: e.target.value }
                    );
                  }}
                  className="appearance-none pl-4 pr-10 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  {levels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-slate-400 text-sm">
            Showing {filteredCourses.length} of {courses.length} courses
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-blue-500/50 transition-all group"
              >
                <Link to={`/training/course/${course.slug}`}>
                  <div className="h-40 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-5xl relative">
                    {course.category === 'safety-regulations' && '🛡️'}
                    {course.category === 'environmental-compliance' && '🌊'}
                    {course.category === 'drilling-operations' && '🛢️'}
                    {course.category === 'emergency-response' && '🚨'}
                    {course.category === 'helicopter-operations' && '🚁'}
                    {course.category === 'production-operations' && '⚙️'}
                    {course.featured && (
                      <span className="absolute top-3 right-3 px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded">
                        Featured
                      </span>
                    )}
                  </div>
                </Link>

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
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-500/20 text-purple-400 flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        Certificate
                      </span>
                    )}
                  </div>

                  <Link to={`/training/course/${course.slug}`}>
                    <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </h3>
                  </Link>

                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center space-x-3 text-slate-500">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {Math.round(course.totalDuration / 60)}h
                      </span>
                      <span className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {course.totalLessons}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.enrollmentCount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(course.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-slate-600'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-slate-400 text-sm">
                        {course.rating} ({course.reviewCount})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <span className="text-xl font-bold text-white">
                      ${course.pricing.basePrice}
                      <span className="text-sm font-normal text-slate-400 ml-1">
                        CAD
                      </span>
                    </span>

                    {isEnrolled(course.id) ? (
                      <Link
                        to={`/training/learn/${course.id}`}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Continue
                      </Link>
                    ) : isInCart(course.id) ? (
                      <span className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm font-medium flex items-center">
                        <Check className="w-4 h-4 mr-1" />
                        In Cart
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(course)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400">
                No courses found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                }}
                className="mt-4 text-blue-400 hover:text-blue-300"
              >
                Clear filters
              </button>
            </div>
          )}
        </>
      )}

      {/* Bundles View */}
      {viewMode === 'bundles' && (
        <div className="space-y-6">
          <p className="text-slate-400">
            Save money with our course bundles - perfect for comprehensive training
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courseBundles.map((bundle) => {
              const bundleCourses = courses.filter((c) =>
                bundle.courses.includes(c.id)
              );

              return (
                <div
                  key={bundle.id}
                  className={`bg-slate-800 rounded-xl border ${
                    bundle.featured
                      ? 'border-blue-500'
                      : 'border-slate-700'
                  } overflow-hidden`}
                >
                  {bundle.featured && (
                    <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {bundle.name}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4">
                      {bundle.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {bundleCourses.map((course) => (
                        <div
                          key={course.id}
                          className="flex items-center text-slate-300 text-sm"
                        >
                          <Check className="w-4 h-4 text-green-400 mr-2" />
                          {course.title}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-baseline space-x-3 mb-4">
                      <span className="text-3xl font-bold text-white">
                        ${bundle.bundlePrice}
                      </span>
                      <span className="text-slate-500 line-through">
                        ${bundle.originalPrice}
                      </span>
                      <span className="text-green-400 text-sm font-medium">
                        Save ${bundle.savings}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        addToCart({
                          type: 'bundle',
                          id: bundle.id,
                          name: bundle.name,
                          price: bundle.bundlePrice,
                        })
                      }
                      disabled={isInCart(bundle.id)}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        isInCart(bundle.id)
                          ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      {isInCart(bundle.id) ? 'Added to Cart' : 'Get Bundle'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pricing Plans View */}
      {viewMode === 'pricing' && (
        <div className="space-y-6">
          <p className="text-slate-400">
            Choose the plan that works best for you or your organization
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-slate-800 rounded-xl border ${
                  pkg.popular
                    ? 'border-blue-500 ring-2 ring-blue-500/20'
                    : 'border-slate-700'
                } overflow-hidden relative`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    Popular
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">
                    {pkg.description}
                  </p>

                  <div className="mb-6">
                    {pkg.price === 0 ? (
                      <span className="text-3xl font-bold text-white">
                        {pkg.id === 'pkg-enterprise' ? 'Custom' : 'Free'}
                      </span>
                    ) : (
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-white">
                          ${pkg.price}
                        </span>
                        <span className="text-slate-400 ml-1">/month</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start text-slate-300 text-sm"
                      >
                        <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      pkg.popular
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-slate-700 text-white hover:bg-slate-600'
                    }`}
                  >
                    {pkg.id === 'pkg-enterprise'
                      ? 'Contact Sales'
                      : pkg.price === 0
                      ? 'Get Started'
                      : 'Subscribe'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Enterprise Training Solutions
                </h3>
                <p className="text-blue-100 max-w-xl">
                  Need to train your entire offshore workforce? Get custom
                  pricing, dedicated support, LMS integration, and more.
                </p>
              </div>
              <Link
                to="/training/enterprise"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
