import { checkDelivery } from './delivery-zones';
import type { MenuData } from './types';

const DAY_NAMES_PL = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
const DAY_NAMES_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function parseMenuDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
}

function dateWithDay(dateStr: string, lang: 'pl' | 'en' = 'pl'): string {
  const date = parseMenuDate(dateStr);
  const dayName = lang === 'pl' ? DAY_NAMES_PL[date.getDay()] : DAY_NAMES_EN[date.getDay()];
  return `${dateStr} (${dayName})`;
}

export function getMenuDatesSummary(menu: MenuData, lang: 'pl' | 'en' = 'pl'): string {
  return Object.keys(menu).map((d) => dateWithDay(d, lang)).join(', ');
}

function getAvailableDates(menu: MenuData): string[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const allDates = Object.keys(menu);
  const upcoming = allDates.filter((d) => parseMenuDate(d) >= today);

  return upcoming.length > 0 ? upcoming : allDates;
}

function formatMenuForChat(menu: MenuData, dates: string[], categoryFilter?: string): string {
  const lines: string[] = [];

  for (const date of dates) {
    const dayMenu = menu[date];
    if (!dayMenu) continue;
    const dayLines: string[] = [];

    for (const [category, dishes] of Object.entries(dayMenu)) {
      if (categoryFilter && category !== categoryFilter) continue;

      dayLines.push(`  ${category}:`);
      for (const dish of dishes) {
        dayLines.push(`    • ${dish.nazwa} — ${dish.cena}`);
      }
    }

    if (dayLines.length > 0) {
      lines.push(`${dateWithDay(date)}:`);
      lines.push(...dayLines);
      lines.push('');
    }
  }

  return lines.join('\n').trim();
}

function handleSearchMenu(
  menu: MenuData,
  preferences: string,
  category?: string,
  date?: string,
): string {
  let datesToSearch: string[];

  if (date) {
    datesToSearch = Object.keys(menu).filter((d) => d === date);
    if (datesToSearch.length === 0) {
      return `Brak menu na datę ${date}. Dostępne daty: ${Object.keys(menu).join(', ')}.`;
    }
  } else {
    datesToSearch = getAvailableDates(menu);
  }

  const formatted = formatMenuForChat(menu, datesToSearch, category);

  if (!formatted) {
    return 'Nie znaleziono dań spełniających podane kryteria.';
  }

  const isUpcoming = datesToSearch.some((d) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return parseMenuDate(d) >= today;
  });

  const header = isUpcoming
    ? `Dostępne menu (nadchodzące dni, filtr: "${preferences}"):\n\n`
    : `Dostępne menu (najnowsze opublikowane dni — menu na nadchodzący tydzień może jeszcze nie być gotowe, filtr: "${preferences}"):\n\n`;

  return header + formatted;
}

function handleCheckDelivery(city: string): string {
  const result = checkDelivery(city);

  if (result.available && result.city) {
    const note = result.note?.pl ?? `Dowozimy do ${result.city}.`;
    return `DOSTAWA DOSTĘPNA: ${note} Zamówienia przyjmujemy min. 1 dzień wcześniej, dostawa 08:00–10:00.`;
  }

  return (
    `DOSTAWA NIEDOSTĘPNA do "${city}". ` +
    `Aktualnie dowozimy do wybranych miast. ` +
    `Skontaktuj się z nami, żeby sprawdzić czy Twoja lokalizacja jest w zasięgu: ` +
    `biuro@glodnyniedzwiedz.pl lub +48 732 999 072.`
  );
}

export function handleToolCall(
  name: string,
  input: Record<string, string>,
  menu: MenuData,
): string {
  if (name === 'search_menu') {
    return handleSearchMenu(menu, input.preferences, input.category, input.date);
  }
  if (name === 'check_delivery') {
    return handleCheckDelivery(input.city);
  }
  return 'Nieznane narzędzie.';
}
