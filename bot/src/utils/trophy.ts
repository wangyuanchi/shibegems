export function convertToTrophy(position: string): string {
  switch (position) {
    case "#1":
      return "🥇";
    case "#2":
      return "🥈";
    case "#3":
      return "🥉";
    default:
      return position;
  }
}
