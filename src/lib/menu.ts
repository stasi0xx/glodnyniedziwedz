import { createServerSupabaseClient } from '@/lib/supabase';
import type { MenuData } from '@/lib/chat/types';

export async function fetchPublishedMenu(): Promise<MenuData | null> {
  const supabase = createServerSupabaseClient();

  const { data: week } = await supabase
    .from('menu_weeks')
    .select('id')
    .eq('status', 'published')
    .order('week_start', { ascending: false })
    .limit(1)
    .single();

  if (!week) return null;

  const { data: items, error } = await supabase
    .from('menu_items')
    .select('date, category, name, price_pln, price, is_vege, is_spicy')
    .eq('week_id', week.id)
    .order('position');

  if (error || !items) return null;

  const menu: MenuData = {};

  for (const item of items) {
    if (!menu[item.date]) menu[item.date] = {};
    if (!menu[item.date][item.category]) menu[item.date][item.category] = [];

    const pricePln = item.price_pln ?? item.price;
    const priceStr =
      String(pricePln).replace('.', ',').replace(/,?0+$/, '').replace(/,$/, '') + ' zł';

    menu[item.date][item.category].push({ nazwa: item.name, cena: priceStr });
  }

  return menu;
}
