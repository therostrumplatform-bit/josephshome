/* ==========================================================================
   Joseph's Home — site chatbot widget
   Self-contained: injects its own CSS, HTML, and behavior. Include with:
     <script src="/assets/jh-chatbot.js" defer></script>
   on any page. No backend, no API key, no external calls — this is a
   deterministic, keyword-matched assistant grounded ONLY in the real FAQ
   page and a curated house-rules summary. It will not invent answers to
   anything not in its knowledge base, and crisis detection always takes
   priority over topic matching.
   ========================================================================== */
(function () {

  /* ---------------- CRISIS DETECTION (checked first, always wins) ---------------- */
  const CRISIS_TERMS = [
    "suicide","suicidal","kill myself","end my life","want to die","end it all",
    "overdose","od'd","od'ing","odd'ing","unresponsive","not breathing","can't breathe",
    "gun","pills right now","hurt myself","harm myself","self harm","self-harm",
    "in danger","emergency","dying","relapsed right now","using right now","high right now",
    "domestic violence","being abused","he's hitting me","she's hitting me","threatening me",
    "withdrawal right now","seizing","seizure"
  ];

  const CRISIS_REPLY = {
    urgent: true,
    text: [
      "If you or someone else is in immediate danger, **call 911 right now.**",
      "For free, confidential support at any hour, **call or text 988.**",
      "For treatment referrals, SAMHSA's national helpline is **1-800-662-4357.**",
      "",
      "Joseph's Home is not a detox facility, a hospital, or a medical provider — we can't safely support someone in an active medical crisis or withdrawal. Please use the resources above first.",
      "",
      "Because we're a small operation, our phone is answered 24/7/365 — call **228-669-4346**. During evenings and weekends, an AI phone agent takes down every call so nothing is missed after hours, and a real person follows up as soon as possible.",
      "",
      "In rare situations, a temporary exception may be considered after prayer and with our board's guidance, evaluated case by case. When in doubt, call — give us the chance to help."
    ].join("\n")
  };

  /* ---------------- KNOWLEDGE BASE ----------------
     Sourced from the live FAQ (faq.html) and the House Rules application
     form. Anything the real FAQ marks [confirm: ...] is NOT answered here —
     the bot says plainly that it isn't published yet and points to a call.
  */
  const KB = [
    {
      id: "what-is",
      keywords: ["what is joseph", "what is this", "about joseph's home", "what do you do", "who are you"],
      a: "Joseph's Home is a faith-based sober living home for men in Gulfport, Mississippi. Men who've completed a rehab program live here, work, attend church, and are discipled. It's a three-year plan: twelve months living in the home, then two years of self-directed mentorship."
    },
    {
      id: "rehab-or-not",
      keywords: ["rehab", "treatment center", "detox", "medical", "withdrawal", "medical staff"],
      a: "No — Joseph's Home is not a rehab, a detox, a hospital, or a medical provider, and there's no medical staff on site. A man has to complete a rehab program before coming here. If you're still using today, call us anyway (228-669-4346) and we'll help you find a treatment facility."
    },
    {
      id: "who-joseph",
      keywords: ["who was joseph", "joseph watts", "who is the home named", "name of the home"],
      a: "Joseph Watts — his family called him Joey. He was a son, brother, grandson, cousin, nephew, and friend; a fisherman and outdoorsman with a laugh that carried. The home is named for him so other families don't lose what his family lost."
    },
    {
      id: "women",
      keywords: ["women", "female", "girlfriend", "wife can she"],
      a: "Not today — Joseph's Home houses men eighteen and older only. If you're a woman looking for help, please still call (228-669-4346); we know the coast and can point you somewhere real."
    },
    {
      id: "denomination",
      keywords: ["denomination", "baptist", "christian", "religion", "faith requirement", "believer"],
      a: "It's a Christian home rooted in local Southern Baptist congregations, working alongside Michael Memorial Baptist Church and the Grace Point Campus. Men aren't required to share our convictions when they arrive — they're required to attend and to be respectful."
    },
    {
      id: "how-apply",
      keywords: ["how do i apply", "application", "apply", "how to apply", "sign up"],
      a: "Through the online application — it's long, so give yourself about an hour and use the Save for later button. You can start it here: https://app.onestepsoftware.com/forms/XuEfGXU"
    },
    {
      id: "why-long",
      keywords: ["why is the application so long", "so many questions", "why long"],
      a: "Because you'd be living with other men fighting for their lives, and staff need to know who's coming. Contacts, treatment history, medications, employment, probation, and your testimony all help staff know how to help you and keep the house safe."
    },
    {
      id: "call-instead",
      keywords: ["can i call instead", "talk to someone first", "talk to a person"],
      a: "The application is the fastest way in, since it puts everything in front of staff at once. If you'd rather talk to a person first, call 228-669-4346 and leave a message."
    },
    {
      id: "finished-rehab",
      keywords: ["do i need rehab first", "finished rehab", "already in rehab", "before coming"],
      a: "Yes, or be about to finish one. That's the one hard requirement — Joseph's Home can't supervise a withdrawal, since detox from alcohol and some medications is medically dangerous and needs a doctor."
    },
    {
      id: "criminal-record",
      keywords: ["criminal record", "record stop me", "felony", "arrest"],
      a: "Not automatically. Plenty of men here have records, probation officers, and court dates. What ends an application is dishonesty, not history — answer every question truthfully, including the sex offender question."
    },
    {
      id: "probation",
      keywords: ["probation", "parole", "officer"],
      a: "That's not a problem — the application has a section for it. Give your dates and your officer's information so staff can work with, not around, the people supervising you."
    },
    {
      id: "medication",
      keywords: ["medication", "prescription", "meds", "pills prescribed"],
      a: "The application asks for your medications, dosages, and prescriber so staff know what's in the house. Bring your prescriptions and keep your doctor. The exact medication policy is confirmed directly with staff — call 228-669-4346 for specifics."
    },
    {
      id: "after-submit",
      keywords: ["what happens after i submit", "after applying", "response time", "how long to hear back"],
      a: "A staff member reviews your application and gets in touch. Exact turnaround isn't posted — if a week passes with no word, call and leave a message. Systems fail sometimes; nobody will think less of you for following up."
    },
    {
      id: "waiting-list",
      keywords: ["waiting list", "bed available", "how long is the wait"],
      a: "Current bed availability isn't posted here — apply anyway. Beds open up, and it's better to have your application on file than to wait to be invited. Call 228-669-4346 for the current status."
    },
    {
      id: "cost",
      keywords: ["cost", "price", "how much", "fee", "afford", "money to stay", "pay"],
      a: "The exact program fee isn't posted publicly, but per the application paperwork it's currently $145/week, due in advance each Monday. Men here work, and part of what work does is make a man able to carry his own share. If money is the obstacle, say so when you apply rather than deciding for us."
    },
    {
      id: "bring",
      keywords: ["what should i bring", "pack", "packing list", "bring with me"],
      a: "A full packing list isn't posted, but generally: clothes for work and church, toiletries, your prescriptions in their original bottles, ID, and any court or probation paperwork. Call 228-669-4346 for specifics before you arrive."
    },
    {
      id: "phone-car",
      keywords: ["keep my phone", "my car", "vehicle", "bring my car"],
      a: "The exact phone and vehicle policy isn't posted here — call 228-669-4346 to confirm. In general, any vehicle on property must be street-legal, licensed, insured, registered, and is subject to search."
    },
    {
      id: "location",
      keywords: ["where are you", "address", "location", "located"],
      a: "Joseph's Home is on the Mississippi Gulf Coast, in the Gulfport area. The exact street address is shared after acceptance — call 228-669-4346 for more."
    },
    {
      id: "how-long-stay",
      keywords: ["how long can i stay", "length of program", "how long is the program"],
      a: "The residential portion is twelve months, followed by two years of self-directed mentorship after you move out."
    },
    {
      id: "daily-life",
      keywords: ["normal day", "daily schedule", "typical day", "what's it like living there"],
      a: "Early mornings — work, chores, study, meetings, church activities, and time with the other men. The exact daily/weekly schedule isn't posted; call 228-669-4346 for specifics."
    },
    {
      id: "work",
      keywords: ["do i have to work", "job", "employment", "work requirement"],
      a: "Yes. Joseph's Home partners with local employers on the coast, and work is treated as part of the discipleship, not a way to pay the house back."
    },
    {
      id: "church",
      keywords: ["do i have to go to church", "church mandatory", "celebrate recovery"],
      a: "Yes — church and church activities are mandatory, along with Celebrate Recovery. If you don't yet believe, come anyway; nobody will demand a decision on a schedule."
    },
    {
      id: "house-rules",
      keywords: ["house rules", "rules", "curfew", "what are the rules", "policies"],
      a: [
        "Here's a plain-language summary — the full rules are reviewed and signed as part of the application:",
        "• Curfew: 10pm Sunday–Thursday, midnight Friday & Saturday",
        "• Program fee: $145/week, due in advance each Monday",
        "• Church, Sunday school, Celebrate Recovery, and Bible study are mandatory",
        "• No drugs, alcohol, weapons, pornography, or gambling on the property — grounds for immediate discharge",
        "• Random drug/alcohol testing",
        "• All medications, prescription or over-the-counter, are kept and dispensed by staff",
        "• Employment is required once cleared by staff",
        "• Visitors and off-campus passes require prior written approval",
        "",
        "Read the full official rules before you apply: https://app.onestepsoftware.com/forms/7OSn580"
      ].join("\n")
    },
    {
      id: "drug-screens",
      keywords: ["drug test", "drug screen", "ua", "urinalysis", "tested"],
      a: "Yes, drug screens are part of the program. Exact frequency isn't posted here — call 228-669-4346 for specifics."
    },
    {
      id: "relapse",
      keywords: ["relapse", "relapsed", "fall", "slip up", "used again", "fell"],
      a: "Tell somebody immediately, before you're found out. There will be a consequence — there will not be contempt, and it's not the end of your welcome. After a period of sobriety, tolerance is gone and overdose risk is serious — if somebody is unresponsive, call 911 now."
    },
    {
      id: "visitors",
      keywords: ["visitors", "visit", "holidays", "go home", "leave the house", "pass"],
      a: "The exact visitation and leave policy isn't posted here — call 228-669-4346 to confirm. In general, on-campus visits and off-campus passes require prior approval from the Director."
    },
    {
      id: "family-get-in",
      keywords: ["get my son in", "get my husband in", "how do i get him in", "apply for him"],
      a: "He has to apply himself — that's not bureaucracy, a man who won't fill out the form isn't ready to do the year. You're welcome to sit beside him while he does it."
    },
    {
      id: "family-talk-staff",
      keywords: ["can i speak to staff about him", "talk to staff about my son", "update on him"],
      a: "Yes, staff want to hear from you — you know him better than they do. What staff can share back is limited by his own consent, which the application asks about."
    },
    {
      id: "family-wants-to-leave",
      keywords: ["he wants to leave", "wants to quit", "wants to come home", "threatening to leave"],
      a: "Try: \"I love you. I am not coming to get you. Talk to the staff tonight.\" The third-week phone call is the single most predictable event in this house."
    },
    {
      id: "family-support",
      keywords: ["family support", "al-anon", "nar-anon", "family ministry", "hope ministry"],
      a: "Yes — the Hope family ministry takes a whole-family approach with weekend activities for the families of the men who live here. Celebrate Recovery also has family meetings, and Al-Anon and Nar-Anon meet on the coast."
    },
    {
      id: "give",
      keywords: ["donate", "give", "giving", "how can i help financially", "contribute money"],
      a: "You can give through the Give button on any page, or by calling us. Monthly giving, at any amount, is the most useful thing to a home this size — it lets us commit to a man for twelve months knowing his bed will still be there in month nine."
    },
    {
      id: "tax-deductible",
      keywords: ["tax deductible", "501c3", "501(c)(3)", "ein", "nonprofit status"],
      a: "Tax-deductible status details aren't posted here yet — call 228-669-4346 or email jeffyork@thejosephhome.org to confirm."
    },
    {
      id: "give-other",
      keywords: ["what do you need besides money", "donate items", "in kind", "supplies needed"],
      a: "Work for our men, rides, mentors, hosted meals, household goods when a man moves into his own place, and people who can teach practical skills. Call before buying anything so we can tell you what's actually needed."
    },
    {
      id: "church-partner",
      keywords: ["church partner", "our church wants to help", "congregation help"],
      a: "Please reach out — call 228-669-4346. There's also a page on walking alongside a home like this for churches that want practical ways to help."
    },
    {
      id: "hire",
      keywords: ["hire your men", "hire a resident", "job for a resident", "employ"],
      a: "Yes, and it's one of the most valuable things anyone does for us. Call 228-669-4346."
    },
    {
      id: "hours",
      keywords: ["hours", "when can i call", "phone hours", "after hours", "weekend", "is anyone there", "is someone there", "anybody there", "right now", "open now", "24/7", "available now"],
      a: "Because we're a small operation, our phone is answered 24/7/365 — call 228-669-4346. During evenings and weekends, an AI phone agent captures your call so nothing is missed after hours, and a real person follows up as soon as possible."
    },
    {
      id: "contact",
      keywords: ["contact", "email", "phone number", "reach you", "get in touch"],
      a: "Call 228-669-4346, email jeffyork@thejosephhome.org, or use the Apply/Give links in the menu. Someone will get back to you."
    }
  ];

  /* ---------------- MATCHING ---------------- */
  function findCrisis(msg) {
    return CRISIS_TERMS.some(term => msg.includes(term));
  }

  function findBestMatch(msg) {
    let best = null, bestScore = 0;
    for (const entry of KB) {
      let score = 0;
      for (const kw of entry.keywords) {
        if (msg.includes(kw)) score += kw.split(" ").length; // longer phrase matches score higher
      }
      if (score > bestScore) { bestScore = score; best = entry; }
    }
    return bestScore > 0 ? best : null;
  }

  function formatText(text) {
    return text
      .split("\n")
      .map(line => line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"))
      .map(line => line.replace(/(https?:\/\/\S+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>'))
      .map(line => line.replace(/(\d{3}-\d{3}-\d{4})/g, '<a href="tel:+1$1">$1</a>'.replace(/-/g,'')))
      .join("<br>");
  }

  /* ---------------- UI ---------------- */
  const CSS = `
  .jh-chat-launcher{
    position:fixed; bottom:22px; right:22px; z-index:9999;
    width:58px; height:58px; border-radius:50%;
    background:#2A82A0; color:#fff; border:none; cursor:pointer;
    box-shadow:0 10px 26px rgba(31,44,60,0.28);
    display:flex; align-items:center; justify-content:center;
    font-family:'Inter',sans-serif;
    transition:transform .15s ease;
  }
  .jh-chat-launcher:hover{ transform:scale(1.06); }
  .jh-chat-launcher svg{ width:26px; height:26px; }

  .jh-chat-panel{
    position:fixed; bottom:92px; right:22px; z-index:9999;
    width:360px; max-width:calc(100vw - 40px);
    height:520px; max-height:calc(100vh - 140px);
    background:#fff; border-radius:16px;
    box-shadow:0 20px 50px rgba(31,44,60,0.30);
    display:none; flex-direction:column; overflow:hidden;
    font-family:'Inter',sans-serif;
    border:1px solid #E1EAEF;
  }
  .jh-chat-panel.open{ display:flex; }

  .jh-chat-head{
    background:#1F2C3C; color:#fff; padding:16px 18px;
    display:flex; align-items:center; gap:10px;
  }
  .jh-chat-head svg{ width:28px; height:28px; flex:0 0 auto; }
  .jh-chat-head .t{ font-family:'Montserrat',sans-serif; font-weight:700; font-size:14.5px; }
  .jh-chat-head .s{ font-size:11.5px; color:#D8F6FD; opacity:.85; }
  .jh-chat-close{
    margin-left:auto; background:none; border:none; color:#fff;
    opacity:.7; cursor:pointer; font-size:20px; line-height:1; padding:4px;
  }
  .jh-chat-close:hover{ opacity:1; }

  .jh-chat-body{
    flex:1; overflow-y:auto; padding:16px;
    display:flex; flex-direction:column; gap:12px;
    background:#F4FAFC;
  }
  .jh-msg{ max-width:88%; font-size:13.5px; line-height:1.55; padding:10px 13px; border-radius:12px; }
  .jh-msg.bot{ background:#fff; border:1px solid #E1EAEF; color:#1F2C3C; align-self:flex-start; border-bottom-left-radius:3px; }
  .jh-msg.user{ background:#2A82A0; color:#fff; align-self:flex-end; border-bottom-right-radius:3px; }
  .jh-msg.urgent{ background:#FBEAEA; border:1.5px solid #C94A4A; color:#7A1F1F; align-self:stretch; max-width:100%; }
  .jh-msg.urgent strong{ color:#7A1F1F; }
  .jh-msg a{ color:#2A82A0; }
  .jh-msg.urgent a{ color:#7A1F1F; font-weight:700; }

  .jh-chips{ display:flex; flex-wrap:wrap; gap:6px; padding:0 16px 12px; background:#F4FAFC; }
  .jh-chip{
    background:#fff; border:1px solid #E1EAEF; color:#1F2C3C;
    font-size:12px; padding:7px 11px; border-radius:999px; cursor:pointer;
  }
  .jh-chip:hover{ border-color:#2A82A0; color:#2A82A0; }

  .jh-chat-input{
    display:flex; gap:8px; padding:12px; border-top:1px solid #E1EAEF; background:#fff;
  }
  .jh-chat-input input{
    flex:1; border:1px solid #E1EAEF; border-radius:999px;
    padding:10px 14px; font-size:13.5px; font-family:'Inter',sans-serif; outline:none;
  }
  .jh-chat-input input:focus{ border-color:#2A82A0; }
  .jh-chat-input button{
    background:#2A82A0; color:#fff; border:none; border-radius:999px;
    width:38px; height:38px; flex:0 0 auto; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
  }
  .jh-chat-input button:hover{ background:#256f8a; }

  @media (max-width:480px){
    .jh-chat-panel{ right:12px; left:12px; width:auto; bottom:80px; }
    .jh-chat-launcher{ right:16px; bottom:16px; }
  }
  `;

  function injectCSS() {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  function init() {
    injectCSS();

    const launcher = el(`
      <button class="jh-chat-launcher" aria-label="Open chat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
        </svg>
      </button>
    `);

    const panel = el(`
      <div class="jh-chat-panel" role="dialog" aria-label="Joseph's Home chat">
        <div class="jh-chat-head">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="#2A82A0"/>
            <circle cx="50" cy="50" r="41" fill="#D8F6FD"/>
            <polygon points="50,32 68,50 32,50" fill="#1F2C3C"/>
            <rect x="38" y="50" width="24" height="18" fill="#2A82A0"/>
          </svg>
          <div>
            <div class="t">Joseph's Home</div>
            <div class="s">Answers from our FAQ &amp; house rules</div>
          </div>
          <button class="jh-chat-close" aria-label="Close chat">&times;</button>
        </div>
        <div class="jh-chat-body" id="jh-chat-body"></div>
        <div class="jh-chips" id="jh-chat-chips">
          <button class="jh-chip" data-q="Are you a rehab?">Are you a rehab?</button>
          <button class="jh-chip" data-q="What are the house rules?">House rules</button>
          <button class="jh-chip" data-q="How do I apply?">How do I apply?</button>
          <button class="jh-chip" data-q="Is someone there right now?">Is someone there right now?</button>
        </div>
        <form class="jh-chat-input" id="jh-chat-form">
          <input type="text" id="jh-chat-text" placeholder="Ask a question…" autocomplete="off">
          <button type="submit" aria-label="Send">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
          </button>
        </form>
      </div>
    `);

    document.body.appendChild(launcher);
    document.body.appendChild(panel);

    const body = panel.querySelector("#jh-chat-body");
    const form = panel.querySelector("#jh-chat-form");
    const input = panel.querySelector("#jh-chat-text");

    function addMsg(text, cls) {
      const msg = el(`<div class="jh-msg ${cls}">${formatText(text)}</div>`);
      body.appendChild(msg);
      body.scrollTop = body.scrollHeight;
    }

    function greet() {
      addMsg("Hi — I can answer questions from our FAQ and house rules, or tell you the fastest way to reach a real person. If this is an emergency, please call 911 or 988 first.", "bot");
    }

    function respond(userText) {
      const msg = userText.toLowerCase();
      addMsg(userText, "user");

      if (findCrisis(msg)) {
        setTimeout(() => addMsg(CRISIS_REPLY.text, "urgent"), 250);
        return;
      }
      const match = findBestMatch(msg);
      setTimeout(() => {
        if (match) {
          addMsg(match.a, "bot");
        } else {
          addMsg("I don't have that one in the FAQ or house rules yet. Call 228-669-4346 (answered 24/7/365) or email jeffyork@thejosephhome.org and a real person will help.", "bot");
        }
      }, 250);
    }

    launcher.addEventListener("click", () => {
      panel.classList.add("open");
      if (!body.hasChildNodes()) greet();
      input.focus();
    });
    panel.querySelector(".jh-chat-close").addEventListener("click", () => panel.classList.remove("open"));

    panel.querySelectorAll(".jh-chip").forEach(chip => {
      chip.addEventListener("click", () => respond(chip.dataset.q));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = input.value.trim();
      if (!v) return;
      respond(v);
      input.value = "";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
