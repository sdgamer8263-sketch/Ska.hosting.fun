const c=document.getElementById("particles");
const x=c.getContext("2d");
function resize(){c.width=innerWidth;c.height=innerHeight}
onresize=resize;resize();

let p=[];
for(let i=0;i<120;i++){
p.push({x:Math.random()*c.width,y:Math.random()*c.height,s:Math.random()*1.5+0.5,h:Math.random()*360});
}

(function draw(){
x.clearRect(0,0,c.width,c.height);
p.forEach(o=>{
o.y+=o.s;
o.h+=1;
if(o.y>c.height)o.y=0;
x.fillStyle=`hsl(${o.h},100%,60%)`;
x.fillRect(o.x,o.y,2,2);
});
requestAnimationFrame(draw);
})();
