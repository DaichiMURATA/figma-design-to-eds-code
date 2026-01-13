import"./iframe-CHC9vj1_.js";import"./preload-helper-PPVm8Dsz.js";function n(o,d){const u=()=>window.performance?window.performance.now():Date.now()-window.hlx.rum.firstReadTime;try{if(window.hlx=window.hlx||{},!window.hlx.rum||!window.hlx.rum.collector){n.enhance=()=>{};const r=new URLSearchParams(window.location.search),{currentScript:c}=document,a=r.get("rum")||window.SAMPLE_PAGEVIEWS_AT_RATE||r.get("optel")||c&&c.dataset.rate,i={on:1,off:0,high:10,low:1e3}[a],h=i!==void 0?i:100,s=window.hlx.rum&&window.hlx.rum.id||crypto.randomUUID().slice(-9),l=window.hlx.rum&&window.hlx.rum.isSelected||h>0&&Math.random()*h<1;if(window.hlx.rum={weight:h,id:s,isSelected:l,firstReadTime:window.performance?window.performance.timeOrigin:Date.now(),sampleRUM:n,queue:[],collector:(...e)=>window.hlx.rum.queue.push(e)},l){const e=t=>{const m={source:"undefined error"};try{m.target=t.toString(),t.stack&&(m.source=t.stack.split(`
`).filter(p=>p.match(/https?:\/\//)).shift().replace(/at ([^ ]+) \((.+)\)/,"$1@$2").replace(/ at /,"@").trim())}catch{}return m};window.addEventListener("error",({error:t})=>{const m=e(t);n("error",m)}),window.addEventListener("unhandledrejection",({reason:t})=>{let m={source:"Unhandled Rejection",target:t||"Unknown"};t instanceof Error&&(m=e(t)),n("error",m)}),window.addEventListener("securitypolicyviolation",t=>{if(t.blockedURI.includes("helix-rum-enhancer")&&t.disposition==="enforce"){const m={source:"csp",target:t.blockedURI};n.sendPing("error",u(),m)}}),n.baseURL=n.baseURL||new URL(window.RUM_BASE||"/",new URL("https://ot.aem.live")),n.collectBaseURL=n.collectBaseURL||n.baseURL,n.sendPing=(t,m,p={})=>{const C=JSON.stringify({weight:h,id:s,referer:window.location.href,checkpoint:t,t:m,...p}),x=window.RUM_PARAMS&&new URLSearchParams(window.RUM_PARAMS).toString()||"",{href:R,origin:U}=new URL(`.rum/${h}${x?`?${x}`:""}`,n.collectBaseURL),y=U===window.location.origin?new Blob([C],{type:"application/json"}):C;navigator.sendBeacon(R,y),console.debug(`ping:${t}`,p)},n.sendPing("top",u()),n.enhance=()=>{if(document.querySelector('script[src*="rum-enhancer"]'))return;const{enhancerVersion:t,enhancerHash:m}=n.enhancerContext||{},p=document.createElement("script");m&&(p.integrity=m,p.setAttribute("crossorigin","anonymous")),p.src=new URL(`.rum/@adobe/helix-rum-enhancer@${t||"^2"}/src/index.js`,n.baseURL).href,document.head.appendChild(p)},window.hlx.RUM_MANUAL_ENHANCE||n.enhance()}}window.hlx.rum&&window.hlx.rum.isSelected&&o&&window.hlx.rum.collector(o,d,u()),document.dispatchEvent(new CustomEvent("rum",{detail:{checkpoint:o,data:d}}))}catch{}}function A(){window.hlx=window.hlx||{},window.hlx.RUM_MASK_URL="full",window.hlx.RUM_MANUAL_ENHANCE=!0,window.hlx.codeBasePath="",window.hlx.lighthouse=new URLSearchParams(window.location.search).get("lighthouse")==="on";const o=document.querySelector('script[src$="/scripts/scripts.js"]');if(o)try{[window.hlx.codeBasePath]=new URL(o.src).pathname.split("/scripts/scripts.js")}catch(d){console.log(d)}}function S(){A(),n.collectBaseURL=window.origin,n()}function v(o,d="",u=!1,r=[{media:"(min-width: 600px)",width:"2000"},{width:"750"}]){const c=new URL(o,window.location.href),a=document.createElement("picture"),{pathname:i}=c,h=i.substring(i.lastIndexOf(".")+1);return r.forEach(s=>{const l=document.createElement("source");s.media&&l.setAttribute("media",s.media),l.setAttribute("type","image/webp"),l.setAttribute("srcset",`${i}?width=${s.width}&format=webply&optimize=medium`),a.appendChild(l)}),r.forEach((s,l)=>{if(l<r.length-1){const e=document.createElement("source");s.media&&e.setAttribute("media",s.media),e.setAttribute("srcset",`${i}?width=${s.width}&format=${h}&optimize=medium`),a.appendChild(e)}else{const e=document.createElement("img");e.setAttribute("loading",u?"eager":"lazy"),e.setAttribute("alt",d),a.appendChild(e),e.setAttribute("src",`${i}?width=${s.width}&format=${h}&optimize=medium`)}}),a}S();function I(o){const d=document.createElement("ul");[...o.children].forEach(r=>{const c=document.createElement("li");for(c.className="card";r.firstElementChild;)c.append(r.firstElementChild);[...c.children].forEach(a=>{if(a.children.length===1&&a.querySelector("picture"))a.className="card-image";else{a.className="card-body";const i=a.querySelector("h1, h2, h3, h4, h5, h6");i&&i.classList.add("card-title"),a.querySelectorAll("p").forEach(s=>{s.querySelector("a")&&s.classList.add("card-cta")})}}),d.append(c)}),d.querySelectorAll("picture > img").forEach(r=>{r.closest("picture").replaceWith(v(r.src,r.alt,!1,[{width:"750"}]))}),o.replaceChildren(d),o._eds={getCards:()=>o.querySelectorAll(".card")}}const k=""+new URL("card-image-BoGPceuw.png",import.meta.url).href,M={title:"Blocks/Cards",tags:["autodocs"],parameters:{docs:{description:{component:`
## Cards Block

Grid of card items, each with image, title, description, and optional CTA.

**Features:**
- ✅ Responsive grid layout
- ✅ Hover effects
- ✅ Auto-fill grid columns
- ✅ Mobile-first design
        `}},layout:"fullscreen",chromatic:{viewports:[375,1200]}}},b=({cardCount:o=3,hasImage:d=!0,hasLink:u=!1,isHover:r=!1})=>{const c=document.createElement("div");c.className="cards",r&&c.classList.add("hover-state");for(let a=0;a<o;a++){const i=document.createElement("div");if(d){const l=document.createElement("picture"),e=document.createElement("img");e.src=k,e.alt=`Card ${a+1}`,e.loading="eager",l.appendChild(e);const t=document.createElement("div");t.appendChild(l),i.appendChild(t)}const h=document.createElement("h3");h.textContent=`Card Title ${a+1}`,i.appendChild(h);const s=document.createElement("p");if(s.textContent="This is a description of the card content. It provides context and information.",i.appendChild(s),u){const l=document.createElement("p"),e=document.createElement("a");e.href="#",e.textContent="Learn More",r&&e.classList.add("hover"),l.appendChild(e),i.appendChild(l)}c.appendChild(i)}return c},E=o=>{const d=document.createElement("main"),u=document.createElement("div");u.className="section";const r=document.createElement("div"),c=b(o);return r.appendChild(c),u.appendChild(r),d.appendChild(u),I(c),d},w={render:()=>E({cardCount:3,hasImage:!0,hasLink:!1,isHover:!1}),parameters:{chromatic:{delay:300}}},f={render:()=>E({cardCount:3,hasImage:!0,hasLink:!0,isHover:!0}),parameters:{chromatic:{delay:300}}},g={render:()=>E({cardCount:3,hasImage:!1,hasLink:!1,isHover:!1}),parameters:{chromatic:{delay:300}}},L={render:()=>E({cardCount:3,hasImage:!0,hasLink:!0,isHover:!1}),parameters:{chromatic:{delay:300}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    cardCount: 3,
    hasImage: true,
    hasLink: false,
    isHover: false
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...w.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    cardCount: 3,
    hasImage: true,
    hasLink: true,
    isHover: true
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...f.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    cardCount: 3,
    hasImage: false,
    hasLink: false,
    isHover: false
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...g.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    cardCount: 3,
    hasImage: true,
    hasLink: true,
    isHover: false
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...L.parameters?.docs?.source}}};const P=["WithImageNoLink","WithImageAndLinkHover","NoImageNoLink","WithImageAndLink"];export{g as NoImageNoLink,L as WithImageAndLink,f as WithImageAndLinkHover,w as WithImageNoLink,P as __namedExportsOrder,M as default};
