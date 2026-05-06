
import './App.css'


import ChildComponent from './components/ChildComponent'


import UserList from './components/UserList'


function App() {
 

  const studentName = "Rahul Sharma"   // This will be passed as the "name" prop
  const studentAge = 20                

 
  return (
    
    <div className="app">

    
      <h1 className="app-title">📘 Set 1 — Props & API Fetching</h1>

     
      <section className="task-section">
        <h2 className="task-title">Task 1: Props (Parent → Child)</h2>
        <p className="task-description">
          The parent component passes <strong>name</strong> and <strong>age</strong> to the child using props.
        </p>

        
        <ChildComponent name={studentName} age={studentAge} />
      </section>

      
      <section className="task-section">
        <h2 className="task-title">Task 2: Fetching Data from API</h2>
        <p className="task-description">
          Fetching users from <code>jsonplaceholder.typicode.com/users</code> and displaying Username & Email.
        </p>

       
        <UserList />
      </section>

    </div>
  )
}

export default App
