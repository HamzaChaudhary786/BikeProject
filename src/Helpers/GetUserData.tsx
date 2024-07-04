export const getUserData = [
  // User 1
  {
    id: '1',
    userName: 'john_doe',
    email: 'john@example.com',
    type: 'manager',
    previousReservations: [
      {
        id: '101',
        bikeModel: 'Trek FX 1',
        bikeColor: 'Black',
        location: 'New York',
        rating: '2',
        startDate: '2024-01-10T08:00:00',
        endDate: '2024-01-15T17:00:00',
      },
    ],
  },

  // User 2
  {
    id: '2',
    userName: 'jane_smith',
    email: 'jane@example.com',
    type: 'user',
    previousReservations: [
      {
        id: '103',
        bikeModel: 'Cannondale Quick 4',
        bikeColor: 'Blue',
        rating: '',
        location: 'Chicago',
        startDate: '2024-03-10T10:00:00',
        endDate: '2024-03-15T16:00:00',
      },
    ],
  },

  // User 3
  {
    id: '3',
    userName: 'alice_jones',
    email: 'alice@example.com',
    type: 'manager',
    previousReservations: [
      {
        id: '105',
        bikeModel: 'Scott Sub Cross 30',
        bikeColor: 'Yellow',
        location: 'Seattle',
        rating: '2',
        startDate: '2024-05-10T12:00:00',
        endDate: '2024-05-15T14:00:00',
      },
    ],
  },

  // User 4
  {
    id: '4',
    userName: 'bob_brown',
    email: 'bob@example.com',
    type: 'user',
    previousReservations: [
      {
        id: '107',
        bikeModel: 'Marin Fairfax 1',
        bikeColor: 'Orange',
        location: 'Miami',
        rating: '',
        startDate: '2024-07-10T14:00:00',
        endDate: '2024-07-15T18:00:00',
      },
      {
        id: '108',
        bikeModel: 'Raleigh Redux 2',
        bikeColor: 'Purple',
        location: 'Atlanta',
        rating: '',
        startDate: '2024-08-20T15:00:00',
        endDate: '2024-08-25T17:30:00',
      },
    ],
  },

  // User 5
  {
    id: '5',
    userName: 'charlie_davis',
    email: 'charlie@example.com',
    type: 'manager',
    previousReservations: [
      {
        id: '109',
        bikeModel: 'Kona Dew',
        bikeColor: 'Pink',
        location: 'Houston',
        rating: '3',
        startDate: '2024-09-10T16:00:00',
        endDate: '2024-09-15T19:00:00',
      },
    ],
  },

  // User 6
  {
    id: '6',
    userName: 'diana_lee',
    email: 'diana@example.com',
    type: 'user',
    previousReservations: [
      {
        id: '111',
        bikeModel: 'Giant ToughRoad SLR GX 2',
        bikeColor: 'Black',
        location: 'Phoenix',
        rating: '',
        startDate: '2024-06-25T19:00:00', // Before current date
        endDate: '2024-06-30T22:30:00', // After current date
      },
      {
        id: '112',
        bikeModel: 'Specialized Diverge E5',
        bikeColor: 'Silver',
        location: 'Dallas',
        rating: '1',
        startDate: '2024-12-28T19:00:00', // In the future
        endDate: '2024-12-30T22:30:00', // In the future
      },
    ],
  },
];
