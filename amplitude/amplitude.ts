import React from 'react';
import { init, track, setUserId, reset } from '@amplitude/analytics-browser';

const API_KEY: any = process.env.NEXT_PUBLIC_AMPLITUDE_KEY;

export const initAmplitude = () => {
  init(API_KEY);
};

export const logEvent = (eventName: string, eventProperties: any) => {
  track(eventName, eventProperties);
};

export const setAmplitudeUserId = (userId: any) => {
  setUserId(userId);
};

export const resetAmplitude = () => {
  reset();
};
