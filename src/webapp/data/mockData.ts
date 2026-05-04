import type { AdminStats } from '../entities/admin';
import type { Course } from '../entities/course';
import type { Lesson } from '../entities/lesson';
import type { AppNotification } from '../entities/notification';
import type { Quiz } from '../entities/quiz';
import type { TeacherCourse } from '../entities/teacher';

export const courses: Course[] = [
  {
    id: '1',
    title: 'React Native Cơ Bản',
    description: 'Học xây dựng ứng dụng mobile với React Native từ đầu. Khóa học cung cấp kiến thức nền tảng về React Native, giúp bạn xây dựng ứng dụng di động đa nền tảng một cách hiệu quả.',
    instructor: 'Nguyễn Thị Mai',
    progress: 100,
    duration: '12 giờ',
    lessons: 24,
    level: 'Cơ bản',
    rating: 4.8,
    students: 1250,
    price: 499000,
    category: 'Mobile Development',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    enrolled: true,
    requirements: [
      'Kiến thức cơ bản về JavaScript',
      'Hiểu biết về HTML & CSS',
      'Máy tính cài đặt Node.js'
    ],
    outcomes: [
      'Xây dựng ứng dụng mobile hoàn chỉnh',
      'Làm chủ React Native Components',
      'Tích hợp API và quản lý State',
      'Deploy ứng dụng lên App Store/Google Play'
    ],
    syllabus: [
      { title: 'Giới thiệu & Setup', lessons: 3 },
      { title: 'React Native Cơ bản', lessons: 6 },
      { title: 'Styling & Layout', lessons: 5 },
      { title: 'Navigation', lessons: 4 },
      { title: 'State Management', lessons: 4 },
      { title: 'Dự án thực tế', lessons: 2 }
    ]
  },
  {
    id: '2',
    title: 'Flutter Advanced',
    description: 'Nâng cao kỹ năng phát triển ứng dụng với Flutter. Khóa học chuyên sâu về Flutter, giúp bạn xây dựng ứng dụng phức tạp với hiệu suất cao và UI đẹp mắt.',
    instructor: 'Trần Văn Long',
    progress: 30,
    duration: '16 giờ',
    lessons: 32,
    level: 'Nâng cao',
    rating: 4.9,
    students: 980,
    price: 799000,
    category: 'Mobile Development',
    thumbnail: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&h=300&fit=crop',
    enrolled: true,
    requirements: [
      'Đã có kiến thức Flutter cơ bản',
      'Hiểu về OOP trong Dart',
      'Kinh nghiệm xây dựng ít nhất 1 app Flutter'
    ],
    outcomes: [
      'Xây dựng ứng dụng Flutter phức tạp',
      'Tối ưu hiệu suất ứng dụng',
      'State Management nâng cao (BLoC, Riverpod)',
      'Testing và CI/CD cho Flutter'
    ],
    syllabus: [
      { title: 'Advanced Widgets', lessons: 6 },
      { title: 'State Management', lessons: 8 },
      { title: 'Performance Optimization', lessons: 5 },
      { title: 'Testing', lessons: 4 },
      { title: 'Native Integration', lessons: 5 },
      { title: 'Production Deployment', lessons: 4 }
    ]
  },
  {
    id: '3',
    title: 'Swift UI Fundamentals',
    description: 'Xây dựng ứng dụng iOS với SwiftUI hiện đại. Học cách tạo giao diện người dùng đẹp mắt và tương tác mượt mà với framework mới nhất của Apple.',
    instructor: 'Lê Minh Tuấn',
    progress: 0,
    duration: '10 giờ',
    lessons: 20,
    level: 'Trung bình',
    rating: 4.7,
    students: 750,
    price: 599000,
    category: 'iOS Development',
    thumbnail: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&h=300&fit=crop',
    enrolled: false,
    requirements: [
      'Kiến thức cơ bản về Swift',
      'MacOS với Xcode 14+',
      'Hiểu biết về lập trình iOS'
    ],
    outcomes: [
      'Tạo UI hiện đại với SwiftUI',
      'Làm việc với Data và Combine',
      'Animation và Gesture',
      'Publish ứng dụng lên App Store'
    ],
    syllabus: [
      { title: 'SwiftUI Basics', lessons: 4 },
      { title: 'Views & Modifiers', lessons: 5 },
      { title: 'State & Data Flow', lessons: 4 },
      { title: 'Lists & Navigation', lessons: 3 },
      { title: 'Animations', lessons: 2 },
      { title: 'Final Project', lessons: 2 }
    ]
  },
  {
    id: '4',
    title: 'Kotlin for Android',
    description: 'Lập trình Android với Kotlin một cách chuyên nghiệp. Khóa học toàn diện về phát triển ứng dụng Android hiện đại với ngôn ngữ Kotlin.',
    instructor: 'Phạm Thị Hương',
    progress: 0,
    duration: '14 giờ',
    lessons: 28,
    level: 'Cơ bản',
    rating: 4.6,
    students: 1100,
    price: 699000,
    category: 'Android Development',
    thumbnail: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400&h=300&fit=crop',
    enrolled: false,
    requirements: [
      'Kiến thức lập trình cơ bản',
      'Android Studio đã cài đặt',
      'Máy tính cấu hình trung bình'
    ],
    outcomes: [
      'Xây dựng ứng dụng Android với Kotlin',
      'Làm việc với Android Jetpack',
      'Room Database & MVVM',
      'Publish lên Google Play Store'
    ],
    syllabus: [
      { title: 'Kotlin Fundamentals', lessons: 5 },
      { title: 'Android Components', lessons: 6 },
      { title: 'UI Development', lessons: 6 },
      { title: 'Data Persistence', lessons: 4 },
      { title: 'Networking', lessons: 4 },
      { title: 'Publishing', lessons: 3 }
    ]
  },
  {
    id: '5',
    title: 'iOS App Development với Swift',
    description: 'Khóa học đầy đủ về phát triển ứng dụng iOS từ cơ bản đến nâng cao. Học Swift, UIKit và các framework quan trọng của Apple.',
    instructor: 'Đặng Văn Nam',
    progress: 0,
    duration: '18 giờ',
    lessons: 36,
    level: 'Cơ bản',
    rating: 4.9,
    students: 2100,
    price: 899000,
    category: 'iOS Development',
    thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop',
    enrolled: false,
    requirements: [
      'MacOS với Xcode',
      'Không cần kiến thức lập trình trước',
      'Đam mê phát triển iOS'
    ],
    outcomes: [
      'Nắm vững ngôn ngữ Swift',
      'Xây dựng ứng dụng iOS hoàn chỉnh',
      'Làm việc với Core Data & CloudKit',
      'Submit app lên App Store'
    ],
    syllabus: [
      { title: 'Swift Programming', lessons: 8 },
      { title: 'UIKit Fundamentals', lessons: 8 },
      { title: 'Networking & APIs', lessons: 6 },
      { title: 'Data Management', lessons: 6 },
      { title: 'Advanced Topics', lessons: 5 },
      { title: 'App Store Submission', lessons: 3 }
    ]
  },
  {
    id: '6',
    title: 'Jetpack Compose Modern Android',
    description: 'Học cách xây dựng UI Android hiện đại với Jetpack Compose. Khóa học tập trung vào declarative UI và best practices mới nhất.',
    instructor: 'Vũ Thị Lan',
    progress: 0,
    duration: '11 giờ',
    lessons: 22,
    level: 'Trung bình',
    rating: 4.8,
    students: 890,
    price: 649000,
    category: 'Android Development',
    thumbnail: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400&h=300&fit=crop',
    enrolled: false,
    requirements: [
      'Kiến thức Kotlin cơ bản',
      'Đã làm việc với Android trước đó',
      'Android Studio mới nhất'
    ],
    outcomes: [
      'Làm chủ Jetpack Compose',
      'Xây dựng UI phức tạp với Compose',
      'Material Design 3',
      'State Management trong Compose'
    ],
    syllabus: [
      { title: 'Compose Basics', lessons: 4 },
      { title: 'Layouts & Modifiers', lessons: 5 },
      { title: 'State & Effects', lessons: 5 },
      { title: 'Navigation', lessons: 3 },
      { title: 'Theming', lessons: 3 },
      { title: 'Real Project', lessons: 2 }
    ]
  },
  {
    id: '7',
    title: 'React Native & Firebase',
    description: 'Xây dựng ứng dụng mobile full-stack với React Native và Firebase. Học cách tích hợp authentication, database, storage và push notifications.',
    instructor: 'Hoàng Minh Quân',
    progress: 0,
    duration: '13 giờ',
    lessons: 26,
    level: 'Trung bình',
    rating: 4.7,
    students: 1350,
    price: 749000,
    category: 'Mobile Development',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    enrolled: false,
    requirements: [
      'React Native cơ bản',
      'JavaScript ES6+',
      'Hiểu về REST API'
    ],
    outcomes: [
      'Tích hợp Firebase vào React Native',
      'Authentication & Authorization',
      'Realtime Database & Firestore',
      'Push Notifications & Analytics'
    ],
    syllabus: [
      { title: 'Firebase Setup', lessons: 3 },
      { title: 'Authentication', lessons: 5 },
      { title: 'Firestore Database', lessons: 6 },
      { title: 'Storage & Files', lessons: 4 },
      { title: 'Cloud Functions', lessons: 4 },
      { title: 'Production App', lessons: 4 }
    ]
  },
  {
    id: '8',
    title: 'Flutter E-commerce App',
    description: 'Xây dựng ứng dụng thương mại điện tử hoàn chỉnh với Flutter. Học từ thiết kế UI đến tích hợp payment gateway và quản lý đơn hàng.',
    instructor: 'Ngô Thị Hồng',
    progress: 0,
    duration: '20 giờ',
    lessons: 40,
    level: 'Nâng cao',
    rating: 4.9,
    students: 1580,
    price: 999000,
    category: 'Mobile Development',
    thumbnail: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&h=300&fit=crop',
    enrolled: false,
    requirements: [
      'Flutter trung bình trở lên',
      'Hiểu về REST API',
      'Kinh nghiệm với State Management'
    ],
    outcomes: [
      'Xây dựng E-commerce app hoàn chỉnh',
      'Tích hợp thanh toán trực tuyến',
      'Push notifications & Chat',
      'Admin panel & Analytics'
    ],
    syllabus: [
      { title: 'Project Setup & Architecture', lessons: 4 },
      { title: 'Product Catalog', lessons: 8 },
      { title: 'Shopping Cart', lessons: 6 },
      { title: 'Payment Integration', lessons: 6 },
      { title: 'Order Management', lessons: 8 },
      { title: 'Admin & Analytics', lessons: 8 }
    ]
  }
];

