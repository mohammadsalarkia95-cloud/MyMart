import { useEffect, useState } from "react"
export default function Profile(){
  const [firstName,setFirst]=useState(""),[lastName,setLast]=useState(""),[phone,setPhone]=useState("")
  useEffect(()=>{ const p=JSON.parse(localStorage.getItem("profile")||"null"); if(p){ setFirst(p.firstName||""); setLast(p.lastName||""); setPhone(p.phone||"") } },[])
  function save(){ localStorage.setItem("profile", JSON.stringify({ firstName, lastName, phone })); alert("Profile saved") }
  return (<main className="pt-16 pb-28 max-w-md mx-auto px-4">
    <h2 className="text-lg font-semibold">Profile</h2>
    <div className="mt-4 space-y-3">
      <input value={firstName} onChange={e=>setFirst(e.target.value)} placeholder="First name" className="w-full p-3 rounded-lg"/>
      <input value={lastName} onChange={e=>setLast(e.target.value)} placeholder="Last name" className="w-full p-3 rounded-lg"/>
      <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Mobile phone" className="w-full p-3 rounded-lg"/>
      <button onClick={save} className="retro-btn w-full py-3 rounded-lg">Save</button>
    </div>
  </main>)
}