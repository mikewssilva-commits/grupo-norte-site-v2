(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const p of a.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&u(p)}).observe(document,{childList:!0,subtree:!0});function d(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function u(e){if(e.ep)return;e.ep=!0;const a=d(e);fetch(e.href,a)}})();function T(){const o=document.querySelector(".site-header"),i=document.querySelector(".mobile-menu-toggle"),d=document.querySelector(".mobile-nav-drawer"),u=document.querySelectorAll(".mobile-drawer-link, .btn-mobile-talk");if(document.querySelectorAll(".nav-institutional a"),!o)return;const e=()=>{window.scrollY>20?o.classList.add("is-scrolled"):o.classList.remove("is-scrolled")};if(window.addEventListener("scroll",e,{passive:!0}),e(),i&&d){const t=s=>{i.setAttribute("aria-expanded",s?"true":"false"),d.classList.toggle("is-open",s),d.setAttribute("aria-hidden",s?"false":"true"),document.body.style.overflow=s?"hidden":""};i.addEventListener("click",()=>{const s=d.classList.contains("is-open");t(!s)}),u.forEach(s=>{s.addEventListener("click",()=>t(!1))}),window.addEventListener("keydown",s=>{s.key==="Escape"&&d.classList.contains("is-open")&&(t(!1),i.focus())}),window.addEventListener("resize",()=>{window.innerWidth>960&&d.classList.contains("is-open")&&t(!1)})}const a=[{id:"solucoes",el:document.getElementById("solucoes")},{id:"projetos",el:document.getElementById("projetos")},{id:"grupo-norte",el:document.getElementById("grupo-norte")},{id:"contato",el:document.getElementById("contato")}].filter(t=>t.el!==null),p=document.getElementById("inicio"),g=document.querySelectorAll(".nav-institutional a, .mobile-drawer-link");let h;function m(t){t!==h&&(h=t,g.forEach(s=>{const l=s.getAttribute("href");t&&l===`#${t}`?(s.classList.add("active"),s.setAttribute("aria-current","page")):(s.classList.remove("active"),s.removeAttribute("aria-current"))}))}function f(){const t=window.scrollY,s=p?p.offsetHeight:600,l=Math.min(200,window.innerHeight*.28),v=a[0];if(v){const w=v.el.getBoundingClientRect();if(t<s*.5||w.top>l){m(null);return}}else if(t<s){m(null);return}if(window.innerHeight+t>=document.documentElement.scrollHeight-60){m("contato");return}let y=null;for(const w of a){const A=w.el.getBoundingClientRect();if(A.top<=l&&A.bottom>l){y=w.id;break}}m(y)}let n=null;function c(){n||(n=requestAnimationFrame(()=>{f(),n=null}))}window.addEventListener("scroll",c,{passive:!0}),window.addEventListener("resize",c,{passive:!0}),f()}const j=[{id:"via-br",name:"Via BR",logo:"/clients/via-br-clean.png",customClass:"logo-via-br",type:"wordmark",alt:"Via BR",category:"Logística & Transporte"},{id:"adbrindes",name:"ADBRINDES",logo:"/clients/ad-clean.png",customClass:"logo-adbrindes",type:"emblem",alt:"ADBRINDES",category:"Brindes & Comunicação Visual"},{id:"nickconsult",name:"NickConsult",logo:"/clients/nickconsult-clean.png",customClass:"logo-nickconsult",type:"emblem",alt:"NickConsult",category:"Turismo & Eventos"},{id:"vorren",name:"Vorren",logo:"/clients/vorren-clean.png",customClass:"logo-vorren",type:"wordmark",alt:"Vorren",category:"Moda & Varejo"},{id:"armacham",name:"ARMACHAM",logo:"/clients/armacham-clean.png",customClass:"logo-armacham",type:"compact",alt:"ARMACHAM",category:"Engenharia & Soluções"},{id:"camifio",name:"Camifio",logo:"/clients/camifio-clean.png",customClass:"logo-camifio",type:"emblem",alt:"Camifio",category:"Têxtil & Indústria"},{id:"tricell",name:"TRICELL",logo:"/clients/tricell-clean.png",customClass:"logo-tricell",type:"compact",alt:"TRICELL Inc., AFRICA",category:"Biotecnologia & Pesquisa"},{id:"eurocorp",name:"EUROCORP",logo:"/clients/eurocorp-clean.png",customClass:"logo-eurocorp",type:"emblem",alt:"EUROCORP",category:"Corporativo & Tecnologia"}];function $(){const o=document.querySelector(".clients-marquee-track");if(!o||!j||j.length===0)return;const i=(e,a=!1)=>`
    <div class="client-brand-slot slot-${e.type||"compact"}${a?" client-sequence-clone":""}">
      <img 
        src="${e.logo}" 
        alt="${e.alt||e.name}" 
        class="client-brand-logo ${e.customClass||""}"
        loading="lazy"
      >
    </div>
  `,d=j.map(e=>i(e,!1)).join(""),u=j.map(e=>i(e,!0)).join("");o.innerHTML=d+d+u+u}function B(){const o=document.querySelectorAll(".pillar-chapter-block"),i=document.querySelectorAll(".progress-step-btn"),d={1:document.querySelector(".step-fill.fill-1"),2:document.querySelector(".step-fill.fill-2"),3:document.querySelector(".step-fill.fill-3")};if(!o.length)return;const u=["dev","auto","crm","mkt"];function e(n){if(!n)return;o.forEach(t=>{t.dataset.serviceKey===n?(t.classList.add("active"),t.setAttribute("aria-current","true")):(t.classList.remove("active"),t.removeAttribute("aria-current"))}),i.forEach(t=>{t.dataset.target===n?t.classList.add("active"):t.classList.remove("active")});const c=u.indexOf(n);d[1]&&d[1].classList.toggle("filled",c>=1),d[2]&&d[2].classList.toggle("filled",c>=2),d[3]&&d[3].classList.toggle("filled",c>=3)}const a={root:null,rootMargin:"-15% 0px -40% 0px",threshold:.2},p=new IntersectionObserver(n=>{n.forEach(c=>{if(c.isIntersecting){const t=c.target.dataset.serviceKey;e(t)}})},a);o.forEach(n=>{p.observe(n),n.addEventListener("click",()=>{e(n.dataset.serviceKey)}),n.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),e(n.dataset.serviceKey))})}),i.forEach(n=>{n.addEventListener("click",()=>{const c=n.dataset.target;e(c);const t=document.getElementById(`pillar-${c}`);if(t){const v=t.getBoundingClientRect().top+window.pageYOffset-160;window.scrollTo({top:v,behavior:"smooth"})}})}),e("dev");const g=document.querySelector(".manifesto-office-img"),h=document.querySelector(".fio-condutor-glow"),m=document.querySelector(".manifesto-services-bridge");let f=!1;window.addEventListener("scroll",()=>{f||(window.requestAnimationFrame(()=>{if(g){const n=g.getBoundingClientRect(),c=window.innerHeight;if(n.top<c&&n.bottom>0){const t=Math.max(0,Math.min(1,(c-n.top)/(c+n.height))),s=1.04-t*.04,l=(t-.5)*-12;g.style.transform=`scale(${s}) translateY(${l}px)`}}if(m&&h){const n=m.getBoundingClientRect(),c=window.innerHeight;if(n.top<c&&n.bottom>0){const t=Math.max(0,Math.min(1,(c-n.top)/(c*.8)));h.style.transform=`translateY(${t*65}px)`,h.style.opacity=`${.3+t*.7}`}}f=!1}),f=!0)},{passive:!0})}const I=[{id:"digital-designer",title:"Digital Designer",category:"Landing Page / Portfólio",type:"Projeto Conceito",image:"/projects/lp-produto-designer.webp",fallbackImage:"/projects/lp-produto-designer.jpg",domain:"digitaldesigner.design",url:"https://digitaldesigner.design",hasScroll:!0},{id:"acelera-dividendos",title:"Acelera Dividendos",category:"Landing Page / Finanças",type:"Projeto Conceito",image:"/projects/lp-financas-dividendos.webp",fallbackImage:"/projects/lp-financas-dividendos.jpg",domain:"dividendos.com.br",url:"https://dividendos.com.br",hasScroll:!0},{id:"crossarena",title:"CrossArena Studio",category:"Landing Page / Fitness",type:"Projeto Conceito",image:"/projects/lp-fitness-crossarena.webp",fallbackImage:"/projects/lp-fitness-crossarena.jpg",domain:"crossarena.com",url:"https://crossarena.com",hasScroll:!0},{id:"semana-gain-10k",title:"Semana Gain 10k",category:"Landing Page / Finanças",type:"Projeto Conceito",image:"/projects/lp-financas-gain10k.webp",fallbackImage:"/projects/lp-financas-gain10k.jpg",domain:"semanagain10k.com.br",url:"https://semanagain10k.com.br",hasScroll:!0},{id:"attorney-law",title:"Attorney & Law Advocacia",category:"Landing Page / Jurídico",type:"Projeto Conceito",image:"/projects/lp-juridico-criminal.webp",fallbackImage:"/projects/lp-juridico-criminal.jpg",domain:"attorneylaw.adv.br",url:"https://attorneylaw.adv.br",hasScroll:!0},{id:"mentoria-criminal",title:"Mentoria Advogado Criminal",category:"Landing Page / Advocacia",type:"Projeto Conceito",image:"/projects/lp-juridico-mentoria.webp",fallbackImage:"/projects/lp-juridico-mentoria.jpg",domain:"joaoquintino.adv.br",url:"https://joaoquintino.adv.br",hasScroll:!0},{id:"posturologia",title:"Posturologia Clínica",category:"Landing Page / Saúde",type:"Projeto Conceito",image:"/projects/lp-saude-posturologia.webp",fallbackImage:"/projects/lp-saude-posturologia.jpg",domain:"posturologia.com.br",url:"https://posturologia.com.br",hasScroll:!0},{id:"assessoria-juridica",title:"Assessoria Jurídica",category:"Landing Page / Jurídico",type:"Projeto Conceito",image:"/projects/lp-juridico-empresarial.webp",fallbackImage:"/projects/lp-juridico-empresarial.jpg",domain:"assessoriajuridica.adv.br",url:"https://assessoriajuridica.adv.br",hasScroll:!0}],M={delivery:{user:"Como o Agente IA funciona para Delivery e Restaurantes?",ai:"Para restaurantes e delivery, o Agente IA envia o cardápio interativo, anota pedidos complexos com adicionais, calcula taxa de entrega pelo CEP e envia o pedido pronto para a cozinha! Reduz o tempo de espera a zero em horários de pico. 🍕🛵"},saude:{user:"Vocês têm solução para Clínicas e Consultórios médicos?",ai:"Com certeza! Nosso agente faz triagem prévia do paciente, consulta a agenda dos médicos em tempo real, confirma consultas por WhatsApp e envia lembretes automáticos — reduzindo o no-show (faltas) em até 70%! 🩺📅"},imobiliaria:{user:"Como funciona a qualificação para Imobiliárias e Corretores?",ai:"A IA atua como pré-atendimento 24/7: identifica se o cliente quer comprar ou alugar, filtra faixa de preço, número de quartos e localização, envia opções compatíveis e já agenda a visita na pauta do corretor! 🏢🔑"},servicos:{user:"E para Prestadores de Serviço e Escritórios de Advocacia?",ai:"Para serviços e advocacia, o Agente IA realiza acolhimento imediato em menos de 3 segundos, coleta dados preliminares essenciais do caso com sigilo e encaminha o lead qualificado diretamente para a equipe comercial fechar! ⚖️💼"}};function x(){const o=document.getElementById("projectsMarqueeTrack"),i=document.querySelector(".projects-marquee-viewport");if(!o||!i||!I||I.length===0)return;const d=(r,L)=>`
      <article 
        class="project-marquee-card" 
        data-project-id="${r.id}" 
        tabindex="0" 
        role="group" 
        aria-label="${r.title} — ${r.category}"
      >
        <!-- Moldura de Computador / Janela de Navegador -->
        <div class="project-frame">
          <!-- Barra Superior do Navegador -->
          <div class="project-frame-bar">
            <div class="project-frame-dots" aria-hidden="true">
              <span class="p-dot p-dot-close"></span>
              <span class="p-dot p-dot-min"></span>
              <span class="p-dot p-dot-max"></span>
            </div>
            
            <div class="project-frame-url">
              <svg class="url-lock-icon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span class="url-text">${r.domain}</span>
            </div>
          </div>

          <!-- Preview em Alta Fidelidade do Site -->
          <div class="project-preview-viewport ${r.hasScroll?"is-scrollable":""}">
            <div class="project-preview-canvas">
              <picture class="project-picture">
                <source srcset="${r.image}" type="image/webp">
                <img 
                  src="${r.fallbackImage}" 
                  alt="${r.title} — ${r.category}" 
                  class="project-preview-img"
                  loading="${L<2?"eager":"lazy"}"
                  decoding="async"
                  draggable="false"
                >
              </picture>
            </div>
          </div>

          <!-- Rodapé do Card com Título e Categoria -->
          <div class="project-card-footer">
            <div class="project-card-meta">
              <h4 class="project-card-title">${r.title}</h4>
              <span class="project-card-category">${r.category}</span>
            </div>
          </div>

        </div>
      </article>
    `,u=(r=!1)=>`
    <div class="projects-marquee-group" ${r?'aria-hidden="true"':""}>
      ${I.map((L,C)=>d(L,C)).join("")}
    </div>
  `;o.innerHTML=u(!1)+u(!0);let e=0,a=0,p=80,g=1,h=!1,m=!1,f=!1,n=0,c=0,t=0,s=0,l=0,v=null;const b=()=>{const r=o.querySelector(".projects-marquee-group");r&&(a=r.offsetWidth,a>0&&(p=a/48))};window.__refreshProjectsDimensions=b,b(),window.addEventListener("load",b);const y=o.querySelector(".projects-marquee-group");y&&"ResizeObserver"in window&&new ResizeObserver(()=>b()).observe(y);const w=r=>{if(!(r.button!==void 0&&r.button!==0)){h=!0,m=!1,f=!0,l=0,g=0,v&&(clearTimeout(v),v=null),n=r.clientX,c=e,t=r.clientX,s=performance.now(),i.classList.add("is-dragging");try{i.setPointerCapture(r.pointerId)}catch{}}},A=r=>{if(!h)return;const L=r.clientX-n;Math.abs(L)>5&&(m=!0),e=c+L;const C=performance.now(),q=C-s;if(q>0){const k=(r.clientX-t)/(q/16.67);l=l*.4+k*.6}t=r.clientX,s=C},E=r=>{if(h){h=!1,i.classList.remove("is-dragging");try{i.hasPointerCapture(r.pointerId)&&i.releasePointerCapture(r.pointerId)}catch{}l=Math.max(-28,Math.min(28,l)),clearTimeout(v),v=setTimeout(()=>{f=!1},2e3)}};i.addEventListener("click",r=>{m&&(r.preventDefault(),r.stopPropagation())},!0),i.addEventListener("pointerdown",w,{passive:!0}),i.addEventListener("pointermove",A,{passive:!0}),i.addEventListener("pointerup",E,{passive:!0}),i.addEventListener("pointercancel",E,{passive:!0}),i.addEventListener("focusin",()=>{f=!0}),i.addEventListener("focusout",()=>{f=!1});let S=performance.now();const P=r=>{const L=Math.min((r-S)/1e3,.1);if(S=r,!h&&(Math.abs(l)>.15?(e+=l*(L*60),l*=.93):l=0,!f)){g<1&&(g=Math.min(1,g+L*.7));const C=p*g;e-=C*L}if(a>0){for(;e<=-a;)e+=a;for(;e>0;)e-=a}o.style.transform=`translate3d(${e.toFixed(2)}px, 0, 0)`,requestAnimationFrame(P)};requestAnimationFrame(P)}function O(){const o=document.querySelectorAll(".projects-tab-btn"),i=document.querySelectorAll(".projects-tab-panel");!o.length||!i.length||o.forEach(d=>{d.addEventListener("click",()=>{const u=d.getAttribute("data-tab");o.forEach(e=>{const a=e===d;e.classList.toggle("active",a),e.setAttribute("aria-selected",a?"true":"false")}),i.forEach(e=>{const a=e.getAttribute("data-category");u==="all"||a===u?(e.classList.remove("is-hidden"),e.classList.add("is-visible")):(e.classList.add("is-hidden"),e.classList.remove("is-visible"))}),(u==="all"||u==="sites")&&setTimeout(()=>{window.__refreshProjectsDimensions&&window.__refreshProjectsDimensions()},80)})})}function R(){const o=document.getElementById("aiChatMessages"),i=document.getElementById("aiChatStatus"),d=document.querySelectorAll(".ai-chat-chip"),u=document.getElementById("aiChatResetBtn");if(!o)return;const e=()=>{const m=new Date;return`${String(m.getHours()).padStart(2,"0")}:${String(m.getMinutes()).padStart(2,"0")}`},a=`
    <!-- Aviso de Criptografia e IA -->
    <div class="chat-system-notice">
      <span>🔒 Mensagens protegidas por inteligência artificial do Grupo Norte</span>
    </div>

    <div class="chat-date-pill">
      <span>HOJE</span>
    </div>

    <!-- Mensagem 1 (Cliente) -->
    <div class="chat-msg chat-msg-user">
      <div class="chat-bubble">
        <p>Olá! Gostaria de entender como o Agente de IA funciona e se atende a minha empresa.</p>
        <span class="chat-msg-time">${e()}</span>
      </div>
    </div>

    <!-- Mensagem 2 (Agente IA) -->
    <div class="chat-msg chat-msg-bot">
      <div class="chat-bubble">
        <p>Olá! Seja muito bem-vindo ao <strong>Grupo Norte</strong>! 🚀</p>
        <p>Nosso Agente de IA é treinado exclusivamente com a base de conhecimento do seu negócio: cardápios, tabelas de preços, horários de atendimento e regras comerciais. Atende 24h por dia no seu WhatsApp sem filas!</p>
        <div class="chat-msg-meta">
          <span class="chat-msg-time">${e()}</span>
          <span class="chat-check-read" aria-label="Lida">✓✓</span>
        </div>
      </div>
    </div>

    <!-- Mensagem 3 (Cliente) -->
    <div class="chat-msg chat-msg-user">
      <div class="chat-bubble">
        <p>Vocês conseguem integrar direto com meu CRM ou agendamento no Google Agenda?</p>
        <span class="chat-msg-time">${e()}</span>
      </div>
    </div>

    <!-- Mensagem 4 (Agente IA) -->
    <div class="chat-msg chat-msg-bot">
      <div class="chat-bubble">
        <p>Sim, com integração nativa! ⚡ O cliente tira dúvidas, escolhe o melhor horário e a IA já agenda direto no seu calendário ou CRM, enviando confirmação automática.</p>
        <p>Clique em um dos segmentos abaixo para testar uma simulação real para o seu nicho 👇</p>
        <div class="chat-msg-meta">
          <span class="chat-msg-time">${e()}</span>
          <span class="chat-check-read" aria-label="Lida">✓✓</span>
        </div>
      </div>
    </div>
  `;o.innerHTML=a;let p=!1;const g=()=>{o.scrollTop=o.scrollHeight},h=m=>{if(p||!M[m])return;p=!0;const f=M[m],n=e(),c=document.createElement("div");c.className="chat-msg chat-msg-user is-new",c.innerHTML=`
      <div class="chat-bubble">
        <p>${f.user}</p>
        <span class="chat-msg-time">${n}</span>
      </div>
    `,o.appendChild(c),g(),i&&(i.textContent="digitando...",i.classList.add("is-typing"));const t=document.createElement("div");t.className="chat-msg chat-msg-bot chat-typing-bubble",t.id="chatTypingBubble",t.innerHTML=`
      <div class="chat-bubble typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `,o.appendChild(t),g(),setTimeout(()=>{const s=document.getElementById("chatTypingBubble");s&&s.remove(),i&&(i.textContent="Online",i.classList.remove("is-typing"));const l=e(),v=document.createElement("div");v.className="chat-msg chat-msg-bot is-new",v.innerHTML=`
        <div class="chat-bubble">
          <p>${f.ai}</p>
          <div class="chat-msg-meta">
            <span class="chat-msg-time">${l}</span>
            <span class="chat-check-read" aria-label="Lida">✓✓</span>
          </div>
        </div>
      `,o.appendChild(v),g(),p=!1},850)};d.forEach(m=>{m.addEventListener("click",()=>{const f=m.getAttribute("data-niche");f&&h(f)})}),u&&u.addEventListener("click",()=>{o.innerHTML=a,i&&(i.textContent="Online",i.classList.remove("is-typing")),p=!1,g()})}function H(){x(),O(),R()}function D(){const o=document.querySelector(".section-philosophy");if(!o)return;const i=o.querySelector(".philosophy-symbol-stage"),d=o.querySelectorAll(".philosophy-act-pane"),u=o.querySelectorAll(".timeline-step"),e=o.querySelectorAll(".kinetic-value-item");let a=window.innerWidth<=960,p=null,g=-1;function h(t){t!==g&&(g=t,d.forEach((s,l)=>{l===t?s.classList.add("is-active"):s.classList.remove("is-active")}),u.forEach((s,l)=>{l===t?s.classList.add("is-active"):s.classList.remove("is-active")}))}"IntersectionObserver"in window?new IntersectionObserver(s=>{s.forEach(l=>{l.isIntersecting?o.classList.add("is-in-view"):l.boundingClientRect.top>0&&o.classList.remove("is-in-view")})},{root:null,rootMargin:"-5% 0px -10% 0px",threshold:[0,.05,.15]}).observe(o):o.classList.add("is-in-view");function m(){if(a)return;const t=o.getBoundingClientRect(),s=window.innerHeight,l=t.height-s;if(t.bottom<0)return;if(t.top>s){o.classList.remove("is-in-view");return}t.top<=s*.9&&t.bottom>=0&&(o.classList.contains("is-in-view")||o.classList.add("is-in-view"));const v=Math.max(0,-t.top),b=Math.max(0,Math.min(1,v/l));let y=0;if(b>=.72?y=3:b>=.46?y=2:b>=.2?y=1:y=0,h(y),i){const w=-50+(b*14-7),A=.98+b*.08,E=(b-.5)*6;i.style.transform=`translateY(${w}%) scale(${A}) rotate(${E}deg)`}if(e.length)if(b>=.68){const w=Math.max(0,Math.min(1,(b-.68)/.28));e.forEach((A,E)=>{const S=E*.18;w>=S?A.classList.add("is-revealed"):A.classList.remove("is-revealed")})}else e.forEach(w=>w.classList.remove("is-revealed"))}function f(t){if(a)return;const s=o.getBoundingClientRect(),l=s.height-window.innerHeight,b=[.05,.32,.58,.85][t]||0,y=window.scrollY+s.top+b*l;window.scrollTo({top:y,behavior:"smooth"})}u.forEach((t,s)=>{t.addEventListener("click",()=>f(s))});function n(){p||(p=requestAnimationFrame(()=>{m(),p=null}))}function c(){a=window.innerWidth<=960,a?(d.forEach(t=>{t.classList.add("is-active")}),e.forEach(t=>{t.classList.add("is-revealed")}),i&&(i.style.transform="")):(g=-1,n())}window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",c,{passive:!0}),c(),n()}document.addEventListener("DOMContentLoaded",()=>{T(),$(),B(),H(),D()});
//# sourceMappingURL=index-CZdZO81A.js.map
