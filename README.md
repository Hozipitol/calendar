# Calendar App with ReactJS

## Deployed Link: 
 - https://calendar-ta.vercel.app/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

##  Installation

1. Clone the files , Just simply run the follwoing command in your terminal
- ### `git clone https://github.com/Hozipitol/calendar.git`
-----------------------------------------
2. Run npm install, it automatically reads your package.json and installs dependencies.
- ### `npm install`
----------------------------------------
3. Runs the app in the development mode.
- ### `npm start`
Runs the app in the development mode on http://localhost:3000/ .

## File Structure

- **`calendar.js`**  
  Contains the full working Calendar component implementation.  

- **`cal.css`**  
  Contains all Stylings of the component and div

- **`calendar.test.js`**  
  Contains all unit tests for the Calendar component.  

- **`app.js`**  
  Imports and renders the Calendar component (e.g. `<Calendar />`).  

- **`index.js`**  
  Bootstraps the React application (renders `<App />` into the DOM).  

# Code Details

1. **Imports & Constants**
   - **useState**, **useMemo** from React to manage state and memoize calculations  
   - `MONTH_NAMES`, `WEEK_DAYS` arrays for headers  

2. **State Variables**
   - **currentDate** (`Date`): active month/year view  
   - **selectedDate** (`Date | null`): user-chosen date  

3. **`today` Memo**
   - Creates a `Date` set to midnight for accurate day-only comparisons  

4. **`days` Memo** (recomputes on `currentDate` or `selectedDate` change)  
   1. **Calculate `totalDays`**:  
      ```js
      new Date(year, month + 1, 0).getDate()
      ```  
      gives number of days in the current month  
   2. **Find `firstDay`**:  
      ```js
      new Date(year, month, 1).getDay()
      ```  
      gives weekday index (0–6) of the 1st  
   3. **Initialize `daysArray`**:  
      ```js
      Array(firstDay).fill(null)
      ```  
      adds blank slots before the 1st of the month  
   4. **Populate days**  
      - Loop from **1** to **totalDays**  
      - For each day:
        ```js
        const date = new Date(year, month, day);
        ```
      - Push an object with:
        - `day` (`number`)
        - `isToday` (`boolean`)
        - `isPast` (`boolean`)
        - `isSelected` (`boolean`)
  
5. **Event Handlers**

   ### `changeMonth(offset)`
   - Updates `currentDate` to the 1st of the new month of either current or previous
   - Resets `selectedDate` to `null`  

   ### `handleDateClick(day)`
   - Builds full `Date` for the clicked day  
   - Sets `selectedDate` only if the date is today or in the future  


## Working
1. **Display Current Month on Load**  
  Shows the current month and year (abbreviated month name) in the header.

2. **Highlight Today**  
  Marks today’s date in gray.

3. **Gray Out Past Dates**  
  Renders all dates before today in a muted/“disabled” style.

4. **Hide Out-of-Month Days**  
  Does not render any days that fall outside the currently displayed month.

![image](https://github.com/user-attachments/assets/dac64221-b2d6-4651-9e42-8f43012261d7)


5. **Month Navigation Arrows**  
  Provides `<` and `>` buttons to move to the previous or next month.
![image](https://github.com/user-attachments/assets/bc63f15c-377e-4056-904e-7cd85dff47eb)
![image](https://github.com/user-attachments/assets/65a68e30-43ee-4a95-b1c0-c31a9eee22ac)


6. **Selectable Dates**  
  Allows clicking on today or any future date to select it (highlighted in green), and prevents selecting past dates.
- Future Date Selected
  
![image](https://github.com/user-attachments/assets/e61a80ce-ddce-4caf-afd6-30f60c78958d)

- Today's Date Selected
![image](https://github.com/user-attachments/assets/a4d605a1-e94f-4ca8-ac84-e94585a3dd89)



## For Testing
### `npm run test`
Launches the test runner and shows the output.
![image](https://github.com/user-attachments/assets/f66c6a01-11bf-42dc-85ce-c8b94d593f2a)


## `npm test --verbose`
Run this for detailed test cases description, with each test being passed you get message mentioned in describe block.
![image](https://github.com/user-attachments/assets/3193663c-9171-4ff4-a8ff-407b9af3a772)



