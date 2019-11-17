import Inbox from './components/modules/Inbox/Index';
import LandingPage from './components/modules/LandingPage';

const routes = [
  // dynamic segments start with a colon
  { path: '/', component: LandingPage },
  { path: '/inbox/:email', component: Inbox }
]

export default routes;