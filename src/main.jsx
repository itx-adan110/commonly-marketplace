import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, BriefcaseBusiness, Check, ChevronDown, Clock3, Code2,
  Compass, Heart, LayoutDashboard, Menu, MessageCircle, Search, ShieldCheck,
  SlidersHorizontal, Sparkles, Star, UserRound, Users, X, Zap
} from "lucide-react";
import "./styles.css";

const categories = [
  ["Design & Creative", "Logos, branding, UI/UX and visual design", "🎨"],
  ["Development & Tech", "Websites, apps, automation and code", "⌘"],
  ["Writing & Translation", "Copy, articles, localization and editing", "✎"],
  ["Marketing", "SEO, social media, ads and growth", "↗"],
  ["Video & Animation", "Editing, motion graphics and explainers", "▶"],
  ["Business", "Research, consulting and virtual assistance", "▣"],
  ["Music & Audio", "Production, voice-over and sound", "♫"],
  ["AI Services", "AI workflows, agents and creative production", "✦"]
];

const services = [
  { id:1, title:"I will design a clean, memorable logo for your brand", seller:"Maya Studio", rating:4.9, reviews:184, price:25, category:"Design & Creative", tag:"Logo Design", icon:"✦" },
  { id:2, title:"I will build a responsive modern landing page", seller:"DevCraft", rating:5.0, reviews:96, price:80, category:"Development & Tech", tag:"Web Development", icon:"⌘" },
  { id:3, title:"I will edit short-form videos for Reels and Shorts", seller:"FrameLab", rating:4.8, reviews:72, price:35, category:"Video & Animation", tag:"Video Editing", icon:"▶" },
  { id:4, title:"I will write SEO-friendly website copy that converts", seller:"North Copy", rating:4.9, reviews:61, price:30, category:"Writing & Translation", tag:"Copywriting", icon:"✎" },
  { id:5, title:"I will create a practical social media content plan", seller:"Growth House", rating:4.8, reviews:48, price:45, category:"Marketing", tag:"Social Media", icon:"↗" },
  { id:6, title:"I will automate your repetitive business workflow", seller:"FlowWorks", rating:5.0, reviews:37, price:70, category:"AI Services", tag:"Automation", icon:"✦" }
];

const projects = [
  { id:1, title:"Need a designer for a complete startup brand identity", client:"Northstar Labs", budget:"$500–800", proposals:12, time:"3 days ago", category:"Design & Creative" },
  { id:2, title:"Build a fast responsive website for a local business", client:"Oak & Co.", budget:"$800–1,200", proposals:18, time:"5 hours ago", category:"Development & Tech" },
  { id:3, title:"Short-form video editor for a growing creator", client:"Creator Studio", budget:"$300–500", proposals:9, time:"1 day ago", category:"Video & Animation" },
  { id:4, title:"SEO content writer for a technology publication", client:"Signal Media", budget:"$400–700", proposals:15, time:"2 days ago", category:"Writing & Translation" },
  { id:5, title:"Set up an automated lead collection workflow", client:"Vertex Digital", budget:"$250–450", proposals:7, time:"4 days ago", category:"AI Services" }
];

function App() {
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");

  const go = (p, item=null) => {
    setSelected(item);
    setPage(p);
    setMobile(false);
    window.scrollTo({top:0, behavior:"smooth"});
  };

  const notify = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  const filteredServices = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? services.filter(s => `${s.title} ${s.category} ${s.tag} ${s.seller}`.toLowerCase().includes(q)) : services;
  }, [query]);

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? projects.filter(p => `${p.title} ${p.category} ${p.client}`.toLowerCase().includes(q)) : projects;
  }, [query]);

  return (
    <div className="app">
      <Header page={page} go={go} mobile={mobile} setMobile={setMobile} />
      <main>
        {page === "home" && <Home go={go} query={query} setQuery={setQuery} services={filteredServices} notify={notify} />}
        {page === "services" && <Services go={go} services={filteredServices} query={query} setQuery={setQuery} notify={notify} />}
        {page === "projects" && <Projects go={go} projects={filteredProjects} query={query} setQuery={setQuery} notify={notify} />}
        {page === "categories" && <Categories go={go} />}
        {page === "service" && <ServiceDetail item={selected || services[0]} go={go} notify={notify} />}
        {page === "project" && <ProjectDetail item={selected || projects[0]} go={go} notify={notify} />}
        {page === "profile" && <Profile go={go} notify={notify} />}
        {page === "login" && <Auth mode="login" go={go} notify={notify} />}
        {page === "signup" && <Auth mode="signup" go={go} notify={notify} />}
        {page === "dashboard" && <Dashboard go={go} notify={notify} />}
      </main>
      <Footer go={go} />
      {toast && <div className="toast"><Check size={16}/>{toast}</div>}
    </div>
  );
}

