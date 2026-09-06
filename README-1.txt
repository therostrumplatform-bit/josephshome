JOSEPH'S HOME — WEBSITE DEPLOY PACKAGE
Prepared 2026-09-06 (replaces README.txt dated 2026-08-28)


READ THIS FIRST — WHY THE PREVIEW LOOKS BROKEN
  If you opened one of these .html files on your phone and saw plain black
  text on white with a giant golf flag and broken image icons, nothing is
  wrong with the file. Every page now pulls its design from a single shared
  file, styles.css, plus the image files in this package. Open one page by
  itself and it has no stylesheet and no images to find.

  To preview correctly, keep all files together in one folder and open
  index.html from there. Once deployed to the repo root, everything resolves.

  This is the big structural change in this pass: the design used to be
  copy-pasted inline into all 20 pages. It now lives in one file. Change a
  color once and all 20 pages change.


HOW TO DEPLOY
  1. On GitHub, go to the repo, branch: main.
  2. Delete the files listed under DELETE THESE FIRST below.
  3. Upload every file in this package straight to the repo root
     (flat — no subfolders, no /assets/ folder).
  4. Commit to main. Cloudflare auto-deploys from main, so the live site
     updates on its own within a few minutes.

  Do NOT create a new branch. The Worker only watches main.


DELETE THESE FIRST (they are in the repo now and should not be)
  index-11.html ......... browser-numbered duplicate
  give-3.html ........... browser-numbered duplicate
  employment-3.html ..... browser-numbered duplicate
       ^ IMPORTANT: there is currently NO index.html in the repo at all,
         which means there is no homepage. This package supplies it.
  1788638855907.jpg ..... junk filename, nothing references it
  README.txt ............ stale (pre-Saucier, pre-ESV); replaced by this file
  planner.jpg ........... old "Prayer Partner Planner" placeholder; the
                          RESTORE journal replaces it

  ALSO DELETE:
  jh-chatbot.js ......... the OLD one. This package ships a rewritten
                          replacement under the same name, so uploading
                          will overwrite it — just make sure the new one
                          lands.

  DO NOT DELETE (leave these alone):
  josephshome ........... Cloudflare Worker config — deleting it kills deploy
  robots.txt
  josephs-home-logo.jpg . referenced by the chatbot and older assets
  qr-hire-us.png ........ QR code for the Hire Us page


WHAT'S IN HERE (38 files, 2.8 MB total)

  Script (1)
    jh-chatbot.js ......... site-wide help chatbot. Keyword matched, no API
                            key, no backend, no network calls. Crisis
                            detection always overrides normal matching.

  Stylesheet (1)
    styles.css ............ THE design system. Every page links to it.
                            Colors, type, the brushed-metal treatment, the
                            red/blue emergency block, all layouts. Edit here.

  Pages (20 .html)
    index.html ............ Homepage
    give.html ............. Give / shop / RESTORE journal teaser
    employment.html ....... "Hire Us" — lawn care, moving, employer staffing
    stories.html .......... Index of all 15 story/teaching articles
    faq.html .............. Frequently asked questions
    church-and-celebrate-recovery.html ... NEW. Full CR meeting schedule
    am-i-eligible.html
    first-thirty-days.html
    for-churches.html
    for-families-what-to-expect.html
    how-to-apply.html
    loving-without-rescuing.html
    scripture-for-the-hard-nights.html
    the-three-year-plan.html
    what-josephs-home-is.html
    when-a-man-falls.html
    where-your-giving-goes.html
    why-there-are-rules.html
    work-and-employment.html
    writing-your-testimony.html

  Images (16)
    logo-seal-white.png ... circular seal, white on navy — used in headers
    logo-seal-navy.png .... circular seal, navy on white — favicon / OG image
    logo-lockup-navy.png .. horizontal lockup (spare, not currently placed)
    jeff-york.jpg ......... Jeff York, founder & CEO
    joey-watts.jpg ........ Joseph "Joey" Watts, the home's namesake
    restore-book.jpg ...... RESTORE journal cover render
    flyer-lawn.jpg ........ lawn care flyer (Hire Us)
    flyer-moving.jpg ...... moving & labor flyer (Hire Us)
    shop-signet-ring.jpg, shop-tee-navy.jpg, shop-tee-grey.jpg,
    shop-tee-teal.jpg, shop-tumbler.jpg, shop-mug.jpg,
    shop-cap-navy.jpg, shop-cap-sky.jpg, shop-tote.jpg ... shop photos


