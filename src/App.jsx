import { useState } from "react";

// South African Flag & Brand SA Colours
const SA = {
  green: "#007A4D",
  gold: "#FFB81C",
  red: "#DE3831",
  blue: "#002395",
  black: "#1A1A1A",
  white: "#FFFFFF",
  cream: "#FDFCF8",
  warmGrey: "#F5F3EE",
  lightGreen: "#E6F4EE",
  lightGold: "#FFF8E1",
  lightBlue: "#EAF0FF",
  lightRed: "#FDECEA",
  text: "#1A1A1A",
  textMid: "#4A4A4A",
  textLight: "#767676",
};

const parties = [
  {
    id:"anc",name:"ANC",full:"African National Congress",leader:"Cyril Ramaphosa",
    vote:"40.18%",seats:159,color:"#006633",accent:"#FFD700",cardBg:"#E8F5EE",headerBg:"#006633",
    tagline:"The Liberation Movement Incumbent",ideology:"Social Democracy · African Nationalism · NDR",
    founded:"1912",status:"Governing (GNU)",
    policies:{
      land:{stance:"Expropriation Act now in force. Accelerated redistribution for housing, agriculture & heritage — moves beyond willing buyer-seller model.",blackBenefit:"Improved tenure security, rural land access and agricultural support grants for emerging black farmers.",score:3},
      immigration:{stance:"Overhaul system per Draft White Paper. Preference for SA job-seekers; crack down on undocumented persons; simplify legal entry.",blackBenefit:"Direct job preference for South Africans reduces labour competition in low-skill sectors dominated by black workers.",score:3},
      economy:{stance:"Broad-based industrialisation, reduce commodity export reliance, maintain BBBEE, roll out National Health Insurance.",blackBenefit:"NHI = universal healthcare access; BBBEE maintains entry points for black professionals and entrepreneurs.",score:3},
      education:{stance:"NSFAS continuation, TVET expansion, artisan training, free basic education push.",blackBenefit:"Majority of NSFAS beneficiaries are black youth — tertiary access is the core engine for generational mobility.",score:3},
      transformation:{stance:"NDR framework maintained. Employment Equity Act, Preferential Procurement, BBBEE scorecards enforced.",blackBenefit:"These mechanisms produced the black middle class. Structural protection of affirmative action is retained.",score:4},
      crime:{stance:"Community policing, strengthen SAPS, anti-GBV interventions, anti-corruption drive.",blackBenefit:"Black townships bear the highest crime burden — improved policing in underserved areas is direct relief.",score:2}
    },
    pros:["30-year track record on BBBEE, NSFAS and social grants (18M+ recipients)","National Health Insurance — universal healthcare for the poor","Expropriation Act — legal tool for land redistribution now exists","R1.5 trillion investment commitment pipeline; infrastructure rollout"],
    cons:["Three decades of cadre deployment and state capture destroyed institutions","Unemployment at 32%+ under their watch","Eskom collapse, load-shedding and crumbling municipal infrastructure","Corruption arrests rarely lead to real convictions","Repeated unfulfilled promises — accountability deficit is severe"]
  },
  {
    id:"da",name:"DA",full:"Democratic Alliance",leader:"John Steenhuisen",
    vote:"21.81%",seats:87,color:"#002FA7",accent:"#00B4FF",cardBg:"#EAF2FF",headerBg:"#002FA7",
    tagline:"The Liberal Opposition",ideology:"Liberal Democracy · Meritocracy · Non-Racialism",
    founded:"2000",status:"Governing (GNU)",
    policies:{
      land:{stance:"Market-based reform only. Prioritise land budget but firmly oppose expropriation without compensation. Property rights are sacrosanct.",blackBenefit:"Minimal. Market-only approach excludes landless black South Africans who lack capital to participate.",score:1},
      immigration:{stance:"Silent in 2024 manifesto. Generally pro-skilled migration, pro-FDI. No mass deportation policy.",blackBenefit:"Neutral to negative — open immigration without protections suppresses wages in sectors dominated by black workers.",score:2},
      economy:{stance:"Private sector-led growth, labour deregulation, remove racial quotas from Employment Equity and Procurement Acts.",blackBenefit:"Job creation potential exists, but removing racial targets risks reversing 30 years of black economic inclusion gains.",score:2},
      education:{stance:"Merit-based teacher appointments, end union capture of schools, school accountability systems.",blackBenefit:"Western Cape pass rates improved. But merit without addressing resource inequality entrenches historical disadvantage.",score:3},
      transformation:{stance:"Replace race-based targets with SDG development metrics. Manifesto explicitly says 'remove race as a consideration in policy and legislation.'",blackBenefit:"Deeply contested. Removing race-based redress before structural equality is achieved is premature for the black majority.",score:1},
      crime:{stance:"Professionalise SAPS, intelligence-led policing, anti-GBV focus, tougher sentencing framework.",blackBenefit:"Better-resourced policing benefits all, but must be equitably deployed to black communities to translate into real benefit.",score:3}
    },
    pros:["Best governance track record — Western Cape is SA's best-run province","Strong anti-corruption culture and accountability mechanisms","DA-run municipalities outperform ANC-run equivalents","Labour reform could unlock jobs for millions of unemployed black youth"],
    cons:["Non-racial agenda = ending black redress prematurely in practice","Removal of Employment Equity targets threatens black economic inclusion","Historically white-dominated party with minimal trust among black voters","Market-only land reform excludes the landless black majority","DA in GNU with ANC undermines its own opposition credibility"]
  },
  {
    id:"mk",name:"MK",full:"uMkhonto we Sizwe Party",leader:"Jacob Zuma (figurehead)",
    vote:"14.58%",seats:58,color:"#8B0000",accent:"#FF6B6B",cardBg:"#FDECEA",headerBg:"#8B0000",
    tagline:"The Populist Insurgent",ideology:"Radical Economic Transformation · Zulu Nationalism · Pan-Africanism",
    founded:"2023",status:"Opposition",
    policies:{
      land:{stance:"Full expropriation without compensation. State custodianship of all land. Land as 'birthright reclaiming' for indigenous black South Africans.",blackBenefit:"Highest aspirational benefit for the landless black majority. Practical delivery risk is extreme — Zimbabwe precedent is real.",score:5},
      immigration:{stance:"Strict border control. Managed SADC migration. Controlled deportation of undocumented persons.",blackBenefit:"Protects low-income black South African workers from labour displacement in unskilled and informal sectors.",score:4},
      economy:{stance:"Nationalise mines, banks and strategic industries. Replace Constitution's property clause. State-directed economy.",blackBenefit:"Mineral wealth shared with the black majority in theory. Risk: capital flight and investor withdrawal could collapse employment.",score:3},
      education:{stance:"Free, decolonised education. African epistemology at the centre. Abolish Eurocentric curricula entirely.",blackBenefit:"Free tertiary education transforms access for black youth. Culturally affirming curriculum restores dignity.",score:4},
      transformation:{stance:"Replace 1996 Constitution as 'colonial and liberal.' Describes current SA as 'neo-apartheid' requiring revolutionary dismantling.",blackBenefit:"Radical redress narrative speaks directly to dispossession. Realistic implementation is deeply uncertain and legally fragile.",score:4},
      crime:{stance:"State-centric security. Prioritise community protection in black townships. Limited detailed policy published.",blackBenefit:"Vague. Township communities need concrete policing plans — rhetoric alone does not stop crime.",score:2}
    },
    pros:["Most uncompromising voice on land return and economic dispossession","Strict immigration stance directly protects black working-class interests","Free, decolonised education resonates deeply with black youth","Nationalisation framing — mineral wealth for the majority, not foreign capital"],
    cons:["Constitutional replacement would destabilise investment overnight","Zimbabwe and Venezuela prove nationalisation leads to poverty, not shared wealth","Party founded on Zuma's personal legal grievances, not principled ideology","Boycotted Parliament — zero governance track record whatsoever","High on rhetoric, dangerously vague on credible implementation"]
  },
  {
    id:"eff",name:"EFF",full:"Economic Freedom Fighters",leader:"Julius Malema",
    vote:"9.52%",seats:39,color:"#CC0000",accent:"#FF8C00",cardBg:"#FFF3E0",headerBg:"#CC0000",
    tagline:"The Radical Vanguard",ideology:"Marxist-Leninism · Pan-Africanism · Black Consciousness",
    founded:"2013",status:"Opposition",
    policies:{
      land:{stance:"Expropriation without compensation. State custodianship of all land. Expand social housing into white-owned areas to force integration.",blackBenefit:"Highest theoretical benefit. Land for all black South Africans as direct redress for apartheid dispossession — if implemented.",score:5},
      immigration:{stance:"Eliminate undocumented migrants. Register all migrants with national authorities. Pan-African in solidarity, but controlled entry.",blackBenefit:"Registration framework protects both migrants' rights and South African workers' livelihoods simultaneously.",score:3},
      economy:{stance:"Nationalise mines, banks, monopoly industries. Destroy 'white monopoly capital.' Free water, electricity and education for all.",blackBenefit:"Free basic services directly alleviate poverty for black households. Nationalisation could fund mass employment if managed competently.",score:4},
      education:{stance:"Free education from ECD to university. Decolonise curriculum. Protect indigenous knowledge systems and African languages.",blackBenefit:"Transformational — free, culturally affirming education is the single most direct investment in black generational advancement.",score:5},
      transformation:{stance:"Name current SA a 'new apartheid.' Radical redistribution. End cheap black labour. Double all social grants immediately.",blackBenefit:"Doubling grants directly benefits 18M+ recipients, majority black. Full transformation would restructure the racial wealth gap.",score:5},
      crime:{stance:"Link crime to economic inequality. Township investment as crime prevention. Police accountability measures.",blackBenefit:"Root-cause approach resonates in communities where poverty and crime are inseparable realities.",score:3}
    },
    pros:["Free education from ECD to university — transformative for black generational advancement","Most aggressive land redistribution model benefiting the black majority","Doubled social grants = immediate relief for the poorest black households","Nationalisation of mineral wealth — resource rents for the people, not shareholders"],
    cons:["Nationalisation history globally shows economic collapse, not liberation","Constitutional Court challenges would paralyse implementation for years","EFF leadership faces serious internal corruption allegations","Malema's rhetoric on violence is reckless and damages SA's international standing","Never governed anywhere — credibility gap between radical promise and real delivery"]
  },
  {
    id:"ifp",name:"IFP",full:"Inkatha Freedom Party",leader:"Velenkosini Hlabisa",
    vote:"3.85%",seats:17,color:"#006400",accent:"#228B22",cardBg:"#F0FAF0",headerBg:"#006400",
    tagline:"The Zulu Traditionalist",ideology:"Cultural Nationalism · Federalism · Conservative Development",
    founded:"1975",status:"Governing (GNU)",
    policies:{
      land:{stance:"Land reform prioritised in budget. Expand ownership for black South Africans. Oppose expropriation without compensation.",blackBenefit:"Market-assisted redistribution with targeted support — better for rural KZN black communities than DA-only approach.",score:3},
      immigration:{stance:"Hard-line: 'Illegal migrants are lawbreakers who threaten state safety and drain SA resources.' Strong enforcement stance.",blackBenefit:"Strong protection for black SA workers in KZN where competition from undocumented migrants is most acute.",score:4},
      economy:{stance:"80/20 employment rule: 80% of all company jobs must go to South Africans. Reserve entry-level jobs and spaza market for SA citizens.",blackBenefit:"Direct jobs protection — 80% rule and spaza reservation directly benefit black and Zulu working-class communities.",score:4},
      education:{stance:"Quality basic education, IsiZulu language promotion, vocational training, rural school infrastructure investment.",blackBenefit:"Rural black communities benefit from mother-tongue education and vocational skills access — especially in KZN.",score:3},
      transformation:{stance:"Traditional leaders empowered in development. Community-based service delivery. Cultural heritage respected in all policy.",blackBenefit:"Affirms African traditional governance structures — culturally resonant for rural Zulu communities specifically.",score:3},
      crime:{stance:"Law enforcement strengthened, community safety units, rural safety programme, traditional leaders in crime prevention.",blackBenefit:"KZN-focused rural safety measures directly protect black farming and rural communities from farm attacks and gang violence.",score:3}
    },
    pros:["80/20 employment rule — most direct jobs protection for black workers in the GNU","Hard-line anti-illegal immigration protects township economic interests","Spaza shop reservation returns part of the R900bn township economy to black SA","Proven cultural legitimacy in KZN — traditional leadership is respected and effective"],
    cons:["Narrow ethnic base limits policy reach beyond KZN","Opposition to expropriation without compensation limits radical land reform potential","Traditional leadership emphasis can sideline women's rights in rural areas","Coalition with ANC and DA constrains independent policy delivery","Small seat count (17) limits real legislative influence in the NA"]
  },
  {
    id:"pa",name:"PA",full:"Patriotic Alliance",leader:"Gayton McKenzie",
    vote:"1.65%",seats:9,color:"#7B3F00",accent:"#FF8C00",cardBg:"#FFF3E0",headerBg:"#7B3F00",
    tagline:"The Working-Class Nationalist",ideology:"Conservative Nationalism · Populism · Law & Order",
    founded:"2013",status:"Governing (GNU)",
    policies:{
      land:{stance:"Upgrade informal settlements, formalise housing, criminalise further shack building. Oppose land grabs linked to illegal migrants.",blackBenefit:"Formalisation of settlements gives coloured and black working-class families property security for the first time.",score:3},
      immigration:{stance:"Mass deportation of ALL undocumented migrants. No consideration for illegal migrants' human rights. Physical border wall proposed. Audit all foreign nationals.",blackBenefit:"Toughest immigration stance in the GNU. Directly protects the spaza economy (R900bn), jobs and township resources for black and coloured communities.",score:5},
      economy:{stance:"Township economy protection. State-private partnerships. Replace failed BEE elite enrichment with broad community empowerment. Reserve spaza shops for South Africans.",blackBenefit:"Reclaiming R700bn+ annually from foreign-owned spazas is a direct transfer of economic power to black and coloured township communities.",score:4},
      education:{stance:"Reintroduce religious education. Military training for unemployed youth. Vocational skills development. Upgrade community halls and sports facilities.",blackBenefit:"Military service for youth provides employment structure, income and discipline for unemployed young black and coloured men.",score:3},
      transformation:{stance:"BEE failed — enriched a black elite, not the masses. Move to community-level empowerment. Death penalty return. Empower traditional leaders.",blackBenefit:"Honest critique of BEE's failure to reach the black working class is politically important — but replacement framework lacks specifics.",score:3},
      crime:{stance:"Death penalty reintroduction. Gangsterism eradication — McKenzie's founding mission from the Cape Flats. Reintroduce Scorpions-style units. Life means life.",blackBenefit:"Cape Flats and township communities, overwhelmingly black and coloured, suffer most from gangsterism. This agenda resonates directly.",score:4}
    },
    pros:["Toughest immigration stance in GNU — directly protects township economic interests","Spaza economy protection could return billions to black and coloured communities","Death penalty and gangsterism crackdown addresses Cape Flats and township reality","McKenzie's lived experience gives authentic street-level credibility"],
    cons:["Party structure is autocratic — founders hold unelected, supreme authority","Death penalty and border wall proposals may violate the Constitution","Religious education agenda threatens SA's secular, pluralist identity","McKenzie's own R3M fundraising scandal undermines anti-corruption messaging","Only 9 seats severely limits legislative impact in the National Assembly"]
  },
  {
    id:"actionsa",name:"ActionSA",full:"ActionSA",leader:"Herman Mashaba",
    vote:"1.20%",seats:6,color:"#1B5E20",accent:"#43A047",cardBg:"#E8F5E9",headerBg:"#1B5E20",
    tagline:"The Urban Reform Party",ideology:"Non-Racialism · Free Market · Law & Order · SA First",
    founded:"2020",status:"Opposition",
    policies:{
      land:{stance:"Not central to manifesto. Pro-property rights, market-based reform. Firmly oppose expropriation without compensation.",blackBenefit:"Weak on direct land redistribution. Black landless majority unlikely to benefit significantly under a market-only approach.",score:2},
      immigration:{stance:"Secure borders, streamline legal entry, crack down hard on illegal immigration. Red carpet for legal migrants; overhaul corrupt Home Affairs.",blackBenefit:"Strong border security protects black urban workers from labour displacement. Legal migration simplification benefits skilled black diaspora returning home.",score:4},
      economy:{stance:"Replace BEE with a 30-year 'Opportunity Fund' for disadvantaged black students and entrepreneurs. Basic income grant (R790–R1,622 monthly). 4.8M jobs via private sector.",blackBenefit:"Opportunity Fund is more inclusive than current BEE — targets poor black youth, not politically connected elites. Basic income directly reaches poor black households.",score:4},
      education:{stance:"School accountability, credited ECD centres, merit-based appointments with community consultation, skills alignment with labour market.",blackBenefit:"Accountability-driven reform would benefit black township schools most — they suffer the worst from underperformance and union capture.",score:4},
      transformation:{stance:"Non-racial — race removed from policy. Opportunity Fund replaces BEE. Disadvantage-based (not race-based) empowerment framework.",blackBenefit:"Opportunity Fund broader than BEE in theory. But removing race-consciousness risks missing structural racism still embedded in SA's economy.",score:2},
      crime:{stance:"Reintroduce Scorpions. Specialised and 24-hour courts. 15-year mandatory minimum for corruption. Prisoners work in agriculture.",blackBenefit:"Specialised courts and mandatory corruption minimums directly address ANC elite impunity that has looted resources away from poor black communities.",score:4}
    },
    pros:["Opportunity Fund replaces corrupt BEE with merit + disadvantage-based access","Basic income grant (R790–R1,622/month) directly lifts the black working poor","Anti-corruption courts with 15-year minimums — real deterrent for state looting","Urban black voter base — Mashaba understands township economic reality firsthand"],
    cons:["Non-racial framework removes race from policy before inequality is resolved","No credible land reform plan for the black landless majority","Private sector job creation depends on global investment conditions outside party control","Mashaba's inconsistent messaging on immigration raises credibility questions","Only 6 seats = minimal legislative power to push agenda forward"]
  },
  {
    id:"bosa",name:"BOSA",full:"Build One South Africa",leader:"Mmusi Maimane",
    vote:"0.38%",seats:2,color:"#4A148C",accent:"#AB47BC",cardBg:"#F3E5F5",headerBg:"#4A148C",
    tagline:"The Ubuntu Reformer",ideology:"Ubuntu · Centre-left · Anti-Corruption · Jobs-First",
    founded:"2022",status:"Opposition",
    policies:{
      land:{stance:"Not a primary manifesto focus. Advocates inclusive economic access broadly. Implied market-reform stance via Jobs Plan framework.",blackBenefit:"Limited direct land policy. Economic access focus may benefit black entrepreneurs, but landless rural black communities are underserved.",score:2},
      immigration:{stance:"Not prominently addressed. Focus is on economic growth to reduce migration pull factors that drive undocumented entry.",blackBenefit:"Indirect benefit — growing the economy reduces desperation-driven migration that undercuts black workers. No direct enforcement stance.",score:2},
      economy:{stance:"'A job in every home.' 10 superministries. National Venture Fund for TVET/university graduates. Jobs & Justice Fund administered by professionals, not politicians.",blackBenefit:"Venture Fund directly benefits black youth — the majority of TVET and university students who cannot access startup capital.",score:4},
      education:{stance:"Align education with modern job market. Vocational training for emerging industries. Equitable access as a core value.",blackBenefit:"Jobs-aligned education directly benefits black youth who are most disconnected from formal employment due to skills-market mismatch.",score:4},
      transformation:{stance:"End cadre deployment. Professional public service. Merit plus accountability. Specialised Corruption Courts. Continuous lifestyle audits for all politicians.",blackBenefit:"Ending cadre deployment and corruption removes the system that diverts government resources away from poor black communities.",score:3},
      crime:{stance:"120,000 additional police officers recruited and trained. Safe communities as an economic enabler — investment follows safety.",blackBenefit:"120,000 new police in black townships would be transformational for community safety in SA's most crime-affected areas.",score:4}
    },
    pros:["Jobs & Justice Fund: empowerment money administered by professionals, not ANC politicians","120,000 new police — most ambitious community safety commitment of any small party","Corruption courts and lifestyle audits — real institutional anti-corruption architecture","Ubuntu values framework provides moral legitimacy rooted in African philosophy"],
    cons:["Only 2 seats — essentially zero legislative leverage in the NA","No meaningful land reform policy for the black landless majority","Maimane's DA history creates persistent mistrust in black communities","BOSA merging into 'Unite for Change' in 2025–26 undermines brand continuity","Jobs-first platform requires macro-economic conditions a 2-seat party cannot create alone"]
  }
];