function Header({page, go, mobile, setMobile}) {
  const nav = [["services","Find Services"],["projects","Find Work"],["categories","Categories"]];
  return <header className="header">
    <div className="nav-wrap">
      <button className="brand" onClick={()=>go("home")} aria-label="Commonly home">
        <span className="brand-mark">C</span><span>commonly</span>
      </button>
      <nav className={`nav ${mobile ? "open":""}`}>
        {nav.map(([p,label]) => <button className={page===p?"active":""} key={p} onClick={()=>go(p)}>{label}</button>)}
        <button className="nav-dashboard" onClick={()=>go("dashboard")}><LayoutDashboard size={16}/> Dashboard</button>
        <button className="text-btn" onClick={()=>go("login")}>Log in</button>
        <button className="dark-btn small" onClick={()=>go("signup")}>Join Commonly</button>
      </nav>
      <button className="menu-btn" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button>
    </div>
  </header>
}

function Home({go,query,setQuery,services,notify}) {
  return <div>
    <section className="hero">
      <div className="hero-inner">
        <div className="eyebrow"><span className="dot"/>A marketplace built around real work</div>
        <h1>Find the right person.<br/><em>Get the work done.</em></h1>
        <p>Discover independent professionals for services you can buy today, or post a project and receive tailored proposals.</p>
        <div className="hero-search">
          <Search size={20}/>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="What do you need help with?" />
          <button onClick={()=>go("services")}>Search</button>
        </div>
        <div className="popular"><span>Popular:</span>{["Logo Design","Web Development","Video Editing","SEO"].map(x=><button key={x} onClick={()=>{setQuery(x);go("services")}}>{x}</button>)}</div>
      </div>
      <div className="hero-card">
        <div className="card-top"><span>COMMONLY</span><span>01 / 04</span></div>
        <div className="abstract-grid">
          <div className="tile big">✦</div><div className="tile">⌘</div><div className="tile">↗</div>
          <div className="tile">✎</div><div className="tile wide">BUILD<br/><b>BETTER.</b></div>
        </div>
        <div className="hero-card-foot"><span>Independent talent</span><span>Global marketplace</span></div>
      </div>
    </section>

    <section className="section">
      <SectionHead eyebrow="Explore the marketplace" title="Everything you need to move work forward" action="View all categories" onAction={()=>go("categories")}/>
      <div className="category-grid">{categories.slice(0,6).map(([name,desc,icon])=><button className="category-card" key={name} onClick={()=>{setQuery(name);go("services")}}><span className="category-icon">{icon}</span><b>{name}</b><span>{desc}</span><ArrowRight size={17}/></button>)}</div>
    </section>

    <section className="section soft">
      <SectionHead eyebrow="Popular services" title="Work you can buy today" action="Explore services" onAction={()=>go("services")}/>
      <div className="service-grid">{services.slice(0,4).map(s=><ServiceCard key={s.id} item={s} go={go} notify={notify}/>)}</div>
    </section>

    <section className="split-cta">
      <div><span className="eyebrow">For professionals</span><h2>Turn your skills into a business.</h2><p>Package your expertise into services, respond to projects, build a reputation, and work with clients around the world.</p><button className="dark-btn" onClick={()=>go("signup")}>Start selling <ArrowRight size={17}/></button></div>
      <div className="stat-panel"><div><strong>10k+</strong><span>professionals</span></div><div><strong>40+</strong><span>categories</span></div><div><strong>Global</strong><span>client network</span></div></div>
    </section>
  </div>
}

function SectionHead({eyebrow,title,action,onAction}) {
  return <div className="section-head"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{action&&<button className="outline-btn" onClick={onAction}>{action}<ArrowRight size={16}/></button>}</div>
}

function ServiceCard({item,go,notify}) {
  return <article className="service-card">
    <button className="service-visual" onClick={()=>go("service",item)}><span>{item.icon}</span><small>{item.tag}</small></button>
    <div className="service-body">
      <button className="seller" onClick={()=>go("profile")}><span className="avatar">{item.seller[0]}</span>{item.seller}</button>
      <button className="service-title" onClick={()=>go("service",item)}>{item.title}</button>
      <div className="rating"><Star size={14} fill="currentColor"/><b>{item.rating}</b><span>({item.reviews})</span></div>
      <div className="service-bottom"><span>From <b>${item.price}</b></span><button onClick={()=>notify("Saved to your shortlist")}>♡</button></div>
    </div>
  </article>
}

