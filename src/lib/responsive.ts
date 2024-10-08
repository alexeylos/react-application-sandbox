import { useEffect, useState } from 'react';

type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
type BreakpointMap = Record<Breakpoint, string>;
type ScreenMap = Partial<Record<Breakpoint, boolean>>;

const responsiveMap: BreakpointMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
};

type SubscribeFunc = (screens: ScreenMap) => void;

const subscribers = new Map<number, SubscribeFunc>();
let subUid = -1;
let screens = {};

const responsiveObserve = {
  matchHandlers: {} as {
    [prop: string]: {
      mql: MediaQueryList;
      listener: ((this: MediaQueryList, ev: MediaQueryListEvent) => unknown) | null;
    };
  },
  evaluateResponsiveMap(callback: (mqlRes: { mql: MediaQueryList; screen: Breakpoint }) => void) {
    Object.keys(responsiveMap).forEach((screen) => {
      const matchMediaQuery = responsiveMap[screen as Breakpoint];
      const mql = window.matchMedia(matchMediaQuery);

      callback({
        mql,
        screen: screen as Breakpoint,
      });
    });
  },
  dispatch(pointMap: ScreenMap) {
    screens = pointMap;
    subscribers.forEach((func) => func(screens));

    return subscribers.size >= 1;
  },
  subscribe(func: SubscribeFunc): number {
    if (!subscribers.size) this.register();
    subUid += 1;
    subscribers.set(subUid, func);
    func(screens);

    return subUid;
  },
  unsubscribe(token: number) {
    subscribers.delete(token);

    if (!subscribers.size) {
      this.unregister();
    }
  },
  unregister() {
    Object.keys(responsiveMap).forEach((screen) => {
      const matchMediaQuery = responsiveMap[screen as Breakpoint];
      const handler = this.matchHandlers[matchMediaQuery];

      handler?.mql.removeListener(handler?.listener);
    });
    subscribers.clear();
  },
  register() {
    this.evaluateResponsiveMap(({ mql, screen }: { mql: MediaQueryList; screen: Breakpoint }) => {
      const matchMediaQuery = responsiveMap[screen];
      const listener = ({ matches }: { matches: boolean }) => {
        this.dispatch({
          ...screens,
          [screen]: matches,
        });
      };

      mql.addListener(listener);
      this.matchHandlers[matchMediaQuery] = {
        mql,
        listener,
      };
      listener(mql);
    });
  },
};

const getScreenMap = (): ScreenMap => {
  const screenMap: ScreenMap = {};

  responsiveObserve.evaluateResponsiveMap(({ mql, screen }) => {
    screenMap[screen] = mql.matches;
  });

  return screenMap;
};

export const useBreakpoint = (): ScreenMap => {
  const [screens, setScreens] = useState<ScreenMap>(() => getScreenMap());

  useEffect(() => {
    const token = responsiveObserve.subscribe((supportScreens) => {
      setScreens(supportScreens);
    });

    return () => responsiveObserve.unsubscribe(token);
  }, []);

  return screens;
};
