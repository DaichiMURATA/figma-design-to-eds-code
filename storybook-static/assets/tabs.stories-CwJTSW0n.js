import"./iframe-CHC9vj1_.js";import"./preload-helper-PPVm8Dsz.js";let p=0;function u(e,a){const o=e.querySelectorAll(".tabs-tab"),c=e.querySelectorAll(".tabs-panel");o.forEach((n,t)=>{n.setAttribute("aria-selected",t===a?"true":"false"),n.classList.toggle("active",t===a)}),c.forEach((n,t)=>{n.hidden=t!==a,n.classList.toggle("active",t===a)})}function f(e){p+=1;const a=`tabs-${p}`,o=[...e.children],c=document.createElement("div");c.className="tabs-list",c.setAttribute("role","tablist");const n=document.createElement("div");n.className="tabs-panels",o.forEach((l,s)=>{const i=[...l.children];if(i.length>=2){const r=document.createElement("button");r.className="tabs-tab",r.setAttribute("role","tab"),r.setAttribute("id",`${a}-tab-${s}`),r.setAttribute("aria-controls",`${a}-panel-${s}`),r.setAttribute("aria-selected",s===0?"true":"false"),r.textContent=i[0].textContent.trim(),s===0&&r.classList.add("active"),r.addEventListener("click",()=>u(e,s)),c.appendChild(r);const d=document.createElement("div");d.className="tabs-panel",d.setAttribute("role","tabpanel"),d.setAttribute("id",`${a}-panel-${s}`),d.setAttribute("aria-labelledby",`${a}-tab-${s}`),d.innerHTML=i[1].innerHTML,d.hidden=s!==0,s===0&&d.classList.add("active"),n.appendChild(d)}}),e.innerHTML="",e.appendChild(c),e.appendChild(n);const t=c.querySelectorAll(".tabs-tab");t.forEach((l,s)=>{l.addEventListener("keydown",i=>{let r=s;if(i.key==="ArrowRight")r=s+1<t.length?s+1:0;else if(i.key==="ArrowLeft")r=s-1>=0?s-1:t.length-1;else if(i.key==="Home")r=0;else if(i.key==="End")r=t.length-1;else return;i.preventDefault(),u(e,r),t[r].focus()})}),e._eds={showTab:l=>u(e,l),getCurrentIndex:()=>{const l=e.querySelector(".tabs-tab.active");return[...t].indexOf(l)}}}const C={title:"Blocks/Tabs",tags:["autodocs"],parameters:{layout:"fullscreen",chromatic:{viewports:[375,1200]}}},v=({activeTab:e=0})=>{const a=document.createElement("div");a.className="tabs",a.setAttribute("data-active-tab",e);const o=document.createElement("div");return o.setAttribute("role","tablist"),["Tab 1","Tab 2","Tab 3"].forEach((c,n)=>{const t=document.createElement("button");t.setAttribute("role","tab"),t.textContent=c,n===e&&t.setAttribute("aria-selected","true"),o.appendChild(t)}),a.appendChild(o),["Content 1","Content 2","Content 3"].forEach((c,n)=>{const t=document.createElement("div");t.setAttribute("role","tabpanel"),n!==e&&t.setAttribute("hidden","");const l=document.createElement("p");l.textContent=c,t.appendChild(l),a.appendChild(t)}),a},h=e=>{const a=document.createElement("main"),o=document.createElement("div");o.className="section";const c=document.createElement("div"),n=v(e);return c.appendChild(n),o.appendChild(c),a.appendChild(o),f(n),a},b={render:()=>h({activeTab:0}),parameters:{chromatic:{delay:300}}},m={render:()=>h({activeTab:1}),parameters:{chromatic:{delay:300}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    activeTab: 0
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...b.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    activeTab: 1
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...m.parameters?.docs?.source}}};const T=["FirstTabActive","SecondTabActive"];export{b as FirstTabActive,m as SecondTabActive,T as __namedExportsOrder,C as default};
