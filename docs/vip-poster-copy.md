# A3 In-Store Poster — Copy

For Dosa Hut Sunshine Coast, 5 Lutana Street, Buddina. A3 portrait
(297 × 420 mm), exactly.

**This document records what is actually on the printed poster.** The design is
built from `design/vip-poster/poster.html`; if you change the wording there,
change it here too, or the two drift apart.

**Status:** prizes and the Instagram handle are still placeholders pending the
owner's sign-off. The logo is the low-resolution website asset and needs
replacing before the print run.

---

## Poster copy (top to bottom)

**Eyebrow**
WELCOME REWARD

**Headline** *(updated 2026-09-15)*
Join our VIP Club today & unlock your instant reward!
Scan & scratch to win.

*Previous wording: "You're in. / Go on, scratch it." — replaced with the more
inviting line above. The new text is about two and a half times longer, so the
headline dropped from 17.5 mm to 12 mm to hold the same vertical space.*

**Sub-headline**
Scan the code, verify on WhatsApp, and scratch your reward on the spot.

**On the ticket**
WELCOME TICKET · DOSA HUT VIP
SCRATCH (on the unscratched foil)
YOU WON! (revealed underneath)
You scratch it on your phone, right after you verify.

**QR block**
SCAN TO JOIN
*(Encodes `https://sunshinecoast.dosahut.net.au/vip`. Confirm the deployment
answers on that address before the print run — a printed QR cannot be fixed.)*

**Four-step strip**
1. Scan the code
2. Enter your name and mobile
3. Verify on WhatsApp
4. Scratch and win, on the spot

**Prize row** *(placeholder — owner to confirm)*
SCRATCH TO WIN ONE OF THESE
10% OFF · FREE MANGO LASSI · FREE GULAB JAMUN · $5 OFF

**Fine print** *(reworded 2026-09-14 at Girish's request — warmer tone, plus an
explicit terms line)*
Thank you for joining us — one welcome ticket per mobile number, while stocks last.
Rewards are subject to availability and may change from time to time. Terms and conditions apply.

**Footer**
5 Lutana Street, Buddina QLD 4575 · 0423 841 991
sunshinecoast.dosahut.net.au

---

## Layout notes

- Authored in millimetres at exactly 297 × 420 mm. `design/vip-poster/build-poster.mjs`
  renders it through headless Chrome, so all text stays vector and the fonts are
  embedded; it then trims the page box to exact A3, because Chrome rounds to
  whole pixels and otherwise leaves it 0.2 mm tall.
- **QR prints at 60 mm.** An A3 poster on a wall is scanned from a couple of
  metres away and phone cameras need that target size. It sits on a plain white
  plate with a quiet zone — never over a photo or a gradient, where scan
  reliability falls off sharply.
- Brand colours, taken from the live site: maroon `#570B0B`, orange `#F15A27`,
  cream `#FFF7F4`.
- Fonts: Cormorant Garamond (display), Oswald (headings), Nunito (body). All
  embedded in the PDF. Check licensing before a commercial print run.
- Checked in greyscale — every element still separates without colour.
- Ask the printer for 3 mm bleed and CMYK conversion.

---

## Still outstanding

1. **A high-resolution logo.** The current one comes from the website
   (272 × 182 px) and prints at roughly 147 dpi, which will look soft at A3.
   Drop the replacement in as `design/vip-poster/logo.png` and rebuild.
2. **Final prizes.** Is the list above right, or does the owner want one fixed
   gift? Any expiry? Dine-in only, or takeaway too?
3. **The branch Instagram handle**, if it should appear in the footer.
4. **The sub-headline and step 3 still say "verify on WhatsApp."** Verification
   currently goes by email while the WhatsApp Business Profile is pending. Decide
   before printing whether to say WhatsApp, say email, or keep it channel-neutral.