function Services({go,services,query,setQuery,notify}) {
  return <div className="page-shell">
    <PageIntro eyebrow="Marketplace" title="Find a service" text="Browse ready-to-buy expertise from independent professionals around the world." />
    <div className="toolbar"><div className="inline-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search services..." /></div><button className="outline-btn"><SlidersHorizontal size={16}/> Filters</button><button className="select-btn">Recommended <ChevronDown size={15}/></button></div>
    <div className="service-grid">{services.map(s=><ServiceCard key={s.id} item={s} go={go} notify={notify}/>)}</div>
    {!services.length&&<Empty text="No services match your search."/>}
  </div>
}

function Projects({go,projects,query,setQuery,notify}) {
  return <div className="page-shell">
    <PageIntro eyebrow="Projects" title="Find work worth doing" text="Explore client-posted projects, understand the brief, and send a proposal." />
    <div className="toolbar"><div className="inline-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects..." /></div><button className="outline-btn"><SlidersHorizontal size={16}/> Filters</button></div>
    <div className="project-list">{projects.map(p=><ProjectCard key={p.id} item={p} go={go} notify={notify}/>)}</div>
    {!projects.length&&<Empty text="No projects match your search."/>}
  </div>
}

function ProjectCard({item,go,notify}) {
  return <article className="project-card">
    <div className="project-main"><span className="project-cat">{item.category}</span><button className="project-title" onClick={()=>go("project",item)}>{item.title}</button><p>We are looking for a reliable professional who can deliver high-quality work with clear communication and attention to detail.</p><div className="project-meta"><span><UserRound size={15}/>{item.client}</span><span><Clock3 size={15}/>{item.time}</span><span><MessageCircle size={15}/>{item.proposals} proposals</span></div></div>
    <div className="project-side"><span>Budget</span><strong>{item.budget}</strong><button className="dark-btn" onClick={()=>go("project",item)}>View project</button><button className="save-link" onClick={()=>notify("Project saved")}>♡ Save</button></div>
  </article>
}

function Categories({go}) {
  return <div className="page-shell"><PageIntro eyebrow="Explore" title="Browse by category" text="Find the specialist you need across creative, technical and business disciplines."/><div className="category-large-grid">{categories.map(([name,desc,icon],i)=><button className="category-large" key={name} onClick={()=>go("services")}><span className="number">0{i+1}</span><span className="category-icon">{icon}</span><b>{name}</b><span>{desc}</span><ArrowRight/></button>)}</div></div>
}

function ServiceDetail({item,go,notify}) {
  return <div className="detail-shell"><button className="back" onClick={()=>go("services")}>← Back to services</button><div className="detail-grid"><div><div className="detail-visual">{item.icon}<span>{item.tag}</span></div><div className="detail-copy"><span className="eyebrow">{item.category}</span><h1>{item.title}</h1><div className="rating large"><Star size={16} fill="currentColor"/><b>{item.rating}</b><span>{item.reviews} reviews</span></div><p>Get a polished, professional result tailored to your goals. We'll align on the brief, deliver clearly defined milestones, and keep communication straightforward from start to finish.</p><h3>What's included</h3><ul className="checks"><li><Check/>Clear project scope</li><li><Check/>Professional source files</li><li><Check/>Two revision rounds</li><li><Check/>Fast, direct communication</li></ul></div></div><aside className="buy-box"><div className="seller-row"><span className="avatar big">{item.seller[0]}</span><div><b>{item.seller}</b><span>Top professional</span></div></div><hr/><span>Starting at</span><strong className="price">${item.price}</strong><p>Typical delivery: 3–5 days</p><button className="dark-btn full" onClick={()=>notify("Demo order started — connect checkout here.")}>Continue <ArrowRight/></button><button className="outline-btn full" onClick={()=>go("profile")}>View profile</button></aside></div></div>
}

function ProjectDetail({item,go,notify}) {
  return <div className="detail-shell"><button className="back" onClick={()=>go("projects")}>← Back to projects</button><div className="detail-grid"><div className="detail-copy"><span className="project-cat">{item.category}</span><h1>{item.title}</h1><div className="project-meta"><span><UserRound size={15}/>{item.client}</span><span><Clock3 size={15}/>{item.time}</span><span><MessageCircle size={15}/>{item.proposals} proposals</span></div><h3>Project brief</h3><p>The client is looking for an experienced professional to deliver a strong result with thoughtful communication. Scope, milestones and final deliverables will be agreed before work begins.</p><h3>What we're looking for</h3><ul className="checks"><li><Check/>Relevant portfolio or experience</li><li><Check/>Clear communication</li><li><Check/>Reliable delivery</li></ul></div><aside className="buy-box"><span>Budget</span><strong className="price">{item.budget}</strong><p>Send a proposal that explains your approach, timeline and price.</p><button className="dark-btn full" onClick={()=>notify("Proposal composer opened — demo mode.")}>Send proposal <ArrowRight/></button><button className="outline-btn full" onClick={()=>notify("Project saved")}>♡ Save project</button></aside></div></div>
}

