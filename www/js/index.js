var Q=function(){A.fillStyle="#AAA",A.fillRect(0,0,O,P)},N=function(m,q,B,F,D){const L=m*B,M=q*B;if(A.lineWidth=1,D)A.fillStyle=D,A.fillRect(L,M,B-1,B-1);A.strokeStyle=F,A.strokeRect(L,M,B,B)};var R=function(){for(let m=0;m<9;m++)for(let q=0;q<9;q++)N(m,q,E,"#777","#E5E5E5"),T(m,q);for(let m=0;m<3;m++)for(let q=0;q<3;q++)N(m,q,E*3,"#000")},H=new WebSocket(`ws://${location.host}`);H.onopen=()=>setInterval(()=>H.send("ping"),5000);H.onmessage=(m)=>{if(console.log(m.data),m.data==="reload")location.reload()};var K=document.getElementById("sudokuCanvas"),A=K.getContext("2d"),O=K.width,P=K.height,E=Math.round(Math.min(O,P)/9),T=(m,q)=>{const B=m*E,F=q*E;A.font="15px Arial",A.fillStyle="#000",A.textAlign="center",A.textBaseline="middle";for(let D=0;D<9;D++)A.fillText((D+1).toString(),B+E/6+D%3*E/3,F+E/6+Math.floor(D/3)*E/3)};Q();R();console.log("Front update");
