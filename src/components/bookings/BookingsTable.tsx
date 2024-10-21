import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React from 'react';
import { useBookings } from '../../api/bookings';
import { Booking } from '../../types/booking';

export const columns: ColumnsType<Booking> = [
  {
    title: 'Booking №',
    dataIndex: 'id',
    key: 'id',
    sorter: (a: Booking, b: Booking) => a.id.localeCompare(b.id),
    render: (text: string, record: Booking) => (
      <>
        <div>{text}</div>
        <div>{dayjs(record.departure_dttm).format('YYYY-MM-DD HH:mm')}</div>
      </>
    ),
  },
  {
    title: 'Carrier name',
    dataIndex: 'carrier_name',
    key: 'carrier_name',
    sorter: (a: Booking, b: Booking) => a.carrier_name.localeCompare(b.carrier_name),
  },
  {
    title: 'Passenger',
    dataIndex: 'passenger',
    key: 'passenger',
  },
  {
    title: 'Departure',
    dataIndex: 'departure_station',
    key: 'departure_station',
    render: (text: string, record: Booking) => (
      <>
        <div>{text}</div>
        <div data-testid={`departure-${record.id}`}>
          {dayjs(record.departure_dttm).format('YYYY-MM-DD HH:mm')}
        </div>
      </>
    ),
  },
  {
    title: 'Arrival',
    dataIndex: 'arrival_station',
    key: 'arrival_station',
    render: (text: string, record: Booking) => (
      <>
        <div>{text}</div>
        <div data-testid={`arrival-${record.id}`}>
          {dayjs(record.arrival_dttm).format('YYYY-MM-DD HH:mm')}
        </div>
      </>
    ),
  },
  {
    title: 'Total price',
    dataIndex: 'total_price',
    key: 'total_price',
    sorter: (a: Booking, b: Booking) => parseFloat(a.total_price) - parseFloat(b.total_price),
    render: (text: string, record: Booking) => {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: record.currency,
      });
      return <span>{formatter.format(parseFloat(text))}</span>;
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text: string) => (
      <Tag color={text === 'active' ? 'green' : 'red'}>{text.toUpperCase()}</Tag>
    ),
  },
];

const BookingsTable: React.FC = () => {
  const { data, isLoading, isError } = useBookings();

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <Table
      columns={columns}
      dataSource={data || []}
      pagination={{ pageSize: 10 }}
      loading={isLoading}
      rowKey="id"
    />
  );
};

export default BookingsTable;
