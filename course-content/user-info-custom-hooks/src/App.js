import { React, useState } from 'react'


//Custom hooks are clearly not only a tool for reuse, they also provide a better way for dividing our code into smaller modular parts.
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const App = () => {
  const name = useField('text')
  const born = useField('date')
  const height = useField('number')
  // ...

  return (
    <div>
      <form>
        name: 
        <input {...name}/> 
        <br />
        birthdate:
        <input {...born} />
        <br />
        height:
        <input {...height} />
      </form>
      <div>
        { name.value } { born.value } { height.value }
      </div>
    </div>
  )
}


//App before taking custom hook into use:
// const App = () => {
//   const [ name, setName ] = useState('')
//   const [ born, setBorn ] = useState('')
//   const [ height, setHeight ] = useState('')

//   return (
//     <div>
//       <form>
//         name
//         <input
//           type='text'
//           value={name}
//           onChange={(event) => setName(event.target.value)} 
//         />
//         <br />
//         birthdate:
//         <input
//           type='date'
//           value={born}
//           onChange={(event) => setBorn(event.target.value)} 
//         />
//         <br />
//         height:
//         <input
//           type='number'
//           value={height}
//           onChange={(event) => setHeight(event.target.value)} 
//         />
//       </form>
//       <div>
//         { name } { born } { height }
//       </div>
//     </div>
//   )
// }

export default App;
