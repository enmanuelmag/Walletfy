/* eslint-disable @typescript-eslint/no-explicit-any */

export const $ = (...args: any[]) => args.filter(Boolean).join(' ');
