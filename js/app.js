const $=s=>document.querySelector(s),mem={};
const S={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return k in mem?mem[k]:d}},set(k,v){mem[k]=v;try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
async function hs(s){try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('farvo|'+s));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){let h1=3735928559,h2=1103547991;for(const ch of 'farvo|'+s){const c=ch.charCodeAt(0);h1=Math.imul(h1^c,2654435761);h2=Math.imul(h2^c,1597334677)}return 'x'+(h1>>>0).toString(16)+(h2>>>0).toString(16)}}
function toast(m){const t=document.createElement('div');t.className='toast';t.textContent=m;t.setAttribute('role','status');document.body.append(t);setTimeout(()=>t.remove(),1800)}
function copy(t){const done=()=>toast('Copied');try{navigator.clipboard.writeText(t).then(done,fb)}catch(e){fb()}function fb(){const a=document.createElement('textarea');a.value=t;a.style.cssText='position:fixed;top:0;left:-9999px;min-height:0';document.body.append(a);a.select();a.setSelectionRange(0,t.length);try{document.execCommand('copy')}catch(e){}a.remove();done()}}
/* theme */
const root=document.documentElement;
root.dataset.theme=S.get('fp_theme',matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
function toggleTheme(){root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';S.set('fp_theme',root.dataset.theme);const b=$('#th');if(b)b.textContent=root.dataset.theme==='dark'?'☀':'☾'}
function tiltInit(){if(!matchMedia('(hover:hover)').matches)return;document.querySelectorAll('.tilt').forEach(e=>{e.onmousemove=ev=>{const r=e.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width-.5,y=(ev.clientY-r.top)/r.height-.5;e.style.transform=`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`};e.onmouseleave=()=>e.style.transform=''})}
const LOGO="assets/logo.png";
const logo=`<div class="logo"><img class="lg" src="${LOGO}" alt="FARVO logo"><span>FARVO Prompt</span></div>`;
const footer=(c='')=>`<footer class="foot ${c}"><div class="fl"><a href="#/about">About</a><a href="#/faq">FAQ</a><a href="#/reviews">Reviews</a><a href="#/contact">Contact</a><a href="#/privacy">Privacy</a><a href="#/terms">Terms</a></div><div style="margin-top:8px">Website by <b>FARVO Digital Company</b></div><div style="margin-top:8px"><a href="https://farvodigital.netlify.app" target="_blank" rel="noopener">farvodigital.netlify.app</a><a href="tel:+94773042864">+94 077 304 2864</a><a href="https://www.linkedin.com/search/results/companies/?keywords=Farvo%20Digital%20Company" target="_blank" rel="noopener">LinkedIn: Farvo Digital Company</a></div><div style="margin-top:8px">© 2026 FARVO Digital Company</div></footer>`;

/* ---------- AUTH ---------- */
let mode='login',resetEmail='';
const fld=(id,l,t='text',ph='',ac='')=>`<label for="${id}">${l}</label><input id="${id}" type="${t}" placeholder="${ph}" autocomplete="${ac}"><span class="err" id="e_${id}"></span>`;
function showAuth(){
 const T={login:['Welcome back','Log in to generate prompts.'],signup:['Create your account','Sign up to start generating prompts.'],forgot:['Reset password','Confirm your email and phone number.'],reset:['Set new password','Choose a new password for your account.']}[mode];
 const body={
 login:fld('email','Email','email','you@example.com','email')+fld('pw','Password','password','Your password','current-password')+`<button class="btn full" id="go">Log in</button><p class="mut" style="text-align:center"><a href="#" data-m="forgot">Forgot password?</a> · <a href="#" data-m="signup">Create account</a></p>`,
 signup:fld('name','Full name','text','Your full name','name')+fld('phone','Phone number','tel','+94 77 123 4567','tel')+fld('email','Email','email','you@example.com','email')+fld('pw','Password','password','Min 8 characters, letters and numbers','new-password')+fld('pw2','Confirm password','password','Re-enter password','new-password')+`<button class="btn full" id="go">Create account</button><p class="mut" style="text-align:center">Already registered? <a href="#" data-m="login">Log in</a></p>`,
 forgot:fld('email','Email','email','you@example.com','email')+fld('phone','Phone number used at signup','tel','+94 77 123 4567','tel')+`<button class="btn full" id="go">Verify account</button><p style="text-align:center"><a href="#" data-m="login">Back to log in</a></p>`,
 reset:fld('pw','New password','password','Min 8 characters','new-password')+fld('pw2','Confirm new password','password','Re-enter password','new-password')+`<button class="btn full" id="go">Save new password</button>`}[mode];
 $('#root').innerHTML=`<div id="auth"><section class="hero">${logo}<h1>Tell FARVO what you need. FARVO builds the prompt.</h1><p class="mut">Type in English, Tamil, Sinhala, Hindi or Tanglish. Get a ready-to-paste prompt for ChatGPT, Gemini or Claude.</p><div class="scene"><img class="coin" src="${LOGO}" alt="FARVO Digital Company logo"></div></section>
 <section class="card tilt"><div style="display:flex;justify-content:space-between;align-items:center"><h2 style="margin:0">${T[0]}</h2><button class="ic" id="th" aria-label="Toggle theme">${root.dataset.theme==='dark'?'☀':'☾'}</button></div><p class="mut" style="margin-top:4px">${T[1]}</p>${body}</section></div>${footer()}`;
 $('#th').onclick=toggleTheme;
 document.querySelectorAll('[data-m]').forEach(a=>a.onclick=e=>{e.preventDefault();mode=a.dataset.m;showAuth()});
 document.querySelectorAll('#auth input').forEach(i=>i.onkeydown=e=>{if(e.key==='Enter')$('#go').click()});
 $('#go').onclick=submitAuth;tiltInit();
}
const v=id=>($('#'+id)?.value||'').trim();
function bad(id,m){$('#e_'+id).textContent=m;return 1}
async function submitAuth(){
 document.querySelectorAll('.err').forEach(e=>e.textContent='');let n=0;const users=S.get('fp_users',[]);
 const mailOk=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,pwOk=p=>p.length>=8&&/[A-Za-z]/.test(p)&&/\d/.test(p),digits=s=>s.replace(/\D/g,'');
 if(mode==='signup'){
  if(v('name').length<2)n+=bad('name','Enter your full name.');
  if(digits(v('phone')).length<9||digits(v('phone')).length>15)n+=bad('phone','Enter a valid phone number.');
  if(!mailOk.test(v('email')))n+=bad('email','Enter a valid email address.');
  if(!pwOk(v('pw')))n+=bad('pw','Use 8+ characters with letters and numbers.');
  if(v('pw2')!==v('pw'))n+=bad('pw2','Passwords do not match.');
  if(!n&&users.some(u=>u.email===v('email').toLowerCase()))n+=bad('email','This email is already registered. Log in instead.');
  if(n)return;
  users.push({name:v('name'),phone:digits(v('phone')),email:v('email').toLowerCase(),pw:await hs(v('pw'))});S.set('fp_users',users);S.set('fp_session',v('email').toLowerCase());toast('Account created');boot();
 }else if(mode==='login'){
  if(!mailOk.test(v('email')))n+=bad('email','Enter a valid email address.');
  if(!v('pw'))n+=bad('pw','Enter your password.');if(n)return;
  const u=users.find(u=>u.email===v('email').toLowerCase());
  if(!u||u.pw!==await hs(v('pw')))return bad('pw','Email or password is incorrect.');
  S.set('fp_session',u.email);boot();
 }else if(mode==='forgot'){
  const u=users.find(u=>u.email===v('email').toLowerCase()&&u.phone===digits(v('phone')));
  if(!u)return bad('phone','No account matches this email and phone number.');
  resetEmail=u.email;mode='reset';showAuth();
 }else{
  if(!pwOk(v('pw')))n+=bad('pw','Use 8+ characters with letters and numbers.');
  if(v('pw2')!==v('pw'))n+=bad('pw2','Passwords do not match.');if(n)return;
  const u=users.find(u=>u.email===resetEmail);u.pw=await hs(v('pw'));S.set('fp_users',users);toast('Password updated. Log in now.');mode='login';showAuth();
 }
}

/* ---------- PROMPT ENGINE ---------- */
const CATS=[
 ['Education / Study Notes',/note|exam|study|lesson|revis|padikka|explain|simplif|topic|learn|flashcard|summary|assignment|essay/i,'an experienced teacher who explains complex topics simply','Headings, short definitions, worked examples, tables where useful, common exam questions and a revision checklist',['Start with the core idea in plain language','Include at least two examples','End with 5 practice questions with answers']],
 ['Quiz / MCQ',/mcq|quiz|question paper|test/i,'an exam setter with years of experience','Numbered multiple-choice questions with 4 options, the correct answer and a one-line explanation',['Mix easy, medium and hard questions','Avoid trick wording','Cover the whole topic evenly']],
 ['Presentation',/presentation|slides|ppt|deck/i,'a professional presentation designer and subject expert','Slide-by-slide outline: slide title, 3-5 bullets, speaker notes and a visual suggestion',['One idea per slide','Start with a hook and end with a summary','Keep text short']],
 ['Programming / Software',/code|website|web app|app\b|php|python|java|react|flutter|sql|database|api|bug|debug|mysql|node|html|css|system/i,'a senior full-stack software engineer and architect','Sections for requirements, features, user roles, database design, folder structure, code, security, testing and deployment',['Use current best practices','Validate all inputs and secure authentication','Explain each step so a beginner can follow','Provide complete working code, not fragments']],
 ['Design / Image',/image|poster|logo|banner|design|ui\b|ux|brand|photo|flyer|3d/i,'an award-winning art director and UI/UX designer','Describe layout, typography, colour palette, visual hierarchy, lighting/style, dimensions and text content',['State the exact style and mood','Specify colours with hex codes','Describe composition from foreground to background']],
 ['Social Media / Content',/instagram|facebook|linkedin|caption|reel|youtube|hashtag|blog|article|post\b|marketing/i,'a creative social media strategist and copywriter','Final copy, 3 variations, suggested hashtags and a call to action',['Hook in the first line','Match the platform style','Keep it authentic and concise']],
 ['Career',/resume|cv\b|cover letter|interview|job|internship|linkedin profile|bio\b/i,'a senior recruiter and career coach','Clean, professionally structured document ready to send, with a short list of tips',['Use action verbs and measurable results','Tailor wording to the role','Keep it to one page where relevant']],
 ['Business',/business|proposal|startup|plan|strategy|product description|client|freelance/i,'a seasoned business consultant','Executive summary, market, offering, pricing, risks and next steps in a structured document',['Be realistic and specific','Support claims with reasoning','Highlight key risks']],
 ['Writing',/email|letter|message|speech|story|poem|script|notice|announcement/i,'an expert professional writer','The finished text only, with a subject line if it is an email',['Clear opening and closing','Polite, direct and easy to read','Avoid clichés']],
 ['AI / Productivity',/automation|workflow|analysis|brainstorm|decision|research|schedule/i,'a productivity and AI workflow expert','Step-by-step plan with tools, actions and expected outcomes',['Be practical','Prioritise by impact','List assumptions']]];
const GEN=['General Assistance',/./,'a helpful and knowledgeable expert in this subject','Clear, well-organised answer with headings and bullet points',['Be accurate and specific','Give examples','Ask me if anything is unclear']];
function lang(t,sel){if(sel&&sel!=='Auto')return sel;if(/[\u0B80-\u0BFF]/.test(t))return'Tamil';if(/[\u0D80-\u0DFF]/.test(t))return'Sinhala';if(/[\u0900-\u097F]/.test(t))return'Hindi';if(/\b(enakku|ennaku|venum|venuma|pannu|panni|pannunga|pannura|thaange|thaanga|theavena|theva|irukku|irukure|padikka|illa|epdi|eppadi|madhiri|indha|inga|innum|edhum|romba|nalla|sollunga|seiyunga|naan|neenga)\b/i.test(t))return'simple Tamil mixed with English (Tanglish)';return'English'}
function pick(t){let best=GEN,n=0;for(const c of CATS){const k=(t.match(new RegExp('\\b(?:'+c[1].source+')','gi'))||[]).length;if(k>n){n=k;best=c}}return best}
function buildPrompt(text,m,lg){
 const c=pick(text);if(m==='Auto')m=text.length<60?'Professional':'Advanced';
 const L=lang(text,lg),tone=/exam|easy|simple|beginner/i.test(text)?'Simple, friendly and beginner-friendly':'Professional, clear and engaging';
 const S1={Role:`Act as ${c[2]}.`,Task:`Help me with this request: ${text}`,Context:`Request details from the user: "${text}"\nTarget audience: [AUDIENCE]`,Objective:`Deliver a complete, accurate result I can use immediately without further editing.`,Requirements:c[4].map(x=>'- '+x).join('\n'),'Output Format':c[3]+'.',Tone:tone+'.',Language:`Respond in ${L}.`,Constraints:`- Do not invent facts; say so if unsure\n- Keep the level of detail: [DETAIL LEVEL]\n- Ask me up to 3 questions first only if key details are missing`};
 let keys;
 if(m==='Simple')return{c:c[0],sections:{Prompt:`Act as ${c[2]}. ${text}. Format: ${c[3]}. Respond in ${L}.`},vars:['[TOPIC]','[LANGUAGE]']};
 if(m==='Professional')keys=['Role','Task','Context','Requirements','Output Format','Tone','Language'];
 else if(m==='Advanced')keys=['Role','Task','Context','Objective','Requirements','Output Format','Tone','Language','Constraints'];
 else{keys=['Role','Task','Context','Objective','Requirements','Output Format','Tone','Language','Constraints'];S1.Requirements+='\n- Review your answer once before sending and fix any gaps\n- Finish with a short list of improvements I could request next';S1.Constraints+='\n- Structure the answer exactly as the output format describes\n- Use precise terminology and avoid filler'}
 const sections={};keys.forEach(k=>sections[k]=S1[k]);
 return{c:c[0],sections,vars:['[TOPIC]','[AUDIENCE]','[DETAIL LEVEL]','[LANGUAGE]','[NUMBER OF ITEMS]']};
}
const flat=s=>Object.entries(s).map(([k,v])=>k==='Prompt'?v:`${k.toUpperCase()}:\n${v}`).join('\n\n');
function score(p){const t=[['Role',/act as|you are/i,'Add a role, e.g. "Act as an expert teacher".'],['Task',/create|write|explain|build|generate|help|make|design/i,'State the task with a clear action verb.'],['Context',/for |about |audience|context|topic/i,'Add context: topic and audience.'],['Output format',/format|bullet|table|steps|markdown|json|slides|sections/i,'Say how the answer should look (table, steps, bullets).'],['Constraints',/do not|avoid|limit|must|only|max|constraint/i,'Add limits such as length or things to avoid.'],['Tone / language',/tone|language|respond in|simple|formal|friendly/i,'Choose a tone and language.']];
 const miss=t.filter(x=>!x[1].test(p)),pts=t.length-miss.length+(p.length>200?1:0);return{pts,max:t.length+1,miss,label:pts>=6?'Strong':pts>=4?'Good':'Needs improvement'}}

/* ---------- APP ---------- */
let tab='gen',cur=null,fold='All';const curs={};
const FOLDERS=['Study','Coding','FARVO Projects','Business','Social Media','Personal'];
const me=()=>S.get('fp_users',[]).find(u=>u.email===S.get('fp_session'));
const libKey=()=>'fp_lib_'+S.get('fp_session');
function showApp(){
 const u=me();if(!u){S.set('fp_session','');return showAuth()}
 const items=[['gen','✨','Generate'],['img','🖼','Image'],['enh','🔧','Enhance'],['tpl','📚','Templates'],['lib','📁','Library'],['acc','👤','Account']];
 $('#root').innerHTML=`<div class="top">${logo}<span class="sp"></span><span class="mut" style="font-size:13px">Hi, ${esc(u.name.split(' ')[0])}</span><button class="ic" id="th" aria-label="Toggle theme">${root.dataset.theme==='dark'?'☀':'☾'}</button><button class="ic" id="lo" aria-label="Log out">⎋</button></div>
 <main><div class="tabs dtabs">${items.map(i=>`<button class="chip ${tab===i[0]?'on':''}" data-t="${i[0]}">${i[1]} ${i[2]}</button>`).join('')}</div><div id="view"></div></main>${footer('app')}
 <nav class="nav">${items.map(i=>`<button class="${tab===i[0]?'on':''}" data-t="${i[0]}">${i[1]}<br>${i[2]}</button>`).join('')}</nav>`;
 $('#th').onclick=toggleTheme;$('#lo').onclick=()=>{S.set('fp_session','');mode='login';cur=null;showAuth()};
 document.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{curs[tab]=cur;tab=b.dataset.t;cur=curs[tab]||null;showApp();scrollTo(0,0)});
 ({gen:genView,img:imgView,enh:enhView,tpl:tplView,lib:libView,acc:accView})[tab]();tiltInit();
}
let gm='Auto';
function genView(){
 $('#view').innerHTML=`<div class="grid"><div class="card tilt"><h2 style="margin-top:0">What do you want AI to help you create?</h2>
 <textarea id="inp" placeholder="Tell me what you need in your own words…"></textarea><span class="err" id="e_inp"></span>
 <div class="tabs" id="modes">${['Auto','Simple','Professional','Advanced','Expert'].map(m=>`<button class="chip ${gm===m?'on':''}" data-m="${m}">${m}</button>`).join('')}</div>
 <label for="lg">Language</label><select id="lg">${['Auto','English','Tamil','Sinhala','Hindi'].map(x=>`<option>${x}</option>`).join('')}</select>
 <div class="tabs">${['I need exam notes for database normalization','Build a food ordering system with PHP and MySQL','Modern poster for my software project','Professional email asking for an internship'].map(x=>`<button class="chip" data-ex="${esc(x)}">${esc(x)}</button>`).join('')}</div>
 <button class="btn full" id="gen">✨ Generate Prompt</button></div><div id="out"></div></div>`;
 document.querySelectorAll('#modes .chip').forEach(b=>b.onclick=()=>{gm=b.dataset.m;document.querySelectorAll('#modes .chip').forEach(x=>x.classList.toggle('on',x===b))});
 document.querySelectorAll('[data-ex]').forEach(b=>b.onclick=()=>{$('#inp').value=b.dataset.ex});
 $('#gen').onclick=()=>{const t=v('inp');if(t.length<5)return bad('inp','Describe what you need in a few words.');$('#e_inp').textContent='';cur=buildPrompt(t,gm,$('#lg').value);cur.src=t;logHist();renderOut()};
 $('#out').innerHTML=scene3d();tilt3d();const tp=S.get('fp_tpl','');if(tp){$('#inp').value=tp;S.set('fp_tpl','')}if(cur&&!String(cur.c).startsWith('Image'))renderOut();
}
function renderOut(){
 const txt=flat(cur.sections);
 $('#out').innerHTML=`<div class="card tilt"><div class="mut" style="font-size:12px">Detected: ${esc(cur.c)}</div><h3 style="margin:4px 0 8px">Generated Prompt</h3>
 ${Object.entries(cur.sections).map(([k,v])=>`<div class="sec"><b>${k}</b><p>${esc(v)}</p></div>`).join('')}
 <div style="margin-top:12px" class="mut">Optional variables</div><div class="row" style="margin-top:6px">${cur.vars.map(x=>`<span class="var">${x}</span>`).join('')}</div>
 <div class="row"><button class="btn sm" id="cp">Copy</button><select id="fd" style="width:auto">${FOLDERS.map(f=>`<option>${f}</option>`).join('')}</select><button class="btn sm ghost" id="sv">Save</button><button class="btn sm ghost" id="en">Enhance</button></div></div>`;
 $('#cp').onclick=()=>copy(txt);
 $('#sv').onclick=()=>{const l=S.get(libKey(),[]);l.unshift({id:Date.now(),text:txt,title:cur.src.slice(0,60),folder:$('#fd').value,fav:false});S.set(libKey(),l);toast('Saved to '+$('#fd').value)};
 $('#en').onclick=()=>{S.set('fp_enh',txt);tab='enh';showApp()};tiltInit();
}
function enhView(){
 $('#view').innerHTML=`<div class="grid"><div class="card"><h2 style="margin-top:0">Prompt Enhancer</h2><p class="mut">Paste any prompt. FARVO checks it and fills the gaps.</p><textarea id="pin" style="min-height:200px" placeholder="Paste your prompt here…">${esc(S.get('fp_enh',''))}</textarea><span class="err" id="e_pin"></span><button class="btn full" id="an">Analyze and improve</button></div><div id="eo"></div></div>`;
 $('#an').onclick=()=>{const p=v('pin');if(p.length<5)return bad('pin','Paste a prompt first.');const r=score(p);
  let imp=p;if(r.miss.length){const add={Role:'Act as an expert in this subject.',Task:'Complete the task above fully and accurately.','Output format':'Format: clear headings with bullet points.',Constraints:'Do not invent facts. Keep it concise.','Tone / language':'Tone: professional and easy to understand. Respond in English.',Context:'Context: [TOPIC] for [AUDIENCE].'};
   imp=(r.miss.some(x=>x[0]==='Role')?add.Role+'\n\n':'')+p+'\n\n'+r.miss.filter(x=>x[0]!=='Role').map(x=>add[x[0]]||'').join('\n')}
  $('#eo').innerHTML=`<div class="card tilt"><h3 style="margin-top:0">Prompt strength: ${r.label}</h3><div class="bar"><span style="width:${r.pts/r.max*100}%"></span></div>${r.miss.length?'<ul>'+r.miss.map(x=>`<li>${x[2]}</li>`).join('')+'</ul>':'<p>Nothing important is missing.</p>'}<div class="sec"><b>Improved prompt</b><p>${esc(imp)}</p></div><div class="row"><button class="btn sm" id="c2">Copy improved</button></div></div>`;
  $('#c2').onclick=()=>copy(imp);tiltInit()};
}
/* ---------- 3D SIDE SCENE ---------- */
function scene3d(){return `<div class="h3d" id="h3d"><div class="pan"><div class="world"><div class="ring r1"></div><div class="ring r2"></div><div class="ring r3"></div><img class="core" src="${LOGO}" alt=""><div class="fc c1"><b>Role</b>Act as an expert teacher</div><div class="fc c2"><b>Task</b>Create exam notes</div><div class="fc c3"><b>Output</b>Tables and examples</div><div class="fc c4"><b>Tone</b>Simple and friendly</div></div></div><p class="mut cap">Your prompt will appear here</p></div>`}
function tilt3d(){const h=$('#h3d'),p=$('.pan');if(!h||!p)return;h.onmousemove=e=>{const r=h.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;p.style.transform=`scale(var(--s)) rotateY(${x*34}deg) rotateX(${-y*34}deg)`};h.onmouseleave=()=>p.style.transform=''}
/* ---------- IMAGE -> PROMPT ---------- */
let imgInfo=null,imgType='Other';
const ITYPES=['Portrait','Product','Poster','UI screenshot','Website','Architecture','Food','Landscape','Fashion','Artwork','Illustration','Logo','Advertisement','Other'];
const TS={Portrait:['close-up portrait, subject centred, natural expression, shallow depth of field, 85mm lens','photorealistic, fine skin texture'],Product:['clean product shot on a seamless backdrop, centred, subtle reflection','commercial studio photography'],Poster:['bold poster layout with a strong focal point, clear title area and visual hierarchy','graphic design, print-ready'],'UI screenshot':['clean app interface screen with grid alignment and readable components','modern UI/UX design, Figma-style'],Website:['full landing page layout with hero, navigation and clear sections','modern web design, generous spacing'],Architecture:['wide architectural view with strong lines and perspective, building as the hero','architectural photography, 24mm lens'],Food:['45-degree food shot with garnish detail and gentle steam, shallow depth of field','editorial food photography'],Landscape:['wide landscape with foreground, midground and background layers and leading lines','fine-art landscape photography'],Fashion:['full-body editorial pose with styled outfit and accessories','high-fashion editorial photography'],Artwork:['gallery-style artwork with visible brushwork and texture, balanced composition','fine-art painting'],Illustration:['clean illustration with defined shapes and a cohesive colour story','digital illustration, vector-like finish'],Logo:['simple centred logo mark on a plain background, scalable and memorable','minimal vector logo design'],Advertisement:['eye-catching ad layout with product hero, headline space and call to action','professional advertising creative'],Other:['clear main subject with balanced composition','high-quality, detailed rendering']};
function cname(r,g,b){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,d=mx-mn;if(l<.12)return'black';if(l>.92)return'white';const s=d?d/(1-Math.abs(2*l-1)):0;if(s<.14)return l<.4?'dark grey':l>.7?'light grey':'grey';let h=d===0?0:mx===r?((g-b)/d+6)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h*=60;const n=h<15?'red':h<45?'orange':h<70?'yellow':h<165?'green':h<200?'teal':h<255?'blue':h<290?'purple':h<335?'pink':'red';return(l<.3?'dark ':l>.75?'light ':'')+n}
function analyze(img){const W=48,H=Math.max(8,Math.round(W*img.height/img.width)),c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(img,0,0,W,H);const d=x.getImageData(0,0,W,H).data,b={},L=[];let S=0;
 for(let i=0;i<d.length;i+=4){const r=d[i],g=d[i+1],bl=d[i+2],k=(r>>6)+','+(g>>6)+','+(bl>>6),o=b[k]||(b[k]=[0,0,0,0]);o[0]+=r;o[1]+=g;o[2]+=bl;o[3]++;const mx=Math.max(r,g,bl);L.push((r+g+bl)/765);S+=mx?(mx-Math.min(r,g,bl))/mx:0}
 const n=L.length,avg=L.reduce((a,t)=>a+t,0)/n,sd=Math.sqrt(L.reduce((a,t)=>a+(t-avg)**2,0)/n);
 const top=Object.values(b).sort((a,z)=>z[3]-a[3]).slice(0,5).map(o=>{const r=Math.round(o[0]/o[3]),g=Math.round(o[1]/o[3]),bl=Math.round(o[2]/o[3]);return cname(r,g,bl)+' (#'+[r,g,bl].map(t=>t.toString(16).padStart(2,'0')).join('')+')'});
 return{w:img.width,h:img.height,ar:img.width/img.height,avg,sd,sat:S/n,top,flat:Object.keys(b).length}}
function ratio(ar){const R=[['1:1',1],['4:3',4/3],['3:2',1.5],['16:9',16/9],['21:9',21/9],['3:4',.75],['2:3',2/3],['9:16',9/16]];return R.sort((a,z)=>Math.abs(a[1]-ar)-Math.abs(z[1]-ar))[0][0]}
const guess=i=>i.flat<=14&&(i.ar>1.3||i.ar<.62)?'UI screenshot':i.ar<.85&&i.ar>.55?'Portrait':i.ar>1.5?'Landscape':'Other';
function buildImg(i,t,note,m){
 if(m==='Auto')m='Professional';const ts=TS[t],R=ratio(i.ar);
 const light=i.avg>.65?'bright, high-key lighting':i.avg<.35?'low-key, moody lighting with deep shadows':'balanced natural lighting',con=i.sd>.25?'strong contrast':'soft, gentle contrast',sat=i.sat>.5?'vivid, saturated colours':i.sat<.2?'muted, desaturated colours':'natural colour saturation';
 const sec={Subject:note?note+` (${t.toLowerCase()})`:`${t}: [SUBJECT]`,Composition:`${ts[0]}. Aspect ratio ${R}.`,Lighting:`${light}, ${con}.`,'Colour palette':`Dominant colours: ${i.top.join(', ')}. ${sat[0].toUpperCase()+sat.slice(1)}.`,'Style and quality':`${ts[1]}, highly detailed, sharp focus, professional quality, 4K.`};
 if(m==='Simple')return{c:'Image: '+t,sections:{Prompt:`${sec.Subject}, ${ts[0]}, ${light}, colours: ${i.top.slice(0,3).join(', ')}, ${ts[1]}, aspect ratio ${R}.`},vars:['[SUBJECT]','[STYLE]'],src:note||t+' image'};
 if(m==='Advanced'||m==='Expert')sec['Negative prompt']=t==='Portrait'||t==='Fashion'?'blurry, low resolution, distorted anatomy, extra fingers, watermark, text artefacts':'blurry, low resolution, distorted shapes, watermark, unreadable text, clutter';
 if(m==='Expert')sec.Variations='Create 3 variations: one realistic, one cinematic and one stylised. Keep the subject and palette the same.';
 return{c:'Image: '+t,sections:sec,vars:['[SUBJECT]','[STYLE]','[ASPECT RATIO]','[AI TOOL]'],src:note||t+' image'}}
function imgView(){
 $('#view').innerHTML=`<div class="grid"><div class="card"><h2 style="margin-top:0">Image to Prompt</h2><p class="mut">Upload an image. FARVO reads its colours, light and shape and writes an image-generation prompt. Your image stays on your device.</p>
 <label class="drop" for="file">${imgInfo?`<img src="${imgInfo.url}" alt="Preview">`:'<b>Tap to choose an image</b><br><span class="mut">JPG, PNG or WebP</span>'}</label><input id="file" type="file" accept="image/*" style="display:none"><span class="err" id="e_file"></span>
 <label>Image type ${imgInfo?'<span class="mut">(auto-guessed, change if wrong)</span>':''}</label><div class="tabs" id="itypes">${ITYPES.map(t=>`<button class="chip ${imgType===t?'on':''}" data-it="${t}">${t}</button>`).join('')}</div>
 <label for="inote">What is in the image? (optional)</label><input id="inote" placeholder="e.g. a woman in a red saree at sunset">
 <label>Detail level</label><div class="tabs" id="modes">${['Auto','Simple','Professional','Advanced','Expert'].map(m=>`<button class="chip ${gm===m?'on':''}" data-m="${m}">${m}</button>`).join('')}</div>
 <button class="btn full" id="igen">✨ Generate Image Prompt</button></div><div id="out"></div></div>`;
 $('#out').innerHTML=scene3d();tilt3d();if(cur&&String(cur.c).startsWith('Image'))renderOut();document.querySelectorAll('#itypes .chip').forEach(b=>b.onclick=()=>{imgType=b.dataset.it;document.querySelectorAll('#itypes .chip').forEach(x=>x.classList.toggle('on',x===b))});
 document.querySelectorAll('#modes .chip').forEach(b=>b.onclick=()=>{gm=b.dataset.m;document.querySelectorAll('#modes .chip').forEach(x=>x.classList.toggle('on',x===b))});
 $('#file').onchange=e=>{const f=e.target.files[0];if(!f)return;if(!f.type.startsWith('image/'))return bad('file','Choose an image file (JPG, PNG or WebP).');if(f.size>15e6)return bad('file','Image is too large. Use one under 15 MB.');
  const url=URL.createObjectURL(f),im=new Image();im.onload=()=>{const note=v('inote');if(imgInfo&&imgInfo.url)URL.revokeObjectURL(imgInfo.url);imgInfo=analyze(im);imgInfo.url=url;imgType=guess(imgInfo);imgView();$('#inote').value=note};im.onerror=()=>bad('file','This image could not be read. Try another file.');im.src=url};
 $('#igen').onclick=()=>{if(!imgInfo)return bad('file','Upload an image first.');$('#e_file').textContent='';cur=buildImg(imgInfo,imgType,v('inote'),gm);logHist();renderOut()};
}
function boot(){S.get('fp_session','')?showApp():showAuth()}
route();addEventListener('hashchange',route);
