import{k as C,l as w,m as U,n as O} from"./chunk-a24c0c94b52b5aa0.js";function F(z){return z[B]}function H(z,X){if(F(z))return z;return z[Q]=X===void 0?[]:X,new Proxy(z,{get(q,Y){if(Y===B)return!0;if(Y===E)return q;const L=String(Y),S=q[Y];if(S instanceof Function){if(["clear","pop","reverse","shift","sort"].includes(L))return function(){const K=S.call(q);if(K!==void 0)for(let P=0;P<q[Q].length;P++)q[Q][P](new $(q,L,K));return K};if(L==="delete")return function(K){const P=q instanceof Map?q.get(K):K,W=S.call(q,K);if(W)for(let Z=0;Z<q[Q].length;Z++)q[Q][Z](new $(q,L,q instanceof Map?P:K));return W};if(L==="set")return function(K,P){const W=S.call(q,K,P);for(let Z=0;Z<q[Q].length;Z++)q[Q][Z](new $(q,K,P));return W};if(["add","push","splice","unshift"].includes(L))return function(...K){const P=S.apply(q,K);for(let W=0;W<q[Q].length;W++)q[Q][W](new $(q,L,L==="splice"?P:K.length===1?K[0]:K));return P};if(L.startsWith("set"))return function(K){const P=S.call(q,K);for(let W=0;W<q[Q].length;W++)q[Q][W](new $(q,L,K));return P};return function(...K){return S.apply(q,K)}}return S},set(q,Y,L){q[Y]=L;for(let S=0;S<q[Q].length;S++)q[Q][S](new $(q,String(Y),L));return!0}})}var Q=Symbol.for("__reactions"),B=Symbol.for("__isReactive"),E=Symbol.for("__getTarget");class ${target;prop;value;constructor(z,X,q){this.target=z,this.prop=X,this.value=q}}class G{id;masterPwd;encPwd;accounts;static from(z){return U(z,this.prototype,this.MAPPINGS_FROM_USER)}static toUser(z){return U(z,C.prototype,this.MAPPINGS_TO_USER)}static MAPPINGS_FROM_USER=[new w("masterPwd",(z)=>Array.from(z)),new w("encPwd",(z)=>Array.from(z)),new w("accounts",(z)=>z.map((X)=>O.from(X)))];static MAPPINGS_TO_USER=[new w("masterPwd",(z)=>new Uint8Array(z)),new w("encPwd",(z)=>new Uint8Array(z)),new w("accounts",(z)=>z.map((X)=>O.toAccount(X)))]}
export{H as d,G as e};