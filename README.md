# restaurant management app

hey guys, this is the code for the restaurant management system. i built it using mern stack because thats what i learned in the bootcamp.

## tech used
- node.js and express for backend (runs on port 5000 usually)
- mongodb for the database. we use mongoose.
- react for the frontend. i used vite to make it fast.
- bootstrap for styling because css is hard sometimes lol.
- axios to make requests

## folders
- `restaurant-backend/`: backend stuff. run `npm install` and `npm run dev` here. make sure u have a `.env` file with `PORT=5000`, `MONGODB_URI` and `JWT_SECRET`.
- `restaurant-frontend/`: react app. run `npm install` and `npm run dev` here too.

## features
- auth: you can login and it gives u a jwt token.
- menu: add or delete menu items.
- tables: see if tables are open or occupied.
- orders: u can place orders and it calculates the total.
- inventory: it tracks ingredients and stuff.

## notes to myself/others
- dont forget to start mongo db before running the backend!!!
- the frontend runs on localhost:5173 
- if something breaks check the console logs, i put a lot of them in the controllers.

let me know if there are any bugs!
