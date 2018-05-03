export const MEETING_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export const SEARCH_SUBJECTS = {
  learningCircles: 'learning circles',
  courses: 'courses'
};

export const SEARCH_PROPS = {
  learningCircles: {
    filters: ['location', 'topics', 'meetingDays'],
    placeholder: 'Keyword, organization, facilitator, etc...',
  },
  courses: {
    filters: ['topics', 'orderCourses'],
    placeholder: 'Title, subject, etc...',
  }
};

export const API_ENDPOINTS = {
  learningCircle: '/api/learning-circle/',
  registration: '/en/accounts/fe/register/',
  login: '/en/accounts/fe/login/',
  learningCircles: {
    postUrl: '/api/learning-circle/',
    baseUrl: '/api/learningcircles/?',
    searchParams: ['q', 'topics', 'weekdays', 'latitude', 'longitude', 'distance', 'active', 'limit', 'offset', 'city', 'signup', 'team_id', 'id']
  },
  courses: {
    baseUrl: '/api/courses/?',
    searchParams: ['q', 'topics', 'order', 'course_id']
  },
  learningCirclesTopics: {
    baseUrl: 'https://learningcircles.p2pu.org/api/learningcircles/topics/?',
    searchParams: []
  },
  coursesTopics: {
    baseUrl: 'https://learningcircles.p2pu.org/api/courses/topics/?',
    searchParams: []
  },
  stats: {
    baseUrl: 'https://learningcircles.p2pu.org/api/landing-page-stats/?',
    searchParams: []
  },
  landingPage: {
    baseUrl: 'https://learningcircles.p2pu.org/api/landing-page-learning-circles/?',
    searchParams: []
  },
  images: {
    postUrl: '/api/upload_image/'
  }
};