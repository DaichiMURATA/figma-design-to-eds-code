import"./iframe-CHC9vj1_.js";import"./preload-helper-PPVm8Dsz.js";function d(c){[...c.children].forEach(n=>{const e=[...n.children];if(e.length>0){const o=e[0].textContent.trim(),t=document.createElement("div");t.className="embed-wrapper";const r=document.createElement("iframe");r.src=o,r.setAttribute("frameborder","0"),r.setAttribute("allowfullscreen",""),r.setAttribute("loading","lazy"),r.setAttribute("title","Embedded content"),t.appendChild(r),n.replaceWith(t)}})}const p={title:"Blocks/Embed",parameters:{layout:"fullscreen",chromatic:{viewports:[375,1200]}}},m=()=>{const c=document.createElement("main"),a=document.createElement("div");a.className="section";const n=document.createElement("div"),e=document.createElement("div");e.className="embed";const o=document.createElement("div"),t=document.createElement("div");return t.textContent="https://www.youtube.com/embed/dQw4w9WgXcQ",o.appendChild(t),e.appendChild(o),n.appendChild(e),a.appendChild(n),c.appendChild(a),d(e),c},s={render:m,parameters:{chromatic:{delay:300}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: Template,
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...s.parameters?.docs?.source}}};const u=["Default"];export{s as Default,u as __namedExportsOrder,p as default};
