import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function resolveFallbackPath(pathname: string) {
  if (pathname === '/edit-profile' || pathname === '/security' || pathname === '/subscription' || pathname === '/certificates' || pathname === '/about') {
    return '/profile';
  }

  if (pathname === '/settings' || pathname === '/help' || pathname === '/report-violation') {
    return '/profile';
  }

  if (pathname === '/my-reports') {
    return '/settings';
  }

  if (pathname === '/help/support-request' || pathname === '/help/support-success') {
    return '/help';
  }

  if (pathname === '/search' || pathname === '/bookmarks' || pathname === '/notifications') {
    return '/home';
  }

  let match = pathname.match(/^\/payment\/method\/([^/]+)$/);
  if (match) {
    const [, itemId] = match;
    return itemId.startsWith('plan-') ? '/subscription' : `/course/${itemId}`;
  }

  match = pathname.match(/^\/payment\/(?:qr|manual|bank-transfer)\/([^/]+)$/);
  if (match) {
    return `/payment/method/${match[1]}`;
  }

  match = pathname.match(/^\/payment\/success\/([^/]+)$/);
  if (match) {
    return match[1].startsWith('plan-') ? '/subscription' : `/course/${match[1]}`;
  }

  match = pathname.match(/^\/course\/([^/]+)\/(?:reviews|rate)$/);
  if (match) {
    return `/course/${match[1]}`;
  }

  match = pathname.match(/^\/lesson\/([^/]+)$/);
  if (match) {
    return '/courses';
  }

  match = pathname.match(/^\/messages\/([^/]+)$/);
  if (match) {
    return '/messages';
  }

  match = pathname.match(/^\/my-reports\/([^/]+)$/);
  if (match) {
    return '/my-reports';
  }

  match = pathname.match(/^\/teacher\/student\/([^/]+)\/(?:stats|report)$/);
  if (match) {
    return `/teacher/student/${match[1]}/detail`;
  }

  match = pathname.match(/^\/teacher\/student\/([^/]+)\/detail$/);
  if (match) {
    return '/teacher/students';
  }

  match = pathname.match(/^\/teacher\/course\/([^/]+)\/(?:edit|analytics|reviews)$/);
  if (match) {
    return '/teacher/courses';
  }

  if (pathname === '/teacher/create-course') {
    return '/teacher/courses';
  }

  if (pathname === '/teacher/revenue' || pathname === '/teacher/bank-accounts' || pathname === '/teacher/add-bank-account' || pathname === '/teacher/withdraw' || pathname === '/teacher/withdraw/success') {
    return '/teacher/dashboard';
  }

  match = pathname.match(/^\/teacher\/edit-bank-account\/([^/]+)$/);
  if (match) {
    return '/teacher/bank-accounts';
  }

  if (pathname === '/admin/users/add') {
    return '/admin/users';
  }

  match = pathname.match(/^\/admin\/users\/[^/]+\/(?:edit|permissions)$/);
  if (match) {
    return '/admin/users';
  }

  match = pathname.match(/^\/admin\/content\/[^/]+$/);
  if (match) {
    return '/admin/content';
  }

  if (pathname === '/admin/report-management') {
    return '/admin/reports';
  }

  match = pathname.match(/^\/admin\/report-detail\/[^/]+$/);
  if (match) {
    return '/admin/report-management';
  }

  match = pathname.match(/^\/admin\/reports\/(?:users|courses|revenue|growth)$/);
  if (match) {
    return '/admin/reports';
  }

  return '/home';
}

export function useSmartBack(fallbackPath?: string) {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(() => {
    const nextPath = fallbackPath ?? resolveFallbackPath(location.pathname);
    const historyState = typeof window !== 'undefined'
      ? (window.history.state as { idx?: number } | null)
      : null;

    const canGoBack = typeof window !== 'undefined'
      ? typeof historyState?.idx === 'number'
        ? historyState.idx > 0
        : window.history.length > 1
      : false;

    if (canGoBack) {
      navigate(-1);
      return;
    }

    navigate(nextPath, { replace: true });
  }, [fallbackPath, location.pathname, navigate]);
}
