# AI Transparency & Agentic UX Patterns
## Design Skill: Building Trust Through Interface Transparency

**Source:** Practical Interface Patterns For AI Transparency (Part 2) — Smashing Magazine, May 13, 2026  
**Author:** Victor Yocco, PhD (UX Researcher at ServiceNow)  
**Category:** UX Design, AI/Agentic Systems, Interface Design, Microcopy  
**Difficulty:** Intermediate–Advanced  
**Time to Master:** 4–6 hours

---

## 🎯 CORE PRINCIPLE

> **"We are not building magic tricks. We are building colleagues."**

AI systems should be transparent about what they're doing, why they're doing it, and how certain they are about their decisions. Traditional interface patterns (spinners, progress bars) fail for agentic AI because they communicate the wrong thing. They say *"downloading data"* when the system is actually *"thinking"* or *"deciding"*.

The goal: Turn waiting time into a **moment for reassurance**, not anxiety.

---

## PART 1: THE PROBLEM WITH TRADITIONAL PATTERNS

### Why Spinners Fail for AI

**Legacy Pattern:** The spinning wheel, throbber, progress bar
- **Works for:** Downloading files, loading static content
- **Fails for:** AI agents doing complex reasoning/decision-making
- **User experience:** Confusion ("Is it hung? Is it thinking? Did it crash?")
- **Duration problem:** Users expect 2–3 seconds, but AI might need 20+ seconds

**The Core Issue:**
```
Traditional spinner = "I'm retrieving data"
AI spinner = "I'm thinking" (but users don't know this)
→ Massive mismatch = Anxiety + Distrust
```

### What AI Waiting Time Actually Is

When an agent pauses for 20 seconds, it's not downloading. It's:
- **Reasoning** about the best approach
- **Weighing options** against constraints
- **Creating content** based on complex logic
- **Making decisions** with probability-based uncertainty

Users need to understand this. If they think it's crashed, they'll close the app.

---

## PART 2: THE AGENTIC UPDATE FORMULA

### 3-Part Structure for Clear Status Updates

Every AI status message should follow this formula:

```
[Action Word] + [Specific Item] + [Limits/Rules]
```

#### 1. Action Word (The Verb)
Clear, specific actions. Not "Working" or "Loading".

| ❌ Weak | ✅ Strong | Context |
|---------|----------|---------|
| Working | Scanning | Searching multiple options |
| Loading | Checking | Verifying existing data |
| Processing | Converting | Transforming data between formats |
| Updating | Syncing | Coordinating across systems |
| Thinking | Analyzing | Examining patterns/logic |

#### 2. Specific Item (The Object)
What exactly is the system working on?

| Example | Better Specificity |
|---------|-------------------|
| "Checking calendar" | "Checking your calendar for Thursday 2–4pm slots" |
| "Searching flights" | "Searching United & Lufthansa for flights under $600" |
| "Verifying account" | "Verifying account routing numbers for transfer" |

#### 3. Limits/Rules (The Constraints)
What boundaries or criteria is the system following?

| Task | Limit/Rule |
|------|-----------|
| Flight search | "under $600" / "nonstop only" / "departing 6–8am" |
| Calendar sync | "recurring Thursday calls" / "avoiding lunch hours" |
| Document review | "mentioning 'budget impact'" / "published after 2024" |

### The Formula in Action

**Weak Example:**
```
"Searching for flights…"
```

**Strong Example (using formula):**
```
Action:    "Scanning"
Item:      "the prices on Lufthansa and United"
Limit:     "to find anything under $600."

Result:    "Scanning the prices on Lufthansa and United to find anything under $600."
```

#### Why This Works

1. **User knows their request was understood** (specific item = they mentioned Lufthansa)
2. **User knows the boundaries** (limit = under $600)
3. **User knows the action type** (scanning, not guessing/waiting)
4. **Patience increases** (specific task seems reasonable to take time)

---

## PART 3: TONE MATCHING WITH IMPACT/RISK MATRIX

### Rule: Tone Should Match Task Risk

