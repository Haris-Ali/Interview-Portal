import React from "react";
import Buttons from "views/Components/Buttons.jsx";
import GridSystem from "views/Components/GridSystem.jsx";
import Panels from "views/Components/Panels.jsx";
import SweetAlert from "views/Components/SweetAlert.jsx";
import Notifications from "views/Components/Notifications.jsx";
import Icons from "views/Components/Icons.jsx";
import Typography from "views/Components/Typography.jsx";
import RegularForms from "views/Forms/RegularForms.jsx";
import ExtendedForms from "views/Forms/ExtendedForms.jsx";
import ValidationForms from "views/Forms/ValidationForms.jsx";
import Wizard from "views/Forms/Wizard.jsx";
import RegularTables from "views/Tables/RegularTables.jsx";
import ExtendedTables from "views/Tables/ExtendedTables.jsx";
import ReactTables from "views/Tables/ReactTables.jsx";
import GoogleMaps from "views/Maps/GoogleMaps.jsx";
import FullScreenMap from "views/Maps/FullScreenMap.jsx";
import VectorMap from "views/Maps/VectorMap.jsx";
import Charts from "views/Charts/Charts.jsx";
import Calendar from "views/Calendar/Calendar.jsx";
import Widgets from "views/Widgets/Widgets.jsx";
import UserProfile from "views/Pages/UserProfile.jsx";
import TimelinePage from "../views/Pages/Timeline.jsx";
import RTLSupport from "views/Pages/RTLSupport.jsx";

import pagesRoutes from "./pages.jsx";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import Image from "@material-ui/icons/Image";
import Apps from "@material-ui/icons/Apps";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import GridOn from "@material-ui/icons/GridOn";
import Place from "@material-ui/icons/Place";
import WidgetsIcon from "@material-ui/icons/Widgets";
import Timeline from "@material-ui/icons/Timeline";
import DateRange from "@material-ui/icons/DateRange";

//Custom Pages

//Test Pages
import Testresult from "../components/TestResult.component";
import Questions from "../components/Question.component";
import Taketest from "../components/TakeTest.component";
import Dashboard from '../components/Dashboard.component'
import Call from '../components/Call.js'
import PostsBody from '../components/Posts/PostsBody.js'
import Profile from '../components/body/profile/Profile';
import Register from '../components/body/auth/Register';
import HomeLanding from '../pages/HomePage/Home';

const dashRoutes_candidate = [
  {
    path: "/candidate",
    name: "Main Menu",
    icon: DashboardIcon,
    component: HomeLanding
  },
  {
    path: "/see-profile",
    name: "See Profile",
    icon: DashboardIcon,
    component: UserProfile
  },
  {
    collapse: true,
    path: "/quiz",
    name: "Quiz",
    state: "openQuiz",
    icon: Apps,
    views: [
      {
        path: "/quiz/attempt-quiz",
        name: "Attempt Quiz",
        mini: "AQ",
        component: Dashboard
      },
      {
        path: "/quiz/see-quiz-result",
        name: "Results",
        mini: "RST",
        component: GridSystem
      },
      {
        path: "/quiz/quiz-history",
        name: "History",
        mini: "HST",
        component: Panels
      },
    ]
  },
  {
    collapse: true,
    path: "/posts",
    name: "Job Ads",
    state: "openJob",
    icon: "content_paste",
    views: [

      {
        path: "/posts/get-job-posts",
        name: "Get Posts",
        mini: "GP",
        component: PostsBody 
      },
      {
        path: "/posts/make-candidate-post",
        name: "Make Post",
        mini: "MP",
        component: Profile
      },
      
      {
        path: "/posts/candidate-posts-history",
        name: "Post History",
        mini: "PH",
        component: Register
      },
      {
        path: "/posts/update-candidate-post",
        name: "Update Post",
        mini: "UP",
        component: ValidationForms
      },
      {
        path: "/posts/delete-candidate-post",
        name: "Delete Post",
        mini: "DP",
        component: ValidationForms
      },
    ]
  },
  { path: "/call", name: "Make Call", icon: WidgetsIcon, component: Call },
  {
    path: "/change-role",
    name: "Admin Console",
    icon: WidgetsIcon,
    component: Register
  },

  
  
];
export default dashRoutes_candidate;
