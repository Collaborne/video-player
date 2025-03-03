import{a as I,g as M}from"./test-utils-BFSCaS9q.js";import{J as x,K as A}from"./with-player-theme-CBkyMqVj.js";function L(p,i){for(var u=0;u<i.length;u++){const n=i[u];if(typeof n!="string"&&!Array.isArray(n)){for(const o in n)if(o!=="default"&&!(o in p)){const c=Object.getOwnPropertyDescriptor(n,o);c&&Object.defineProperty(p,o,c.get?c:{enumerable:!0,get:()=>n[o]})}}}return Object.freeze(Object.defineProperty(p,Symbol.toStringTag,{value:"Module"}))}var P,v;function N(){if(v)return P;v=1;var p=Object.create,i=Object.defineProperty,u=Object.getOwnPropertyDescriptor,n=Object.getOwnPropertyNames,o=Object.getPrototypeOf,c=Object.prototype.hasOwnProperty,O=(t,e,a)=>e in t?i(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,C=(t,e)=>{for(var a in e)i(t,a,{get:e[a],enumerable:!0})},b=(t,e,a,l)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of n(e))!c.call(t,r)&&r!==a&&i(t,r,{get:()=>e[r],enumerable:!(l=u(e,r))||l.enumerable});return t},k=(t,e,a)=>(a=t!=null?p(o(t)):{},b(!t||!t.__esModule?i(a,"default",{value:t,enumerable:!0}):a,t)),R=t=>b(i({},"__esModule",{value:!0}),t),s=(t,e,a)=>(O(t,typeof e!="symbol"?e+"":e,a),a),f={};C(f,{default:()=>h}),P=R(f);var m=k(I()),y=x(),g=A();const D="https://fast.wistia.com/assets/external/E-v1.js",E="Wistia",S="wistia-player-";class h extends m.Component{constructor(){super(...arguments),s(this,"callPlayer",y.callPlayer),s(this,"playerID",this.props.config.playerId||`${S}${(0,y.randomString)()}`),s(this,"onPlay",(...e)=>this.props.onPlay(...e)),s(this,"onPause",(...e)=>this.props.onPause(...e)),s(this,"onSeek",(...e)=>this.props.onSeek(...e)),s(this,"onEnded",(...e)=>this.props.onEnded(...e)),s(this,"onPlaybackRateChange",(...e)=>this.props.onPlaybackRateChange(...e)),s(this,"mute",()=>{this.callPlayer("mute")}),s(this,"unmute",()=>{this.callPlayer("unmute")})}componentDidMount(){this.props.onMount&&this.props.onMount(this)}load(e){const{playing:a,muted:l,controls:r,onReady:W,config:d,onError:j}=this.props;(0,y.getSDK)(D,E).then(q=>{d.customControls&&d.customControls.forEach(_=>q.defineControl(_)),window._wq=window._wq||[],window._wq.push({id:this.playerID,options:{autoPlay:a,silentAutoPlay:"allow",muted:l,controlsVisibleOnLoad:r,fullscreenButton:r,playbar:r,playbackRateControl:r,qualityControl:r,volumeControl:r,settingsControl:r,smallPlayButton:r,...d.options},onReady:_=>{this.player=_,this.unbind(),this.player.bind("play",this.onPlay),this.player.bind("pause",this.onPause),this.player.bind("seek",this.onSeek),this.player.bind("end",this.onEnded),this.player.bind("playbackratechange",this.onPlaybackRateChange),W()}})},j)}unbind(){this.player.unbind("play",this.onPlay),this.player.unbind("pause",this.onPause),this.player.unbind("seek",this.onSeek),this.player.unbind("end",this.onEnded),this.player.unbind("playbackratechange",this.onPlaybackRateChange)}play(){this.callPlayer("play")}pause(){this.callPlayer("pause")}stop(){this.unbind(),this.callPlayer("remove")}seekTo(e,a=!0){this.callPlayer("time",e),a||this.pause()}setVolume(e){this.callPlayer("volume",e)}setPlaybackRate(e){this.callPlayer("playbackRate",e)}getDuration(){return this.callPlayer("duration")}getCurrentTime(){return this.callPlayer("time")}getSecondsLoaded(){return null}render(){const{url:e}=this.props,a=e&&e.match(g.MATCH_URL_WISTIA)[1],l=`wistia_embed wistia_async_${a}`,r={width:"100%",height:"100%"};return m.default.createElement("div",{id:this.playerID,key:a,className:l,style:r})}}return s(h,"displayName","Wistia"),s(h,"canPlay",g.canPlay.wistia),s(h,"loopOnEnded",!0),P}var w=N();const T=M(w),B=L({__proto__:null,default:T},[w]);export{B as W};