**Low-Risk, Low-Impact Tasks**
- **Tone:** Friendly, conversational, personable
- **Example:** "I'm checking your calendar for the best time…"
- **Psychology:** Creates comfort, reduces tension
- **Use case:** Scheduling assistant, email drafting, note organization

**High-Risk, High-Impact Tasks**
- **Tone:** Clear, mechanical, precise (almost robotic)
- **Example:** "Verifying account routing numbers." (not "I'm double-checking your money details…")
- **Psychology:** Builds confidence in accuracy, signals seriousness
- **Use case:** Financial transfers, database migrations, irreversible actions, compliance

### The Tone Matching Principle

```
Task Importance = User Risk Perception
High-stakes task + playful tone = Panic
Low-stakes task + serious tone = Unnecessary anxiety

High-stakes task + serious tone = Confidence
Low-stakes task + friendly tone = Comfort
```

### How to Determine the Right Tone

Use the **Impact/Risk Matrix** (from Part 1 of the series):

| Risk Level | Characteristics | Tone | Example |
|-----------|-----------------|------|---------|
| Low | Easily reversible, low consequences, nonfinancial | Friendly, conversational | "Organizing your emails…" |
| Medium | Partially reversible, moderate consequences, medium impact | Balanced, informative | "Updating your preferences…" |
| High | Irreversible, major consequences, financial, compliance-related | Precise, mechanical, formal | "Authorizing payment transfer." |

### Critical: User Research Is Essential

The Impact/Risk Matrix is a starting point, not the final answer. **You must conduct user research:**

1. **A/B test** different tones/phrasings
2. **Run usability studies** to see emotional reactions
3. **Conduct interviews** to understand expectations
4. **Test with actual users** in their context

Different user groups, cultures, and contexts will react differently. What feels reassuring to a finance professional might feel cold to a casual user. Research is non-negotiable.

---

## PART 4: INTERFACE PATTERNS (THE CONTAINER)

> **Microcopy is the engine. Interface patterns are the car.**

Once you have the right words, you need the right visual container. Match the message's **weight** (importance) to the pattern's **visibility** (prominence).

| Message Weight | Pattern | Visibility | Location |
|---------------|---------|-----------|----------|
| Low priority | Living Breadcrumb | Subtle, passive | Menu area or background |
| Medium priority | Progress Indicator | Moderate | Center of screen, modal |
| High priority | Dynamic Checklist | Prominent, persistent | Full focus area |
| Critical | Action Confirmation | Maximum attention | Modal dialog, blocking |

---

### PATTERN 1: The Living Breadcrumb

**When to use:** Low-priority background tasks (AI doing quiet work)

**Example:** Email app drafting a reply while you browse other emails

**Visual Design:**
- Small, subtle status indicator (not a modal, not a banner)
- Placed in app border, menu area, or margin
- Pulses smoothly between status updates
- Does NOT demand attention

**Copy Evolution:**
```
1. "Reading email"
2. "Drafting reply"
3. "Checking tone"
4. "Draft ready" ✓
```

**Interaction Model:**
- Passive display (always visible if user wants to check)
- Click to expand and see more details (optional)
- Doesn't interrupt workflow
- Updates happen silently in background

**Psychology:**
- Offers quiet assurance
- User can check if curious
- Won't startle or distract
- Perfect for low-stakes tasks

**Implementation Notes:**
- Use micro animations (smooth transitions between text)
- Keep updates short (1–3 words maximum)
- Ensure color contrast is accessible
- Don't auto-dismiss; let it persist

---

### PATTERN 2: Dynamic Checklist

**When to use:** Complex, multi-step processes (especially high-stakes)

**Example:** Financial transfer, database migration, trip planning

**What It Shows:**
```
✓ Step 1: Verify Account Balance [COMPLETE]
● Step 2: Convert Currency [IN PROGRESS - 7 seconds elapsed]
◯ Step 3: Transfer Funds [PENDING]
◯ Step 4: Notify Recipient [PENDING]
```