FILENAME COLLISION — DECIDE BEFORE UPLOADING
  The repo already holds the shop photos under different names
  (tee-navy.jpg, cap-sky.jpg, mugs.jpg, tote.jpg, tumbler.jpg,
  ring-alumni.jpg, lawn-care.jpg, moving-crew.jpg). This package uses
  shop-*.jpg and flyer-*.jpg.

  Upload as-is and you will have every product photo twice — the site will
  work, the repo will just be messy. Either delete the old-named copies
  after uploading, or tell me and I will rename this package's images to
  match the repo's existing names instead.

  warehouse-crew.jpg and qr-hire-us.png in the repo are NOT used by this
  version of employment.html. See OPEN ITEMS.


WHAT CHANGED IN THIS PASS

  Focus (this pass)
    - The site now points at four things: the GOLF TOURNAMENT, APPLICATIONS,
      DONATIONS, and VOLUNTEERING.
    - New golf section on the homepage (index.html#golf) directly under the
      stats strip: date, course, register CTA, sponsor call, and the five
      ways to take part (foursome, hole sponsor, raffle item, volunteer on
      the day, bring your company).
    - "Golf" added to the main nav on all 20 pages.
    - Volunteering pulled forward in the chatbot and the give page.

  Client revision round (from Jeff's handwritten notes)
    - Golf tournament banner enlarged: real headline, date, course, and a
      Register CTA. On all 20 pages.
    - Logo enlarged in the header (76px seal) across all pages.
    - Gulfport --> Saucier, Mississippi everywhere.
    - Hero badge now reads "Now accepting applications to our Discipleship
      Program."
    - ALL scripture converted from KJV to ESV — 14 pull-quotes plus 16
      inline verses on scripture-for-the-hard-nights.html. Crossway
      attribution added to every footer.
    - Four Steps rendered as puzzle-piece tiles colored to the logo.
    - Line icons added to all six "what a man gets" items.
    - Jeff's pull quote now in quote marks with his name attributed.
    - The blanket of "Call 228-669-4346" buttons (roughly 55 instances) was
      removed, then the number was deliberately put back in a handful of
      high-intent places only. See the phone policy note under DECISIONS.
    - "All fifteen" --> "All" on Stories & Teachings.

  Design
    - Brushed-metal sheen on the navy sections, inverted for the light
      steel bands, alternating down every page.
    - Emergency / SAMHSA block rebuilt in red brushed metal with a blue
      siren light wash, now present on all 20 pages.
      NOTE: the siren light is deliberately STATIC, not flashing. A pulsing
      strobe on a crisis panel is a photosensitivity risk and reads as
      decoration on the one block that has to read as instruction.

  Structure
    - Single shared styles.css (was ~7 KB of inline CSS duplicated 20x).
    - give.html went from 4.2 MB to 20 KB by extracting 12 base64-embedded
      images to real files. The tumbler photo alone was a 3884px, 2.1 MB
      data URI; it is now 46 KB.
    - lawn flyer converted PNG --> JPG, 2.1 MB down to 329 KB.
    - Real destinations wired throughout: OneStep application XuEfGXU,
      house rules 7OSn580, charitygolftoday.com/josephshomegolftournament,
      facebook.com/josephsoberlivinghome.
    - "/stories/..." and "/faq.html" paths flattened.
    - Skip-to-content link, aria-current on nav, labeled form fields,
      lazy-loaded video embeds.

  New content
    - church-and-celebrate-recovery.html: built from the live /CR page.
      All 12 meetings across 9 churches, grouped by day, plus the CR
      Locator and three YouTube videos (nocookie, lazy-loaded). Fixes the
      "Gu;fport" typo that is on the live page. Celebrate Recovery(R)
      trademark attributed to Saddleback Church.
    - RESTORE 2027 journal teaser on give.html (full) and index.html
      (short). Written from the actual book: the six fixed daily sections,
      the 0500 standard, the Sabbath Debrief spread, the monthly milestone
      debrief, the twelve themes, the Tactical Scripture Index, the
      Covenant. Coming to Amazon in paperback and Kindle. The journal plus
      the prayer partner bookmark and fridge magnet are presented as a new
      part of the discipleship program.
      No release date or price is stated anywhere — send me either and I
      will add it.


OPEN ITEMS — NOT DONE IN THIS PACKAGE

  BLOCKERS
  - faq.html contains 11 unanswered "[confirm: ...]" placeholders that
    render visibly on the live page: program fee, daily schedule, drug
    testing policy, bed availability, medication policy, street address,
    visitation, packing list, phone/vehicle policy, response time, and
    501(c)(3)/EIN. Only Jeff can fill these. This is the single biggest
    thing standing between this package and a clean launch.

  - The chatbot has been REWRITTEN (jh-chatbot.js in this package) and is
    now loaded on all 20 pages. It is keyword-matched, has no API key and
    makes no network calls. Crisis detection runs before normal matching
    and always overrides it. It never claims a person is answering — it
    says plainly that it is automated and points to the phone.
    Answers cover: golf, applying, eligibility, cost, program length, rehab
    first, giving, volunteering, hiring our crews, families, church/CR,
    RESTORE, location, house rules, contact, and Joey Watts.
    To edit answers, open jh-chatbot.js and change the ANSWERS array.
    NEEDS TESTING before launch — try it and tell me what it gets wrong.

  - EMAIL ADDRESS IS WRONG IN THE REPO. The three employment forms submit
    via FormSubmit.co to jeff.york@josephshome.org. The live site's own
    contact block says jeffyork@thejosephhome.org. Different user, different
    domain. Every form submission may have been silently going nowhere.
    Worth checking whether anyone has ever received one.

  - The three Hire Us forms in THIS package are mailto: buttons, not
    FormSubmit. The repo's working FormSubmit version is better. Once the
    correct address is confirmed I will wire them properly. Note FormSubmit
    sends a one-time "confirm your email" link on first submission after
    deploy — someone has to click it or all three forms fail silently.

  DECISIONS NEEDED
  - Phone policy: RESOLVED. The number is back, used sparingly rather than
    on every section. It now appears in the footer of all 20 pages, on
    Jeff's section of the homepage, in the golf section, on the employer
    form, on the give page, and throughout the chatbot. The hero and the
    article pages stay call-free so the button keeps its weight.

  - Celebrate Recovery schedule. Twelve meetings across nine churches came
    off a page with a typo and no last-updated date. A man driving to
    Picayune for a meeting that moved is a bad outcome. Have Jeff confirm
    the list. There is a "call ahead or use the locator" note under it.

  - The employer-solutions section on employment.html has no photo in this
    version. The repo's warehouse-crew.jpg came from a phone screenshot of
    a flyer, not the original file, so it is noticeably softer than the
    lawn and moving flyers beside it. Send the original and I will place it.

  - qr-hire-us.png is not placed on employment.html in this version. Say
    the word and I will add it back.

  STILL PLACEHOLDER
  - Shop prices are placeholder except the alumni ring tiers.
  - Shop "order" buttons open an email. No cart, no payment processor.
  - Give buttons open an email. The README key facts mention a PayPal
    donate link — send it and I will wire the Give CTAs to it.
  - Homepage stats strip ("12 months / +2 years / Men 18+") is real, but
    there are still no "men served" or "years operating" numbers anywhere.
  - sitemap.xml is referenced in the old README but is not in the repo and
    is not in this package.

  LICENSING
  - ESV: roughly 30 verses site-wide, well under Crossway's 500-verse free
    use ceiling. The footer attribution covers it. Fine as-is.
  - The RESTORE journal quotes NIV throughout, while the website is now
    ESV. Two problems: it is a visible inconsistency if someone reads the
    site then the book, and Biblica's permission threshold is stricter than
    Crossway's. A 365-day journal sold on Amazon will blow well past any
    free-use allowance. This needs a written license before publication.
  - Celebrate Recovery(R) is a registered trademark of Saddleback Church,
    attributed in the CR page footer.


KEY FACTS (for reference / future edits)
  Email .......... jeffyork@thejosephhome.org  (CONFIRMED on live site)
  Phone .......... 228-669-4346 (removed from the site per Jeff's notes;
                   still live on thejosephhome.org)
  Founder/CEO .... Jeff York
  Namesake ....... Joseph "Joey" Watts (deceased)
  Location ....... Saucier, Mississippi (Gulf Coast)
  Program ........ 12 months residential + 2 years mentorship
  Domain ......... www.thejosephhome.org — confirmed, and the new seal
                   artwork prints WWW.THEJOSEPHHOME.ORG around the ring.
                   Canonical and OG tags in this package use it.
  Apply .......... https://app.onestepsoftware.com/forms/XuEfGXU
  House rules .... https://app.onestepsoftware.com/forms/7OSn580
  Golf ........... https://charitygolftoday.com/josephshomegolftournament
  CR locator ..... https://www.crlocator.com/
  Scripture ...... ESV site-wide (journal is NIV — see LICENSING)
