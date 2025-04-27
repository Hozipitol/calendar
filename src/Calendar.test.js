import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from './Calendar'; 
import '@testing-library/jest-dom'

describe('Calendar Component', () => {

  it('renders the current month and year', () => {
    try {
      render(<Calendar />);
      const date = new Date();
      const month = date.toLocaleString('default', { month: 'short' });
      const header = screen.getByText(`${month} ${date.getFullYear().toString()}`);
      expect(header).toBeInTheDocument();
    } catch (error) {
      throw new Error('Calendar did not render the current month and year');
    }
  });
  

  it('navigates to the next month', () => {
    try {
      render(<Calendar />);
      const nextButton = screen.getByText('>');
      fireEvent.click(nextButton);

      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear().toString();
      const header = screen.getByText(`${month} ${year}`);
      expect(header).toBeInTheDocument();
    } catch (error) {
      throw new Error('Calendar did not navigate to the next month');
    }
  });

  it('does not select a date from a previous month', () => {
    try {
      render(<Calendar />);
      const prevButton = screen.getByText('<');
      fireEvent.click(prevButton);
      const dayCell = screen.queryByText('10'); // any day
      if (dayCell) {
        fireEvent.click(dayCell);
        expect(dayCell).not.toHaveClass('selected');
      }
    } catch {
      throw new Error('Negative test failed: previous-month date became selected');
    }
  });


  it('navigates to the previous month', () => {
    try {
      render(<Calendar />);
      const prevButton = screen.getByText('<');
      fireEvent.click(prevButton);

      const date = new Date();
      date.setMonth(date.getMonth() - 1);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear().toString();
      const header = screen.getByText(`${month} ${year}`);
      expect(header).toBeInTheDocument();
    } catch (error) {
      throw new Error('Calendar did not navigate to the previous month');
    }
  });


  it('selects a future date', () => {
    try {
      render(<Calendar />);
      const dayCell = screen.queryByText('28'); // Example: pick 15
      if (dayCell) {
        fireEvent.click(dayCell);
        expect(dayCell).toHaveClass('selected');
      }
    } catch (error) {
      throw new Error('Calendar did not select a future date');
    }
  });


  it('selects a future date from next month', () => {
    try {
      render(<Calendar />);
  
      const nextButton = screen.getByText('>');
      fireEvent.click(nextButton); // Move to next month
  
      const dayCell = screen.queryByText('25'); // Select 25th in next month
      if (dayCell) {
        fireEvent.click(dayCell);
        expect(dayCell).toHaveClass('selected');
      }
    } catch (error) {
      throw new Error('Calendar did not select a future date from next month');
    }
  });

  it('selects the target date 06/22/2025 correctly', () => {
    try {
      render(<Calendar />);
  
      const targetDate = new Date('2025-06-22');
      // track our position in the calendar
      const tracker = new Date();
  
      // navigate month-by-month until we reach June 2025
      while (
        tracker.getFullYear() !== targetDate.getFullYear() ||
        tracker.getMonth()    !== targetDate.getMonth()
      ) {
        fireEvent.click(screen.getByText('>'));
        tracker.setMonth(tracker.getMonth() + 1);
      }
  
      const dayCell = screen.getByText(targetDate.getDate().toString());
      expect(dayCell).toBeInTheDocument();
      expect(dayCell).not.toHaveClass('past');
  
      fireEvent.click(dayCell);
      expect(dayCell).toHaveClass('selected');
    } catch {
      throw new Error('Calendar did not select 06/22/2025 correctly');
    }
  });



  it('checks February days for the current non-leap year', () => {
    try {
      const year = new Date().getFullYear();
      const isLeap =
        (year % 4 === 0 && year % 100 !== 0) ||
        year % 400 === 0;
  
      if (isLeap) {
        throw new Error(`Skipping test: ${year} is a leap year`);
      }
  
      render(<Calendar />);
  
      // navigate to February of the current year
      const currentMonth = new Date().getMonth();
      const targetMonth = 1; // February
      const diff = targetMonth - currentMonth;
      const button = diff > 0 ? screen.getByText('>') : screen.getByText('<');
      for (let i = 0; i < Math.abs(diff); i++) {
        fireEvent.click(button);
      }
  
      // in a non-leap year, Feb 29 should not exist
      expect(screen.queryByText('29')).toBeNull();
      expect(screen.queryByText('28')).toBeInTheDocument();
    } catch {
      throw new Error('February test for current non-leap year failed');
    }
  });

});