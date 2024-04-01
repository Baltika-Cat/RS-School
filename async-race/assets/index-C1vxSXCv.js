var L=Object.defineProperty;var y=(n,t,e)=>t in n?L(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var a=(n,t,e)=>(y(n,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const h of i.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();function o(n,t,e){const r=document.createElement("div");return r.classList.add(n),t&&t.append(r),e&&(r.textContent=e),r}function W(n,t=document.body){const e=document.createElement("header");return e.classList.add(n),t.prepend(e),e}function E(n,t=document.body){const e=document.createElement("main");return e.classList.add(n),t.append(e),e}function f(n,t,e,r){const s=document.createElement("object");return s.classList.add(n),s.type="image/svg+xml",s.data=t,s.onload=function(){var h,g;(g=(h=s.getSVGDocument())==null?void 0:h.getElementById("car-svg"))==null||g.setAttribute("fill",e)},r&&r.append(s),s}function m(n,t,e){const r=document.createElement("input");return r.type=t,r.classList.add(n),e.append(r),r}function p(n,t,e){const r=document.createElement(n);t instanceof HTMLObjectElement?r.append(t):r.textContent=t.toString(),e.append(r)}function A(n,t){const e=document.createElement("table");e.classList.add(n);const r=document.createElement("thead"),s=document.createElement("tr");return p("th","Number",s),p("th","Car",s),p("th","Name",s),p("th","Wins",s),p("th","Best time",s),r.append(s),e.append(r),t.append(e),e}function $(n,t){const e=document.createElement("tr");e.classList.add("winners-row");const r=t.children.length-1;return p("td",r,e),p("td",n.car,e),p("td",n.name,e),p("td",n.wins,e),p("td",n.time,e),t.append(e),e}class S{constructor(){a(this,"baseUrl","http://127.0.0.1:3000");a(this,"abortController",new AbortController);a(this,"path",{garage:"/garage",winners:"/winners",engine:"/engine"});a(this,"carsOnPage","&_limit=7");a(this,"winnersOnPage","&_limit=10");a(this,"getCars",async t=>{const e=await fetch(`${this.baseUrl}${this.path.garage}/?_page=${t}${this.carsOnPage}`),r=await e.json(),s=Number(e.headers.get("X-Total-Count"));return{cars:r,carsNumber:s}});a(this,"getCar",async t=>await(await fetch(`${this.baseUrl}${this.path.garage}/${t}`)).json());a(this,"createCar",async t=>await(await fetch(`${this.baseUrl}${this.path.garage}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).json());a(this,"updateCarParam",async(t,e)=>await(await fetch(`${this.baseUrl}${this.path.garage}/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json());a(this,"deleteCar",async t=>await(await fetch(`${this.baseUrl}${this.path.garage}/${t}`,{method:"DELETE"})).json());a(this,"setEngineStatus",async(t,e)=>await(await fetch(`${this.baseUrl}${this.path.engine}/?id=${t}&status=${e}`,{method:"PATCH"})).json());a(this,"getResponseStatus",async(t,e="drive")=>(await fetch(`${this.baseUrl}${this.path.engine}/?id=${t}&status=${e}`,{method:"PATCH",signal:this.abortController.signal})).status);a(this,"getWinners",async t=>{const e=await fetch(`${this.baseUrl}${this.path.winners}/?_page=${t}${this.winnersOnPage}`),r=await e.json(),s=Number(e.headers.get("X-Total-Count"));return{winners:r,winnersNumber:s}});a(this,"getWinner",async t=>{const e=await fetch(`${this.baseUrl}${this.path.winners}/${t}`).catch(()=>new Response);let r;return e.ok?r=await e.json():r=void 0,r});a(this,"createWinner",async t=>await(await fetch(`${this.baseUrl}${this.path.winners}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).json());a(this,"updateWinner",async(t,e)=>await(await fetch(`${this.baseUrl}${this.path.winners}/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json());a(this,"deleteWinner",async t=>await(await fetch(`${this.baseUrl}${this.path.winners}/${t}`,{method:"DELETE"})).json())}}const d=new S;function P(){const n=Math.round(Math.random()*255).toString(16).padStart(2,"0"),t=Math.round(Math.random()*255).toString(16).padStart(2,"0"),e=Math.round(Math.random()*255).toString(16).padStart(2,"0");return`#${n}${t}${e}`}const b={brands:["Audi","BMW","Chevrolet","Dodge","Ford","Hyundai","Kia","Lada","Mazda","Mercedes","Mitsubishi","Renault","Volkswagen"],models:["A6","TT","Q7","X3","X5","X6","Charger","Challenger","Viper","Camaro","Corvette","Impala","Focus","Kuga","Mustang","Creta","Solaris","Sonata","Ceed","Rio","Soul","Granta","Largus","Priora","CX-8","CX-9","MX-5","AMG SL","AMG One","S-Class","Eclipse","Lancer","Outlender","Arkana","Logan","Megan","Polo","Tiguan","Touareg"]};function B(n){const{left:t}=n.getBoundingClientRect();return t}const N="/baltika-cat-JSFE2023Q4/async-race/assets/car-l3mlM_aI.svg",c=class c{constructor(t,e,r){a(this,"track");a(this,"car");a(this,"carController");a(this,"startButton");a(this,"stopButton");a(this,"selectButton");a(this,"deleteButton");a(this,"carName");a(this,"resetButton");a(this,"updateCarArea");if(this.track=o("track",e),this.carController=o("car-controller",this.track),this.startButton=o("start-button",this.carController,"Start"),this.stopButton=o("stop-button",this.carController,"Stop"),this.stopButton.classList.add("disabled"),this.selectButton=o("select-button",this.carController,"Select"),this.deleteButton=o("delete-button",this.carController,"Delete"),this.resetButton=t.resetButton,this.updateCarArea=t.updateCarArea,c.winMessage.classList.add("invisible"),r)this.car=r,this.car.carView=f("svg",N,this.car.color,this.track);else{const s=P();this.car={name:c.randomCarName(),color:s,carView:f("svg",N,s,this.track)}}this.car.id&&this.track.setAttribute("id",this.car.id.toString()),this.carName=o("car-name",this.carController,this.car.name),this.startButton.addEventListener("click",()=>{this.start()}),this.stopButton.addEventListener("click",()=>{this.returnCar()}),this.selectButton.addEventListener("click",s=>{c.activeSelectButton&&c.activeSelectButton!==s.target&&(c.activeSelectButton.classList.remove("button-active"),this.updateCarArea.classList.add("disabled")),this.selectButton.classList.toggle("button-active"),this.updateCarArea.classList.toggle("disabled"),c.activeSelectButton=this.selectButton;const i=t;this.selectButton.classList.contains("button-active")?(i.update.name.value=this.car.name,i.update.color.value=this.car.color,c.selectedCar=this):(i.update.name.value="",i.update.color.value="#000000")}),c.winner=this.car}static randomCarName(){const t=Math.floor(Math.random()*b.brands.length),e=b.brands[t],r=Math.floor(Math.random()*b.models.length),s=b.models[r];return`${e} ${s}`}async start(){this.resetButton.classList.add("disabled");let t;await d.setEngineStatus(this.car.id,"started").then(e=>{const{velocity:r,distance:s}=e;t=s/r,this.car.carView&&(this.car.carView.style.transition=`${t}ms linear`,this.car.carView.style.transform=`translateX(${this.track.clientWidth-this.car.carView.clientWidth}px)`)}),this.startButton.classList.add("disabled"),this.stopButton.classList.remove("disabled"),await d.getResponseStatus(this.car.id,"drive").then(e=>{e===500&&this.stop(),e===200&&(this.resetButton.classList.remove("disabled"),c.winner||this.showWinner(t,this.car))})}showWinner(t,e){const s=parseFloat((t/1e3).toFixed(2));this.startButton.classList.remove("disabled"),c.winner=e,c.winner.id&&d.getWinner(c.winner.id).then(i=>{var g;const h=(g=c.winner)==null?void 0:g.id;if(i){const C=s<i.time?s:i.time,v=i.wins+1;h&&d.updateWinner(h,{id:h,wins:v,time:C})}else{const C=s;h&&d.createWinner({id:h,wins:1,time:C})}}),c.winMessage.textContent=`${c.winner.name} went first! (${s}s)`,c.winMessage.classList.remove("invisible")}stop(){if(this.car.carView){const t=B(this.car.carView),e=B(this.track);this.car.carView.style.transition="0s",this.car.carView.style.transform=`translateX(${t-e}px)`}}async returnCar(){await d.setEngineStatus(this.car.id,"stopped"),this.stopButton.classList.add("disabled"),this.startButton.classList.remove("disabled"),this.car.carView&&(this.car.carView.style.transition="0s",this.car.carView.style.transform="translateX(0)")}};a(c,"selectedCar"),a(c,"activeSelectButton"),a(c,"winner"),a(c,"winnerTime"),a(c,"winMessage",o("win-message",document.body));let u=c;class M{constructor(t){a(this,"controllerWrapper",o("controller-wrapper"));a(this,"createCarArea",o("create-car-area",this.controllerWrapper));a(this,"createCarInput",m("input","text",this.createCarArea));a(this,"createCarColor",m("input-color","color",this.createCarArea));a(this,"createCarButton",o("button",this.createCarArea,"CREATE"));a(this,"updateCarArea",o("update-car-area",this.controllerWrapper));a(this,"updateCarInput",m("input","text",this.updateCarArea));a(this,"updateCarColor",m("input-color","color",this.updateCarArea));a(this,"updateCarButton",o("button",this.updateCarArea,"UPDATE"));a(this,"racingArea",o("racing-area",this.controllerWrapper));a(this,"raceButton",o("button",this.racingArea,"RACE"));a(this,"resetButton",o("button",this.racingArea,"RESET"));a(this,"generateCarsButton",o("button",this.racingArea,"GENERATE CARS"));a(this,"create",{name:this.createCarInput,color:this.createCarColor,button:this.createCarButton});a(this,"update",{name:this.updateCarInput,color:this.updateCarColor,button:this.updateCarButton});t.append(this.controllerWrapper),this.updateCarArea.classList.add("disabled")}}const l=class l{constructor(){a(this,"pageNumber",1);a(this,"garageWrapper",o("garage-wrapper"));a(this,"carsWrapper",o("cars-wrapper"));a(this,"controller",new M(this.garageWrapper));a(this,"carsNumberWrapper",o("cars-number",this.garageWrapper));a(this,"carsNumber",0);a(this,"createCarButton",this.controller.create.button);a(this,"updateCarButton",this.controller.update.button);a(this,"pageNavigation",o("page-navigation"));a(this,"prevButton",o("page-navigation-button",this.pageNavigation,"PREV"));a(this,"nextButton",o("page-navigation-button",this.pageNavigation,"NEXT"));a(this,"clickedDeleteButton");a(this,"carID");a(this,"trackElement");this.carID=0,this.updateCarButton.addEventListener("click",()=>{var s,i,h;const t=this.controller.update.color.value,{id:e}=u.selectedCar.car,r=this.controller.update.name.value;e&&(d.updateCarParam(e,{name:r,color:t}),(h=(i=(s=u.selectedCar.car.carView)==null?void 0:s.getSVGDocument())==null?void 0:i.getElementById("car-svg"))==null||h.setAttribute("fill",t),u.selectedCar.carName.textContent=r)}),this.createCarButton.addEventListener("click",()=>{const t=this.controller.create.color.value,r={name:this.controller.create.name.value,color:t};d.createCar(r).then(i=>{if(l.carsArray.length<l.carsOnPage){const h=new u(this.controller,this.carsWrapper,i);l.carsArray.push(h)}this.carsNumber+=1,this.carsNumberWrapper.textContent=`Garage(${this.carsNumber})`})}),this.controller.generateCarsButton.addEventListener("click",()=>{this.renderCars()}),this.controller.raceButton.addEventListener("click",()=>{document.querySelectorAll(".app-button")[1].classList.add("disabled"),this.controller.raceButton.classList.add("disabled"),u.winner=void 0,u.winnerTime=0;const e=l.carsArray.length>l.carsOnPage?l.carsOnPage:l.carsArray.length;for(let r=0;r<e;r+=1)l.carsArray[r].start()}),this.controller.resetButton.addEventListener("click",()=>{const t=document.querySelectorAll(".app-button")[1];console.log(t),t.classList.remove("disabled"),this.controller.raceButton.classList.remove("disabled"),u.winMessage.classList.add("invisible"),l.carsArray.forEach(e=>{d.abortController.abort("Stop race"),e.returnCar(),e.stopButton.classList.add("disabled"),e.startButton.classList.remove("disabled")}),d.abortController=new AbortController}),this.carsWrapper.addEventListener("click",t=>{const{target:e}=t;e instanceof HTMLDivElement&&this.deleteCar(e)}),this.prevButton.addEventListener("click",()=>{this.controller.raceButton.classList.remove("disabled"),document.querySelectorAll(".app-button")[1].classList.remove("disabled"),this.carsWrapper.innerHTML="",this.prevPage()}),this.nextButton.addEventListener("click",()=>{this.controller.raceButton.classList.remove("disabled");const t=document.querySelectorAll(".app-button")[1];console.log(t),t.classList.remove("disabled"),this.carsWrapper.innerHTML="",this.nextPage()})}deleteCar(t){t.classList.contains("delete-button")&&(this.clickedDeleteButton=t,this.trackElement=t.closest(".track"),this.carsWrapper&&this.trackElement&&(this.carID=Number(this.trackElement.getAttribute("id")),d.deleteWinner(this.carID),d.deleteCar(this.carID),this.carsWrapper.removeChild(this.trackElement),d.getCars(this.pageNumber).then(e=>{this.carsNumber=e.carsNumber,this.carsNumberWrapper.textContent=`Garage(${this.carsNumber})`})))}async renderCars(){for(let e=1;e<=100;e+=1)d.createCar(new u(this.controller).car);await d.getCars(this.pageNumber).then(e=>{this.carsWrapper.innerHTML="";const{cars:r}=e;l.carsArray.length=0,r.forEach(s=>{const i=new u(this.controller,this.carsWrapper,s);l.carsArray.push(i)}),this.nextButton.classList.remove("disabled"),this.garageWrapper.append(this.carsWrapper),this.carsNumber=e.carsNumber,this.carsNumberWrapper.textContent=`Garage(${this.carsNumber})`})}prevPage(){this.nextButton.classList.remove("disabled"),l.carsArray.length=0,this.pageNumber-=1,this.pageNumber===1&&this.prevButton.classList.add("disabled"),d.getCars(this.pageNumber).then(t=>{t.cars.forEach(e=>{const r=new u(this.controller,this.carsWrapper,e);l.carsArray.push(r)})})}nextPage(){this.prevButton.classList.remove("disabled"),l.carsArray.length=0;const t=Math.ceil(this.carsNumber/l.carsOnPage);this.pageNumber+=1,this.pageNumber===t&&this.nextButton.classList.add("disabled"),d.getCars(this.pageNumber).then(e=>{e.cars.forEach(r=>{const s=new u(this.controller,this.carsWrapper,r);l.carsArray.push(s)})})}getGarage(){return this.carsWrapper.children.length||(d.getCars(this.pageNumber).then(t=>{t.cars.map((e,r)=>{const s=new u(this.controller,this.carsWrapper,e);if(l.carsArray.push(s),r===t.cars.length-1){this.carsNumber=t.carsNumber,this.carsNumberWrapper.textContent=`Garage(${this.carsNumber})`;const i=Math.ceil(this.carsNumber/l.carsOnPage);this.pageNumber===i&&this.nextButton.classList.add("disabled")}return s})}),this.pageNumber===1&&this.prevButton.classList.add("disabled"),this.garageWrapper.append(this.carsWrapper),this.garageWrapper.append(this.pageNavigation)),this.garageWrapper}};a(l,"carsArray",[]),a(l,"carsOnPage",7);let w=l;const T="/baltika-cat-JSFE2023Q4/async-race/assets/car-winner-DFJpWTXS.svg";class x{constructor(){a(this,"winnersOnPage",10);a(this,"pageNumber",1);a(this,"winnersWrapper",o("winners-wrapper"));a(this,"winnersNumber",0);a(this,"winnersNumberWrapper",o("cars-number",this.winnersWrapper));a(this,"table",A("table",this.winnersWrapper));a(this,"tableHead",this.table.firstChild);a(this,"pageNavigation",o("page-navigation"));a(this,"prevButton",o("page-navigation-button",this.pageNavigation,"PREV"));a(this,"nextButton",o("page-navigation-button",this.pageNavigation,"NEXT"));this.prevButton.addEventListener("click",()=>{this.table.innerHTML="",this.tableHead instanceof Node&&this.table.append(this.tableHead),this.prevPage()}),this.nextButton.addEventListener("click",()=>{this.table.innerHTML="",this.tableHead instanceof Node&&this.table.append(this.tableHead),this.nextPage()})}prevPage(){this.nextButton.classList.remove("disabled"),this.pageNumber-=1,this.pageNumber===1&&this.prevButton.classList.add("disabled"),this.renderWinners()}nextPage(){this.prevButton.classList.remove("disabled");const t=Math.ceil(this.winnersNumber/this.winnersOnPage);this.pageNumber+=1,this.pageNumber===t&&this.nextButton.classList.add("disabled"),this.renderWinners()}renderWinners(){return this.pageNumber===1&&this.prevButton.classList.add("disabled"),d.getWinners(this.pageNumber).then(t=>{this.winnersNumber=t.winnersNumber,this.winnersNumberWrapper.textContent=`Winners(${this.winnersNumber})`,t.winners.map(r=>{d.getCar(r.id).then(s=>{const i={car:f("svg",T,s.color),name:s.name,wins:r.wins,time:r.time};$(i,this.table)})});const e=Math.ceil(this.winnersNumber/this.winnersOnPage);this.pageNumber===e?this.nextButton.classList.add("disabled"):this.nextButton.classList.remove("disabled"),this.winnersWrapper.append(this.table),this.table.append(this.pageNavigation)}),this.winnersWrapper}}class O{constructor(){a(this,"garage",new w);a(this,"winners",new x);a(this,"header",W("header"));a(this,"main",E("main"));a(this,"buttonsArea",o("buttons-area",this.header));a(this,"toGarageButton",o("app-button",this.buttonsArea,"TO GARAGE"));a(this,"toWinnersButton",o("app-button",this.buttonsArea,"TO WINNERS"));this.toGarageButton.classList.add("disabled"),this.toGarageButton.addEventListener("click",()=>{this.toGarage(),this.toGarageButton.classList.add("disabled"),this.toWinnersButton.classList.remove("disabled")}),this.toWinnersButton.addEventListener("click",()=>{this.toWinners(),this.toGarageButton.classList.remove("disabled"),this.toWinnersButton.classList.add("disabled")})}clearPage(){[...document.querySelectorAll(".cars-wrapper")].forEach(r=>{const s=r;return s.innerHTML="",r}),[...document.querySelectorAll(".winners-row")].forEach(r=>(r.remove(),r)),this.main.innerHTML="",w.carsArray.length=0}toGarage(){this.clearPage(),this.main.append(this.garage.getGarage())}toWinners(){this.clearPage(),this.main.append(this.winners.renderWinners())}}const k=new O;k.toGarage();
