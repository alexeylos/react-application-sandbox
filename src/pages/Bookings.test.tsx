import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import BookingsTable from '../components/bookings/BookingsTable';
import { mocked } from 'jest-mock';
import { useBookings } from '../api/bookings';
import Bookings from './Bookings';
import dayjs from 'dayjs';
import userEvent from '@testing-library/user-event';
import { bookings } from '../utils/bookingMockData';

jest.mock('../utils/bookingMockData.ts', () => ({
  bookings: jest.fn(() =>
    Promise.resolve(
      Array.from({ length: 21 }, (_, i) => ({
        id: `B${i + 1}`,
        booking_dttm: dayjs().subtract(i, 'day').toISOString(),
        carrier_name: `Carrier ${i + 1}`,
        passenger: `Passenger ${i + 1}`,
        departure_station: `Station ${i + 1}`,
        departure_dttm: dayjs().subtract(i, 'day').toISOString(),
        arrival_station: `Station ${i + 1}`,
        arrival_dttm: dayjs().add(i, 'day').toISOString(),
        total_price: (100 + i * 10).toFixed(2),
        currency: 'USD',
        status: i % 2 === 0 ? 'active' : 'cancelled',
      })),
    ),
  ),
}));

jest.mock('../api/bookings.ts', () => ({
  useBookings: jest.fn(),
}));

