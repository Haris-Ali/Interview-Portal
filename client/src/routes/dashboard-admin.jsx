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

const dashRoutes = [
  {
    path: "/admin",
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
        path: "/quiz/make-quiz",
        name: "Make Quiz",
        mini: "MQ",
        component: Dashboard
      },
      {
        path: "/quiz/delete-quiz",
        name: "Delete Quiz",
        mini: "DQ",
        component: GridSystem
      },
      {
        path: "/quiz/update-quiz",
        name: "Update Response",
        mini: "UR",
        component: Panels
      },
      {
        path: "/quiz/get-admin-quizes",
        name: "Quiz History",
        mini: "QH",
        component: SweetAlert
      },
      {
        path: "/quiz/results",
        name: "Result",
        mini: "RSL",
        component: SweetAlert
      }
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
        path: "/posts/make-job-posts",
        name: "Make Posts",
        mini: "MP",
        component: PostsBody 
      },

      {
        path: "/posts/get-job-posts",
        name: "See Global Posts",
        mini: "GP",
        component: PostsBody 
      },

      {
        path: "/posts/admin-posts-history",
        name: "Update Posts",
        mini: "MP",
        component: Profile
      },

      {
        path: "/posts/get-CV-posts",
        name: "Check CVs",
        mini: "CCV",
        component: Profile
      },
      {
        path: "/posts/update-job-posts",
        name: "Update Posts",
        mini: "MP",
        component: Profile
      },
      
      {
        path: "/posts/update-admin-post",
        name: "Update Post",
        mini: "UP",
        component: ValidationForms
      },
      {
        path: "/posts/delete-job-posts",
        name: "Delete Posts",
        mini: "DP",
        component: Register
      }, 
    ]
  },
  // {
  //   path: "/candidate",
  //   name: "Switch to Candidate Console",
  //   mini: "CC",
  //   component: HomeLanding
  // },

  { path: "/call", name: "Make Call", icon: WidgetsIcon, component: Call },
  { path: `/change-role`, name: "Candidate Console", icon: WidgetsIcon, component: HomeLanding },

];
export default dashRoutes;
