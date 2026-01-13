import"./iframe-CHC9vj1_.js";import"./preload-helper-PPVm8Dsz.js";function i(r){[...r.children].forEach(e=>{const t=[...e.children],n=document.createElement("blockquote");if(n.className="quote-text",t.length>0){const o=document.createElement("p");o.innerHTML=t[0].innerHTML,n.appendChild(o)}if(t.length>1){const o=document.createElement("cite");o.className="quote-attribution",o.textContent=t[1].textContent,n.appendChild(o)}e.replaceWith(n)})}const p={title:"Blocks/Quote",tags:["autodocs"],parameters:{layout:"fullscreen",chromatic:{viewports:[375,1200]}}},m=({hasAuthor:r=!1})=>{const a=document.createElement("div");a.className="quote";const e=document.createElement("blockquote"),t=document.createElement("p");if(t.textContent="This is an inspiring quote that conveys important information or wisdom.",e.appendChild(t),r){const n=document.createElement("p"),o=document.createElement("cite");o.textContent="— Author Name",n.appendChild(o),e.appendChild(n)}return a.appendChild(e),a},l=r=>{const a=document.createElement("main"),e=document.createElement("div");e.className="section";const t=document.createElement("div"),n=m(r);return t.appendChild(n),e.appendChild(t),a.appendChild(e),i(n),a},c={render:()=>l({hasAuthor:!1}),parameters:{chromatic:{delay:300}}},s={render:()=>l({hasAuthor:!0}),parameters:{chromatic:{delay:300}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    hasAuthor: false
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...c.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    hasAuthor: true
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...s.parameters?.docs?.source}}};const h=["Default","WithAuthor"];export{c as Default,s as WithAuthor,h as __namedExportsOrder,p as default};
