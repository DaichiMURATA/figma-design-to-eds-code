import"./iframe-CHC9vj1_.js";import"./preload-helper-PPVm8Dsz.js";function g(t){const r=[...t.firstElementChild.children];t.classList.add(`columns-${r.length}-cols`),[...t.children].forEach(o=>{[...o.children].forEach(a=>{const e=a.querySelector("picture");if(e){const c=e.closest("div");c&&c.children.length===1&&c.classList.add("columns-img-col")}})})}const v={title:"Blocks/Columns",tags:["autodocs"],parameters:{docs:{description:{component:"Multi-column layout block"}},layout:"fullscreen",chromatic:{viewports:[375,1200]}}},T=({columnCount:t=2})=>{const r=document.createElement("div");r.className="columns";const o=document.createElement("div");for(let a=0;a<t;a++){const e=document.createElement("div"),c=document.createElement("h3");c.textContent=`Column ${a+1}`,e.appendChild(c);const y=document.createElement("p");y.textContent="This is content for this column.",e.appendChild(y),o.appendChild(e)}return r.appendChild(o),r},n=t=>{const r=document.createElement("main"),o=document.createElement("div");o.className="section";const a=document.createElement("div"),e=T(t);return a.appendChild(e),o.appendChild(a),r.appendChild(o),g(e),r},s={render:()=>n({columnCount:2}),parameters:{chromatic:{delay:300}}},m={render:()=>n({columnCount:3}),parameters:{chromatic:{delay:300}}},l={render:()=>n({columnCount:1}),parameters:{chromatic:{delay:300}}},u={render:()=>n({columnCount:4}),parameters:{chromatic:{delay:300}}},d={render:()=>n({columnCount:5}),parameters:{chromatic:{delay:300}}},p={render:()=>n({columnCount:6}),parameters:{chromatic:{delay:300}}},i={render:()=>n({columnCount:7}),parameters:{chromatic:{delay:300}}},C={render:()=>n({columnCount:8}),parameters:{chromatic:{delay:300}}},h={render:()=>n({columnCount:9}),parameters:{chromatic:{delay:300}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    columnCount: 2
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...s.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    columnCount: 3
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...m.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    columnCount: 1
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...l.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    columnCount: 4
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...u.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    columnCount: 5
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    columnCount: 6
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...p.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    columnCount: 7
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...i.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    columnCount: 8
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...C.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    columnCount: 9
  }),
  parameters: {
    chromatic: {
      delay: 300
    }
  }
}`,...h.parameters?.docs?.source}}};const f=["TwoColumns","ThreeColumns","OneColumn","FourColumns","FiveColumns","SixColumns","SevenColumns","EightColumns","NineColumns"];export{C as EightColumns,d as FiveColumns,u as FourColumns,h as NineColumns,l as OneColumn,i as SevenColumns,p as SixColumns,m as ThreeColumns,s as TwoColumns,f as __namedExportsOrder,v as default};