const policyKeys = [
  {key:"land",label:"Land Reform",icon:"🌍"},
  {key:"immigration",label:"Immigration",icon:"🛂"},
  {key:"economy",label:"Economy & Jobs",icon:"💼"},
  {key:"education",label:"Education",icon:"🎓"},
  {key:"transformation",label:"Transformation",icon:"✊"},
  {key:"crime",label:"Crime & Safety",icon:"🛡️"}
];

const scoreLabel = s => ["","Weak","Limited","Moderate","Strong","Strongest"][s];
const scoreColor = s => ["","#E53935","#FB8C00","#F9A825","#43A047","#1B5E20"][s];
const scoreBg = s => ["","#FDECEA","#FFF3E0","#FFFDE7","#E8F5E9","#E8F5E9"][s];

// SA Flag SVG strip
function SAFlagStrip() {
  return (
    <div style={{height:8,display:"flex",width:"100%"}}>
      <div style={{flex:1,background:"#007A4D"}}/>
      <div style={{width:0,height:0,borderTop:"4px solid transparent",borderBottom:"4px solid transparent",borderLeft:"16px solid #007A4D"}}/>
      <div style={{flex:0.15,background:"#FFB81C"}}/>
      <div style={{flex:1,background:"#002395"}}/>
      <div style={{flex:0.15,background:"#FFFFFF"}}/>
      <div style={{flex:1,background:"#DE3831"}}/>
    </div>
  );
}

