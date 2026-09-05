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
  - Real logo now included: josephs-home-logo.jpg is the clean circular
    seal (no watermark, no baked-in title) — the old file had been
    deleted from the repo during a prior full-replace deploy.
  - Homepage nav now includes "Hire us," and Joey Watts's photo is now
    in the "In loving memory" section on the homepage.
  - employment.html: real photos in for lawn care, moving crew, and
    employer solutions (previously navy icon placeholders).
  - employment.html: added a scannable QR code at the top of the page,
    linking to the page itself — verified to actually decode correctly.
  - employment.html: fixed two more broken "/assets/josephs-home-logo.jpg"
    references that were missed in an earlier pass.
  - employment.html: all three inquiry forms (lawn care, moving,
    employer) now actually submit — via FormSubmit.co, no backend
    needed — and email jeff.york@josephshome.org. The moving and
    employer forms were previously missing <form> tags entirely, so
    their submit buttons did nothing at all.
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
  - Homepage stats placeholders: the "12 months / +2 years / Men 18+"
    facts strip is real, but nowhere on the homepage are there numbers
    like "men served" or "years operating" — none were ever given.
  - The employer-solutions warehouse photo on employment.html came from
    a phone screenshot of a flyer, not the original file, so it's
    lower resolution than the lawn-care/moving-crew photos next to it.
    Send the original PNG/JPG and I'll swap in a sharper version.
  - The shop's "Add to cart" buttons on give.html don't submit anywhere
    yet — no backend/payment processor connected. (The three employment
    forms — lawn care, moving, employer — DO work now: they email
    jeff.york@josephshome.org via FormSubmit.co, no backend needed.)
  - Shop prices are still placeholder except the alumni ring tiers.
  - Domain in canonical/OG tags is "www.thejosephhome.org" — the logo
    README says the correct address is "theJosephHome.org" (no www,
    mixed case). Not fixed yet since DNS isn't pointed there.
  - Golf banner CTA links to charitygolftoday.com/josephshomegolftournament
    — confirm that's still the right registration link closer to Nov 7.
  - FormSubmit.co sends a one-time "confirm your email" link to
    jeff.york@josephshome.org the FIRST time a form is submitted after
    this deploy — someone needs to click that confirmation link once,
    or all three inquiry forms will silently fail to deliver.


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
