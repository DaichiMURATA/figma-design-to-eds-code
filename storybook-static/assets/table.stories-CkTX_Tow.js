import"./iframe-CHC9vj1_.js";import"./preload-helper-PPVm8Dsz.js";function C(c){const r=[...c.children],o=document.createElement("table");if(r.length>0){const e=document.createElement("thead"),t=document.createElement("tr");[...r[0].children].forEach(a=>{const n=document.createElement("th");n.innerHTML=a.innerHTML,t.appendChild(n)}),e.appendChild(t),o.appendChild(e)}if(r.length>1){const e=document.createElement("tbody");for(let t=1;t<r.length;t++){const l=document.createElement("tr");[...r[t].children].forEach(a=>{const n=document.createElement("td");n.innerHTML=a.innerHTML,l.appendChild(n)}),e.appendChild(l)}o.appendChild(e)}c.innerHTML="",c.appendChild(o)}const y={title:"Blocks/Table",parameters:{layout:"fullscreen",chromatic:{viewports:[375,1200]}}},s=()=>{const c=document.createElement("main"),r=document.createElement("div");r.className="section";const o=document.createElement("div"),e=document.createElement("div");e.className="table";const t=document.createElement("div");return["Name","Role","Email"].forEach(d=>{const a=document.createElement("div");a.textContent=d,t.appendChild(a)}),e.appendChild(t),[["Alice","Developer","alice@example.com"],["Bob","Designer","bob@example.com"],["Charlie","Manager","charlie@example.com"]].forEach(d=>{const a=document.createElement("div");d.forEach(n=>{const E=document.createElement("div");E.textContent=n,a.appendChild(E)}),e.appendChild(a)}),o.appendChild(e),r.appendChild(o),c.appendChild(r),C(e),c},m={render:s,parameters:{chromatic:{delay:300}}},p={render:()=>s(),parameters:{chromatic:{delay:300}}},i={render:()=>s(),parameters:{chromatic:{delay:300}}},h={render:()=>s(),parameters:{chromatic:{delay:300}}},u={render:()=>s(),parameters:{chromatic:{delay:300}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: Template,
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    variant: 'striped'
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...p.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    variant: 'bordered'
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...i.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    variant: 'striped-bordered'
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...h.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    variant: 'no-header'
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...u.parameters?.docs?.source}}};const T=["Default","Striped","Bordered","StripedBordered","NoHeader"];export{i as Bordered,m as Default,u as NoHeader,p as Striped,h as StripedBordered,T as __namedExportsOrder,y as default};
