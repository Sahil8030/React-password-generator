import { useState,useCallback,useEffect,useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const[password,setPassword]=useState("")

  //use ref hook
  const passwordRef = useRef(null)

const copyPasswordToClipboard=useCallback(()=>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
},[password])


  const passwordGnerator= useCallback(()=> {
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str +="0123456789"
    if(characterAllowed) str +="#$%^&*@"
    for(let i=1;i<=length;i++){
      let char =Math.floor(Math.random()*str.length+1)
      pass +=str.charAt(char)
    }

    setPassword(pass)
  }, [length,characterAllowed,numberAllowed,setPassword])
  useEffect(()=>{
    passwordGnerator()
  }, [length,numberAllowed,characterAllowed,passwordGnerator])
   
  return (
    <>
    
    
    <h1 className='text-4xl text-center text-red-600'>Password generator</h1>
    <div className='w-full max-w-md mx-aut0 shadow-md rounded-2xl px-4 my-8 text-orange-700 bg-orange-400'></div>
        <input
    type='text'
    value={password}
    className="outline-none w-full py-1 px-3 bg-white"
    placeholder='password'
    readOnly
    ref={passwordRef}
    />
    <button
    onClick={copyPasswordToClipboard}
     className='bg-blue-500 text-white px-3 py-0.5 shrink-0'>Copy</button>
    <div className='flex text-sm gap-x-2'>
      <input type="range"
      min={6}
      max={100}
      value={length}
      className='cursor-pointer'
      onChange={(e)=> {setLength(e.target.value)}}

      />
      <label>Length:{length}</label>
    </div>
    <div className='flex items-center gap-x-1'></div>
    <input 
    type='checkbox'
    defaultChecked={numberAllowed}
    id="numberInput"
    onChange={()=>{
      setNumberAllowed((prev)=>!prev);
    }}
    />
    <label htmlFor='numberInput'>Number</label>
    
    <div className='flex items-center gap-x-1'></div>
    <input 
    type='checkbox'
    defaultChecked={characterAllowed}
    id="characterInput"
   onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
    }}
    />
    <label htmlFor='characterInput'>Character</label>
    
    </>
  )
}

export default App
