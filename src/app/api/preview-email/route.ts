import { NextRequest, NextResponse } from 'next/server';
import { buildCustomerEmailHtml, buildRestaurantEmailHtml, OrderEmailData } from '@/lib/resend';

const mockOrder: OrderEmailData = {
  orderId: 'abc123de-preview',
  customerFirstName: 'Kuba',
  customerLastName: 'Kowalski',
  customerEmail: 'kuba@firma.pl',
  customerPhone: '+48 600 123 456',
  companyName: 'Firma XYZ Sp. z o.o.',
  address: 'ul. Marszałkowska 45/3',
  city: 'Warszawa',
  floorRoom: 'Piętro 3, biuro 301',
  notes: 'Zadzwoń przed wejściem do budynku.',
  items: [
    { name: 'Schabowy z ziemniakami i surówką', category: 'Obiad', price: 28.5, date: '14.04.2026', quantity: 2 },
    { name: 'Zupa dnia — żurek z jajkiem', category: 'Zupy', price: 14.0, date: '14.04.2026', quantity: 1 },
    { name: 'Sushi Mix 12 szt.', category: 'Sushi', price: 42.0, date: '15.04.2026', quantity: 1 },
    { name: 'Kanapka z łososiem i awokado', category: 'Kanapki', price: 18.5, date: '16.04.2026', quantity: 3 },
  ],
  totalAmount: 172.57,
  paymentMethod: 'stripe',
  deliveryDates: ['14.04.2026', '15.04.2026', '16.04.2026'],
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') ?? 'customer';

  const html =
    type === 'restaurant'
      ? buildRestaurantEmailHtml(mockOrder)
      : buildCustomerEmailHtml(mockOrder);

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
