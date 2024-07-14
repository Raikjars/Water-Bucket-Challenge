# Water Bucket Challenge
The challenge involves using two jugs with different capacities (X gallons and Y gallons) to measure exactly Z gallons of water. Your application should have a user interface (UI) that displays the state changes of each jug (Empty, Full, or Partially Full) as it progresses towards the solution.

## Development server
Important note: To install via npm/Yarn, you need at least Node.js 14 or higher.

#### Step 1
Download the code from the repository using github or git bash with the command
```bash
  git clone https://github.com/Raikjars/Water-Bucket-Challenge.git
```

#### Step 2
Install project dependencies with the command
```bash
  npm install
```

#### Step 3
To run the project locally you must use the command
```bash
  ng serve
```

## Dependencies
The main libraries used for the development of this project are the following:

- **Angular Cli**: The application frontend is developed using the Angular 15.1.4 framework.

- **NodeJs**: Version **14.15.4 LTS or higher** is used as the execution environment.

- **HTML5, CSS3 and JavaScript (ECMAScript 5)** are used for the development of the web application.

## Algorithmic Approach

**Solution 1 (Always pour from X liter jug into Y liter jug)** 

- Fill the X litre jug and empty it into Y liter jug.
- Whenever the X liter jug becomes empty fill it.
- Whenever the Y liter jug becomes full empty it.
- Repeat steps 1,2,3 till either Y liter jug or the X liter jug contains Z litres of water.

**Solution 2 (Always pour from Y liter jug into X liter jug)**

- Fill the Y liter jug and empty it into X liter jug.
- Whenever the Y liter jug becomes empty fill it.
- Whenever the X liter jug becomes full empty it.
- Repeat steps 1, 2 and 3 till either Y liter jug or the X liter jug contains Z liters of water.

**Edge Case (No Solution)**

If the greatest common divisor of X and Y does not divide Z, then the solution is not possible.
