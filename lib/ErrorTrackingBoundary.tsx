import React from 'react';

import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';

if (process.env.NEXT_PUBLIC_BUGSNAG_API_KEY) {
  Bugsnag.start({
    apiKey: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginReact()],
    releaseStage: process.env.NEXT_PUBLIC_BUGSNAG_STAGE,
  });
}

const plugin = Bugsnag.getPlugin('react');

export const ErrorTrackingBoundary = plugin
  ? plugin.createErrorBoundary(React)
  : ({ children }) => children;

export const trackApplicationError = (name: string, error: Error): void => {
  if (process.env.NEXT_PUBLIC_BUGSNAG_STAGE === 'development') {
    console.log(new Error(`${name}: ${error?.message}`));
  } else {
    Bugsnag.notify(new Error(`${name}: ${error?.message}`));
  }
};
