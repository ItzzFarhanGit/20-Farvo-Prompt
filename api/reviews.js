// Vercel serverless function: public reviews stored in Upstash Redis (Vercel Marketplace "Upstash Redis" / KV).
const U=process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL,T=process.env.KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN,K='farvo:reviews';
const rd=async c=>{const r=await fetch(U,{method:'POST',headers:{Authorization:'Bearer '+T,'Content-Type':'application/json'},body:JSON.stringify(c)});if(!r.ok)throw new Error('redis');return(await r.json()).result};
module.exports=async(req,res)=>{
  res.setHeader('Cache-Control','no-store');
  if(!U||!T)return res.status(503).json({error:'Reviews database is not configured.'});
  try{
    if(req.method==='GET'){
      const [raw,count]=await Promise.all([rd(['LRANGE',K,0,199]),rd(['LLEN',K])]);
      const list=raw.map(s=>{try{return JSON.parse(s)}catch(e){return null}}).filter(Boolean);
      const avg=list.length?list.reduce((a,x)=>a+x.r,0)/list.length:0;
      return res.status(200).json({reviews:list.slice(0,100),count,avg:Math.round(avg*10)/10});
    }
    if(req.method==='POST'){
      let b=req.body;if(typeof b==='string'){try{b=JSON.parse(b)}catch(e){b={}}}b=b||{};
      if(b.website)return res.status(201).json({ok:true}); // honeypot
      const n=String(b.name||'').trim().replace(/\s+/g,' ').slice(0,40),c=String(b.comment||'').trim().slice(0,500),r=Math.round(Number(b.rating));
      if(n.length<2||c.length<5||!(r>=1&&r<=5))return res.status(400).json({error:'Enter your name, a rating from 1 to 5 and a short review.'});
      const ip=String(req.headers['x-forwarded-for']||'x').split(',')[0].trim(),rk='farvo:rl:'+ip,hits=await rd(['INCR',rk]);
      if(hits===1)await rd(['EXPIRE',rk,3600]);
      if(hits>5)return res.status(429).json({error:'Too many reviews from your network. Please try again later.'});
      const item={n,r,c,t:Date.now()};
      await rd(['LPUSH',K,JSON.stringify(item)]);await rd(['LTRIM',K,0,499]);
      return res.status(201).json({ok:true,review:item});
    }
    res.setHeader('Allow','GET, POST');return res.status(405).json({error:'Method not allowed'});
  }catch(e){return res.status(500).json({error:'Server error. Please try again later.'})}
};
