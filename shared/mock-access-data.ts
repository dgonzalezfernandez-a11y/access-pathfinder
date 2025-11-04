import type { AccessReportItem } from './types';
import { subDays } from 'date-fns';
const generateRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const generateHostname = (i: number) => {
  const tlds = ['com', 'net', 'org', 'io'];
  const domains = ['internal-app', 'dashboard', 'metrics', 'wiki', 'jira', 'assets', 'api-gateway', 'dev-portal'];
  return `${domains[i % domains.length]}-${i}.${tlds[i % tlds.length]}`;
};
const now = new Date();
export const MOCK_ACCESS_DATA: AccessReportItem[] = Array.from({ length: 12 }, (_, i) => {
  const lastSeenDaysAgo = generateRandomInt(1, 30);
  const firstSeenDaysAgo = lastSeenDaysAgo + generateRandomInt(30, 90);
  const uniqueUsers = generateRandomInt(5, 150);
  return {
    id: crypto.randomUUID(),
    hostname: generateHostname(i),
    firstSeen: subDays(now, firstSeenDaysAgo).toISOString(),
    lastSeen: subDays(now, lastSeenDaysAgo).toISOString(),
    uniqueUsers: uniqueUsers,
    totalRequests: uniqueUsers * generateRandomInt(10, 50),
  };
});