export const lessons: Lesson[] = [
  // React Native Cơ Bản
  {
    id: '1',
    courseId: '1',
    title: 'Giới thiệu React Native',
    duration: '15 phút',
    type: 'video',
    completed: true,
    videoUrl: 'https://example.com/video1.mp4'
  },
  {
    id: '2',
    courseId: '1',
    title: 'Cài đặt môi trường',
    duration: '25 phút',
    type: 'video',
    completed: true,
    videoUrl: 'https://example.com/video2.mp4'
  },
  {
    id: '3',
    courseId: '1',
    title: 'Components cơ bản',
    duration: '30 phút',
    type: 'video',
    completed: true,
    videoUrl: 'https://example.com/video3.mp4'
  },
  {
    id: '4',
    courseId: '1',
    title: 'State và Props',
    duration: '35 phút',
    type: 'video',
    completed: true,
    videoUrl: 'https://example.com/video4.mp4'
  },
  {
    id: '5',
    courseId: '1',
    title: 'Styling với StyleSheet',
    duration: '20 phút',
    type: 'video',
    completed: true,
    videoUrl: 'https://example.com/video5.mp4'
  },
  {
    id: '6',
    courseId: '1',
    title: 'FlatList và ScrollView',
    duration: '28 phút',
    type: 'video',
    completed: true,
    videoUrl: 'https://example.com/video6.mp4'
  },
  {
    id: '7',
    courseId: '1',
    title: 'Navigation cơ bản',
    duration: '32 phút',
    type: 'video',
    completed: true,
    videoUrl: 'https://example.com/video7.mp4'
  },

  // Flutter Advanced
  {
    id: '101',
    courseId: '2',
    title: 'Flutter Architecture Overview',
    duration: '18 phút',
    type: 'video',
    completed: true,
    videoUrl: 'https://example.com/flutter1.mp4'
  },
  {
    id: '102',
    courseId: '2',
    title: 'Custom Widgets',
    duration: '35 phút',
    type: 'video',
    completed: true,
    videoUrl: 'https://example.com/flutter2.mp4'
  },
  {
    id: '103',
    courseId: '2',
    title: 'BLoC Pattern',
    duration: '42 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/flutter3.mp4'
  },
  {
    id: '104',
    courseId: '2',
    title: 'Riverpod State Management',
    duration: '38 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/flutter4.mp4'
  },
  {
    id: '105',
    courseId: '2',
    title: 'Advanced Animations',
    duration: '30 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/flutter5.mp4'
  },
  {
    id: '106',
    courseId: '2',
    title: 'Performance Optimization',
    duration: '28 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/flutter6.mp4'
  },

  // Swift UI Fundamentals
  {
    id: '201',
    courseId: '3',
    title: 'Giới thiệu SwiftUI',
    duration: '20 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/swift1.mp4'
  },
  {
    id: '202',
    courseId: '3',
    title: 'Views và Modifiers',
    duration: '25 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/swift2.mp4'
  },
  {
    id: '203',
    courseId: '3',
    title: 'State và Binding',
    duration: '30 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/swift3.mp4'
  },
  {
    id: '204',
    courseId: '3',
    title: 'Lists và Navigation',
    duration: '28 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/swift4.mp4'
  },
  {
    id: '205',
    courseId: '3',
    title: 'Forms và User Input',
    duration: '22 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/swift5.mp4'
  },
  {
    id: '206',
    courseId: '3',
    title: 'Animations cơ bản',
    duration: '26 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/swift6.mp4'
  },

  // Kotlin for Android
  {
    id: '301',
    courseId: '4',
    title: 'Kotlin Basics',
    duration: '22 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/kotlin1.mp4'
  },
  {
    id: '302',
    courseId: '4',
    title: 'Activity và Fragment',
    duration: '30 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/kotlin2.mp4'
  },
  {
    id: '303',
    courseId: '4',
    title: 'RecyclerView',
    duration: '35 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/kotlin3.mp4'
  },
  {
    id: '304',
    courseId: '4',
    title: 'Room Database',
    duration: '38 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/kotlin4.mp4'
  },
  {
    id: '305',
    courseId: '4',
    title: 'MVVM Pattern',
    duration: '32 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/kotlin5.mp4'
  },
  {
    id: '306',
    courseId: '4',
    title: 'Retrofit & API',
    duration: '28 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/kotlin6.mp4'
  },

  // iOS App Development với Swift
  {
    id: '401',
    courseId: '5',
    title: 'Swift Programming Basics',
    duration: '25 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/ios1.mp4'
  },
  {
    id: '402',
    courseId: '5',
    title: 'Variables và Data Types',
    duration: '20 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/ios2.mp4'
  },
  {
    id: '403',
    courseId: '5',
    title: 'Control Flow',
    duration: '28 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/ios3.mp4'
  },
  {
    id: '404',
    courseId: '5',
    title: 'Functions và Closures',
    duration: '32 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/ios4.mp4'
  },
  {
    id: '405',
    courseId: '5',
    title: 'UIKit Fundamentals',
    duration: '35 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/ios5.mp4'
  },
  {
    id: '406',
    courseId: '5',
    title: 'Auto Layout',
    duration: '30 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/ios6.mp4'
  },

  // Jetpack Compose Modern Android
  {
    id: '501',
    courseId: '6',
    title: 'Compose Basics',
    duration: '22 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/compose1.mp4'
  },
  {
    id: '502',
    courseId: '6',
    title: 'Composable Functions',
    duration: '26 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/compose2.mp4'
  },
  {
    id: '503',
    courseId: '6',
    title: 'Layouts trong Compose',
    duration: '30 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/compose3.mp4'
  },
  {
    id: '504',
    courseId: '6',
    title: 'State Management',
    duration: '35 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/compose4.mp4'
  },
  {
    id: '505',
    courseId: '6',
    title: 'Material Design 3',
    duration: '28 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/compose5.mp4'
  },
  {
    id: '506',
    courseId: '6',
    title: 'Navigation Compose',
    duration: '32 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/compose6.mp4'
  },

  // React Native & Firebase
  {
    id: '601',
    courseId: '7',
    title: 'Firebase Setup',
    duration: '18 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/firebase1.mp4'
  },
  {
    id: '602',
    courseId: '7',
    title: 'Firebase Authentication',
    duration: '32 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/firebase2.mp4'
  },
  {
    id: '603',
    courseId: '7',
    title: 'Email/Password Login',
    duration: '28 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/firebase3.mp4'
  },
  {
    id: '604',
    courseId: '7',
    title: 'Google Sign In',
    duration: '25 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/firebase4.mp4'
  },
  {
    id: '605',
    courseId: '7',
    title: 'Firestore Database',
    duration: '38 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/firebase5.mp4'
  },
  {
    id: '606',
    courseId: '7',
    title: 'Cloud Storage',
    duration: '30 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/firebase6.mp4'
  },

  // Flutter E-commerce App
  {
    id: '701',
    courseId: '8',
    title: 'Project Setup',
    duration: '20 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/ecom1.mp4'
  },
  {
    id: '702',
    courseId: '8',
    title: 'App Architecture',
    duration: '25 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/ecom2.mp4'
  },
  {
    id: '703',
    courseId: '8',
    title: 'Home Screen UI',
    duration: '35 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/ecom3.mp4'
  },
  {
    id: '704',
    courseId: '8',
    title: 'Product Listing',
    duration: '32 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/ecom4.mp4'
  },
  {
    id: '705',
    courseId: '8',
    title: 'Product Detail Page',
    duration: '28 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/ecom5.mp4'
  },
  {
    id: '706',
    courseId: '8',
    title: 'Shopping Cart',
    duration: '38 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/ecom6.mp4'
  },
  {
    id: '707',
    courseId: '8',
    title: 'Checkout Flow',
    duration: '42 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/ecom7.mp4'
  },
  {
    id: '708',
    courseId: '8',
    title: 'Payment Integration',
    duration: '45 phút',
    type: 'video',
    completed: false,
    videoUrl: 'https://example.com/ecom8.mp4'
  }
];

