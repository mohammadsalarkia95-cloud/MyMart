async function placeOrder(){
  if(!profile || !profile.firstName || !profile.phone){
    alert('Please complete your details before placing the order.')
    return
  }
  const cartNow = JSON.parse(localStorage.getItem('cart')||'[]')
  if(cartNow.length===0){ alert('Your cart is empty.'); return }

  const payload = {
    id: (crypto?.randomUUID && crypto.randomUUID()) || String(Date.now()),
    profile,
    items: cartNow,
    total: cartNow.reduce((s,i)=> s + Number(i.price?.value||0) * Number(i.qty||1), 0),
    createdAt: new Date().toISOString(),
    source: 'web',
    version: 'mymart-mvp-1'
  }

  try{
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if(!res.ok) throw new Error('bad status '+res.status)
    alert('Order submitted. We will contact you soon.')
    localStorage.removeItem('cart'); setCart([])
  }catch(err){
    console.error('Order error:', err)
    alert('Order failed. Please try again.')
  }
}