**Visual Design:**
- Numbered steps with clear labels
- Current step highlighted/animated
- Previous steps marked complete (✓)
- Future steps clearly pending (◯)
- Real-time progress indicator per step (optional timer/percentage)

**Why This Beats a Progress Bar:**

| Progress Bar | Dynamic Checklist |
|-------------|------------------|
| "You're 40% done" (vague) | "Converting currency… step 2 of 4" (specific) |
| Assumes linear process | Handles variable step duration |
| Users panic at delays | Users understand delays are normal for complex steps |
| No context for what's happening | User knows exactly where in workflow they are |

**Handling Unpredictable Time:**
```
Scenario: Currency conversion takes an extra 10 seconds

With progress bar:  
User sees bar slow down → "Something's wrong?" → Anxiety

With dynamic checklist:
User sees "Converting Currency [IN PROGRESS]"
User thinks "That's a complex step, makes sense it takes time" → Trust
```

**Implementation (Full-Stack):**

This pattern requires integration across frontend and backend:

1. **Backend:** Emit webhook events when each step completes
2. **Frontend:** Listen for step-completion events, update UI state
3. **State management:** Track current step, elapsed time, estimated time
4. **UI updates:** Real-time animations, no lag between backend and UI

```javascript
// Conceptual implementation
const steps = [
  { id: 1, label: "Verify Account Balance", status: "complete" },
  { id: 2, label: "Convert Currency", status: "in-progress", elapsed: 7 },
  { id: 3, label: "Transfer Funds", status: "pending" },
];

// Backend webhook triggers this
onStepComplete('convert-currency', () => {
  steps[1].status = 'complete';
  steps[2].status = 'in-progress';
  renderChecklist(steps);
});
```

**Accessibility:**
- Ensure focus indicators on each step
- Announce step changes to screen readers
- Use semantic HTML (`<ol>`, `<li>`)
- Include ARIA labels for status

---

### PATTERN 3: The Thinking Toggle

**When to use:** Expert users, transparency-conscious users, high-risk situations

**What It Is:**
A progressive disclosure control (chevron, "View Logs" button) that expands from user-friendly summary → sanitized technical logs

**Friendly Summary (Default View):**
```
Checking availability across team calendars…
[↓ View details]
```

**Expanded Technical View:**
```
✓ Querying API endpoint /v2/search
✓ Response received: 200 OK
✓ Filtering results by relevance score > 0.8
→ Processing 47 matching time slots
→ Cross-referencing with team calendars
→ Calculating optimal meeting time
```

