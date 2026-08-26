# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two B2B segments, both agencies — not the eCommerce end-clients the current site copy targets (that positioning is being fully replaced):

1. **Paid media agencies** that already run Meta Ads campaigns for their own clients, but lack a data-infrastructure layer connecting their clients' CRM to Meta's ad algorithm.
2. **Non-ad-running agencies/freelancers** (UGC creators, community managers, dev agencies) who want to resell performance/paid-media services to their clients without building the capability in-house.

## Product Purpose

MCM Digital is a B2B white-label partner for agencies, with two distinct offers matched to the two segments:

- **CRM Signal** (for paid media agencies): a technical service that connects a partner's client's CRM (HubSpot, GoHighLevel) to the Meta Conversions API, so Meta's ad algorithm optimizes on real pipeline/deal data instead of shallow lead-form-fill events. The partner agency keeps running the campaigns; MCM provides the data-infrastructure layer they don't have.
- **Full white-label fulfillment** (for non-ad-running partners): MCM runs the Meta Ads campaigns *and* provides CRM Signal, entirely under the partner's brand. The partner sells the service and owns the client relationship; MCM executes everything behind the scenes.

Success = agencies adopt one of these two offers as a trusted, invisible-when-needed extension of their own service.

## Positioning

The mechanism a neighboring vendor can't easily copy: CRM Signal, a CRM → Meta Conversions API data pipeline that feeds Meta's algorithm real revenue/pipeline signal instead of surface-level form-fill events. This technical layer underlies both offers and is the reason performance improves beyond what standard campaign management alone delivers.

## Operating Context

- Client CRMs integrated: HubSpot, GoHighLevel.
- Pipeline mechanism: CRM → n8n (automation/orchestration layer) → Meta Conversions API. This is the concrete technical path CRM Signal runs.
- Meta Business/Ads Manager, Meta Events Manager (used to confirm real event delivery).
- A live status portal at status.valy.agency demonstrates uptime/monitoring of the CRM Signal pipeline in production — currently running on MCM's own account (Valy Agency / Landing24), not yet on an external partner's account.
- Site is bilingual (ES/EN) via existing `LanguageContext` — confirmed to carry forward into the new design (relevant since partner agencies span LatAm and English-speaking markets).
- Confirmed to carry forward: MCM Digital name and existing logo mark as the identity anchor.

## Capabilities and Constraints

- CRM Signal is built and running in production today (on MCM's own account, Valy Agency/Landing24), with confirmed events in Meta Events Manager and a complete documented implementation. The technology works; what's missing is commercial validation with external agency partners.
- Team is 2 people: one technical/implementation, one sales/paid media.
- No fixed cap on how many agency partners MCM can serve under the new model — unlike the old direct-client model, capacity scales differently because each partner agency brings its own multiple end-clients, rather than MCM taking on end-clients one at a time.
- The current site's eCommerce-facing copy, the Starter/Growth/Partner diagnostic wizard, and the "5 slots/month" scarcity framing all belong to the retired positioning and are being fully replaced — do not treat them as constraints or facts to preserve.
- The current site's stat callouts (+40 campaigns, 87% renewal, 3 countries, $12K managed, 4.2x ROAS, 14 active clients) are confirmed illustrative placeholders, not real numbers — do not carry them into new work in any form.

## Brand Commitments

- Name: MCM Digital. Domain: mediabuyer.mcmdigital.com.ar.
- Existing logo asset (`public/logo.png`), WhatsApp contact number, and current visual identity are incumbent implementation, not reconfirmed as binding for the new B2B positioning — treat as open for revisiting when the surface work happens, not as locked brand facts.

## Evidence on Hand

- Real: CRM Signal's technical implementation is live in production on MCM's own account (Valy Agency/Landing24), with confirmed event delivery in Meta Events Manager and a live status portal (status.valy.agency). This is real proof of the technology working.
- Explicitly absent: no external agency partners, no case studies, no testimonials, and no real usage/results numbers for the B2B agency-facing offer yet. Future work must not fabricate these.
- The current site's numeric stats and the "5 slots" scarcity claims are placeholders tied to the retired eCommerce positioning and must not be reused, even reworded, for the new positioning.

## Product Principles

1. Sell the missing layer, not the whole stack — CRM Signal targets agencies that already run ads but lack CRM→Meta data infrastructure; full fulfillment targets agencies that don't run ads at all. Keep the two offers distinct rather than blending them into one pitch.
2. White-label by default — for the fulfillment segment, MCM's work stays invisible; the partner owns the client relationship and the brand.
3. Prove the technology honestly, not the commercial traction — real technical proof (production deployment, Events Manager confirmation, status portal) can be shown; external client traction that doesn't exist yet must not be implied.
4. Speak to agency operators, not eCommerce founders — tone, proof points, and objections addressed should fit a B2B buyer evaluating a vendor/partner, not a B2C buyer evaluating an ad manager.
5. Team-scaled capacity, no manufactured scarcity — capacity claims should reflect that a small team can serve many agency partners since each brings its own client base, unlike the old direct-client slot-limited model.
