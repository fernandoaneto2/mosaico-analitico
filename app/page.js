"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

/* ---------------------------------------------------------------------------
   CONFIG — edite aqui quando os dados forem confirmados
--------------------------------------------------------------------------- */
const CONFIG = {
  ano: "{ANO}",                          // ex.: "2023"
  whatsapp: "5583000000000",              // 55 + DDD + número (só dígitos)
  instagram: "mosaicoanalitico",           // sem @
  email: "contato@mosaicoanalitico.com.br",
};

const PAPEL = "Psicologia · Psicanálise";
const PROS = [
  { nome: "Elvira Daniel Rezende", crp: "CRP 13/2158",
    esp: "Adultos e terceira idade. Mediação de conflitos: casais, famílias, sócios e herdeiros.", acc: "var(--plum)", foto: "/assets/prof/elvira.jpg", wa: "", ig: "" },
  { nome: "Laura Daniel R. Nogueira", crp: "CRP 13/4078",
    esp: "Crianças, adolescentes, adultos e terceira idade.", acc: "var(--olive)", foto: "/assets/prof/laura.jpg", wa: "", ig: "" },
  { nome: "Ananda Ferrer Arruda", crp: "CRP 13/14021",
    esp: "Atendimento clínico psicanalítico.", acc: "var(--terra)", foto: "/assets/prof/ananda.jpg", wa: "", ig: "" },
  { nome: "Bianca da Nóbrega T. Trombetta", crp: "CRP 13/14204",
    esp: "Crianças, adolescentes, adultos e terceira idade.", acc: "var(--gold)", foto: "/assets/prof/bianca.jpg", wa: "", ig: "" },
  { nome: "Camila Yamaoka M. Maia", crp: "CRP 13/4694",
    esp: "Crianças, adolescentes e adultos. Orientação profissional e vocacional.", acc: "var(--teal)", foto: "/assets/prof/camila.jpg", wa: "", ig: "" },
  { nome: "Maressa Marques da Costa", crp: "CRP 13/9675",
    esp: "Crianças, adolescentes e adultos.", acc: "var(--blue)", foto: "/assets/prof/maressa.jpg", wa: "", ig: "" },
];

const ESPS = ["Crianças","Adolescentes","Adultos","Terceira idade",
  "Orientação profissional e vocacional","Mediação de conflitos","Casais, famílias e sócios","Atendimento psicanalítico"];
const EVENTS = [
  {
    titulo: "Mosaico de Conversas",
    subtitulo: "Entre a escuta, a palavra e o café.",
    desc: "Um encontro informal para assistirmos a um vídeo sobre autismo e conversarmos a partir de diferentes olhares.",
    dia: "08", mes: "AGO", diaSemana: "Sábado", data: "08/08/2026", hora: "14h",
    local: "Liv Mall — sala 710, 7º andar", tag: "Encontro · Entrada gratuita",
    img: "/assets/eventos/mosaico-de-conversas.jpg", cta: "Confirmar presença",
  },
  {
    titulo: "Roda de Psicanálise",
    subtitulo: "Leituras que aproximam teoria e clínica.",
    desc: "Grupo de estudos aberto para discutir textos fundamentais e a clínica do dia a dia, num espaço de troca entre os participantes.",
    dia: "22", mes: "AGO", diaSemana: "Sábado", data: "22/08/2026", hora: "19h",
    local: "Liv Mall — sala 710, 7º andar", tag: "Grupo de estudos",
    img: "/assets/eventos/mosaico-de-conversas.jpg", cta: "Quero participar",
  },
  {
    titulo: "Escuta em Cena",
    subtitulo: "Cinema e inconsciente.",
    desc: "Sessão de cine-debate: assistimos a um filme e conversamos sobre os laços, os afetos e aquilo que fica depois dos créditos.",
    dia: "05", mes: "SET", diaSemana: "Sábado", data: "05/09/2026", hora: "15h",
    local: "Liv Mall — sala 710, 7º andar", tag: "Cine-debate",
    img: "/assets/eventos/mosaico-de-conversas.jpg", cta: "Confirmar presença",
  },
  {
    titulo: "Maternidades e Laços",
    subtitulo: "Parentalidade e os primeiros vínculos.",
    desc: "Um encontro sobre os desafios da parentalidade e a construção dos vínculos na primeira infância.",
    dia: "19", mes: "SET", diaSemana: "Sábado", data: "19/09/2026", hora: "09h",
    local: "Liv Mall — sala 710, 7º andar", tag: "Workshop",
    img: "/assets/eventos/mosaico-de-conversas.jpg", cta: "Quero participar",
  },
  {
    titulo: "Luto e Reconstrução",
    subtitulo: "Sobre perdas e recomeços.",
    desc: "Roda de conversa acolhedora sobre o luto, seus tempos e os caminhos possíveis de reconstrução.",
    dia: "03", mes: "OUT", diaSemana: "Sábado", data: "03/10/2026", hora: "18h30",
    local: "Liv Mall — sala 710, 7º andar", tag: "Encontro aberto",
    img: "/assets/eventos/mosaico-de-conversas.jpg", cta: "Confirmar presença",
  },
];