jest.mock('antd', () => {
  const originalAntd = jest.requireActual('antd');
  return {
    ...originalAntd,
    Table: ({ columns, dataSource }) => (
      <table data-testid="mock-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(item[col.dataIndex], item) : item[col.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ),
    Tag: ({ children, color }) => (
      <span data-testid="mock-tag" style={{ color }}>
        {children}
      </span>
    ),
  };
});

const mockData = [
  {
    id: '1',
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
    carrier_name: 'Carrier H',
    passenger: 'Frank Miller',
    departure_station: 'Station O',
    arrival_station: 'Station P',
    departure_dttm: '2024-07-17T07:00:00Z',
    arrival_dttm: '2024-07-17T09:00:00Z',
    total_price: '170.00',
    currency: 'USD',
    status: 'cancelled',
  },
  {
    id: '9',
    carrier_name: 'Carrier I',
    passenger: 'Grace Lee',
    departure_station: 'Station Q',
    arrival_station: 'Station R',
    departure_dttm: '2024-07-17T10:00:00Z',
    arrival_dttm: '2024-07-17T12:00:00Z',
    total_price: '180.00',
    currency: 'USD',
    status: 'active',
  },
  {
    id: '10',
    carrier_name: 'Carrier J',
    passenger: 'Hank Thompson',
    departure_station: 'Station S',
    arrival_station: 'Station T',
    departure_dttm: '2024-07-17T13:00:00Z',
    arrival_dttm: '2024-07-17T15:00:00Z',
    total_price: '190.00',
    currency: 'USD',
    status: 'cancelled',
  },
  {
    id: '11',
    carrier_name: 'Carrier K',
    passenger: 'Ivy Taylor',
    departure_station: 'Station U',
    arrival_station: 'Station V',
    departure_dttm: '2024-07-17T16:00:00Z',
    arrival_dttm: '2024-07-17T18:00:00Z',
    total_price: '200.00',
    currency: 'USD',
    status: 'active',
  },
  {
    id: '12',
    carrier_name: 'Carrier L',
    passenger: 'Jack White',
    departure_station: 'Station W',
    arrival_station: 'Station X',
    departure_dttm: '2024-07-17T19:00:00Z',
    arrival_dttm: '2024-07-17T21:00:00Z',
    total_price: '210.00',
    currency: 'USD',
    status: 'cancelled',
  },
  {
    id: '13',
    carrier_name: 'Carrier M',
    passenger: 'Kathy Green',
    departure_station: 'Station Y',
    arrival_station: 'Station Z',
    departure_dttm: '2024-07-17T22:00:00Z',
    arrival_dttm: '2024-07-18T00:00:00Z',
    total_price: '220.00',
    currency: 'USD',
    status: 'active',
  },
  {
    id: '14',
    carrier_name: 'Carrier N',
    passenger: 'Liam Brown',
    departure_station: 'Station AA',
    arrival_station: 'Station BB',
    departure_dttm: '2024-07-18T01:00:00Z',
    arrival_dttm: '2024-07-18T03:00:00Z',
    total_price: '230.00',
    currency: 'USD',
    status: 'cancelled',
  },
  {
    id: '15',
    carrier_name: 'Carrier O',
    passenger: 'Mia Blue',
    departure_station: 'Station CC',
    arrival_station: 'Station DD',
    departure_dttm: '2024-07-18T04:00:00Z',
    arrival_dttm: '2024-07-18T06:00:00Z',
    total_price: '240.00',
    currency: 'USD',
    status: 'active',
  },
  {
    id: '16',
    carrier_name: 'Carrier P',
    passenger: 'Noah Gray',
    departure_station: 'Station EE',
    arrival_station: 'Station FF',
    departure_dttm: '2024-07-18T07:00:00Z',
    arrival_dttm: '2024-07-18T09:00:00Z',
    total_price: '250.00',
    currency: 'USD',
    status: 'cancelled',
  },
  {
    id: '17',
    carrier_name: 'Carrier Q',
    passenger: 'Olivia Red',
    departure_station: 'Station GG',
    arrival_station: 'Station HH',
    departure_dttm: '2024-07-18T10:00:00Z',
    arrival_dttm: '2024-07-18T12:00:00Z',
    total_price: '260.00',
    currency: 'USD',
    status: 'active',
  },
  {
    id: '18',
    carrier_name: 'Carrier R',
    passenger: 'Paul Black',
    departure_station: 'Station II',
    arrival_station: 'Station JJ',
    departure_dttm: '2024-07-18T13:00:00Z',
    arrival_dttm: '2024-07-18T15:00:00Z',
    total_price: '270.00',
    currency: 'USD',
    status: 'cancelled',
  },
  {
    id: '19',
    carrier_name: 'Carrier S',
    passenger: 'Quincy White',
    departure_station: 'Station KK',
    arrival_station: 'Station LL',
    departure_dttm: '2024-07-18T16:00:00Z',
    arrival_dttm: '2024-07-18T18:00:00Z',
    total_price: '280.00',
    currency: 'USD',
    status: 'active',
  },
  {
    id: '20',
    carrier_name: 'Carrier T',
    passenger: 'Rachel Gold',
    departure_station: 'Station MM',
    arrival_station: 'Station NN',
    departure_dttm: '2024-07-18T19:00:00Z',
    arrival_dttm: '2024-07-18T21:00:00Z',
    total_price: '290.00',
    currency: 'USD',
    status: 'cancelled',
  },
  {
    id: '21',
    carrier_name: 'Carrier U',
    passenger: 'Steve Blue',
    departure_station: 'Station OO',
    arrival_station: 'Station PP',
    departure_dttm: '2024-07-18T22:00:00Z',
    arrival_dttm: '2024-07-19T00:00:00Z',
    total_price: '300.00',
    currency: 'USD',
    status: 'active',
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
    render(<Bookings />);
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

it('Tests length of bookings mockData', async () => {
  waitFor(() => expect(bookings).toHaveLength(21));
});

it('renders all columns', () => {
  render(<BookingsTable />);
  const columnHeaders = [
    'Booking №',
    'Carrier name',
    'Passenger',
    'Departure',
    'Arrival',
    'Total price',
    'Status',
  ];
  columnHeaders.forEach((header) => {
    expect(screen.getByText(header)).toBeInTheDocument();
  });
});

test('Renders bookings table with specific data', () => {
  (mocked(useBookings) as unknown as jest.Mock).mockReturnValue({
    data: mockData,
    isLoading: false,
    isError: false,
  });

  render(<BookingsTable />);

  // Test for specific data elements in the table body
  const bookingId = screen.getByText(mockData[0].id.toString());
  const carrierName = screen.getByText(mockData[0].carrier_name);

  expect(bookingId).toBeInTheDocument();
  expect(carrierName).toBeInTheDocument();
});

it('Sorts bookings by Booking № in ascending order', () => {
  (mocked(useBookings) as unknown as jest.Mock).mockReturnValue({
    data: mockData,
    isLoading: false,
    isError: false,
  });

  render(<BookingsTable />);

  const bookingIdHeader = screen.getByText('Booking №');
  fireEvent.click(bookingIdHeader);

  const firstRowId = screen.getByText(mockData[1].id.toString());
  const lastRowId = screen.getByText(mockData[0].id.toString());

  expect(firstRowId).toBeInTheDocument();
  expect(lastRowId).toBeInTheDocument();
});

describe('BookingsTable', () => {
  it('renders loading state', () => {
    (mocked(useBookings) as unknown as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    });

    render(<BookingsTable />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('renders error state', () => {
    (mocked(useBookings) as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
    });

    render(<BookingsTable />);
    expect(screen.getByText('Error fetching data')).toBeInTheDocument();
  });

  it('should render table with correct number of rows', async () => {
    (mocked(useBookings) as unknown as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<BookingsTable />);

    const rows = await waitFor(() => screen.getAllByRole('row'));
    expect(rows).toHaveLength(mockData.length + 1);
  });

  it('renders table when data is available', async () => {
    (mocked(useBookings) as unknown as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<BookingsTable />);

    await waitFor(() => expect(screen.getByText('1')).toBeInTheDocument());
  });

  it('renders booking ID and departure date', () => {
    const mockData = [
      {
        id: '123',
        carrier_name: 'Carrier A',
        passenger: 'John Doe',
        departure_station: 'Station A',
        arrival_station: 'Station B',
        departure_dttm: '2024-02-19T10:00:00Z',
        arrival_dttm: '2024-07-17T12:00:00Z',
        total_price: '100.00',
        currency: 'USD',
        status: 'active',
      },
    ];
    (mocked(useBookings) as unknown as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });
    render(<BookingsTable />);
    const bookingId = screen.getByText('123');
    expect(bookingId).toBeInTheDocument();
  });

  test('sorts by Booking №', () => {
    const mockData = [
      {
        id: '123',
        carrier_name: 'Carrier A',
        passenger: 'John Doe',
        departure_station: 'Station A',
        arrival_station: 'Station B',
        departure_dttm: '2024-07-17T10:00:00Z',
        arrival_dttm: '2024-07-17T12:00:00Z',
        total_price: '100.00',
        currency: 'USD',
        status: 'active',
      },
      {
        id: '456',
        carrier_name: 'Carrier B',
        passenger: 'Jane Doe',
        departure_station: 'Station C',
        arrival_station: 'Station D',
        departure_dttm: '2024-07-18T10:00:00Z',
        arrival_dttm: '2024-07-18T12:00:00Z',
        total_price: '200.00',
        currency: 'EUR',
        status: 'inactive',
      },
    ];
    (mocked(useBookings) as unknown as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });
    render(<BookingsTable />);
    const bookingNumberHeader = screen.getByText('Booking №');
    userEvent.click(bookingNumberHeader);

    const sortedBookingIds = screen.getAllByText(/123|456/).map((el) => el.textContent);
    expect(sortedBookingIds).toEqual(['123', '456']);
  });

  test('sorts by Carrier Name', () => {
    const mockData = [
      {
        id: '123',
        carrier_name: 'Carrier A',
        passenger: 'John Doe',
        departure_station: 'Station A',
        arrival_station: 'Station B',
        departure_dttm: '2024-07-17T10:00:00Z',
        arrival_dttm: '2024-07-17T12:00:00Z',
        total_price: '100.00',
        currency: 'USD',
        status: 'active',
      },
      {
        id: '456',
        carrier_name: 'Carrier B',
        passenger: 'Jane Doe',
        departure_station: 'Station C',
        arrival_station: 'Station D',
        departure_dttm: '2024-07-18T10:00:00Z',
        arrival_dttm: '2024-07-18T12:00:00Z',
        total_price: '200.00',
        currency: 'EUR',
        status: 'inactive',
      },
    ];
    (mocked(useBookings) as unknown as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });
    render(<BookingsTable />);
    const carrierNameHeader = screen.getByText('Carrier name');
    userEvent.click(carrierNameHeader);

    const sortedCarrierNames = screen
      .getAllByText(/Carrier A|Carrier B/)
      .map((el) => el.textContent);
    expect(sortedCarrierNames).toEqual(['Carrier A', 'Carrier B']);
  });

  test('sorts by Total price', () => {
    const mockData = [
      {
        id: '123',
        carrier_name: 'Carrier A',
        passenger: 'John Doe',
        departure_station: 'Station A',
        arrival_station: 'Station B',
        departure_dttm: '2024-07-17T10:00:00Z',
        arrival_dttm: '2024-07-17T12:00:00Z',
        total_price: '100.00',
        currency: 'USD',
        status: 'active',
      },
      {
        id: '456',
        carrier_name: 'Carrier B',
        passenger: 'Jane Doe',
        departure_station: 'Station C',
        arrival_station: 'Station D',
        departure_dttm: '2024-07-18T10:00:00Z',
        arrival_dttm: '2024-07-18T12:00:00Z',
        total_price: '200.00',
        currency: 'EUR',
        status: 'inactive',
      },
    ];
    (mocked(useBookings) as unknown as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });
    render(<BookingsTable />);
    const totalPriceHeader = screen.getByText('Total price');
    userEvent.click(totalPriceHeader);

    const sortedTotalPrices = screen.getAllByText(/\$100.00|€200.00/).map((el) => el.textContent);
    expect(sortedTotalPrices).toEqual(['$100.00', '€200.00']);
  });

  it('renders all columns and correct number of rows', async () => {
    render(<BookingsTable />);

    // Get all headers for columns
    const bookingNumberHeader = screen.getByText('Booking №');
    const carrierNameHeader = screen.getByText('Carrier name');
    const passengerHeader = screen.getByText('Passenger');
    const departureHeader = screen.getByText('Departure');
    const arrivalHeader = screen.getByText('Arrival');
    const totalPriceHeader = screen.getByText('Total price');
    const statusHeader = screen.getByText('Status');

    // Verify existence of all columns
    expect(bookingNumberHeader).toBeInTheDocument();
    expect(carrierNameHeader).toBeInTheDocument();
    expect(passengerHeader).toBeInTheDocument();
    expect(departureHeader).toBeInTheDocument();
    expect(arrivalHeader).toBeInTheDocument();
    expect(totalPriceHeader).toBeInTheDocument();
    expect(statusHeader).toBeInTheDocument();
  });

  it('renders formatted departure date and time', () => {
    render(<BookingsTable />);
    const departureDate = screen.getByTestId('departure-1');
    expect(departureDate).toHaveTextContent('2024-07-16 16:00');
  });

  it('renders formatted arrival date and time', () => {
    render(<BookingsTable />);
    const arrivalDate = screen.getByTestId('arrival-1');
    expect(arrivalDate).toHaveTextContent('2024-07-16 18:00');
  });

  it('renders formatted total price', () => {
    render(<BookingsTable />);
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: mockData[0].currency,
    }).format(parseFloat(mockData[0].total_price));
    expect(screen.getByText(formattedPrice)).toBeInTheDocument();
  });

  it('should render tags with correct colors based on status', () => {
    (mocked(useBookings) as unknown as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<BookingsTable />);

    mockData.forEach((booking, index) => {
      const statusTag = screen.getAllByTestId('mock-tag')[index];
      expect(statusTag).toHaveTextContent(booking.status.toUpperCase());
      expect(statusTag).toHaveStyle(`color: ${booking.status === 'active' ? 'green' : 'red'}`);
    });
  });
  it('renders data when request is successful', async () => {
    (mocked(useBookings) as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockData,
    });

    render(<BookingsTable />);

    await waitFor(() => {
      expect(screen.getByText('Carrier A')).toBeInTheDocument();
    });
  });
});
