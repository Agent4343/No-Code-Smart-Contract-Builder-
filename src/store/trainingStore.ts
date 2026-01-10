import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Course,
  UserProgress,
  QuizAttempt,
  Enrollment,
  Certificate,
  Avatar,
} from '../types/training';
import { courses, avatars, courseBundles } from '../data/cnlopbData';

interface CartItem {
  type: 'course' | 'bundle' | 'subscription';
  id: string;
  name: string;
  price: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
  avatar?: string;
}

interface TrainingState {
  // User
  user: User | null;
  isAuthenticated: boolean;

  // Courses
  courses: Course[];
  enrollments: Enrollment[];
  userProgress: Record<string, UserProgress>;
  certificates: Certificate[];

  // Current Session
  currentCourseId: string | null;
  currentModuleId: string | null;
  currentLessonId: string | null;
  currentQuizId: string | null;

  // Cart
  cart: CartItem[];
  cartTotal: number;

  // UI State
  showAvatarHelper: boolean;
  currentAvatarId: string | null;

  // Actions - User
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // Actions - Courses
  enrollInCourse: (courseId: string, paymentId?: string) => void;
  unenrollFromCourse: (courseId: string) => void;
  getEnrolledCourses: () => Course[];
  isEnrolled: (courseId: string) => boolean;

  // Actions - Progress
  startLesson: (courseId: string, moduleId: string, lessonId: string) => void;
  completeLesson: (courseId: string, moduleId: string, lessonId: string) => void;
  startQuiz: (courseId: string, quizId: string) => void;
  submitQuizAttempt: (courseId: string, quizId: string, attempt: QuizAttempt) => void;
  getProgress: (courseId: string) => UserProgress | null;
  getCourseProgress: (courseId: string) => number;

  // Actions - Certificates
  issueCertificate: (courseId: string) => Certificate | null;
  getCertificates: () => Certificate[];

  // Actions - Cart
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  checkout: () => Promise<boolean>;

  // Actions - Navigation
  setCurrentCourse: (courseId: string | null) => void;
  setCurrentModule: (moduleId: string | null) => void;
  setCurrentLesson: (lessonId: string | null) => void;
  setCurrentQuiz: (quizId: string | null) => void;

  // Actions - Avatar
  setShowAvatarHelper: (show: boolean) => void;
  setCurrentAvatar: (avatarId: string | null) => void;
  getAvatar: (avatarId: string) => Avatar | undefined;
}

