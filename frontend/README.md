L-15:-

- create a vite+React application
- Remove unneccessary code And create a Hello World!
- Install Tailwind
- Install Daisy UI
- Add NavBar component to app.jsx
- install react-router-dom
- create <BrowserRouter/> <Routes/> <Routes/>
- create <Outlet/>
- Create <Footer> <Login> Pages

L-16

- Install axios
- install cors in BE
- whenever you are making an api call sp pass axios=>{withCredentials:true}

- RTK: steps:-

1.  npm install @reduxjs/toolkit react-redux
2.  create store(appStore) by suing configureStore()
3.  provide the store(appStore) to our app by using <Provider/>
4.  create a slice & export actions & reducer
5.  To add this userSlice to my appStore

- add redux devtools in chrome
- Login and see if our data is comming properly in the store
- NavBar should update as soon as user logs in

L-17

- You should not be access other routes without login
- If token is not present, redirect user to login page
- Logout feature build:- clear the cookies
- Profile page build
- get the feed and add the feed in the store
- build the UserCard on feed
- Edit profile features
- Show Toast msg on save of profile 
- make feature of gender dropdown menu

L-18
- See all my connections
