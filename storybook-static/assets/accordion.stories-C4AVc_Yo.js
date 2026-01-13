import"./iframe-CHC9vj1_.js";import"./preload-helper-PPVm8Dsz.js";const k="accordion",O={ITEM:".accordion-item"},d={ITEM:"accordion-item",BUTTON:"accordion-button",PANEL:"accordion-panel",ICON:"accordion-icon",EXPANDED:"is-expanded"},c={EXPANDED:"aria-expanded",CONTROLS:"aria-controls",LABELLEDBY:"aria-labelledby",HIDDEN:"hidden",ROLE:"role"};let N=0;function w(n,s,o){const e=document.createElement("button");e.className=d.BUTTON,e.id=s,e.type="button",e.setAttribute(c.EXPANDED,"false"),e.setAttribute(c.CONTROLS,o),e.textContent=n.textContent;const r=document.createElement("span");return r.className=d.ICON,r.setAttribute("aria-hidden","true"),e.appendChild(r),e}function F(n,s,o){const e=document.createElement("div");for(e.className=d.PANEL,e.id=s,e.setAttribute(c.ROLE,"region"),e.setAttribute(c.LABELLEDBY,o),e.setAttribute(c.HIDDEN,"");n.firstChild;)e.appendChild(n.firstChild);return e}function u(n,s){const e=!(n.getAttribute(c.EXPANDED)==="true"),r=n.closest(O.ITEM);n.setAttribute(c.EXPANDED,String(e)),e?(s.removeAttribute(c.HIDDEN),r?.classList.add(d.EXPANDED)):(s.setAttribute(c.HIDDEN,""),r?.classList.remove(d.EXPANDED))}function H(n){if(!n||!(n instanceof HTMLElement)){console.warn("Accordion: Invalid block element provided");return}const s=N;N+=1;const o=[],e=[];[...n.children].forEach((a,t)=>{const i=a.querySelector("h1, h2, h3, h4, h5, h6");if(!i)return;const l=i.closest("div"),A=[...a.children].filter(f=>f!==l);if(A.length===0)return;const y=`${k}-button-${s}-${t}`,D=`${k}-panel-${s}-${t}`,b=document.createElement("div");b.className=d.ITEM;const v=w(i,y,D),C=document.createElement("div");A.forEach(f=>{for(;f.firstChild;)C.appendChild(f.firstChild)});const E=F(C,D,y),L=()=>u(v,E);e.push(v),b.append(v,E),a.replaceWith(b),o.push({button:v,panel:E,clickHandler:L})}),o.forEach(({button:a},t)=>{const i=l=>{switch(l.key){case"Enter":case" ":l.preventDefault(),u(a,o[t].panel);break;case"ArrowDown":l.preventDefault(),e[t+1]?.focus();break;case"ArrowUp":l.preventDefault(),e[t-1]?.focus();break;case"Home":l.preventDefault(),e[0]?.focus();break;case"End":l.preventDefault(),e[e.length-1]?.focus();break}};a.addEventListener("click",o[t].clickHandler),a.addEventListener("keydown",i),o[t].keydownHandler=i}),n._eds={open(a){const t=o[a];t?.button.getAttribute(c.EXPANDED)!=="true"&&t&&u(t.button,t.panel)},close(a){const t=o[a];t?.button.getAttribute(c.EXPANDED)==="true"&&t&&u(t.button,t.panel)},toggle(a){const t=o[a];t&&u(t.button,t.panel)},destroy(){o.forEach(({button:a,clickHandler:t,keydownHandler:i})=>{a.removeEventListener("click",t),a.removeEventListener("keydown",i)}),n._eds=void 0}}}const M={title:"Blocks/Accordion",tags:["autodocs"],parameters:{docs:{description:{component:`
## Accordion Block

An interactive accordion component matching Figma design specifications.

**Figma Variants (3):**
1. default, isOpen=false - All items closed, white background
2. hover, isOpen=false - Hover state on closed item, gray background
3. hover, isOpen=true - Hover state on open item, gray background

**Features:**
- ✅ Click to expand/collapse
- ✅ Keyboard navigation
- ✅ WCAG AA accessibility
- ✅ Smooth animations
- ✅ Responsive design
        `}},layout:"fullscreen",chromatic:{viewports:[375,1200]}}},T=()=>{const n=document.createElement("div");return n.className="accordion",[{title:"Urna duis convallis convallis tellus id interdum. Faucibus ornare suspendisse sed nisi lacus.",content:"Urna duis convallis convallis tellus id interdum. Faucibus ornare suspendisse sed nisi lacus. Urna duis convallis convallis tellus id interdum. Faucibus ornare suspendisse sed nisi lacus."},{title:"Urna duis convallis convallis tellus id interdum. Faucibus ornare suspendisse sed nisi lacus.",content:"Urna duis convallis convallis tellus id interdum. Faucibus ornare suspendisse sed nisi lacus. Urna duis convallis convallis tellus id interdum. Faucibus ornare suspendisse sed nisi lacus."},{title:"Urna duis convallis convallis tellus id interdum. Faucibus ornare suspendisse sed nisi lacus.",content:"Urna duis convallis convallis tellus id interdum. Faucibus ornare suspendisse sed nisi lacus. Urna duis convallis convallis tellus id interdum. Faucibus ornare suspendisse sed nisi lacus."}].forEach(o=>{const e=document.createElement("div"),r=document.createElement("div"),a=document.createElement("h3");a.textContent=o.title,r.appendChild(a),e.appendChild(r);const t=document.createElement("div"),i=document.createElement("p");i.textContent=o.content,t.appendChild(i),e.appendChild(t),n.appendChild(e)}),n},g=(n={})=>{const s=document.createElement("main"),o=document.createElement("div");o.className="section";const e=document.createElement("div"),r=T();return e.appendChild(r),o.appendChild(e),s.appendChild(o),H(r),n.afterDecorate&&setTimeout(()=>{n.afterDecorate(r)},100),s},m={render:()=>g(),parameters:{docs:{story:{description:"Default state - all items closed with white background. Matches Figma variant: default, isOpen=false"}},chromatic:{delay:300}}},p={render:()=>g({afterDecorate:n=>{const s=n.querySelectorAll(".accordion-button");s[1]&&(s[1].classList.add("hover-simulation"),s[1].style.backgroundColor="var(--color-neutral-50, #f5f5f5)")}}),parameters:{docs:{story:{description:"Hover state on closed item - gray background. Matches Figma variant: hover, isOpen=false"}},chromatic:{delay:300}}},h={render:()=>g({afterDecorate:n=>{const s=n.querySelectorAll(".accordion-button");s[2]&&(s[2].click(),setTimeout(()=>{s[2].classList.add("hover-simulation"),s[2].style.backgroundColor="var(--color-neutral-50, #f5f5f5)"},100))}}),parameters:{docs:{story:{description:"Hover state on expanded item - gray background with content visible. Matches Figma variant: hover, isOpen=true"}},chromatic:{delay:500}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => Template(),
  parameters: {
    docs: {
      story: {
        description: 'Default state - all items closed with white background. Matches Figma variant: default, isOpen=false'
      }
    },
    chromatic: {
      delay: 300 // Allow styles to settle
    }
  }
}`,...m.parameters?.docs?.source},description:{story:`All accordion items closed - default white background
Matches Figma: default, isOpen=false`,...m.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    afterDecorate: block => {
      // Apply hover state to middle item
      const buttons = block.querySelectorAll('.accordion-button');
      if (buttons[1]) {
        buttons[1].classList.add('hover-simulation');
        buttons[1].style.backgroundColor = 'var(--color-neutral-50, #f5f5f5)';
      }
    }
  }),
  parameters: {
    docs: {
      story: {
        description: 'Hover state on closed item - gray background. Matches Figma variant: hover, isOpen=false'
      }
    },
    chromatic: {
      delay: 300
    }
  }
}`,...p.parameters?.docs?.source},description:{story:`Hover state on middle accordion item (closed)
Matches Figma: hover, isOpen=false`,...p.parameters?.docs?.description}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    afterDecorate: block => {
      // Open the last item
      const buttons = block.querySelectorAll('.accordion-button');
      if (buttons[2]) {
        buttons[2].click(); // Open the item

        // Apply hover state after opening
        setTimeout(() => {
          buttons[2].classList.add('hover-simulation');
          buttons[2].style.backgroundColor = 'var(--color-neutral-50, #f5f5f5)';
        }, 100);
      }
    }
  }),
  parameters: {
    docs: {
      story: {
        description: 'Hover state on expanded item - gray background with content visible. Matches Figma variant: hover, isOpen=true'
      }
    },
    chromatic: {
      delay: 500 // Extra delay for animation to complete
    }
  }
}`,...h.parameters?.docs?.source},description:{story:`Last accordion item opened with hover state
Matches Figma: hover, isOpen=true`,...h.parameters?.docs?.description}}};const B=["Default","HoverClosed","HoverExpanded"];export{m as Default,p as HoverClosed,h as HoverExpanded,B as __namedExportsOrder,M as default};
