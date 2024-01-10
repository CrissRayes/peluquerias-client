import React, { createContext, useState } from 'react';

const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalReserva, setTotalReserva] = useState(0);

  return (
    <BookContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        selectedServices,
        setSelectedServices,
        totalReserva,
        setTotalReserva,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export { BookContext, BookProvider };
