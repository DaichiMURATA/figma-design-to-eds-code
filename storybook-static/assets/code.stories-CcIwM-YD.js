import"./iframe-CHC9vj1_.js";import"./preload-helper-PPVm8Dsz.js";function d(o){[...o.children].forEach(t=>{const e=[...t.children];if(e.length>0){const a=e[0],n=document.createElement("pre"),l=document.createElement("code");let s="plaintext";e.length>1&&(s=e[1].textContent.trim().toLowerCase()),l.className=`language-${s}`,l.textContent=a.textContent,n.appendChild(l),t.replaceWith(n)}})}const u={title:"Blocks/Code",parameters:{layout:"fullscreen",chromatic:{viewports:[375,1200]}}},m=()=>{const o=document.createElement("main"),c=document.createElement("div");c.className="section";const t=document.createElement("div"),e=document.createElement("div");e.className="code";const a=document.createElement("div"),n=document.createElement("div");return n.textContent=`function hello() {
  console.log("Hello, World!");
}`,a.appendChild(n),e.appendChild(a),t.appendChild(e),c.appendChild(t),o.appendChild(c),d(e),o},r={render:m,parameters:{chromatic:{delay:300}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: Template,
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...r.parameters?.docs?.source}}};const h=["Default"];export{r as Default,h as __namedExportsOrder,u as default};
