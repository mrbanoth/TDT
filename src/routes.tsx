import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';

// Lazy load page components for better performance
const Index = lazy(() => import('@/pages/Index'));
const About = lazy(() => import('@/pages/About'));
const Events = lazy(() => import('@/pages/Events'));
const Donate = lazy(() => import('@/pages/Donate'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const StoryDetail = lazy(() => import('@/pages/StoryDetail'));
const Gallery = lazy(() => import('@/pages/programs/Gallery'));
const ProgramDetail = lazy(() => import('@/pages/programs/ProgramDetail'));
const OurApproach = lazy(() => import('@/pages/OurApproach'));
const EventDetail = lazy(() => import('@/pages/EventDetail'));
// const AllEvents = lazy(() => import('@/pages/AllEvents'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Wrapper component for lazy loading with fallback
const LazyComponent = ({ component: Component, ...props }: any) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component {...props} />
  </Suspense>
);

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <LazyComponent component={Index} />
  },
  {
    path: '/about',
    element: <LazyComponent component={About} />
  },
  {
    path: '/programs/gallery',
    element: <LazyComponent component={Gallery} />
  },
  {
    path: '/programs/:id',
    element: <LazyComponent component={ProgramDetail} />
  },
  {
    path: '/our-approach',
    element: <LazyComponent component={OurApproach} />
  },
  {
    path: '/get-involved',
    element: <LazyComponent component={Events} />
  },
  {
    path: '/get-involved/:id',
    element: <LazyComponent component={EventDetail} />
  },
  {
    path: '/donate',
    element: <LazyComponent component={Donate} />
  },
  {
    path: '/contact',
    element: <LazyComponent component={Contact} />
  },
  {
    path: '/profile/:id',
    element: <LazyComponent component={ProfilePage} />
  },
  {
    path: '/stories/:id',
    element: <LazyComponent component={StoryDetail} />
  },
  {
    path: '*',
    element: <LazyComponent component={NotFound} />
  }
];