export const useTrainingStore = create<TrainingState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      isAuthenticated: false,
      courses: courses,
      enrollments: [],
      userProgress: {},
      certificates: [],
      currentCourseId: null,
      currentModuleId: null,
      currentLessonId: null,
      currentQuizId: null,
      cart: [],
      cartTotal: 0,
      showAvatarHelper: true,
      currentAvatarId: null,

      // User Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),

      login: async (email, _password) => {
        // Simulated login - in production, this would call an API
        const mockUser: User = {
          id: 'user-' + Date.now(),
          name: email.split('@')[0],
          email,
          company: 'Offshore Corp',
          role: 'Drilling Engineer',
        };
        set({ user: mockUser, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          currentCourseId: null,
          currentModuleId: null,
          currentLessonId: null,
          currentQuizId: null,
        });
      },

      // Course Actions
      enrollInCourse: (courseId, paymentId) => {
        const { enrollments, user } = get();
        if (!user) return;

        const existingEnrollment = enrollments.find((e) => e.courseId === courseId);
        if (existingEnrollment) return;

        const course = courses.find((c) => c.id === courseId);
        if (!course) return;

        const newEnrollment: Enrollment = {
          id: `enroll-${Date.now()}`,
          oderId: user.id,
          courseId,
          purchaseDate: new Date().toISOString(),
          paymentStatus: paymentId ? 'completed' : 'pending',
          amount: course.pricing.basePrice,
          accessType: 'lifetime',
        };

        const initialProgress: UserProgress = {
          oderId: user.id,
          courseId,
          modulesCompleted: [],
          lessonsCompleted: [],
          quizAttempts: [],
          overallProgress: 0,
          startedAt: new Date().toISOString(),
          lastAccessedAt: new Date().toISOString(),
          certificateIssued: false,
        };

        set({
          enrollments: [...enrollments, newEnrollment],
          userProgress: {
            ...get().userProgress,
            [courseId]: initialProgress,
          },
        });
      },

      unenrollFromCourse: (courseId) => {
        const { enrollments, userProgress } = get();
        const newProgress = { ...userProgress };
        delete newProgress[courseId];

        set({
          enrollments: enrollments.filter((e) => e.courseId !== courseId),
          userProgress: newProgress,
        });
      },

      getEnrolledCourses: () => {
        const { enrollments } = get();
        return courses.filter((course) =>
          enrollments.some((e) => e.courseId === course.id && e.paymentStatus === 'completed')
        );
      },

      isEnrolled: (courseId) => {
        const { enrollments } = get();
        return enrollments.some(
          (e) => e.courseId === courseId && e.paymentStatus === 'completed'
        );
      },

      // Progress Actions
      startLesson: (courseId, moduleId, lessonId) => {
        set({
          currentCourseId: courseId,
          currentModuleId: moduleId,
          currentLessonId: lessonId,
        });

        const { userProgress } = get();
        const progress = userProgress[courseId];
        if (progress) {
          set({
            userProgress: {
              ...userProgress,
              [courseId]: {
                ...progress,
                lastAccessedAt: new Date().toISOString(),
              },
            },
          });
        }
      },

      completeLesson: (courseId, moduleId, lessonId) => {
        const { userProgress } = get();
        const progress = userProgress[courseId];
        if (!progress) return;

        const course = courses.find((c) => c.id === courseId);
        if (!course) return;

        const newLessonsCompleted = progress.lessonsCompleted.includes(lessonId)
          ? progress.lessonsCompleted
          : [...progress.lessonsCompleted, lessonId];

        // Check if module is complete
        const module = course.modules.find((m) => m.id === moduleId);
        const moduleLessonIds = module?.lessons.map((l) => l.id) || [];
        const moduleComplete = moduleLessonIds.every((id) =>
          newLessonsCompleted.includes(id)
        );

        const newModulesCompleted =
          moduleComplete && !progress.modulesCompleted.includes(moduleId)
            ? [...progress.modulesCompleted, moduleId]
            : progress.modulesCompleted;

        // Calculate overall progress
        const totalLessons = course.modules.reduce(
          (acc, m) => acc + m.lessons.length,
          0
        );
        const overallProgress = Math.round(
          (newLessonsCompleted.length / totalLessons) * 100
        );

        set({
          userProgress: {
            ...userProgress,
            [courseId]: {
              ...progress,
              lessonsCompleted: newLessonsCompleted,
              modulesCompleted: newModulesCompleted,
              overallProgress,
              lastAccessedAt: new Date().toISOString(),
            },
          },
        });
      },

      startQuiz: (courseId, quizId) => {
        set({
          currentCourseId: courseId,
          currentQuizId: quizId,
        });
      },

      submitQuizAttempt: (courseId, _quizId, attempt) => {
        const { userProgress } = get();
        const progress = userProgress[courseId];
        if (!progress) return;

        const newAttempts = [...progress.quizAttempts, attempt];

        // Check if course is complete (all modules done + passed all quizzes)
        const course = courses.find((c) => c.id === courseId);
        if (!course) return;

        const allModulesComplete =
          progress.modulesCompleted.length === course.modules.length;
        const allQuizzesPassed = course.modules.every((module) => {
          const quizAttempts = newAttempts.filter(
            (a) => a.quizId === module.quiz.id
          );
          return quizAttempts.some((a) => a.passed);
        });

        const isComplete = allModulesComplete && allQuizzesPassed;

        set({
          userProgress: {
            ...userProgress,
            [courseId]: {
              ...progress,
              quizAttempts: newAttempts,
              completedAt: isComplete ? new Date().toISOString() : undefined,
              lastAccessedAt: new Date().toISOString(),
            },
          },
          currentQuizId: null,
        });
      },

      getProgress: (courseId) => {
        return get().userProgress[courseId] || null;
      },

      getCourseProgress: (courseId) => {
        const progress = get().userProgress[courseId];
        return progress?.overallProgress || 0;
      },

      // Certificate Actions
      issueCertificate: (courseId) => {
        const { user, userProgress, certificates } = get();
        if (!user) return null;

        const progress = userProgress[courseId];
        if (!progress || !progress.completedAt) return null;

        const course = courses.find((c) => c.id === courseId);
        if (!course || !course.certification.available) return null;

        // Check if certificate already issued
        const existingCert = certificates.find(
          (c) => c.courseId === courseId && c.oderId === user.id
        );
        if (existingCert) return existingCert;

        const newCertificate: Certificate = {
          id: `cert-${Date.now()}`,
          oderId: user.id,
          courseId,
          courseName: course.title,
          userName: user.name,
          issueDate: new Date().toISOString(),
          expiryDate: new Date(
            Date.now() + course.certification.validityPeriod * 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
          certificateNumber: `C-NLOER-${Date.now().toString(36).toUpperCase()}`,
          verificationUrl: `https://verify.c-nloer-training.ca/cert/${Date.now().toString(36)}`,
        };

        set({
          certificates: [...certificates, newCertificate],
          userProgress: {
            ...userProgress,
            [courseId]: {
              ...progress,
              certificateIssued: true,
              certificateId: newCertificate.id,
            },
          },
        });

        return newCertificate;
      },

      getCertificates: () => {
        return get().certificates;
      },

      // Cart Actions
      addToCart: (item) => {
        const { cart } = get();
        const existingItem = cart.find((i) => i.id === item.id);
        if (existingItem) return;

        const newCart = [...cart, item];
        set({
          cart: newCart,
          cartTotal: newCart.reduce((sum, i) => sum + i.price, 0),
        });
      },

      removeFromCart: (itemId) => {
        const { cart } = get();
        const newCart = cart.filter((i) => i.id !== itemId);
        set({
          cart: newCart,
          cartTotal: newCart.reduce((sum, i) => sum + i.price, 0),
        });
      },

      clearCart: () => {
        set({ cart: [], cartTotal: 0 });
      },

      checkout: async () => {
        const { cart, user, enrollInCourse } = get();
        if (!user || cart.length === 0) return false;

        // Process each item in cart
        for (const item of cart) {
          if (item.type === 'course') {
            enrollInCourse(item.id, `payment-${Date.now()}`);
          } else if (item.type === 'bundle') {
            const bundle = courseBundles.find((b) => b.id === item.id);
            if (bundle) {
              bundle.courses.forEach((courseId) => {
                enrollInCourse(courseId, `payment-${Date.now()}`);
              });
            }
          }
        }

        set({ cart: [], cartTotal: 0 });
        return true;
      },

      // Navigation Actions
      setCurrentCourse: (courseId) => set({ currentCourseId: courseId }),
      setCurrentModule: (moduleId) => set({ currentModuleId: moduleId }),
      setCurrentLesson: (lessonId) => set({ currentLessonId: lessonId }),
      setCurrentQuiz: (quizId) => set({ currentQuizId: quizId }),

      // Avatar Actions
      setShowAvatarHelper: (show) => set({ showAvatarHelper: show }),
      setCurrentAvatar: (avatarId) => set({ currentAvatarId: avatarId }),
      getAvatar: (avatarId) => avatars.find((a) => a.id === avatarId),
    }),
    {
      name: 'c-nloer-training-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        enrollments: state.enrollments,
        userProgress: state.userProgress,
        certificates: state.certificates,
        cart: state.cart,
        cartTotal: state.cartTotal,
      }),
    }
  )
);
