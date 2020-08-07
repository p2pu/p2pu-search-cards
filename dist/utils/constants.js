import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject13() {
  var data = _taggedTemplateLiteral(["Title, subject, etc..."]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["Keyword, organization, facilitator, etc..."]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["Recently added"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["Community rating"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["Popularity"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["Course title"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["Sunday"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["Saturday"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["Friday"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["Thursday"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["Wednesday"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["Tuesday"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["Monday"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import { t } from 'ttag';
export var MEETING_DAYS = [t(_templateObject()), t(_templateObject2()), t(_templateObject3()), t(_templateObject4()), t(_templateObject5()), t(_templateObject6()), t(_templateObject7())];
export var COURSES_SORT_OPTIONS = [{
  label: t(_templateObject8()),
  value: 'title'
}, {
  label: t(_templateObject9()),
  value: 'usage'
}, {
  label: t(_templateObject10()),
  value: 'overall_rating'
}, {
  label: t(_templateObject11()),
  value: 'created_at'
}];
export var SEARCH_SUBJECTS = {
  learningCircles: 'learning circles',
  courses: 'courses'
};
export var SEARCH_PROPS = {
  learningCircles: {
    filters: ['location', 'topics', 'meetingDays'],
    placeholder: t(_templateObject12())
  },
  courses: {
    filters: ['topics', 'language', 'oer'],
    sort: ['orderCourses'],
    placeholder: t(_templateObject13())
  }
};
export var DEFAULT_ORIGIN = 'https://learningcircles.p2pu.org'; // export const DEFAULT_ORIGIN = 'http://localhost:8000'

export var API_ENDPOINTS = {
  learningCircle: "/api/learning-circle/",
  registration: "/en/accounts/fe/register/",
  login: "/en/accounts/fe/login/",
  learningCircles: {
    postUrl: "/api/learning-circle/",
    baseUrl: "/api/learningcircles/?",
    searchParams: ['q', 'topics', 'weekdays', 'latitude', 'longitude', 'distance', 'active', 'limit', 'offset', 'city', 'signup', 'team_id', 'order'],
    arrayItems: ['topics', 'weekdays'],
    privateParams: ['limit', 'offset', 'active', 'distance', 'latitude', 'longitude']
  },
  courses: {
    baseUrl: "/api/courses/?",
    searchParams: ['q', 'topics', 'order', 'limit', 'offset', 'languages', 'oer'],
    arrayItems: ['topics', 'languages'],
    privateParams: ['limit', 'offset']
  },
  learningCirclesTopics: {
    baseUrl: "/api/learningcircles/topics/?",
    searchParams: []
  },
  coursesTopics: {
    baseUrl: "/api/courses/topics/?",
    searchParams: []
  },
  coursesLanguages: {
    baseUrl: "/api/courses/languages/?",
    searchParams: []
  },
  stats: {
    baseUrl: "/api/landing-page-stats/?",
    searchParams: []
  },
  landingPage: {
    baseUrl: "/api/landing-page-learning-circles/?",
    searchParams: []
  },
  whoami: {
    baseUrl: "/en/accounts/fe/whoami/"
  },
  images: {
    postUrl: "/api/upload_image/"
  }
};
export var COLOR_CLASSES = ["p2pu-green", "p2pu-blue", "p2pu-yellow", "p2pu-orange"];