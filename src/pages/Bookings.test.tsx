import { useBookings } from '@/api/bookings';
import BookingsTable, { columns } from '@/components/bookings/BookingsTable';
import { Booking } from '@/types/booking';
import { render, screen } from '@testing-library/react';
import { CompareFn } from 'antd/es/table/interface';
import { mocked } from 'jest-mock';
import { MemoryRouter } from 'react-router-dom';
import Bookings from './Bookings';

jest.mock('../api/bookings.ts', () => ({
  useBookings: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockData: Booking[] = [
  {
    id: '1',
    booking_dttm: '2024-06-06T10:00:00Z',
    carrier_name: 'Carrier A',
    passenger: 'John Doe',
    departure_station: 'Station A',
    arrival_station: 'Station B',
    departure_dttm: '2024-07-16T10:00:00Z',
    arrival_dttm: '2024-07-16T12:00:00Z',
    total_price: '100.00',
    currency: 'USD',
    status: 'active',
  },
  {
    id: '2',
    booking_dttm: '2024-06-06T10:00:00Z',
    carrier_name: 'Carrier B',
    passenger: 'Jane Doe',
    departure_station: 'Station C',
    arrival_station: 'Station D',
    departure_dttm: '2024-07-16T13:00:00Z',
    arrival_dttm: '2024-07-16T15:00:00Z',
    total_price: '110.00',
    currency: 'USD',
    status: 'cancelled',
  },
  {
    id: '3',
    booking_dttm: '2024-06-06T10:00:00Z',
    carrier_name: 'Carrier C',
    passenger: 'Alice Smith',
    departure_station: 'Station E',
    arrival_station: 'Station F',
    departure_dttm: '2024-07-16T16:00:00Z',
    arrival_dttm: '2024-07-16T18:00:00Z',
    total_price: '120.00',
    currency: 'USD',
    status: 'active',
  },
  {
    id: '4',
    booking_dttm: '2024-06-06T10:00:00Z',
    carrier_name: 'Carrier D',
    passenger: 'Bob Johnson',
    departure_station: 'Station G',
    arrival_station: 'Station H',
    departure_dttm: '2024-07-16T19:00:00Z',
    arrival_dttm: '2024-07-16T21:00:00Z',
    total_price: '130.00',
    currency: 'USD',
    status: 'cancelled',
  },
  {
    id: '5',
    booking_dttm: '2024-06-06T10:00:00Z',
    carrier_name: 'Carrier E',
    passenger: 'Charlie Brown',
    departure_station: 'Station I',
    arrival_station: 'Station J',
    departure_dttm: '2024-07-16T22:00:00Z',
    arrival_dttm: '2024-07-17T00:00:00Z',
    total_price: '140.00',
    currency: 'USD',
    status: 'active',
  },
  {
    id: '6',
    booking_dttm: '2024-06-06T10:00:00Z',
    carrier_name: 'Carrier F',
    passenger: 'David Wilson',
    departure_station: 'Station K',
    arrival_station: 'Station L',
    departure_dttm: '2024-07-17T01:00:00Z',
    arrival_dttm: '2024-07-17T03:00:00Z',
    total_price: '150.00',
    currency: 'USD',
    status: 'cancelled',
  },
  {
    id: '7',
    booking_dttm: '2024-06-06T10:00:00Z',
    carrier_name: 'Carrier G',
    passenger: 'Eve Adams',
    departure_station: 'Station M',
    arrival_station: 'Station N',
    departure_dttm: '2024-07-17T04:00:00Z',
    arrival_dttm: '2024-07-17T06:00:00Z',
    total_price: '160.00',
    currency: 'USD',
    status: 'active',
  },
  {
    id: '8',
    booking_dttm: '2024-06-06T10:00:00Z',
    carrier_name: 'Carrier H',
    passenger: 'Frank Miller',
    departure_station: 'Station O',
    arrival_station: 'Station P',
    departure_dttm: '2024-07-17T07:00:00Z',
    arrival_dttm: '2024-07-17T09:00:00Z',
    total_price: '180.00',
    currency: 'USD',
    status: 'cancelled',
  },
];

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Bookings Page', () => {
  it('renders "Bookings" text', () => {
    render(
      <MemoryRouter>
        <Bookings />
      </MemoryRouter>,
    );
    const headingElement = screen.getByText(/Bookings/i);
    expect(headingElement).toBeInTheDocument();
  });
});
beforeEach(() => {
  (mocked(useBookings) as unknown as jest.Mock).mockReturnValue({
    data: mockData,
    isLoading: false,
    isError: false,
  });
});
describe('BookingsTable', () => {
  it('renders loading state', () => {
    (mocked(useBookings) as unknown as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    });

    const wrapper = render(
      <MemoryRouter>
        <BookingsTable />
      </MemoryRouter>,
    );

    const spinner = wrapper.container.getElementsByClassName('ant-spin')[0];
    expect(spinner).toBeInTheDocument();
  });

  it('renders error state', () => {
    (mocked(useBookings) as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
    });

    render(
      <MemoryRouter>
        <BookingsTable />
      </MemoryRouter>,
    );
    expect(screen.getByText('Error fetching data')).toBeInTheDocument();
  });

  it('renders all columns', () => {
    const columnHeaders = [
      'Booking №',
      'Carrier name',
      'Passenger',
      'Departure',
      'Arrival',
      'Total price',
      'Status',
    ];
    render(
      <MemoryRouter>
        <BookingsTable />
      </MemoryRouter>,
    );
    columnHeaders.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it('should render table with correct number of rows', async () => {
    (mocked(useBookings) as unknown as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });
    const wrapper = render(
      <MemoryRouter>
        <BookingsTable />
      </MemoryRouter>,
    );
    const rows = wrapper.container.getElementsByClassName('ant-table-row');
    expect(rows).toHaveLength(mockData.length);
  });

  it('sorts by Booking №', () => {
    const sorter = columns.find(({ key }) => key === 'id').sorter as CompareFn<Booking>;
    expect(sorter(mockData[0], mockData[1])).toEqual(-1);
    expect(sorter(mockData[1], mockData[0])).toEqual(1);
  });
  it('sorts by Carrier', () => {
    const sorter = columns.find(({ key }) => key === 'carrier_name').sorter as CompareFn<Booking>;
    expect(sorter(mockData[0], mockData[1])).toEqual(-1);
    expect(sorter(mockData[1], mockData[0])).toEqual(1);
  });
  it('sorts by Total price', () => {
    const sorter = columns.find(({ key }) => key === 'total_price').sorter as CompareFn<Booking>;
    expect(sorter(mockData[0], mockData[1])).toBeLessThan(0);
    expect(sorter(mockData[1], mockData[0])).toBeGreaterThan(0);
  });
});