const wa = (n) => `https://wa.me/${n || CONFIG.whatsapp}`;
const ig = (h) => `https://instagram.com/${h || CONFIG.instagram}`;
const MAPS = "https://www.google.com/maps/search/?api=1&query=Edf.+Liv+Mall+Av.+Flavio+Ribeiro+Coutinho+500+Joao+Pessoa";

/* ---------- Ícones (SVG line) ---------- */
const I = {
  heart:(p)=> <svg viewBox="0 0 24 24" className="icn" {...p}><path d="M20.8 8.6c0 5-8.8 10-8.8 10s-8.8-5-8.8-10a4.4 4.4 0 0 1 8.8-1 4.4 4.4 0 0 1 8.8 1Z"/></svg>,
  ear:(p)=> <svg viewBox="0 0 24 24" className="icn" {...p}><path d="M6 9a6 6 0 1 1 12 0c0 3-2.5 3.5-3.4 5.2-.6 1.1-.3 2.8-2 3.6"/><path d="M8.5 9a3.5 3.5 0 0 1 5.2-3"/></svg>,
  shield:(p)=> <svg viewBox="0 0 24 24" className="icn" {...p}><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z"/><path d="M9 12l2 2 4-4"/></svg>,
  users:(p)=> <svg viewBox="0 0 24 24" className="icn" {...p}><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 5.2a3.2 3.2 0 0 1 0 6M17.5 19a5.5 5.5 0 0 0-2.5-4.6"/></svg>,
  pin:(p)=> <svg viewBox="0 0 24 24" className="icn" {...p}><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>,
  cal:(p)=> <svg viewBox="0 0 24 24" className="icn" {...p}><rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M3.5 9.5h17M8 3.5v3M16 3.5v3"/></svg>,
  clock:(p)=> <svg viewBox="0 0 24 24" className="icn" {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>,
  expand:(p)=> <svg viewBox="0 0 24 24" className="icn" {...p}><path d="M9 4H5a1 1 0 0 0-1 1v4M15 4h4a1 1 0 0 1 1 1v4M9 20H5a1 1 0 0 1-1-1v-4M15 20h4a1 1 0 0 1 1-1v-4"/></svg>,
  close:(p)=> <svg viewBox="0 0 24 24" className="icn" {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>,
  chevronL:(p)=> <svg viewBox="0 0 24 24" className="icn" {...p}><path d="M15 5l-7 7 7 7"/></svg>,
  chevronR:(p)=> <svg viewBox="0 0 24 24" className="icn" {...p}><path d="M9 5l7 7-7 7"/></svg>,
  wa:(p)=> <svg viewBox="0 0 24 24" className="icn" {...p}><path d="M20 11.5a7.5 7.5 0 0 1-11 6.7L4.5 19.5l1.4-4.3A7.5 7.5 0 1 1 20 11.5Z"/><path d="M9 9.2c.2 2.6 2.9 5.3 5.6 5.6.6.1 1.2-.4 1.3-1 .1-.5-.2-.8-.6-1-.4-.2-1.1-.5-1.4-.2-.3.2-.5.6-.9.5-.9-.3-1.9-1.3-2.2-2.2-.1-.4.3-.6.5-.9.3-.3 0-1-.2-1.4-.2-.4-.5-.7-1-.6-.6.1-1.1.7-1 1.3Z" fill="currentColor" stroke="none"/></svg>,
  insta:(p)=> <svg viewBox="0 0 24 24" className="icn" {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>,
};

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    const onKey = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.14 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => { document.body.style.overflow = lightbox ? "hidden" : ""; }, [lightbox]);

  const scrollByCards = (dir) => {
    const t = trackRef.current;
    if (!t) return;
    const card = t.querySelector(".event-card");
    const gap = parseInt(getComputedStyle(t).columnGap) || 22;
    const amount = card ? card.offsetWidth + gap : t.clientWidth * 0.85;
    t.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const renderEvent = (ev) => (
    <article className="event-card" key={ev.titulo}>
      <button type="button" className="event-media" onClick={() => setLightbox(ev)} aria-label={"Ver cartaz em tamanho maior: " + ev.titulo}>
        <div className="event-date"><span>{ev.dia}</span><small>{ev.mes}</small></div>
        <Image src={ev.img} alt={"Cartaz do evento " + ev.titulo} width={768} height={1024} sizes="(max-width:600px) 86vw, (max-width:960px) 46vw, 31vw" />
        <span className="event-zoom" aria-hidden="true">{I.expand()}</span>
      </button>
      <div className="event-body">
        <span className="event-tag">
          <span className="tilespots" aria-hidden="true">
            <i style={{ background: "var(--terra)" }} /><i style={{ background: "var(--gold)" }} /><i style={{ background: "var(--teal)" }} /><i style={{ background: "var(--plum)" }} /><i style={{ background: "var(--olive)" }} /><i style={{ background: "var(--blue)" }} />
          </span>
          {ev.tag}
        </span>
        <h3>{ev.titulo}</h3>
        <p className="event-sub">{ev.subtitulo}</p>
        <p className="event-desc">{ev.desc}</p>
        <div className="event-meta">
          <div>{I.cal()} {ev.diaSemana}, {ev.data}</div>
          <div>{I.clock()} {ev.hora}</div>
          <div>{I.pin()} {ev.local}</div>
        </div>
        <a className="event-cta" href={wa()} target="_blank" rel="noopener">{I.wa()} {ev.cta}</a>
      </div>
    </article>
  );

  return (
    <>
      {/* NAV — minimalista; hamburguer no mobile */}
      <header className={"nav" + (scrolled ? " scrolled" : "")}>
        <button className={"burger" + (open ? " open" : "")} aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span></span><span></span><span></span>
        </button>
        <nav className={"menu" + (open ? " open" : "")}>
          <a href="#sobre" onClick={() => setOpen(false)}>Sobre</a>
          <a href="#eventos" onClick={() => setOpen(false)}>Eventos</a>
          <a href="#abordagem" onClick={() => setOpen(false)}>Abordagem</a>
          <a href="#equipe" onClick={() => setOpen(false)}>Profissionais</a>
          <a href="#especialidades" onClick={() => setOpen(false)}>Especialidades</a>
        </nav>
      </header>

      {/* HERO — placa em destaque sobre textura de ambiente */}
      <section className="hero" id="topo">
        <div className="hero-bg" aria-hidden="true"></div>
        <div className="hero-inner">
          <h1 className="sr-only">Mosaico Analítico — Clínica e Transmissão</h1>
          <Image className="hero-logo" src="/assets/mosaico-placa.jpg" alt="Mosaico Analítico" width={1500} height={560} priority />
          <p className="hero-slogan">Clínica e Transmissão</p>
          <p className="hero-tag">Psicologia &amp; Psicanálise · João Pessoa/PB</p>
          <hr className="hero-rule" />
        </div>
      </section>

      <div className="tilebar"></div>

      {/* SOBRE */}
      <section className="section about" id="sobre">
        <div className="container about-grid">
          <div className="reveal">
            <p className="eyebrow">O consultório</p>
            <h2>Muitas peças, uma escuta inteira.</h2>
            <p className="lead">O Mosaico Analítico é um consultório de psicologia e psicanálise em João Pessoa/PB, formado por profissionais que compartilham um mesmo cuidado: acolher cada pessoa em sua singularidade.</p>
            <p>Como num mosaico, acreditamos que aquilo que parece fragmentado pode compor sentido. No encontro clínico, damos lugar à palavra, ao tempo de cada um e à construção de novos arranjos para a própria história — sempre com ética, sigilo e presença.</p>
            <p>Atendemos crianças, adolescentes, adultos e a terceira idade, presencialmente, em um ambiente reservado e cuidadoso.</p>
          </div>
          <div className="about-art reveal">
            <Image src="/assets/mosaico-flores.jpg" alt="Painel em mosaico do espaço Mosaico Analítico" width={980} height={1360} />
            <p className="cap">Peças do nosso espaço</p>
          </div>
        </div>
      </section>

      <div className="tilebar"></div>

      {/* EVENTOS — catálogo em carrossel */}
      <section className="section events center" id="eventos">
        <div className="container">
          <p className="eyebrow">Agenda</p>
          <h2>Eventos no consultório</h2>
          <p className="intro">Encontros abertos para pensar, ouvir e trocar. Deslize para ver todos.</p>
          {EVENTS.length > 1 ? (
            <div className="events-carousel">
              <button type="button" className="carousel-btn prev" aria-label="Ver evento anterior" onClick={() => scrollByCards(-1)}>{I.chevronL()}</button>
              <div className="events-track" ref={trackRef}>
                {EVENTS.map(renderEvent)}
              </div>
              <button type="button" className="carousel-btn next" aria-label="Ver próximo evento" onClick={() => scrollByCards(1)}>{I.chevronR()}</button>
            </div>
          ) : (
            <div className="events-grid single">{EVENTS.map(renderEvent)}</div>
          )}
        </div>
      </section>

      {/* DESDE */}
      <section className="desde" id="desde">
        <div className="desde-bg">
          <div className="container">
            <p className="eyebrow" style={{ color: "var(--gold)" }}>Nossa trajetória</p>
            <div className="num reveal">Desde <b>{CONFIG.ano}</b></div>
            <p className="reveal">Um espaço construído encontro após encontro, dedicado à escuta clínica em João Pessoa.</p>
            <div className="facts reveal">
              <div className="fact"><span>6</span><small>Profissionais</small></div>
              <div className="fact"><span>Todas as idades</span><small>Da infância à terceira idade</small></div>
              <div className="fact"><span>Presencial</span><small>Edf. Liv Mall — JPA/PB</small></div>
            </div>
            <p className="desde-addr reveal"><span className="pin">{I.pin()}</span> Av. Flávio Ribeiro Coutinho, 500 — 7º andar, sala 710</p>
          </div>
        </div>
      </section>

      {/* ABORDAGEM */}
      <section className="section approach center" id="abordagem">
        <div className="container">
          <p className="eyebrow">Como cuidamos</p>
          <h2>Um cuidado feito de presença</h2>
          <div className="cards">
            <div className="mini reveal"><div className="ic" style={{ background: "var(--terra)" }}>{I.heart()}</div><h3>Acolhimento</h3><p>Um primeiro encontro sem julgamentos, no seu tempo e no seu ritmo.</p></div>
            <div className="mini reveal"><div className="ic" style={{ background: "var(--teal)" }}>{I.ear()}</div><h3>Escuta clínica</h3><p>Dar lugar à palavra para que cada história possa se recompor.</p></div>
            <div className="mini reveal"><div className="ic" style={{ background: "var(--olive)" }}>{I.shield()}</div><h3>Sigilo e ética</h3><p>Um espaço reservado, seguro e conduzido com responsabilidade.</p></div>
            <div className="mini reveal"><div className="ic" style={{ background: "var(--gold)" }}>{I.users()}</div><h3>Todas as idades</h3><p>Da infância à terceira idade, além de casais e famílias.</p></div>
          </div>
        </div>
      </section>

      <div className="tilebar"></div>

      {/* PROFISSIONAIS */}
      <section className="section team center" id="equipe">
        <div className="container">
          <p className="eyebrow">Quem somos</p>
          <h2>As profissionais do Mosaico</h2>
          <p className="intro">Seis olhares, formações e sensibilidades que se encontram num mesmo cuidado.</p>
          <div className="team-grid">
            {PROS.map((p) => (
              <article className="pro reveal" key={p.nome} style={{ "--acc": p.acc }}>
                <div className="photo">
                  <Image src={p.foto} alt={"Foto de " + p.nome} fill sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 33vw" />
                </div>
                <div className="body">
                  <h3>{p.nome}</h3>
                  <div className="crp">{p.crp}</div>
                  <div className="role">{PAPEL}</div>
                  <p className="esp">{p.esp}</p>
                  <div className="links">
                    <a href={wa(p.wa)} target="_blank" rel="noopener" aria-label={"WhatsApp de " + p.nome}>{I.wa()}</a>
                    <a href={ig(p.ig)} target="_blank" rel="noopener" aria-label={"Instagram de " + p.nome}>{I.insta()}</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ESPECIALIDADES */}
      <section className="section specs" id="especialidades">
        <div className="container">
          <p className="eyebrow">Atendimentos</p>
          <h2>Especialidades atendidas</h2>
          <div className="chips">{ESPS.map((e) => <span className="chip" key={e}>{e}</span>)}</div>
        </div>
      </section>

      {/* CONTATO — apenas endereço e WhatsApp */}
      <section className="section contact" id="contato">
        <div className="container">
          <div className="center">
            <p className="eyebrow" style={{ color: "var(--gold)" }}>Onde nos encontrar</p>
            <h2>Contato &amp; Localização</h2>
            <p className="sub">Será um prazer receber você.</p>
          </div>
          <div className="contact-simple">
            <div className="info-item">
              <div className="ic">{I.pin()}</div>
              <div>
                <h4>Endereço</h4>
                <p>Av. Flávio Ribeiro Coutinho, 500 — 7º andar, sala 710<br/>Edf. Liv Mall — João Pessoa/PB</p>
                <a className="maplink" href={MAPS} target="_blank" rel="noopener">Ver no mapa</a>
              </div>
            </div>
            <div className="info-item">
              <div className="ic">{I.wa()}</div>
              <div>
                <h4>WhatsApp</h4>
                <p>(83) 0 0000-0000 <span className="tag-soon">· a confirmar</span></p>
              </div>
            </div>
            <a href={wa()} target="_blank" rel="noopener" className="btn btn-wa">{I.wa()} Falar no WhatsApp</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="fb">Mosaico Analítico</div>
        <p>Clínica e Transmissão · Psicologia &amp; Psicanálise · João Pessoa/PB</p>
        <p style={{ opacity: 0.6, fontSize: ".8rem" }}>© {new Date().getFullYear()} Mosaico Analítico. Todos os direitos reservados.</p>
      </footer>
      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={"Cartaz: " + lightbox.titulo} onClick={() => setLightbox(null)}>
          <button className="lightbox-close" aria-label="Fechar" onClick={() => setLightbox(null)}>{I.close()}</button>
          <img src={lightbox.img} alt={"Cartaz do evento " + lightbox.titulo} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
