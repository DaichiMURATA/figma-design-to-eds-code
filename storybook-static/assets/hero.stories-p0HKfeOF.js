import"./iframe-CHC9vj1_.js";import"./preload-helper-PPVm8Dsz.js";function h(t){[...t.children].forEach(o=>{const a=[...o.children];if(a.length>=1){const e=a[0];e.classList.add("hero-text");const r=e.querySelector("h1, h2, h3");r&&r.classList.add("hero-heading"),e.querySelectorAll("p").forEach(l=>{const c=l.querySelector("a");if(c){const s=c.parentElement,d=c.parentElement.parentElement;s.childNodes.length===1&&(s.tagName==="P"||s.tagName==="DIV")?(c.classList.add("button","primary"),s.classList.add("hero-cta")):d.childNodes.length===1&&(d.tagName==="P"||d.tagName==="DIV")?(c.classList.add("button","primary"),d.classList.add("hero-cta")):l.classList.add("hero-body")}else l.classList.add("hero-body")})}if(a.length>=2){const e=a[1];e.classList.add("hero-image");const r=e.querySelector("picture");r&&r.classList.add("hero-picture")}}),t._eds={getContent:()=>({heading:t.querySelector(".hero-heading"),body:t.querySelector(".hero-body"),cta:t.querySelector(".hero-cta a"),image:t.querySelector(".hero-image picture")})}}const f={title:"Blocks/Hero",tags:["autodocs"],parameters:{docs:{description:{component:`
## Hero Block

Large featured content section, typically used at the top of pages.

**Features:**
- ✅ Heading text (editable)
- ✅ Background image (DNA螺旋)
- ✅ White text on dark background
- ✅ Responsive layout
- ✅ WCAG AA accessibility
        `}},layout:"fullscreen",chromatic:{viewports:[375,1200]}}},m=({heading:t="Heading in Block"})=>{const n=document.createElement("div");n.className="hero";const o=document.createElement("div"),a=document.createElement("div"),e=document.createElement("h1");return e.textContent=t,a.appendChild(e),o.appendChild(a),n.appendChild(o),n},p=t=>{const n=document.createElement("main"),o=document.createElement("div");o.className="section";const a=document.createElement("div"),e=m(t);return a.appendChild(e),o.appendChild(a),n.appendChild(o),h(e),n},i={render:()=>p({heading:"Heading in Block"}),parameters:{docs:{story:{description:"Default hero with heading text on DNA螺旋 background (matches Figma)"}},chromatic:{delay:300}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    heading: 'Heading in Block'
  }),
  parameters: {
    docs: {
      story: {
        description: 'Default hero with heading text on DNA螺旋 background (matches Figma)'
      }
    },
    chromatic: {
      delay: 300
    }
  }
}`,...i.parameters?.docs?.source}}};const C=["Default"];export{i as Default,C as __namedExportsOrder,f as default};
