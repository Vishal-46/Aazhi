import { useEffect, useState } from 'react';

export type SceneName = 'home' | 'about' | 'team' | 'work' | 'work-detail' | 'contact';

/** Backwards-compatible alias. */
export type Route = 'home' | 'about' | 'work' | 'team' | 'contact';

export interface ParsedRoute {
  scene: SceneName;
  /** team step: '0' | '1' | '2' | 'all' | undefined · work slug for work-detail */
  param?: string;
  /** Canonical hash, e.g. '#/', '#/team/1', '#/work/healthcare-operations' */
  hash: string;
  /** Top-level scene for nav highlighting */
  top: Route;
}

export const SCENES: { name: SceneName; top: Route; label: string; hash: string; index: number }[] = [
  { name: 'home', top: 'home', label: 'Home', hash: '#/', index: 0 },
  { name: 'about', top: 'about', label: 'About', hash: '#/about', index: 1 },
  { name: 'team', top: 'team', label: 'Team', hash: '#/team', index: 2 },
  { name: 'work', top: 'work', label: 'Work', hash: '#/work', index: 3 },
  { name: 'contact', top: 'contact', label: 'Contact', hash: '#/contact', index: 4 },
];

export function sceneIndexFor(top: Route): number {
  return SCENES.find((s) => s.top === top)?.index ?? 0;
}

export function hashForTop(top: Route): string {
  return SCENES.find((s) => s.top === top)?.hash ?? '#/';
}

/**
 * Hash-based routes (static-host safe, deep-linkable, back/forward intact):
 *   '#/'                              → home
 *   '#/about'                          → about
 *   '#/team' | '#/team/0|1|2|all'      → founders sequence / overview
 *   '#/work'                           → work
 *   '#/work/<slug>'                    → project detail
 *   '#/contact'                        → contact
 * Legacy '#about' / '#work' section anchors resolve to home/about sensibly.
 */
export function parseHash(hash?: string): ParsedRoute {
  const h = (hash ?? (typeof window !== 'undefined' ? window.location.hash : '')).trim();

  if (h.startsWith('#/work/')) {
    const slug = h.slice('#/work/'.length).split(/[?#]/)[0].trim();
    if (slug) return { scene: 'work-detail', param: slug, hash: `#/work/${slug}`, top: 'work' };
    return { scene: 'work', hash: '#/work', top: 'work' };
  }
  if (h.startsWith('#/work')) return { scene: 'work', hash: '#/work', top: 'work' };

  if (h.startsWith('#/team/')) {
    const step = h.slice('#/team/'.length).split(/[?#]/)[0].trim().toLowerCase();
    if (step === '0' || step === '1' || step === '2' || step === 'all') {
      return { scene: 'team', param: step, hash: `#/team/${step}`, top: 'team' };
    }
    return { scene: 'team', param: '0', hash: '#/team/0', top: 'team' };
  }
  if (h.startsWith('#/team')) return { scene: 'team', param: '0', hash: '#/team/0', top: 'team' };

  if (h.startsWith('#/about')) return { scene: 'about', hash: '#/about', top: 'about' };
  if (h.startsWith('#/contact')) return { scene: 'contact', hash: '#/contact', top: 'contact' };
  if (h === '#/' || h === '#' || h === '') return { scene: 'home', hash: '#/', top: 'home' };

  // Legacy in-page anchors from the old long-scroll site.
  if (h === '#about' || h === '#capabilities' || h === '#process' || h === '#future') {
    return { scene: 'about', hash: '#/about', top: 'about' };
  }
  if (h === '#contact') return { scene: 'contact', hash: '#/contact', top: 'contact' };
  if (h === '#work') return { scene: 'work', hash: '#/work', top: 'work' };
  if (h === '#team' || h === '#core-team') return { scene: 'team', param: '0', hash: '#/team/0', top: 'team' };

  return { scene: 'home', hash: '#/', top: 'home' };
}

export function hrefFor(route: Route): string {
  return hashForTop(route);
}

/** Backwards-compatible: top-level scene name. */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash().top);
  useEffect(() => {
    const onChange = () => setRoute(parseHash().top);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

/** Full parsed route (scene + param), re-rendered on every `hashchange`. */
export function useParsedRoute(): ParsedRoute {
  const [route, setRoute] = useState<ParsedRoute>(() => parseHash());
  useEffect(() => {
    const onChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

/** Navigate without reloading. No-op if already there. */
export function go(hash: string) {
  if (typeof window === 'undefined') return;
  if (window.location.hash === hash) return;
  window.location.hash = hash;
}
