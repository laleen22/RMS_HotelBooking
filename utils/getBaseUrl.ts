export function getBaseUrl(): string {
  const ENV = process.env.TEST_ENV || 'QA1';
  const urls: Record<string, string | undefined> = {
    QA1: process.env.QA1_URL,
    // QA2: process.env.QA2_URL,
    // QA3: process.env.QA3_URL,
  };

  const baseUrl = urls[ENV];
  if (!baseUrl) throw new Error(`No base URL defined for environment ${ENV}`);
  return baseUrl;
}