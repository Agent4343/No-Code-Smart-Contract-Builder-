import { Routes, Route, Navigate } from 'react-router-dom';
import TrainingLayout from './components/training/TrainingLayout';
import TrainingDashboard from './pages/training/TrainingDashboard';
import CourseCatalog from './pages/training/CourseCatalog';
import CourseDetail from './pages/training/CourseDetail';
import LessonPlayer from './pages/training/LessonPlayer';
import QuizPage from './pages/training/QuizPage';
import MyCourses from './pages/training/MyCourses';
import CertificatesPage from './pages/training/CertificatesPage';
import CartPage from './pages/training/CartPage';
import CheckoutSuccess from './pages/training/CheckoutSuccess';
import LoginPage from './pages/training/LoginPage';

function App() {
  return (
    <Routes>
      {/* Redirect root to training dashboard */}
      <Route path="/" element={<Navigate to="/training" replace />} />

      {/* Training Platform Routes */}
      <Route path="/training" element={<TrainingLayout><TrainingDashboard /></TrainingLayout>} />
      <Route path="/training/courses" element={<TrainingLayout><CourseCatalog /></TrainingLayout>} />
      <Route path="/training/course/:slug" element={<TrainingLayout><CourseDetail /></TrainingLayout>} />
      <Route path="/training/learn/:courseId" element={<TrainingLayout><LessonPlayer /></TrainingLayout>} />
      <Route path="/training/quiz/:courseId/:moduleId" element={<TrainingLayout><QuizPage /></TrainingLayout>} />
      <Route path="/training/my-courses" element={<TrainingLayout><MyCourses /></TrainingLayout>} />
      <Route path="/training/certificates" element={<TrainingLayout><CertificatesPage /></TrainingLayout>} />
      <Route path="/training/cart" element={<TrainingLayout><CartPage /></TrainingLayout>} />
      <Route path="/training/checkout/success" element={<TrainingLayout><CheckoutSuccess /></TrainingLayout>} />
      <Route path="/training/login" element={<TrainingLayout><LoginPage /></TrainingLayout>} />

      {/* Catch all - redirect to training */}
      <Route path="*" element={<Navigate to="/training" replace />} />
    </Routes>
  );
}

export default App;