function ScoreBar({score}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:6}}>
      {[1,2,3,4,5].map(i=>(
        <div key={i} style={{
          width:22,height:22,borderRadius:4,
          background: i<=score ? scoreColor(score) : "#E0E0E0",
          border:`2px solid ${i<=score ? scoreColor(score) : "#BDBDBD"}`,
          display:"flex",alignItems:"center",justifyContent:"center"
        }}>
          {i<=score && <span style={{color:"white",fontSize:12,fontWeight:700}}>✓</span>}
        </div>
      ))}
      <span style={{fontSize:12,color:scoreColor(score),fontWeight:700,marginLeft:4,background:scoreBg(score),padding:"2px 8px",borderRadius:12,border:`1px solid ${scoreColor(score)}33`}}>
        {scoreLabel(score)}
      </span>
    </div>
  );
}

// Brand SA Header Element
function BrandSABadge() {
  return (
    <div style={{display:"flex",alignItems:"center",gap:8,background:"white",borderRadius:8,padding:"6px 14px",boxShadow:"0 2px 8px rgba(0,0,0,0.12)",border:"1px solid #E0E0E0"}}>
      <div style={{display:"flex",gap:2}}>
        <div style={{width:8,height:20,background:"#007A4D",borderRadius:"2px 0 0 2px"}}/>
        <div style={{width:8,height:20,background:"#FFB81C"}}/>
        <div style={{width:8,height:20,background:"#002395"}}/>
        <div style={{width:8,height:20,background:"#FFFFFF",border:"1px solid #eee"}}/>
        <div style={{width:8,height:20,background:"#DE3831",borderRadius:"0 2px 2px 0"}}/>
      </div>
      <span style={{fontWeight:800,fontSize:12,color:SA.black,letterSpacing:0.5}}>BRAND SOUTH AFRICA</span>
      <span style={{fontSize:11,color:"#888"}}>· Policy Monitor 2024</span>
    </div>
  );
}