**Psychology:**
- Most users never click it (that's fine)
- Existence of toggle signals "we're not hiding anything"
- Expert users feel respected
- Builds trust through transparency

**Critical Safety: Sanitize Logs**

⚠️ **Non-negotiable:** Always sanitize raw logs before display

**Never expose:**
- Internal API endpoint names (show `/search`, not `/v2/internal/search-v42-beta`)
- Database structure names (show "matching results," not "customer_id = X")
- Security tokens (never, ever)
- Proprietary business logic
- Personal data (fully redact user info)

**Good Example:**
```
✓ Querying search index
✓ Sorting by relevance
✓ Filtering by date range: 2024-01-01 to 2024-12-31
```

**Bad Example (Too Much Detail):**
```
✓ POST https://internal.api.example.com/v2/elasticsearch-proxy
✓ Query: {user_id: 12345, email: "john@example.com", auth_token: sk-12345...}
✓ Hitting customer_preferences table for relevance weighting
```

**Implementation:**
1. Have backend create sanitized log output
2. Strip sensitive data at logging layer (not in UI)
3. Map internal names to user-friendly names
4. Test that logs don't leak information

---

### PATTERN 4: Designing for Partial Success

**The Problem:** Binary success/failure messaging fails when AI is 90% successful

**Traditional Approach (Trust-Killer):**
```
❌ Request Failed
```
(But actually 90% succeeded!)

**Agentic Approach (Honest Partial Success):**
```
✓ Flight booked: UA 492 on Oct 15 [Success]
✓ Hotel reserved: Marriott Downtown [Success]
✗ Car rental: Hertz [Failed — No inventory at airport location]

2 of 3 tasks completed. Want to book a car manually?
```

**Design Principles:**

1. **Be Granular:** Show success/failure at task level, not request level
2. **Celebrate Wins:** Highlight what worked
3. **Be Clear About Failures:** Explain why each piece failed
4. **Suggest Recovery:** How to fix the failed parts
5. **Keep Working Output:** Don't discard the 90% that succeeded

**Status Indicators:**

| Status | Symbol | Color | Meaning |
|--------|--------|-------|---------|
| Success | ✓ | Green (#10b981) | Task completed as requested |
| In Progress | ● | Blue (#0ea5e9) | Task actively executing |
| Pending | ◯ | Gray (#94a3b8) | Task queued, not started |
| Failed | ✗ | Red (#ef4444) | Task completed with error |
| Partial Success | ⚠️ | Amber (#f59e0b) | Task completed, some items missing |

**Example: Trip Planning**
```
✓ Flight (SFO→NYC, 11am departure) — Success
✓ Hotel (Marriott Times Square, 3 nights) — Success
⚠️ Dinner reservation (Per Se, 7pm) — Could not book, fully reserved
✗ Theater tickets (Hamilton, specific showing) — Tickets sold out

What next?
[Browse other dinner reservations] [Check other shows] [Keep as-is]
```

**Copy Strategy:**
```
Instead of: "Reservation failed"
Say:        "Could not book your preferred restaurant (fully reserved). 
             Here are 3 alternatives in the same area."

Instead of: "Error processing request"
Say:        "Flights and hotel booked. Theater tickets unavailable for 
             that specific showing. Try Friday instead?"
```

---

### PATTERN 5: Disentangling the Tool

**The Problem:** Users blame AI when the real problem is an external service

**Scenario:**
AI tries to check calendar, but Google Calendar API is down. How should this be communicated?

**Bad Approach (Makes AI Look Broken):**
```
❌ "I could not check your calendar."
(User thinks: "The AI is useless" or "Did something crash?")
```

**Good Approach (Clear Accountability):**
```
✓ "Google Calendar is not responding right now. I'll try again 
   automatically in 30 seconds. You can also [Check Gmail instead] 
   or [Try again now]."
```

**Psychology of Disentanglement:**
```
User's mental model:
[You] ← → [AI] ← → [Google Calendar]

If only says "I failed" = Blames [AI]
If says "Google Calendar API down" = Blames [Google]
If says "Will retry in 30s" = Trusts [AI] to handle issue
```

**Pattern Implementation:**

1. **Identify external dependencies** (APIs, services, databases)
2. **Catch failures from external calls**
3. **Explain which system failed** (not just "something went wrong")
4. **Show recovery strategy** ("retrying in 30 seconds…")
5. **Offer workarounds** ("[Try again] [Use alternative service] [Check back later]")

**Example Error Messages:**

| Scenario | Message |
|----------|---------|
| API timeout | "Slack isn't responding. Trying again in 20 seconds…" |
| Rate limit | "Reached API limit. Will resume in 2 minutes." |
| Service down | "Google Drive is temporarily unavailable. Retrying automatically." |
| Auth failure | "Your Zoom credentials expired. [Reconnect account]" |
| Network error | "Connection lost. [Retry] [Work offline] [See cached data]" |

---

### PATTERN 6: The Audit Trail (Trust After the Fact)

**The Problem:** Real-time transparency is fleeting. User walks away during processing, returns to finished screen. Result looks odd. How did the AI arrive at this?

**The Solution:** Persistent "Show Your Work" interaction

**What It Provides:**
```
Final result screen
  ↓
[See how this price was calculated]
[View search sources]
[Review decision logic]
[Check data used]
  ↓
Audit trail with full transparency
```

**Why This Matters:**

1. **Spot-checking:** User can verify validity of output
2. **Trust signal:** Mere presence says "we stand behind this"
3. **Safety net:** If something seems wrong, user has evidence
4. **Compliance:** Audit trails for regulated industries (finance, healthcare)
5. **Most users won't click it** (that's fine—they know they *could*)

**Example: Financial Transaction**

```
Transfer Complete ✓

Amount: $1,500.00
To: Alex Chen
Date: Jan 15, 2025
Status: Confirmed

[Review decision logic ↓]
├─ Recipient verified: Known contact
├─ Amount within daily limit: $5,000/day
├─ Time check: Outside fraud-alert hours
├─ Exchange rate applied: 1 USD = 1.08 CAD
└─ Final amount verified: $1,620.00 CAD

[View transaction ID] [Print receipt]
```

**Example: Flight Search**

```
Best Flight Found ✓

United UA 492
SFO → NYC | Jan 15, 8am–5:15pm
$487

[See how this was ranked ↓]
├─ Searches performed:
│  ✓ United Airlines database
│  ✓ Alternative Carrier (JetBlue, Alaska)
│  ✓ Nearby airports (Oakland, San Jose)
├─ Filters applied:
│  ✓ Price: Under $600 ✓
│  ✓ Time: Morning departure (6–11am) ✓
│  ✓ Duration: Max 6 hours ✓
└─ Why this won:
   Best combination of price ($487), timing, and duration (8h 15m)
```

**Design Considerations:**

1. **Progressive Disclosure:** Start with summary, expand on demand
2. **Plain Language:** Avoid technical jargon
3. **Visual Hierarchy:** Most important info first
4. **Scannable:** Use lists, icons, whitespace
5. **Interactive:** Let users drill down further
6. **Printable:** Support print for compliance/records

**Implementation:**

```javascript
// Audit trail data structure
const auditTrail = {
  decision: {
    type: "flight_booking",
    timestamp: "2025-01-15T14:32:00Z",
    user: "alex@example.com",
  },
  inputs: {
    origin: "SFO",
    destination: "NYC",
    date: "2025-01-15",
    constraints: {
      maxPrice: 600,
      preferredDeparture: "6am-11am",
      maxDuration: "6 hours"
    }
  },
  steps: [
    { step: 1, name: "Search United", status: "complete", time: "2.3s" },
    { step: 2, name: "Search alternatives", status: "complete", time: "1.8s" },
    { step: 3, name: "Filter by constraints", status: "complete", time: "0.2s" },
    { step: 4, name: "Rank by score", status: "complete", time: "0.5s" },
  ],
  result: {
    flight: "UA 492",
    price: 487,
    score: 9.2, // normalized 0–10
    reasoning: "Best price-time-duration combination"
  }
};
```

---

## PART 5: THE CRITICAL FAILURE CASE: ChatGPT Memory

**What Happened:** ChatGPT introduced "memory" feature that automatically feeds past conversations into new sessions

**The Transparency Problem:**
```
User doesn't know:
  ✗ What the AI remembers about them
  ✗ When it's using that memory
  ✗ How it's influencing responses

The "Audit Trail" is missing.
```

**User Experience:**
```
Session 1: Tell ChatGPT you have a pet cat
Session 2: Ask about pet care
ChatGPT: "As we discussed, with your cat…"

User: "Wait, how do you know I have a cat? I just started!"
ChatGPT uses its memory, but user has no visibility into:
  - What's being remembered
  - When memory is triggered
  - What data exists about them
```

**Why This Failed:**
1. **No audit trail** – Users couldn't see "memory dossier"
2. **No transparency** – No logs showing when memory was triggered
3. **No control** – Users couldn't easily see/edit/delete memories
4. **Black box** – Only workaround was to ask the model to quote its own memory

**Lesson:** Users can forgive complexity if they can *see* and *understand* the system.

---

## PART 6: CHECKLIST FOR TRANSPARENT AI DESIGN

### Before Building

- [ ] Conduct Decision Node Audit (map where AI makes decisions)
- [ ] Build Impact/Risk Matrix (identify critical transparency moments)
- [ ] Identify external dependencies (APIs, services that could fail)
- [ ] Plan user research (A/B testing, usability studies, interviews)
- [ ] Define sanitization rules (what logs can expose, what must hide)

### While Designing

- [ ] Use Agentic Update Formula for all status messages
- [ ] Match tone to task risk (friendly vs. mechanical)
- [ ] Choose appropriate pattern for message weight:
  - [ ] Low risk → Living Breadcrumb
  - [ ] Medium risk → Progress Indicator
  - [ ] High risk → Dynamic Checklist
  - [ ] Critical → Confirmation dialog
- [ ] Design for partial success (not binary pass/fail)
- [ ] Disentangle external services (blame correct system)
- [ ] Plan Audit Trail implementation
- [ ] Include Thinking Toggle (for expert users)

### Before Launch

- [ ] All status messages use Action Word + Specific Item + Limits
- [ ] No generic "Loading…" or "Working…"
- [ ] Tone tested with actual users (not assumed)
- [ ] Error messages clearly identify root cause
- [ ] Audit trail is accessible and not revealing
- [ ] Logs are sanitized (no secrets, no PII, no internals)
- [ ] External service failures are blamed correctly
- [ ] All transparency patterns are responsive (work on mobile)
- [ ] Accessibility audit (focus states, screen readers, contrast)
- [ ] Performance tested (live updates don't cause lag)

---

## KEY TAKEAWAYS

| Concept | Application | Impact |
|---------|-------------|--------|
| **Agentic Update Formula** | Structure all status messages with action + item + limits | User understands exactly what AI is doing |
| **Tone Matching** | Friendly for low-risk, mechanical for high-risk | Users trust the system appropriate to the task |
| **Living Breadcrumb** | Subtle background status for low-priority tasks | Passive assurance without interruption |
| **Dynamic Checklist** | Multi-step complex processes (especially high-stakes) | Users know exact position, patience increases |
| **Thinking Toggle** | Expert users who want to see logs | Trust + transparency without overwhelming casual users |
| **Partial Success** | AI completes 90% of request | Users can fix remaining 10% rather than seeing total failure |
| **Disentangle Tools** | Separate AI failures from external service failures | Users blame correct system, retain trust in AI |
| **Audit Trail** | Persistent "show your work" after completion | Ultimate safety net for verification |

---

## WHEN TO USE EACH PATTERN

```
Simple, low-risk, background task
  ↓
Use: Living Breadcrumb
  ↓
User barely notices it, quietly reassured

Medium complexity, multi-step task
  ↓
Use: Progress Indicator + Agentic Updates
  ↓
User can check progress, understand each step

Complex, high-stakes, irreversible task
  ↓
Use: Dynamic Checklist + Audit Trail
  ↓
User has full visibility, can spot-check, feels in control

Expert user or compliance requirement
  ↓
Use: Thinking Toggle + detailed Audit Trail
  ↓
User can verify every decision, no black boxes

Partial success scenario
  ↓
Use: Granular status display + recovery suggestions
  ↓
User fixes only what failed, keeps what worked

External service dependency
  ↓
Use: Clear "Service X is down, retrying" messaging
  ↓
User blames correct system, trusts AI

90+ day information (memory/history)
  ↓
Use: Persistent, searchable Audit Trail + user controls
  ↓
User knows what's remembered, can edit/delete
```

---

## ANTI-PATTERNS (What NOT to Do)

❌ **Generic "Loading…" message** → Use specific action word + item + limits  
❌ **Silent processing** → Use Living Breadcrumb to show work  
❌ **Binary error ("Failed")** → Use partial success pattern  
❌ **Blaming user for service failure** → Disentangle, blame correct system  
❌ **Black-box memory** → Build audit trail, let users see/control  
❌ **Playful tone for finance** → Match serious tone to high-stakes tasks  
❌ **Overloading user with technical logs** → Sanitize, use Thinking Toggle for experts  
❌ **No recovery path** → Always suggest next steps or workarounds  

---

## HANDS-ON EXERCISE

### Task: Redesign a Status Message

**Current (Generic):**
```
"Processing your request…"
```

**Redesign Steps:**

1. **Identify the action:** What is the AI actually doing? (Searching, analyzing, converting, checking, synthesizing, etc.)
2. **Name the specific item:** What exactly is being acted upon?
3. **Identify limits/rules:** What constraints or criteria apply?
4. **Write improved message:**
   ```
   [Action Word] the [Specific Item] [to find/check/verify] [Limits/Rules]
   ```

**Example Answers:**

| Original | Better | Better Still |
|----------|--------|--------------|
| "Processing…" | "Checking availability…" | "Checking your calendar and the team's availability for Tuesday 2–4pm" |
| "Loading…" | "Searching flights…" | "Scanning United, Southwest, and JetBlue for flights under $400 departing 6–9am" |
| "Thinking…" | "Analyzing files…" | "Analyzing the last 3 months of project files to summarize progress against goals" |

---

## RESOURCES & REFERENCES

**Part 1 of Series:** [Identifying Necessary Transparency Moments in Agentic AI](https://www.smashingmagazine.com/2026/04/identifying-necessary-transparency-moments-agentic-ai-part1/)  
**Foundational Article:** [Designing For Agentic AI: Practical UX Patterns For Control, Consent, And Accountability](https://www.smashingmagazine.com/2026/02/designing-agentic-ai-practical-ux-patterns/)  

**Tools & Examples:**
- **Perplexity AI:** Best-in-class status updates
- **Devin.ai:** Dynamic checklist implementation
- **ChatGPT:** Example of transparency failure (memory without audit trail)

**Related Design Patterns:**
- Progressive Disclosure
- Streaming UIs
- Error Recovery
- Undo/Redo patterns
- Confirmation dialogs
- Modal dialogs (for high-stakes)

---

## QUIZ: Test Your Knowledge

**Q1:** You're building an AI that auto-deletes old emails. What tone should you use?
- A) Friendly and casual ("I'm cleaning up your inbox!")
- B) Mechanical and precise ("Deleting messages matching criteria...")
- C) Depends on task importance

**A:** B (High-stakes, irreversible action = mechanical tone)

---

**Q2:** A user sees "Loading..." for 15 seconds. What's wrong?
- A) The system is too slow
- B) The message doesn't match the actual task (thinking, not loading)
- C) The pattern is wrong (should be dynamic checklist)

**A:** B & C (Generic message doesn't communicate reasoning; complex task needs checklist)

---

**Q3:** An AI books 4 of 5 hotel rooms successfully. How should this be shown?
- A) Error message: "Request failed"
- B) Show each room with ✓/✗ status, room 5 failed
- C) Hide the failure until the end