function Profile({go,notify}) {
  return <div className="page-shell"><div className="profile-head"><span className="profile-avatar">M</span><div><span className="eyebrow">Professional profile</span><h1>Maya Studio</h1><p>Brand designer & visual identity specialist</p><div className="rating"><Star size={15} fill="currentColor"/><b>4.9</b><span>184 reviews · 6 years experience</span></div></div><button className="dark-btn" onClick={()=>notify("Message composer opened — demo mode.")}>Message</button></div><div className="profile-tabs"><button className="active">Services</button><button>About</button><button>Reviews</button></div><section className="section"><SectionHead eyebrow="Available services" title="What Maya offers"/><div className="service-grid">{services.slice(0,3).map(s=><ServiceCard key={s.id} item={{...s,seller:"Maya Studio"}} go={go} notify={notify}/>)}</div></section></div>
}

function Auth({mode,go,notify}) {
  return <div className="auth-shell"><div className="auth-card"><button className="brand centered" onClick={()=>go("home")}><span className="brand-mark">C</span><span>commonly</span></button><h1>{mode==="login"?"Welcome back.":"Build your next opportunity."}</h1><p>{mode==="login"?"Log in to continue to your marketplace workspace.":"Create a professional account and start connecting with clients."}</p><form onSubmit={e=>{e.preventDefault();notify("Demo authentication successful.");go("dashboard")}}><label>Email<input type="email" required placeholder="you@example.com"/></label><label>Password<input type="password" required placeholder="••••••••"/></label>{mode==="signup"&&<label>Account type<select><option>Freelancer</option><option>Client</option></select></label>}<button className="dark-btn full">{mode==="login"?"Log in":"Create account"} <ArrowRight/></button></form><button className="switch" onClick={()=>go(mode==="login"?"signup":"login")}>{mode==="login"?"New here? Create an account":"Already have an account? Log in"}</button></div></div>
}

function Dashboard({go,notify}) {
  return <div className="dashboard"><aside className="dash-side"><button className="brand" onClick={()=>go("home")}><span className="brand-mark">C</span><span>commonly</span></button><div className="dash-nav"><button className="active"><LayoutDashboard/> Overview</button><button><BriefcaseBusiness/> My services</button><button><Compass/> Projects</button><button><MessageCircle/> Messages</button><button><UserRound/> Profile</button></div></aside><div className="dash-main"><div className="dash-top"><div><span className="eyebrow">Professional dashboard</span><h1>Good morning, Maya.</h1></div><button className="dark-btn" onClick={()=>go("services")}>Find work <ArrowRight/></button></div><div className="metrics"><Metric label="Active orders" value="4"/><Metric label="Profile views" value="1,284"/><Metric label="Earned this month" value="$2,460"/><Metric label="Response rate" value="98%"/></div><div className="dash-grid"><div className="dash-panel"><div className="panel-head"><h3>Recent activity</h3><button onClick={()=>notify("All activity shown in demo mode.")}>View all</button></div>{["New message from Northstar Labs","Project proposal accepted","5-star review received","Service added to search"].map((x,i)=><div className="activity" key={x}><span>{["✉","✓","★","+" ][i]}</span><div><b>{x}</b><small>{i+1} day{i?"s":""} ago</small></div></div>)}</div><div className="dash-panel"><div className="panel-head"><h3>Profile strength</h3><b>86%</b></div><div className="progress"><span/></div><p>Add a portfolio case study and a short introduction to reach 100%.</p><button className="outline-btn" onClick={()=>notify("Profile editor opened — demo mode.")}>Improve profile</button></div></div></div></div>
}

function Metric({label,value}) { return <div className="metric"><span>{label}</span><strong>{value}</strong></div> }
function PageIntro({eyebrow,title,text}) { return <div className="page-intro"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div> }
function Empty({text}) { return <div className="empty"><Search size={28}/><h3>{text}</h3><p>Try another search term or browse all categories.</p></div> }

function Footer({go}) {
  return <footer><div className="footer-main"><div><button className="brand" onClick={()=>go("home")}><span className="brand-mark">C</span><span>commonly</span></button><p>A global marketplace for services and project-based work.</p></div><div><b>Marketplace</b><button onClick={()=>go("services")}>Find Services</button><button onClick={()=>go("projects")}>Find Work</button><button onClick={()=>go("categories")}>Categories</button></div><div><b>For professionals</b><button onClick={()=>go("signup")}>Join as a professional</button><button onClick={()=>go("dashboard")}>Dashboard</button><button onClick={()=>go("profile")}>Profile</button></div><div><b>Company</b><button>About</button><button>How it works</button><button>Trust & Safety</button></div></div><div className="footer-bottom"><span>© 2026 Commonly. All rights reserved.</span><span>Built for independent work.</span></div></footer>
}

createRoot(document.getElementById("root")).render(<App />);
