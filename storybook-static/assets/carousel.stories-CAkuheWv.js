import"./iframe-CHC9vj1_.js";import"./preload-helper-PPVm8Dsz.js";function y(e){const r=e.querySelectorAll(".carousel-slide"),t=e.querySelector(".carousel-button-prev"),s=e.querySelector(".carousel-button-next"),n=e.querySelectorAll(".carousel-indicator");let a=0;r.forEach((l,o)=>{l.classList.contains("active")&&(a=o)}),t.disabled=a===0,s.disabled=a===r.length-1,n.forEach((l,o)=>{l.classList.toggle("active",o===a)})}function f(e,r){const t=e.querySelectorAll(".carousel-slide"),s=e.querySelector(".carousel-track");t.forEach((n,a)=>{n.classList.toggle("active",a===r)}),s.style.transform=`translateX(-${r*100}%)`,y(e)}function g(e){const r=e.querySelectorAll(".carousel-slide");let t=[...r].findIndex(s=>s.classList.contains("active"));t<r.length-1&&f(e,t+1)}function v(e){let t=[...e.querySelectorAll(".carousel-slide")].findIndex(s=>s.classList.contains("active"));t>0&&f(e,t-1)}function E(e){const r=[...e.children],t=document.createElement("div");t.className="carousel-container";const s=document.createElement("div");s.className="carousel-track",r.forEach((o,c)=>{const i=document.createElement("div");i.className="carousel-slide",i.setAttribute("role","group"),i.setAttribute("aria-roledescription","slide"),i.setAttribute("aria-label",`Slide ${c+1}`),c===0&&i.classList.add("active"),i.innerHTML=o.innerHTML,s.appendChild(i)}),e.innerHTML="",t.appendChild(s),e.appendChild(t);const n=document.createElement("button");n.className="carousel-button carousel-button-prev",n.setAttribute("aria-label","Previous slide"),n.innerHTML="‹",n.addEventListener("click",()=>v(e));const a=document.createElement("button");a.className="carousel-button carousel-button-next",a.setAttribute("aria-label","Next slide"),a.innerHTML="›",a.addEventListener("click",()=>g(e)),t.appendChild(n),t.appendChild(a);const l=document.createElement("div");l.className="carousel-indicators",r.forEach((o,c)=>{const i=document.createElement("button");i.className="carousel-indicator",i.setAttribute("aria-label",`Go to slide ${c+1}`),c===0&&i.classList.add("active"),i.addEventListener("click",()=>f(e,c)),l.appendChild(i)}),e.appendChild(l),e.addEventListener("keydown",o=>{o.key==="ArrowLeft"?v(e):o.key==="ArrowRight"&&g(e)}),y(e),e._eds={showSlide:o=>f(e,o),next:()=>g(e),prev:()=>v(e),getCurrentIndex:()=>[...e.querySelectorAll(".carousel-slide")].findIndex(c=>c.classList.contains("active"))}}const L=""+new URL("card-image-BoGPceuw.png",import.meta.url).href,T={title:"Blocks/Carousel",tags:["autodocs"],parameters:{docs:{description:{component:`
## Carousel Block

Slideshow component for cycling through content items.

**Features:**
- ✅ Previous/Next navigation buttons
- ✅ Indicator dots for direct navigation
- ✅ Keyboard navigation (Arrow keys)
- ✅ WCAG AA accessibility
- ✅ Touch/swipe support (future enhancement)
        `}},layout:"fullscreen",chromatic:{viewports:[375,1200]}}},A=({slideCount:e=3,hasContent:r=!0,contentPosition:t="center",contentSize:s="full"})=>{const n=document.createElement("div");n.className="carousel",t!=="center"&&n.setAttribute("data-content-position",t),s!=="full"&&n.setAttribute("data-content-size",s);for(let a=0;a<e;a++){const l=document.createElement("div"),o=document.createElement("img");if(o.src=L,o.alt=`Slide ${a+1}`,o.loading="eager",l.appendChild(o),r){const c=document.createElement("h3");c.textContent=`Slide ${a+1} Title`,l.appendChild(c);const i=document.createElement("p");i.textContent="This is a description of the slide content.",l.appendChild(i)}n.appendChild(l)}return n},d=e=>{const r=document.createElement("main"),t=document.createElement("div");t.className="section";const s=document.createElement("div"),n=A(e);return s.appendChild(n),t.appendChild(s),r.appendChild(t),E(n),r},u={render:()=>d({slideCount:1,hasContent:!0,contentPosition:"center",contentSize:"full"}),parameters:{chromatic:{delay:300}}},m={render:()=>d({slideCount:3,hasContent:!1,contentPosition:"none",contentSize:"none"}),parameters:{chromatic:{delay:300}}},p={render:()=>d({slideCount:3,hasContent:!0,contentPosition:"center",contentSize:"small"}),parameters:{chromatic:{delay:300}}},h={render:()=>d({slideCount:3,hasContent:!0,contentPosition:"right",contentSize:"small"}),parameters:{chromatic:{delay:300}}},S={render:()=>d({slideCount:3,hasContent:!0,contentPosition:"left",contentSize:"small"}),parameters:{chromatic:{delay:300}}},C={render:()=>d({slideCount:3,hasContent:!0,contentPosition:"center",contentSize:"full"}),parameters:{chromatic:{delay:300}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    slideCount: 1,
    hasContent: true,
    contentPosition: 'center',
    contentSize: 'full'
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    slideCount: 3,
    hasContent: false,
    contentPosition: 'none',
    contentSize: 'none'
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    slideCount: 3,
    hasContent: true,
    contentPosition: 'center',
    contentSize: 'small'
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    slideCount: 3,
    hasContent: true,
    contentPosition: 'right',
    contentSize: 'small'
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...h.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    slideCount: 3,
    hasContent: true,
    contentPosition: 'left',
    contentSize: 'small'
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...S.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    slideCount: 3,
    hasContent: true,
    contentPosition: 'center',
    contentSize: 'full'
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...C.parameters?.docs?.source}}};const P=["SingleSlideFullContent","MultipleSlides","MultipleSlidesSmallCenter","MultipleSlidesSmallRight","MultipleSlidesSmallLeft","MultipleSlidesFullCenter"];export{m as MultipleSlides,C as MultipleSlidesFullCenter,p as MultipleSlidesSmallCenter,S as MultipleSlidesSmallLeft,h as MultipleSlidesSmallRight,u as SingleSlideFullContent,P as __namedExportsOrder,T as default};
