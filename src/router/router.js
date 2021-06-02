import DecCreate from '../view/Dec/DecCreate/DecCreate.jsx';
import Default from '../view/Dec/Default/Default.jsx';

const routes = [
    {
        path: '/',
        component: DecCreate,
        exact: true
    },
    {
        path: '/DecCreate',
        component: DecCreate,
        exact: true
    },
    {
        path: '/*',
        component: Default,
        exact: true
    }
];
 
export default routes;
