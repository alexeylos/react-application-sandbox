import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('/api/dashboard', () => {
    return HttpResponse.json({
      name: 'John Doe',
      pax: 2043,
      pax_delta: 100,
      gmv: 340302,
      gmv_delta: -10000,
      currency: 'USD',
    });
  }),
];