export default function App() {
  const [selected,setSelected]=useState(null);
  const [activeTab,setActiveTab]=useState("overview");
  const [activePolicy,setActivePolicy]=useState("land");
  const [compareMode,setCompareMode]=useState(false);
  const [compareList,setCompareList]=useState([]);
  const [showCompare,setShowCompare]=useState(false);

  const party=parties.find(p=>p.id===selected);
  const isGNU=(s)=>s.includes("Governing");

  const toggleCompare=(id)=>{
    setCompareList(prev=>prev.includes(id)?prev.filter(x=>x!==id):prev.length<3?[...prev,id]:prev);
  };

  // ─── COMPARE VIEW ───
  if(showCompare && compareList.length>=2){
    const cParties=parties.filter(p=>compareList.includes(p.id));
    return(
      <div style={{background:SA.cream,minHeight:"100vh",fontFamily:"'Segoe UI',Arial,sans-serif"}}>
        <SAFlagStrip/>
        <div style={{background:"white",borderBottom:`3px solid ${SA.gold}`,padding:"16px 28px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
          <button onClick={()=>setShowCompare(false)} style={{background:SA.green,color:"white",border:"none",padding:"8px 18px",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:13}}>← Back</button>
          <BrandSABadge/>
          <span style={{fontWeight:700,color:SA.black,fontSize:16,marginLeft:8}}>Comparing: {cParties.map(p=>p.name).join(" vs ")}</span>
        </div>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"28px 20px"}}>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24}}>
            {policyKeys.map(pk=>(
              <button key={pk.key} onClick={()=>setActivePolicy(pk.key)} style={{
                padding:"8px 16px",borderRadius:20,border:`2px solid ${activePolicy===pk.key?SA.green:"#DDD"}`,
                background:activePolicy===pk.key?SA.green:"white",
                color:activePolicy===pk.key?"white":SA.textMid,
                cursor:"pointer",fontWeight:600,fontSize:13
              }}>{pk.icon} {pk.label}</button>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:`repeat(${cParties.length},1fr)`,gap:16,marginBottom:28}}>
            {cParties.map(p=>{
              const pol=p.policies[activePolicy];
              return(
                <div key={p.id} style={{background:"white",border:`3px solid ${p.color}`,borderRadius:14,overflow:"hidden",boxShadow:"0 4px 16px rgba(0,0,0,0.08)"}}>
                  <div style={{background:p.color,padding:"14px 18px",display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:22,fontWeight:900,color:"white"}}>{p.name}</span>
                    <span style={{fontSize:12,color:"rgba(255,255,255,0.8)"}}>{p.vote} · {p.seats} seats</span>
                  </div>
                  <div style={{padding:20}}>
                    <div style={{marginBottom:14}}>
                      <div style={{fontWeight:700,fontSize:11,color:SA.textLight,letterSpacing:1,marginBottom:8,textTransform:"uppercase"}}>Party Stance</div>
                      <p style={{fontSize:14,color:SA.textMid,lineHeight:1.7,margin:0}}>{pol.stance}</p>
                    </div>
                    <div style={{background:SA.lightGreen,borderRadius:8,padding:14,marginBottom:14,border:`1px solid ${SA.green}33`}}>
                      <div style={{fontWeight:700,fontSize:11,color:SA.green,letterSpacing:1,marginBottom:8,textTransform:"uppercase"}}>✅ Benefit to Black SA</div>
                      <p style={{fontSize:14,color:SA.text,lineHeight:1.7,margin:0}}>{pol.blackBenefit}</p>
                    </div>
                    <ScoreBar score={pol.score}/>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{background:"white",border:`2px solid ${SA.gold}`,borderRadius:14,padding:24,boxShadow:"0 4px 16px rgba(0,0,0,0.06)"}}>
            <div style={{fontWeight:800,fontSize:14,color:SA.black,marginBottom:18,textTransform:"uppercase",letterSpacing:1}}>📊 Overall Benefit Rating — All 6 Policy Areas</div>
            <div style={{display:"grid",gridTemplateColumns:`repeat(${cParties.length},1fr)`,gap:16}}>
              {cParties.map(p=>{
                const total=Object.values(p.policies).reduce((s,pol)=>s+pol.score,0);
                const pct=Math.round((total/30)*100);
                return(
                  <div key={p.id}>
                    <div style={{fontWeight:800,fontSize:15,color:p.color,marginBottom:8}}>{p.name}</div>
                    <div style={{height:12,background:"#F0F0F0",borderRadius:6,overflow:"hidden",marginBottom:6}}>
                      <div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${p.color},${p.accent})`,borderRadius:6,transition:"width 1s ease"}}/>
                    </div>
                    <div style={{fontWeight:700,fontSize:13,color:SA.textMid}}>{total}/30 ({pct}%)</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── DETAIL VIEW ───
  if(selected && party){
    const totalScore=Object.values(party.policies).reduce((s,p)=>s+p.score,0);
    const pct=Math.round((totalScore/30)*100);
    return(
      <div style={{background:SA.warmGrey,minHeight:"100vh",fontFamily:"'Segoe UI',Arial,sans-serif"}}>
        <SAFlagStrip/>
        {/* Header */}
        <div style={{background:party.color,padding:"28px 32px 24px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,right:0,width:200,height:"100%",background:"rgba(255,255,255,0.06)",clipPath:"polygon(30% 0,100% 0,100% 100%,0% 100%)"}}/>
          <div style={{position:"absolute",top:0,right:60,width:120,height:"100%",background:"rgba(255,255,255,0.04)",clipPath:"polygon(30% 0,100% 0,100% 100%,0% 100%)"}}/>
          <button onClick={()=>{setSelected(null);setActiveTab("overview");}} style={{background:"rgba(255,255,255,0.2)",color:"white",border:"2px solid rgba(255,255,255,0.4)",padding:"8px 18px",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:13,marginBottom:20,backdropFilter:"blur(4px)"}}>← All Parties</button>
          <div style={{display:"flex",alignItems:"flex-start",gap:24,flexWrap:"wrap",position:"relative",zIndex:1}}>
            <div style={{flex:1}}>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.7)",letterSpacing:2,marginBottom:6,textTransform:"uppercase"}}>{party.ideology}</div>
              <h1 style={{fontSize:"clamp(40px,6vw,64px)",fontWeight:900,margin:0,color:"white",letterSpacing:-1,lineHeight:1}}>{party.name}</h1>
              <div style={{fontSize:20,color:"rgba(255,255,255,0.85)",marginTop:6,fontStyle:"italic"}}>{party.full}</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.65)",marginTop:6}}>Led by {party.leader} · Founded {party.founded}</div>
              <div style={{marginTop:12,display:"inline-block",padding:"4px 14px",borderRadius:20,background:"rgba(255,255,255,0.2)",color:"white",fontSize:12,fontWeight:700,border:"1px solid rgba(255,255,255,0.4)"}}>
                {isGNU(party.status)?"● GOVERNING (GNU)":"○ OPPOSITION"}
              </div>
            </div>
            <div style={{textAlign:"right",background:"rgba(255,255,255,0.15)",borderRadius:12,padding:"16px 24px",backdropFilter:"blur(8px)"}}>
              <div style={{fontSize:42,fontWeight:900,color:"white",lineHeight:1}}>{party.vote}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.7)",textTransform:"uppercase",letterSpacing:1}}>2024 National Vote</div>
              <div style={{fontSize:20,fontWeight:700,color:"white",marginTop:8}}>{party.seats} Seats</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{background:"white",borderBottom:`3px solid ${SA.gold}`,display:"flex",padding:"0 32px",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
          {["overview","policies","verdict"].map(t=>(
            <button key={t} onClick={()=>setActiveTab(t)} style={{
              background:"transparent",border:"none",
              borderBottom:`3px solid ${activeTab===t?party.color:"transparent"}`,
              color:activeTab===t?party.color:SA.textLight,
              padding:"16px 24px",cursor:"pointer",fontWeight:700,fontSize:14,
              textTransform:"uppercase",letterSpacing:1,transition:"all 0.2s",marginBottom:-3
            }}>{t}</button>
          ))}
        </div>

        <div style={{maxWidth:960,margin:"0 auto",padding:"32px"}}>
          {/* OVERVIEW */}
          {activeTab==="overview" && (
            <div>
              <div style={{background:"white",borderRadius:14,padding:28,marginBottom:24,boxShadow:"0 4px 16px rgba(0,0,0,0.06)",border:`2px solid ${party.color}22`}}>
                <div style={{fontSize:11,fontWeight:700,color:SA.textLight,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>"{party.tagline}"</div>
                <div style={{fontWeight:700,fontSize:13,color:SA.textLight,letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>Aggregate Benefit to Black South Africans</div>
                <div style={{display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
                  <div style={{fontSize:64,fontWeight:900,color:party.color,lineHeight:1}}>{totalScore}<span style={{fontSize:28,color:"#BDBDBD"}}>/30</span></div>
                  <div style={{flex:1,minWidth:200}}>
                    <div style={{height:16,background:"#F0F0F0",borderRadius:8,overflow:"hidden",marginBottom:10}}>
                      <div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${party.color},${party.accent})`,borderRadius:8,transition:"width 1.2s ease"}}/>
                    </div>
                    <div style={{fontWeight:600,fontSize:13,color:SA.textMid}}>
                      {totalScore<=12?"⚠️ Low benefit for black South Africans overall":totalScore<=18?"🔶 Moderate benefit for black South Africans":totalScore<=24?"✅ Strong benefit for black South Africans":"🌟 Highest benefit for black South Africans"}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                {policyKeys.map(pk=>(
                  <div key={pk.key} onClick={()=>{setActiveTab("policies");setActivePolicy(pk.key);}}
                    style={{background:"white",border:`2px solid #E0E0E0`,borderRadius:12,padding:18,cursor:"pointer",transition:"all 0.2s",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=party.color;e.currentTarget.style.transform="translateY(-2px)";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="#E0E0E0";e.currentTarget.style.transform="none";}}>
                    <div style={{fontWeight:700,fontSize:13,color:SA.textMid,marginBottom:12}}>{pk.icon} {pk.label}</div>
                    <ScoreBar score={party.policies[pk.key].score}/>
                    <div style={{fontSize:11,color:SA.textLight,marginTop:10}}>Click to view full policy →</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* POLICIES */}
          {activeTab==="policies" && (
            <div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24}}>
                {policyKeys.map(pk=>(
                  <button key={pk.key} onClick={()=>setActivePolicy(pk.key)} style={{
                    padding:"8px 16px",borderRadius:20,
                    border:`2px solid ${activePolicy===pk.key?party.color:"#DDD"}`,
                    background:activePolicy===pk.key?party.color:"white",
                    color:activePolicy===pk.key?"white":SA.textMid,
                    cursor:"pointer",fontWeight:600,fontSize:13
                  }}>{pk.icon} {pk.label}</button>
                ))}
              </div>
              {(()=>{
                const pk=policyKeys.find(p=>p.key===activePolicy);
                const pol=party.policies[activePolicy];
                return(
                  <div>
                    <h2 style={{fontSize:26,fontWeight:800,marginBottom:20,color:SA.black}}>{pk.icon} {pk.label}</h2>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
                      <div style={{background:"white",border:"2px solid #E0E0E0",borderRadius:12,padding:22,boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
                        <div style={{fontWeight:700,fontSize:11,color:SA.textLight,letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>Party Stance</div>
                        <p style={{fontSize:15,lineHeight:1.75,color:SA.textMid,margin:0}}>{pol.stance}</p>
                      </div>
                      <div style={{background:SA.lightGreen,border:`2px solid ${SA.green}`,borderRadius:12,padding:22}}>
                        <div style={{fontWeight:700,fontSize:11,color:SA.green,letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>✅ Benefit to Black SA</div>
                        <p style={{fontSize:15,lineHeight:1.75,color:SA.text,margin:0}}>{pol.blackBenefit}</p>
                      </div>
                    </div>
                    <div style={{background:"white",border:"2px solid #E0E0E0",borderRadius:12,padding:20,boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
                      <div style={{fontWeight:700,fontSize:11,color:SA.textLight,letterSpacing:1,textTransform:"uppercase",marginBottom:14}}>Benefit Rating</div>
                      <ScoreBar score={pol.score}/>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* VERDICT */}
          {activeTab==="verdict" && (
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
              <div style={{background:"white",border:`2px solid ${SA.green}`,borderRadius:14,padding:24,boxShadow:"0 4px 16px rgba(0,122,77,0.08)"}}>
                <div style={{background:SA.green,color:"white",fontWeight:800,fontSize:12,letterSpacing:2,padding:"8px 14px",borderRadius:8,marginBottom:20,textTransform:"uppercase",display:"inline-block"}}>✓ What Works</div>
                {party.pros.map((p,i)=>(
                  <div key={i} style={{display:"flex",gap:12,marginBottom:16,alignItems:"flex-start"}}>
                    <div style={{width:22,height:22,borderRadius:"50%",background:SA.green,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{color:"white",fontSize:13,fontWeight:900}}>+</span>
                    </div>
                    <p style={{margin:0,fontSize:14,lineHeight:1.75,color:SA.textMid}}>{p}</p>
                  </div>
                ))}
              </div>
              <div style={{background:"white",border:`2px solid ${SA.red}`,borderRadius:14,padding:24,boxShadow:"0 4px 16px rgba(222,56,49,0.08)"}}>
                <div style={{background:SA.red,color:"white",fontWeight:800,fontSize:12,letterSpacing:2,padding:"8px 14px",borderRadius:8,marginBottom:20,textTransform:"uppercase",display:"inline-block"}}>✗ The Problems</div>
                {party.cons.map((c,i)=>(
                  <div key={i} style={{display:"flex",gap:12,marginBottom:16,alignItems:"flex-start"}}>
                    <div style={{width:22,height:22,borderRadius:"50%",background:SA.red,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{color:"white",fontSize:13,fontWeight:900}}>−</span>
                    </div>
                    <p style={{margin:0,fontSize:14,lineHeight:1.75,color:SA.textMid}}>{c}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── MAIN DASHBOARD ───
  return(
    <div style={{background:SA.warmGrey,minHeight:"100vh",fontFamily:"'Segoe UI',Arial,sans-serif"}}>
      <SAFlagStrip/>

      {/* Top nav */}
      <div style={{background:"white",borderBottom:`1px solid #E0E0E0`,padding:"14px 28px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
        <BrandSABadge/>
        <div style={{flex:1}}/>
        {compareMode && compareList.length>=2 && (
          <button onClick={()=>setShowCompare(true)} style={{background:SA.blue,color:"white",border:"none",padding:"9px 20px",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:13}}>
            Compare {compareList.length} Parties →
          </button>
        )}
        <button onClick={()=>{setCompareMode(!compareMode);setCompareList([]);}} style={{
          background:compareMode?SA.gold:"white",color:compareMode?"white":SA.green,
          border:`2px solid ${compareMode?SA.gold:SA.green}`,padding:"9px 20px",
          borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:13
        }}>{compareMode?"✓ Compare Mode":"⇄ Compare Mode"}</button>
      </div>

      {/* Hero */}
      <div style={{background:`linear-gradient(135deg, ${SA.green} 0%, #005a38 50%, ${SA.blue} 100%)`,padding:"52px 32px 44px",position:"relative",overflow:"hidden"}}>
        {/* Flag stripe decorations */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:6,background:`linear-gradient(90deg,${SA.green} 0%,${SA.gold} 33%,${SA.blue} 66%,${SA.red} 100%)`}}/>
        <div style={{position:"absolute",top:20,right:60,width:300,height:300,borderRadius:"50%",background:"rgba(255,255,255,0.04)"}}/>
        <div style={{position:"absolute",top:-40,right:180,width:200,height:200,borderRadius:"50%",background:"rgba(255,184,28,0.08)"}}/>

        <div style={{maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1}}>
          <div style={{background:"rgba(255,255,255,0.12)",display:"inline-block",padding:"6px 16px",borderRadius:20,marginBottom:18,backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.2)"}}>
            <span style={{color:"white",fontWeight:700,fontSize:12,letterSpacing:2}}>🇿🇦 2024 SOUTH AFRICAN ELECTIONS · POLICY ANALYSIS</span>
          </div>
          <h1 style={{fontSize:"clamp(30px,5vw,60px)",fontWeight:900,margin:"0 0 16px",color:"white",lineHeight:1.05,letterSpacing:-1}}>
            Who Really Serves<br/>
            <span style={{color:SA.gold}}>Black South Africa?</span>
          </h1>
          <p style={{fontSize:18,color:"rgba(255,255,255,0.85)",maxWidth:560,marginTop:0,lineHeight:1.65}}>
            8 major parties. 6 critical policy areas. A rigorous breakdown of each manifesto — and what it actually delivers for black South Africans.
          </p>
          {compareMode && (
            <div style={{marginTop:16,background:"rgba(255,255,255,0.15)",display:"inline-block",padding:"8px 18px",borderRadius:8,color:"white",fontSize:13,fontWeight:600}}>
              {compareList.length===0?"Select 2–3 party cards below to compare":
               `Selected: ${parties.filter(p=>compareList.includes(p.id)).map(p=>p.name).join(", ")} (${compareList.length}/3)`}
            </div>
          )}
        </div>
      </div>

      {/* Score legend */}
      <div style={{background:SA.gold,padding:"10px 32px"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",gap:20,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontWeight:800,fontSize:12,color:SA.black}}>BENEFIT RATING:</span>
          {[["1","Weak","#E53935"],["2","Limited","#FB8C00"],["3","Moderate","#F9A825"],["4","Strong","#43A047"],["5","Strongest","#1B5E20"]].map(([n,l,c])=>(
            <span key={l} style={{display:"flex",alignItems:"center",gap:5}}>
              <span style={{width:16,height:16,borderRadius:3,background:c,display:"inline-block",border:"2px solid rgba(0,0,0,0.1)"}}/>
              <span style={{fontSize:12,fontWeight:600,color:SA.black}}>{l}</span>
            </span>
          ))}
          <span style={{marginLeft:"auto",fontSize:12,fontWeight:700,color:SA.black}}>
            🟢 GNU &nbsp;|&nbsp; 🟠 OPPOSITION
          </span>
        </div>
      </div>

      {/* Party cards grid */}
      <div style={{maxWidth:1100,margin:"0 auto",padding:"32px"}}>
        {compareMode && (
          <div style={{background:"white",border:`2px solid ${SA.blue}`,borderRadius:10,padding:"12px 20px",marginBottom:20,display:"flex",alignItems:"center",gap:14,flexWrap:"wrap",boxShadow:"0 2px 8px rgba(0,35,149,0.08)"}}>
            <span style={{fontWeight:800,color:SA.blue,fontSize:13}}>⇄ COMPARE MODE</span>
            <span style={{color:SA.textMid,fontSize:13}}>{compareList.length===0?"Click cards to select parties (max 3)":
              `Selected: ${parties.filter(p=>compareList.includes(p.id)).map(p=>p.name).join(", ")}`}</span>
            {compareList.length>=2 && <button onClick={()=>setShowCompare(true)} style={{marginLeft:"auto",background:SA.blue,color:"white",border:"none",padding:"7px 18px",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:13}}>Compare Now →</button>}
            {compareList.length>0 && <button onClick={()=>setCompareList([])} style={{background:"#F5F5F5",border:"1px solid #DDD",color:SA.textLight,padding:"7px 14px",borderRadius:6,cursor:"pointer",fontSize:12}}>Clear</button>}
          </div>
        )}

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(295px,1fr))",gap:20}}>
          {parties.map(p=>{
            const total=Object.values(p.policies).reduce((s,pol)=>s+pol.score,0);
            const pct=Math.round((total/30)*100);
            const isChosen=compareList.includes(p.id);
            return(
              <div key={p.id}
                onClick={()=>compareMode?toggleCompare(p.id):setSelected(p.id)}
                style={{
                  background:"white",
                  border:`3px solid ${isChosen?p.color:"#E0E0E0"}`,
                  borderRadius:16,overflow:"hidden",cursor:"pointer",
                  boxShadow:isChosen?`0 8px 28px ${p.color}44`:"0 4px 16px rgba(0,0,0,0.06)",
                  transform:isChosen?"translateY(-4px)":"none",
                  transition:"all 0.25s ease"
                }}
                onMouseEnter={e=>{if(!isChosen){e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=`0 8px 24px ${p.color}33`;}}}
                onMouseLeave={e=>{if(!isChosen){e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,0.06)";}}}
              >
                {/* Card header */}
                <div style={{background:p.color,padding:"18px 20px",position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",top:0,right:0,width:80,height:"100%",background:"rgba(255,255,255,0.08)",clipPath:"polygon(40% 0,100% 0,100% 100%,0% 100%)"}}/>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",position:"relative",zIndex:1}}>
                    <div>
                      <div style={{fontSize:26,fontWeight:900,color:"white"}}>{p.name}</div>
                      <div style={{fontSize:12,color:"rgba(255,255,255,0.8)",marginTop:2}}>{p.full}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,0.65)",marginTop:1}}>{p.leader}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:18,fontWeight:800,color:"white"}}>{p.vote}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,0.7)"}}>{p.seats} seats</div>
                      <div style={{marginTop:6,display:"inline-block",padding:"2px 10px",borderRadius:12,
                        background:"rgba(255,255,255,0.2)",color:"white",fontSize:10,fontWeight:700}}>
                        {isGNU(p.status)?"🟢 GNU":"🟠 OPP"}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{padding:18}}>
                  <div style={{fontSize:13,color:SA.textLight,fontStyle:"italic",marginBottom:14,lineHeight:1.5}}>{p.tagline}</div>

                  {/* Overall score bar */}
                  <div style={{marginBottom:16}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <span style={{fontSize:11,fontWeight:700,color:SA.textLight,textTransform:"uppercase",letterSpacing:0.5}}>Benefit to Black SA</span>
                      <span style={{fontSize:12,fontWeight:800,color:p.color}}>{total}/30</span>
                    </div>
                    <div style={{height:8,background:"#F0F0F0",borderRadius:4,overflow:"hidden"}}>
                      <div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${p.color},${p.accent})`,borderRadius:4}}/>
                    </div>
                  </div>

                  {/* Policy mini scores */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>
                    {policyKeys.map(pk=>{
                      const sc=p.policies[pk.key].score;
                      const sc_c=scoreColor(sc);
                      return(
                        <div key={pk.key} style={{textAlign:"center",background:"#F9F9F9",borderRadius:8,padding:"8px 4px",border:"1px solid #EEEEEE"}}>
                          <div style={{fontSize:16,marginBottom:4}}>{pk.icon}</div>
                          <div style={{display:"flex",justifyContent:"center",gap:2}}>
                            {[1,2,3,4,5].map(i=>(
                              <div key={i} style={{width:5,height:5,borderRadius:1,background:i<=sc?sc_c:"#DDD"}}/>
                            ))}
                          </div>
                          <div style={{fontSize:9,color:SA.textLight,marginTop:3,fontWeight:600}}>{pk.label.slice(0,6)}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{background:isChosen?p.color:"#F5F5F5",color:isChosen?"white":SA.textLight,textAlign:"center",padding:"10px",borderRadius:8,fontSize:12,fontWeight:700,letterSpacing:0.5}}>
                    {compareMode?(isChosen?"✓ SELECTED — Click to remove":"+ Click to Select"):"Explore Party →"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{background:"white",borderTop:`4px solid transparent`,backgroundImage:`linear-gradient(white,white), linear-gradient(90deg,${SA.green},${SA.gold},${SA.blue},${SA.red})`,backgroundOrigin:"border-box",backgroundClip:"padding-box, border-box",padding:"24px 32px",marginTop:16}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",gap:20,flexWrap:"wrap",alignItems:"center"}}>
          <BrandSABadge/>
          <span style={{fontSize:12,color:SA.textLight,flex:1}}>Based on official 2024 IEC results and published party manifestos. Benefit scores (1–5) reflect direct and structural impact on black South Africans across land, immigration, economy, education, transformation and crime.</span>
        </div>
      </div>
    </div>
  );
}
