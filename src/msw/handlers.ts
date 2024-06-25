import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('/api/dashboard', () => {
    return HttpResponse.json({
      user_name: 'John Doe',
      tickets_sold: 42,
    });
  }),
];
