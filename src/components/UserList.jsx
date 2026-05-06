/*
 * ============================================================
 *  📄 FILE: components/UserList.jsx
 * ============================================================
 *
 *  🤔 WHAT IS THIS FILE?
 *  This component FETCHES data from an external API (a server on the internet)
 *  and displays it on screen.
 *
 *  🌐 WHAT IS AN API?
 *  API = Application Programming Interface
 *  Think of it as a WAITER in a restaurant:
 *  - You (the app) send a REQUEST to the kitchen (server)
 *  - The waiter (API) brings back the RESPONSE (data)
 *  - You display that data on screen!
 *
 *  The API we're using: https://jsonplaceholder.typicode.com/users
 *  It returns FAKE user data (10 users with name, email, etc.)
 *  It's a free API made for practice and testing!
 *
 *  📝 KEY CONCEPTS:
 *  - useState (to store data that changes)
 *  - useEffect (to run code when component loads)
 *  - fetch() (to make API requests)
 *  - .map() (to loop over an array and render each item)
 *
 * ============================================================
 *  📚 VIVA QUESTIONS:
 *
 *  Q1: What is useState?
 *  A1: useState is a React HOOK that lets you add "state" (changeable data) 
 *      to a component. It returns an array with two items:
 *      [currentValue, functionToUpdateIt]
 *      Example: const [count, setCount] = useState(0)
 *
 *  Q2: What is useEffect?
 *  A2: useEffect is a React HOOK that lets you run side effects
 *      (like fetching data, timers, etc.) in your component.
 *      It runs AFTER the component renders on screen.
 *      The empty array [] means "run this only ONCE when component loads".
 *
 *  Q3: What is fetch()?
 *  A3: fetch() is a built-in JavaScript function to make HTTP requests
 *      (like visiting a URL). It returns a Promise, so we use .then()
 *      or async/await to handle the response.
 *
 *  Q4: Why do we use .map() instead of a for loop?
 *  A4: In JSX, we can't use regular for loops because JSX expects 
 *      EXPRESSIONS (things that return a value), not STATEMENTS.
 *      .map() returns a new array of JSX elements, which React can render.
 *
 *  Q5: What is the "key" prop in .map()?
 *  A5: When rendering a list, React needs a unique "key" for each item
 *      to efficiently track which items changed, were added, or removed.
 *      Usually we use the item's ID from the data.
 *
 *  Q6: What does the empty array [] in useEffect mean?
 *  A6: It's called the "dependency array". An empty [] means 
 *      "run this effect only ONCE when the component first mounts".
 *      Without it, the effect would run on EVERY re-render (bad for API calls!).
 *
 *  Q7: What is async/await?
 *  A7: async/await is a modern way to handle Promises (asynchronous operations).
 *      "async" marks a function as asynchronous.
 *      "await" pauses execution until the Promise resolves (data arrives).
 *      It makes asynchronous code look like regular synchronous code.
 * ============================================================
 */

// 🔽 IMPORTS — We need two React hooks for this component

// useState → To store the list of users we fetch from the API
// useEffect → To fetch data when the component first appears on screen
import { useState, useEffect } from 'react'

function UserList() {

  // ──────────────────────────────────────────────
  // 📦 STATE — Declaring variables that can CHANGE
  // ──────────────────────────────────────────────

  /*
   * useState([]) creates a state variable called "users"
   * 
   * Breaking it down:
   * - users      → The current value (starts as an empty array [])
   * - setUsers   → The function to UPDATE users (like a setter)
   * - useState([]) → Initial value is an empty array (no users yet)
   * 
   * WHY an empty array?
   * Because we'll fill it with user data AFTER the API call finishes.
   * The API returns an ARRAY of user objects, so we start with an empty array.
   */
  const [users, setUsers] = useState([])

  // Loading state — to show "Loading..." while we wait for data
  const [loading, setLoading] = useState(true)

  // ──────────────────────────────────────────────
  // 🔄 useEffect — Runs code AFTER the component appears on screen
  // ──────────────────────────────────────────────

  /*
   * useEffect takes TWO arguments:
   * 1. A function → The code to run (our API fetch)
   * 2. A dependency array → WHEN to run it
   * 
   * useEffect(() => { ... }, [])
   *                           ↑
   *                    Empty array = run only ONCE!
   * 
   * 💡 ANALOGY:
   * useEffect is like saying "Hey React, AFTER you've painted the screen,
   * go do this task in the background (like fetching data from the internet)"
   */
  useEffect(() => {
    // We define an async function inside useEffect
    // (useEffect itself can't be async, so we create one inside)

    const fetchUsers = async () => {
      try {
        // 🌐 FETCH — Send a request to the API URL
        // "await" means "wait here until the data comes back"
        // It's like ordering food and waiting at the counter
        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        // Convert the response to JSON format (JavaScript Object Notation)
        // The raw response is not usable — we need to parse it into JS objects
        const data = await response.json()

        // 📦 Store the fetched data in our state variable
        // setUsers(data) → Updates "users" from [] to [array of 10 user objects]
        // React will automatically RE-RENDER the component to show the new data!
        setUsers(data)

        // Data has arrived, stop showing "Loading..."
        setLoading(false)

      } catch (error) {
        // If something goes wrong (no internet, API down, etc.)
        // catch the error so the app doesn't crash
        console.error('Error fetching users:', error)
        setLoading(false)
      }
    }

    // Actually CALL the function we just defined
    fetchUsers()

  }, []) // ← Empty array = run this effect only ONCE when component mounts

  // ──────────────────────────────────────────────
  // 🖥️ RENDER — What appears on screen
  // ──────────────────────────────────────────────

  // Show loading message while data is being fetched
  if (loading) {
    return <div className="loading">⏳ Loading users from API...</div>
  }

  return (
    <div className="user-list">
      {/*
        🔽 .map() — Loop over the "users" array and create JSX for each user
        
        Think of .map() like a machine:
        - Input: An array of raw data [user1, user2, user3, ...]
        - Output: An array of JSX cards [<card1>, <card2>, <card3>, ...]
        
        For EACH user in the array, we create a card showing their info.
        
        "user" → The current item in the loop (one user object)
        "user.id" → Each user has a unique ID (1, 2, 3, ...)
        
        key={user.id} → React uses this to track each item efficiently
        (ALWAYS add a key when using .map() to render lists!)
      */}
      {users.map((user) => (
        <div key={user.id} className="user-card">
          {/*
            The API returns objects like:
            {
              id: 1,
              name: "Leanne Graham",
              username: "Bret",
              email: "Sincere@april.biz",
              ...more fields
            }
            
            We display user.username and user.email as required by the task.
          */}
          <p className="user-username">👤 <strong>Username:</strong> {user.username}</p>
          <p className="user-email">📧 <strong>Email:</strong> {user.email}</p>
        </div>
      ))}
    </div>
  )
}

// Export so App.jsx can import and use this component
export default UserList