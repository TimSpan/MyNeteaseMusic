"use strict";(self["webpackChunknetease_music"]=self["webpackChunknetease_music"]||[]).push([[821],{3821:function(e,a,t){t.r(a),t.d(a,{default:function(){return V}});var n=t(641),s=t(33);const l={class:"search"},c={class:"search-input-wrapper"},r={class:"search-content"},u={class:"hot-keys"};function i(e,a,t,i,o,d){const h=(0,n.g2)("search-input");return(0,n.uX)(),(0,n.CE)("div",l,[(0,n.Lk)("div",c,[(0,n.bF)(h,{modelValue:e.query,"onUpdate:modelValue":a[0]||(a[0]=a=>e.query=a)},null,8,["modelValue"])]),(0,n.Lk)("div",r,[(0,n.Lk)("div",null,[(0,n.Lk)("div",u,[a[1]||(a[1]=(0,n.Lk)("h1",{class:"title"},"热门搜索",-1)),(0,n.Lk)("ul",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(e.hotKeys,(e=>((0,n.uX)(),(0,n.CE)("li",{class:"item",key:e.id},[(0,n.Lk)("span",null,(0,s.v_)(e.key),1)])))),128))])]),a[2]||(a[2]=(0,n.Fv)('<div class="search-history" data-v-06907c52><h1 class="title" data-v-06907c52><span class="text" data-v-06907c52>搜索历史</span><span class="clear" data-v-06907c52><i class="icon-clear" data-v-06907c52></i></span></h1></div>',1))])]),a[3]||(a[3]=(0,n.Lk)("div",{class:"search-result"},null,-1))])}var o=t(3751);const d={class:"search-input"},h=["placeholder"];function p(e,a,t,s,l,c){return(0,n.uX)(),(0,n.CE)("div",d,[a[2]||(a[2]=(0,n.Lk)("i",{class:"icon-search"},null,-1)),(0,n.bo)((0,n.Lk)("input",{class:"input-inner","onUpdate:modelValue":a[0]||(a[0]=e=>l.query=e),placeholder:t.placeholder},null,8,h),[[o.Jo,l.query]]),(0,n.bo)((0,n.Lk)("i",{class:"icon-dismiss",onClick:a[1]||(a[1]=(...e)=>c.clear&&c.clear(...e))},null,512),[[o.aG,l.query]])])}function v(e,a,t,n){var s,l=!1,c=0;function r(){s&&clearTimeout(s)}function u(){r(),l=!0}function i(){for(var u=arguments.length,i=new Array(u),o=0;o<u;o++)i[o]=arguments[o];var d=this,h=Date.now()-c;function p(){c=Date.now(),t.apply(d,i)}function v(){s=void 0}l||(n&&!s&&p(),r(),void 0===n&&h>e?p():!0!==a&&(s=setTimeout(n?v:p,void 0===n?e-h:e)))}return"boolean"!==typeof a&&(n=t,t=a,a=void 0),i.cancel=u,i}function k(e,a,t){return void 0===t?v(e,a,!1):v(e,t,!1!==a)}var m={name:"search-input",props:{modelValue:String,placeholder:{type:String,default:"搜索歌曲、歌手"}},data(){return{query:this.modelValue}},created(){this.$watch("query",k(300,(e=>{this.$emit("update:modelValue",e.trim())}))),this.$watch("modelValue",(e=>{this.query=e}))},methods:{clear(){this.query=""}}},f=t(6262);const y=(0,f.A)(m,[["render",p],["__scopeId","data-v-1678f400"]]);var L=y,q={components:{SearchInput:L}};const w=(0,f.A)(q,[["render",i],["__scopeId","data-v-06907c52"]]);var V=w}}]);
//# sourceMappingURL=821.f2ff4766.js.map