(this["webpackJsonpgsi-button-config"]=this["webpackJsonpgsi-button-config"]||[]).push([[0],{23:function(t,o,n){},26:function(t,o,n){"use strict";n.r(o);var e=n(0),r=n(1),s=n.n(r),c=n(13),u=n.n(c),i=(n(23),n(17)),b=n(4),a=n(5),l=n(6),j=n(9),x=n(8),h=n(2),O=n(3);function d(){var t=Object(h.a)(["\n    position: absolute;\n    top: ","px;\n    left: ","px;\n"]);return d=function(){return t},t}var f=O.a.div(d(),(function(t){return t.y}),(function(t){return t.x})),y=function(t){Object(j.a)(n,t);var o=Object(x.a)(n);function n(){var t;Object(b.a)(this,n);for(var e=arguments.length,r=new Array(e),s=0;s<e;s++)r[s]=arguments[s];return(t=o.call.apply(o,[this].concat(r))).state={},t}return Object(a.a)(n,[{key:"render",value:function(){return Object(e.jsxs)(f,{x:this.props.x,y:this.props.y,children:[Object(e.jsx)("img",{src:"./images/buttons/btn-".concat(this.props.color,"-").concat(this.props.side,".png"),alt:"button"}),Object(e.jsx)("img",{src:"./images/button-test.svg",alt:"button"})]})}}]),n}(r.Component),v=function(t){var o=t.setButtonColor,n=t.number,r=t.color;return Object(e.jsxs)("select",{value:r,onChange:function(t){o(n,t.target.value)},children:[Object(e.jsx)("option",{value:"Red",children:"Red"}),Object(e.jsx)("option",{value:"Green",children:"Green"}),Object(e.jsx)("option",{value:"Blue",children:"Blue"}),Object(e.jsx)("option",{value:"Black",children:"Black"}),Object(e.jsx)("option",{value:"Yellow",children:"Yellow"})]})};function p(){var t=Object(h.a)(["\n\n"]);return p=function(){return t},t}function C(){var t=Object(h.a)(["\n\n"]);return C=function(){return t},t}function g(){var t=Object(h.a)(["\n\n"]);return g=function(){return t},t}function m(){var t=Object(h.a)(["\n  position: relative;\n"]);return m=function(){return t},t}function B(){var t=Object(h.a)(["\n  position: relative;\n"]);return B=function(){return t},t}var k=O.a.div(B()),S=O.a.div(m()),w=O.a.div(g()),F=O.a.div(C()),A=O.a.div(p()),G={button1:{x:123,y:24},button2:{x:232,y:121},button3:{x:203,y:203},button4:{x:225,y:285},button5:{x:254,y:366}},I={button1:{x:772,y:24},button2:{x:663,y:121},button3:{x:691,y:203},button4:{x:668,y:285},button5:{x:637,y:366}},J=function(t){Object(j.a)(n,t);var o=Object(x.a)(n);function n(t){var e;return Object(b.a)(this,n),(e=o.call(this,t)).state={buttonColors:["Black","Black","Black","Black","Black"],monochrome:!1},e.setButtonColor=e.setButtonColor.bind(Object(l.a)(e)),e}return Object(a.a)(n,[{key:"setButtonColor",value:function(t,o){if(0!==t){var n=Object(i.a)(this.state.buttonColors);n[t-1]=o,this.setState({buttonColors:n})}else this.setState({buttonColors:[o,o,o,o,o]})}},{key:"render",value:function(){var t=this;return Object(e.jsxs)(S,{children:[Object(e.jsx)("label",{children:"All one color:"}),Object(e.jsx)("input",{name:"monochrome",type:"checkbox",check:this.state.monochrome.toString(),onChange:function(o){t.setState({monochrome:o.target.checked}),o.target.checked&&t.setButtonColor(0,"Black")}}),this.state.monochrome?Object(e.jsx)(v,{setButtonColor:this.setButtonColor,number:0,color:this.state.buttonColors[0]}):Object(e.jsx)(A,{children:this.state.buttonColors.map((function(o,n){return Object(e.jsx)(v,{setButtonColor:t.setButtonColor,number:n+1,color:o},n)}))}),Object(e.jsxs)(k,{children:[Object(e.jsx)("img",{src:"./images/fpe-trans-buttons-blank.png",alt:"button base"}),Object(e.jsxs)(w,{children:[Object(e.jsx)(y,{x:G.button1.x,y:G.button1.y,color:this.state.buttonColors[0],side:"left"}),Object(e.jsx)(y,{x:G.button2.x,y:G.button2.y,color:this.state.buttonColors[1],side:"left"}),Object(e.jsx)(y,{x:G.button3.x,y:G.button3.y,color:this.state.buttonColors[2],side:"left"}),Object(e.jsx)(y,{x:G.button4.x,y:G.button4.y,color:this.state.buttonColors[3],side:"left"}),Object(e.jsx)(y,{x:G.button5.x,y:G.button5.y,color:this.state.buttonColors[4],side:"left"})]}),Object(e.jsxs)(F,{children:[Object(e.jsx)(y,{x:I.button1.x,y:I.button1.y,color:this.state.buttonColors[0],side:"right"}),Object(e.jsx)(y,{x:I.button2.x,y:I.button2.y,color:this.state.buttonColors[1],side:"right"}),Object(e.jsx)(y,{x:I.button3.x,y:I.button3.y,color:this.state.buttonColors[2],side:"right"}),Object(e.jsx)(y,{x:I.button4.x,y:I.button4.y,color:this.state.buttonColors[3],side:"right"}),Object(e.jsx)(y,{x:I.button5.x,y:I.button5.y,color:this.state.buttonColors[4],side:"right"})]})]})]})}}]),n}(r.Component),L=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,27)).then((function(o){var n=o.getCLS,e=o.getFID,r=o.getFCP,s=o.getLCP,c=o.getTTFB;n(t),e(t),r(t),s(t),c(t)}))};u.a.render(Object(e.jsx)(s.a.StrictMode,{children:Object(e.jsx)(J,{})}),document.getElementById("root")),L()}},[[26,1,2]]]);
//# sourceMappingURL=main.071294bd.chunk.js.map