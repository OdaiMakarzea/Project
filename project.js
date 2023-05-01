class Hotel {
    constructor(name, address) {
      this._name = name;
      this._address = address;
      this._rooms = [];
    }
  
    get name() {
      return this._name;
    }
  
    get address() {
      return this._address;
    }
  
    get rooms() {
      return this._rooms;
    }
  
    addRoom(room) {
      this._rooms.push(room);
    }
  }
  
  class Room {
    constructor(number, type, occupancy, rate) {
      this._number = number;
      this._type = type;
      this._occupancy = occupancy;
      this._rate = rate;
      this._bookings = [];
    }
  
    get number() {
      return this._number;
    }
  
    get type() {
      return this._type;
    }
  
    get occupancy() {
      return this._occupancy;
    }
  
    get rate() {
      return this._rate;
    }
  
    get bookings() {
      return this._bookings;
    }
  
    isAvailable(checkInDate, checkOutDate) {
      for (let booking of this._bookings) {
        if (
          (booking.checkInDate >= checkInDate && booking.checkInDate <= checkOutDate) ||
          (booking.checkOutDate >= checkInDate && booking.checkOutDate <= checkOutDate) ||
          (booking.checkInDate <= checkInDate && booking.checkOutDate >= checkOutDate)
        ) {
          return false;
        }
      }
      return true;
    }
  
    book(checkInDate, checkOutDate) {
      if (this.isAvailable(checkInDate, checkOutDate)) {
        const booking = new Booking(checkInDate, checkOutDate);
        this._bookings.push(booking);
        return booking;
      } else {
        return null;
      }
    }
  }
  
  class Booking {
    constructor(checkInDate, checkOutDate) {
      this._checkInDate = checkInDate;
      this._checkOutDate = checkOutDate;
    }
  
    get checkInDate() {
      return this._checkInDate;
    }
  
    get checkOutDate() {
      return this._checkOutDate;
    }
  }
  
  // Mock Data
  const hotel = new Hotel("Hotel Nuevo Madrid", "C. Bausá, 27, 28033 Madrid, Spain");
  const room1 = new Room(101, "Single", 1, 150);
  const room2 = new Room(102, "Double", 2, 250);
  const room3 = new Room(103, "Suite", 2, 400);
  hotel.addRoom(room1);
  hotel.addRoom(room2);
  hotel.addRoom(room3);
  
  // Book a room
  const checkInDate = new Date(2023, 4, 30);
  const checkOutDate = new Date(2023, 5, 6);
  const availableRooms = hotel.rooms.filter(room => room.isAvailable(checkInDate, checkOutDate));
  if (availableRooms.length > 0) {
    const bookedRoom = availableRooms[0];
    const booking = bookedRoom.book(checkInDate, checkOutDate);
    console.log(`Booked Room ${bookedRoom.number} for ${booking.checkInDate.toDateString()} to ${booking.checkOutDate.toDateString()}`);
  } else {
    console.log('No rooms available for the selected dates.');
  }
  