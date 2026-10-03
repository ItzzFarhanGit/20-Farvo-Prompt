// Vercel serverless function: emails the contact form to you via Resend.
const str=(v,n)=>String(v==null?'':v).trim().slice(0,n);
module.exports=async(req,res)=>{
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed'})}
  let b=req.body;if(typeof b==='string'){try{b=JSON.parse(b)}catch(e){b={}}}b=b||{};
  if(b.website)return res.status(200).json({ok:true}); // honeypot: bots fill this
  const name=str(b.name,80).replace(/[\r\n]+/g,' '),email=str(b.email,120).replace(/[\r\n]+/g,''),message=str(b.message,2000);
  if(name.length<2||!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)||message.length<5)return res.status(400).json({error:'Please fill in all fields correctly.'});
  const key=process.env.RESEND_API_KEY,to=process.env.CONTACT_TO;
  if(!key||!to)return res.status(500).json({error:'Email is not configured on the server.'});
  try{
    const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+key,'Content-Type':'application/json'},
      body:JSON.stringify({from:process.env.CONTACT_FROM||'FARVO Prompt <onboarding@resend.dev>',to:[to],reply_to:email,subject:'FARVO Prompt contact: '+name,text:`Name: ${name}\nEmail: ${email}\n\n${message}`})});
    if(!r.ok)return res.status(502).json({error:'Could not send the message. Try again later.'});
    return res.status(200).json({ok:true});
  }catch(e){return res.status(502).json({error:'Could not send the message. Try again later.'})}
};