**A:** B (Partial success pattern celebrates what worked, addresses what didn't)

---

**Q4:** An API call times out while checking availability. What should users see?
- A) "I could not check availability"
- B) "Google Calendar is not responding. Retrying in 30 seconds."
- C) Nothing (silently retry)

**A:** B (Disentangle the tool; user knows it's not the AI's fault)

---

**Q5:** Should every user see the raw logs of AI decision-making?
- A) Yes, full transparency for everyone
- B) No, too technical and confusing
- C) Optional via Thinking Toggle for interested users

**A:** C (Thinking Toggle respects user choice; most won't click it)

---

## Final Thought

> **The presence of transparency is as important as the transparency itself.**
> 
> Users don't need to read every log or understand every decision. But they need to *know* they could if they wanted to. That option—just existing—is what builds trust.

---

**Skill mastery checklist:**
- [ ] I understand why traditional spinners fail for AI
- [ ] I can write status messages using the Action + Item + Limits formula
- [ ] I can match tone to task risk
- [ ] I can choose the right pattern (Breadcrumb, Checklist, Toggle, etc.)
- [ ] I understand when to design for partial success
- [ ] I can disentangle external services from AI failures
- [ ] I can design audit trails that don't leak secrets
- [ ] I'm ready to conduct user research on transparency

**You're now ready to build truly transparent agentic AI experiences.** 🚀
