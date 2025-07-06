export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  if (isSameDay(now, date)) {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  if (isSameWeek(now, date)) {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
    });
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSameWeek(a: Date, b: Date): boolean {
  const getMonday = (d: Date) => {
    const day = d.getDay();
    const diff = (day + 6) % 7;
    const monday = new Date(d);
    monday.setDate(d.getDate() - diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  return (
    getMonday(a).getTime() === getMonday(b).getTime() &&
    a.getFullYear() === b.getFullYear()
  );
}