export const quizzes: Quiz[] = [
  {
    id: '1',
    lessonId: '3',
    title: 'Kiểm tra Components',
    questions: [
      {
        id: 'q1',
        question: 'Component nào là component cơ bản nhất trong React Native?',
        options: ['View', 'Text', 'Image', 'ScrollView'],
        correctAnswer: 0
      },
      {
        id: 'q2',
        question: 'Props được sử dụng để làm gì?',
        options: [
          'Lưu trữ state',
          'Truyền dữ liệu giữa components',
          'Tạo animation',
          'Gọi API'
        ],
        correctAnswer: 1
      },
      {
        id: 'q3',
        question: 'useState hook được dùng để?',
        options: [
          'Quản lý navigation',
          'Gọi API',
          'Quản lý state trong component',
          'Tạo component'
        ],
        correctAnswer: 2
      }
    ]
  }
];

export const notifications: AppNotification[] = [
  {
    id: '1',
    title: 'Bài học mới đã được thêm',
    message: 'React Native Cơ Bản có 3 bài học mới',
    time: '2 giờ trước',
    read: false,
    type: 'course'
  },
  {
    id: '2',
    title: 'Hoàn thành bài quiz',
    message: 'Chúc mừng! Bạn đã đạt 90% bài kiểm tra Components',
    time: '1 ngày trước',
    read: false,
    type: 'achievement'
  },
  {
    id: '3',
    title: 'Nhắc nhở học tập',
    message: 'Bạn chưa học bài nào hôm nay. Hãy tiếp tục tiến độ!',
    time: '2 ngày trước',
    read: true,
    type: 'reminder'
  }
];

export const teacherCourses: TeacherCourse[] = [
  {
    id: '1',
    title: 'React Native Cơ Bản',
    students: 1250,
    lessons: 24,
    avgRating: 4.8,
    revenue: '45,000,000đ',
    status: 'active'
  },
  {
    id: '2',
    title: 'React Native Nâng Cao',
    students: 680,
    lessons: 30,
    avgRating: 4.9,
    revenue: '32,000,000đ',
    status: 'active'
  }
];

export const adminStats: AdminStats = {
  totalUsers: 15420,
  totalCourses: 156,
  totalRevenue: '2,450,000,000đ',
  activeUsers: 8920,
  userGrowth: '+12.5%',
  courseGrowth: '+8.2%',
  revenueGrowth: '+15.3%'
};
