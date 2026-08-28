JOSEPH'S HOME — WEBSITE DEPLOY PACKAGE
Prepared 2026-08-28

HOW TO DEPLOY
  1. On GitHub, go to the repo, branch: main.
  2. Delete all existing files at the repo root.
  3. Unzip this package and upload every file inside straight to the
     repo root (flat — no subfolders, no /assets/ folder).
  4. Commit to main. Cloudflare auto-deploys from main, so the live
     site updates on its own within a few minutes.

  Do NOT create a new branch for this. The Worker only watches main.


WHAT'S IN HERE (36 files)

  Pages (20 .html files)
    index.html ................ Homepage (recovered from GitHub history,
                                 paths fixed, golf banner + chatbot added)
    give.html .................. Give / shop page
    employment.html ............ "Hire Us" — lawn care, moving crews,
                                  employer staffing
    stories.html ................ Index of all 15 story/teaching articles
    faq.html .................... Frequently asked questions
    am-i-eligible.html
    church-and-celebrate-recovery.html
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
    work-and-employment.html
    why-there-are-rules.html
    writing-your-testimony.html

  Scripts
    jh-chatbot.js ............... Site-wide FAQ chatbot widget. Keyword-
                                   matched, no API key, no backend calls.
                                   Crisis detection always overrides normal
                                   matching. Loaded on every page.

  SEO
    robots.txt
    sitemap.xml

  Images
    josephs-home-logo.jpg ....... NOT included — already exists in the
                                   repo from 3 weeks ago, left alone.
    joey-watts.jpg .............. Joseph "Joey" Watts — the home's namesake
    jeff-york.jpg ................ Jeff York — founder & CEO
    ring-alumni.jpg, tumbler.jpg, mugs.jpg, planner.jpg,
    cap-navy.jpg, cap-sky.jpg, tote.jpg,
    tee-navy.jpg, tee-grey.jpg, tee-teal.jpg .... shop product photos


THINGS FIXED IN THIS PASS
  - Every page's logo/photo paths corrected from "/assets/..." to flat
    filenames (the repo has no /assets/ folder).
  - Every "/stories/..." link corrected to flat filenames
    (e.g. "/stories/how-to-apply.html" -> "how-to-apply.html").
  - Golf tournament banner (dismissible, animated) added to the top of
    all 20 pages, colors scoped so it can't shift each page's own theme.
  - Chatbot script tag added to all 20 pages (previously only on
    give.html and employment.html).
  - Give page's "Joey Watts" card corrected — it used to read like a
    resident testimonial ("full story coming soon"); it now correctly
    identifies him as the home's late namesake and links to his story
    on the homepage.


STILL OPEN — NOT DONE IN THIS PACKAGE
  - Real logo file: this package still points to "josephs-home-logo.jpg"
    (already in your repo). A proper on-brand replacement
    (josephs-home-horizontal-2400.png etc.) was referenced in a logo
    brand-guide README you sent, but the actual PNG/SVG files weren't
    included — send them and I'll swap it in everywhere.
  - Homepage stats placeholders: the "12 months / +2 years / Men 18+"
    facts strip is real, but nowhere on the homepage are there numbers
    like "men served" or "years operating" — none were ever given.
  - employment.html's lawn-care/moving-crew sections still use plain
    icon placeholders instead of real crew photos.
  - None of the three inquiry forms (lawn care, moving, employer) or
    the shop's "Add to cart" buttons submit anywhere yet — no backend
    connected.
  - Shop prices are still placeholder except the alumni ring tiers.
  - Domain in canonical/OG tags is "www.thejosephhome.org" — the logo
    README says the correct address is "theJosephHome.org" (no www,
    mixed case). Not fixed yet since DNS isn't pointed there.
  - Golf banner CTA links to charitygolftoday.com/josephshomegolftournament
    — confirm that's still the right registration link closer to Nov 7.


KEY FACTS (for reference / future edits)
  Phone ........... 228-669-4346 (answered 24/7/365; AI phone agent
                     after hours per the chatbot's crisis-reply text)
  Email ........... jeffyork@thejosephhome.org
  Founder/CEO ..... Jeff York
  Namesake ........ Joseph "Joey" Watts (deceased)
  Location ........ Gulfport, Mississippi (Gulf Coast)
  Program ......... 12 months residential + 2 years mentorship
  Apply ........... https://app.onestepsoftware.com/forms/XuEfGXU
  House rules ..... https://app.onestepsoftware.com/forms/7OSn580
  Give ............ PayPal donate link (see footer of any page)
