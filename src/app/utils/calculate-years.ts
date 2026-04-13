export function getGitHubYears(joinYear: number | undefined): number[] {
  if (!joinYear) return [];
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= joinYear; i--) {
    years.push(i);
  }
  return years;
}
