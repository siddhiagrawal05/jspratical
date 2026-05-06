
function ChildComponent({ name, age }) {
  return (
   
    <div className="child-card">
      
      <div className="child-card-header">👤 Student Info (from Child Component)</div>
      <div className="child-card-body">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Age:</strong> {age}</p>
      </div>
      <div className="child-card-footer">
        ✅ This data was passed from the Parent (App.jsx) using <strong>props</strong>!
      </div>
    </div>
  )
}


export default ChildComponent
