# AGENTS.md

## Purpose

This file is the universal engineering contract for AI coding agents and human developers working in this repository.

It is intentionally **project-agnostic**. Do not assume the repository is a particular product, framework, database, hosting provider, or AI provider unless the repository configuration, documentation, or task explicitly establishes it.

Every agent—Codex, Claude, Gemini, Cursor, Copilot, or another coding agent—must follow these rules.

The objective is to build production-quality software that is:

- Correct
- Secure
- Fast
- Accessible
- SEO-friendly when public content is intended to be indexed
- Maintainable
- Scalable without premature complexity
- Observable
- Cost-conscious
- Easy for another senior engineer to understand

Do not optimize for architectural impressiveness. Optimize for the actual product.

---

# 1. Non-Negotiable Workflow

Before doing **any task**:

1. Read `AGENTS.md`.
2. Inspect the repository structure.
3. Read the relevant documentation.
4. Inspect existing implementation before creating new code.
5. Inspect the `.agents/` directory.
6. Read **every relevant skill/instruction file in `.agents/` before implementing the task**.
7. Check for nested/local `AGENTS.md` or equivalent instruction files that apply to the files being changed.
8. Identify the existing stack, conventions, scripts, environment variables, and architecture.
9. Reuse existing code where appropriate.
10. Plan the smallest complete implementation.
11. Implement.
12. Run relevant tests, type checks, linting, builds, and verification.
13. Review the diff.
14. Remove debugging code and unnecessary dependencies.
15. Commit every meaningful completed change.

### Skills rule

The `.agents/` directory is part of the project's development workflow.

If `.agents/` exists:

- Read the relevant skill files before every task.
- Do not assume you remember their contents from a previous task.
- If multiple skills apply, read all of them.
- Follow repository-local skills over generic assumptions when they do not conflict with higher-priority instructions.

If `.agents/` does not exist, inspect the repository for other agent/developer instructions and available tooling before implementation.

Never skip the skills/instructions step simply because the task appears small.

---

# 2. Understand Before Changing

Never start by rewriting code.

Before modifying a feature:

- Find the current implementation.
- Find related components.
- Find related API routes.
- Find related services.
- Find related schemas/types.
- Find related database models and queries.
- Find existing tests.
- Find existing utilities.
- Find existing error handling.
- Find existing authentication/authorization.
- Find existing design tokens.
- Find existing SEO configuration.
- Find existing caching and performance infrastructure.

Prefer extending the existing architecture over creating parallel implementations.

Do not create a second:

- API client
- auth service
- database connection
- logger
- validation helper
- HTTP client
- error handler
- cache utility
- Button
- Modal
- Toast
- form abstraction
- SEO utility

when a suitable implementation already exists.

---

# 3. Product Context

The current product may be an AI-powered web application, website builder, coding environment, chat application, SaaS product, dashboard, or another software product.

For AI-powered products, assume:

- Users may chat with AI models.
- Users may generate or modify code.
- Users may generate websites or application interfaces.
- Users may use tools or agents.
- AI output is untrusted input.
- User-generated code is untrusted input.
- Tool calls can have security and cost implications.
- Model providers can fail, timeout, rate-limit, or return malformed output.
- Prompts can attempt to manipulate application behavior.
- Users may intentionally or accidentally submit secrets.

Do not assume a specific AI provider unless the repository explicitly requires one.

The architecture must allow the model/provider layer to change without forcing unrelated application code to change.

---

# 4. Core Engineering Philosophy

Prioritize:

1. Correctness
2. Security
3. User experience
4. Performance
5. Accessibility
6. Reliability
7. Maintainability
8. SEO where applicable
9. Scalability
10. Simplicity

Avoid:

- Premature microservices
- Unnecessary abstractions
- Excessive dependencies
- Clever code
- Giant files
- Giant functions
- Duplicate implementations
- Premature distributed systems
- Premature caching infrastructure
- Premature database sharding
- Premature load balancers
- Enterprise architecture for a small product

A simple modular monolith is usually preferable until real requirements justify additional infrastructure.

---

# 5. Technology and Dependency Policy

Use the repository's existing stack unless there is a strong technical reason to change it.

Use the latest stable compatible versions rather than blindly using the newest release.

Before adding a dependency, verify:

1. It is actively maintained.
2. It is widely used or appropriately trusted for the problem.
3. It solves a real problem.
4. It does not duplicate an existing dependency.
5. It is compatible with the current stack.
6. Its bundle/runtime cost is justified.
7. It has acceptable security and licensing characteristics.

## Reuse Established Packages

If a requirement can be solved safely and cleanly by a mature, widely adopted package, **use the package instead of implementing a complex equivalent from scratch**.

Examples include:

- Authentication
- Password hashing
- Cryptography
- OAuth/OIDC
- JWT handling
- Schema validation
- HTML sanitization
- Markdown parsing
- Date/time handling
- Image processing
- Rate limiting
- HTTP clients
- Routing
- Accessible UI primitives
- Form management
- Virtualized lists
- Observability
- Structured logging

Do not hand-roll cryptography, password hashing, token signing, sanitization, OAuth, or security-sensitive primitives.

However, do not install a large package for a trivial operation that the platform already handles safely.

Preferred decision order:

```text
Existing project capability
>
Mature standard/platform capability
>
Existing trusted dependency
>
Small focused dependency
>
Large dependency
>
Custom implementation
```

Custom code is appropriate when the requirement is genuinely product-specific or a dependency would introduce disproportionate complexity.

---

# 6. Package Manager

Use the package manager already established by the repository.

If the repository uses `pnpm`, use `pnpm` exclusively.

Do not silently switch between:

- npm
- yarn
- bun
- pnpm

Do not manually edit lockfiles.

Commit the lockfile when dependency changes are intentional.

Never install dependencies globally merely to make the project work locally.

---

# 7. TypeScript and Type Safety

Use TypeScript when the project uses TypeScript.

Avoid `any` unless there is a documented and unavoidable reason.

Prefer:

- explicit domain types
- inferred types where safe
- discriminated unions
- generics where useful
- schema-derived types
- narrow types
- exhaustive handling

Use schema libraries such as Zod when already present or when runtime validation is required.

Do not duplicate types manually when a runtime schema can safely be the source of truth.

---

# 8. Architecture

Prefer clear domain boundaries.

A reasonable full-stack structure may resemble:

```text
/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   ├── shared/
│   ├── config/
│   └── ui/
├── .agents/
├── AGENTS.md
├── package.json
├── lockfile
└── ...
```

This is only a guideline.

Do not create a monorepo, package, service, or layer simply because it looks professional.

Use shared packages only for genuinely shared concerns such as:

- schemas
- types
- constants
- UI primitives
- API contracts
- utility code that is truly platform-safe

Never expose server-only code to the browser.

---

# 9. Frontend Architecture

Use the framework's intended rendering, routing, data-fetching, and server capabilities.

Prefer:

- server rendering where useful
- static generation where appropriate
- route-level organization
- feature/domain-based modules
- reusable UI primitives
- minimal client-side JavaScript
- client components only where interaction requires them

Do not make the entire application client-rendered by default.

Keep business logic out of presentation components when it belongs in domain/service layers.

---

# 10. State Management

Separate server state from client state.

Use the existing project solution for server state when available.

Typical server-state concerns:

- API data
- AI conversations
- project data
- user profile
- usage information
- generated files
- paginated resources
- server-side search results

Typical client-state concerns:

- dialogs
- temporary UI preferences
- editor state
- local interaction state
- ephemeral wizard state

Do not duplicate server state across multiple state-management systems.

Do not add Redux or another global state library unless the application has a concrete requirement that existing solutions cannot reasonably handle.

---

# 11. API Communication

Use one centralized API communication layer where appropriate.

Centralize:

- base URL
- credentials
- timeout
- request IDs
- retry behavior
- authentication handling
- refresh behavior
- error normalization
- cancellation
- telemetry

Do not scatter API configuration throughout components.

Use request cancellation for obsolete requests.

Never expose private API credentials to the browser.

---

# 12. Validation

Validate all untrusted data at trust boundaries.

Validate:

- request bodies
- query parameters
- route parameters
- form submissions
- uploaded file metadata
- authentication input
- tool arguments
- AI-generated structured output
- webhook payloads
- environment variables
- API responses when trust cannot be assumed

Client-side validation is for user experience.

Server-side validation is for security.

Both may be necessary.

---

# 13. Forms

Use the existing mature form library if the repository has one.

For non-trivial forms, prefer:

```text
Form library
+
Runtime schema validation
+
Server-side validation
```

Forms should:

- show useful validation errors
- prevent duplicate submissions
- preserve useful input
- handle loading states
- handle server errors
- be keyboard accessible
- support mobile interaction
- avoid unnecessary re-renders

---

# 14. UI and Design System

Use the project's existing design system as the source of truth.

Prefer existing:

- components
- tokens
- typography
- spacing
- radii
- colors
- interaction patterns
- accessibility primitives

Do not introduce a second UI framework without a strong reason.

Do not create arbitrary visual values when a design token exists.

Prefer semantic tokens over repeated raw values.

---

# 15. Responsive Design

Design intentionally for:

- mobile
- tablet
- desktop
- large screens

Do not simply shrink desktop layouts.

Test important flows at realistic narrow widths.

Check for:

- horizontal overflow
- inaccessible controls
- unusable dialogs
- text clipping
- oversized inputs
- poor keyboard behavior
- touch target problems

---

# 16. Accessibility

Accessibility is a product requirement.

Use:

- semantic HTML
- keyboard navigation
- visible focus states
- labels
- accessible names
- correct heading hierarchy
- accessible dialogs
- accessible form errors
- sufficient contrast
- reduced-motion support
- appropriate ARIA only when necessary

Do not use a `div` as a button when a `button` is appropriate.

Do not remove focus indicators without providing an equivalent accessible treatment.

---

# 17. Motion

Use the project's existing animation library.

Animation should improve:

- feedback
- hierarchy
- continuity
- perceived responsiveness
- delight

Avoid:

- excessive animation
- long transitions
- blocking animations
- decorative animation everywhere
- infinite distracting loops

Respect:

```css
prefers-reduced-motion
```

Do not add a second animation library unless a concrete requirement justifies it.

---

# 18. AI Application Architecture

For AI-powered products, separate these concerns:

```text
UI
→ Application/API layer
→ AI orchestration layer
→ Provider adapter
→ Model provider
```

Do not scatter provider-specific SDK calls throughout React components.

Create a provider abstraction when multiple models/providers may be used.

Keep model configuration server-side where possible.

The server should control:

- provider credentials
- model availability
- system prompts that must remain private
- tool permissions
- usage limits
- quotas
- cost controls
- safety policies
- request timeouts
- retry policy
- provider routing

---

# 19. AI Output Is Untrusted

Treat all AI-generated content as untrusted.

Never assume model output is:

- safe HTML
- safe Markdown
- valid JSON
- safe code
- safe shell commands
- safe URLs
- safe tool arguments

Validate structured output against a schema.

Sanitize HTML before rendering it.

Use a mature sanitizer instead of writing an ad-hoc sanitizer.

Do not execute generated code in the main application process.

---

# 20. AI Code Execution and Sandboxing

If users can generate or execute code:

- Never execute untrusted code directly on the application server.
- Use an isolated sandbox/runtime when execution is required.
- Restrict CPU.
- Restrict memory.
- Restrict execution time.
- Restrict filesystem access.
- Restrict process capabilities.
- Restrict network access.
- Use explicit network allowlists where practical.
- Never expose host secrets.
- Never mount production credentials.
- Never give generated code unrestricted access to internal services.
- Destroy or reset disposable environments when appropriate.

Treat generated code as potentially malicious even when it was produced by your own model.

---

# 21. Prompt Injection and Tool Security

Assume users can attempt to manipulate agents into:

- revealing secrets
- bypassing permissions
- calling unauthorized tools
- reading private files
- making expensive requests
- accessing internal URLs
- executing dangerous code

Never rely on the model to enforce authorization.

The application must enforce:

```text
User
→ Authentication
→ Authorization
→ Tool permission
→ Input validation
→ Execution
```

Tool descriptions and prompts are not security boundaries.

Every sensitive tool must enforce authorization independently on the server.

---

# 22. AI Usage, Cost, and Abuse Controls

AI endpoints can be significantly more expensive than normal API endpoints.

Implement appropriate controls such as:

- per-user rate limits
- request size limits
- token/input limits
- output limits
- concurrency limits
- model-specific quotas
- usage accounting
- request timeouts
- cancellation
- retry budgets
- provider fallback only when justified
- abuse detection
- spend ceilings where appropriate

Do not allow a client to choose unrestricted model/provider settings if that could bypass product-level cost controls.

Never trust a client-provided usage count.

Usage accounting must be calculated and enforced server-side.

---

# 23. Authentication

Use a mature authentication solution where practical.

If custom authentication is required:

- Use short-lived access credentials.
- Use longer-lived refresh credentials only when necessary.
- Rotate refresh credentials where appropriate.
- Support revocation.
- Hash stored refresh tokens where appropriate.
- Never store plaintext passwords.
- Never log credentials.
- Never return secrets in API responses.

Do not invent cryptographic protocols.

---

# 24. Token Storage

Never store sensitive long-lived authentication tokens in `localStorage`.

For browser applications, prefer secure server-managed authentication patterns such as:

- `HttpOnly`
- `Secure`
- appropriate `SameSite`
- HTTPS in production

Minimize token lifetime and browser exposure.

If an architecture intentionally uses a different token strategy, document the threat model and reason.

Never expose private API keys or provider credentials to client-side JavaScript.

---

# 25. Server-Side Authorization and Permissions

Authentication is not authorization.

Every protected operation must enforce authorization on the server.

Never trust:

- user IDs from the client
- project IDs from the client
- organization IDs from the client
- ownership flags from the client
- role names from the client

Always derive identity from the authenticated server-side session/token and verify resource ownership/permissions server-side.

Use a clear permission model such as:

```text
User
→ Organization/Workspace
→ Project
→ Resource
→ Action
```

where applicable.

---

# 26. Row-Level Security / Database Permissions

If the database supports native Row-Level Security, such as PostgreSQL/Supabase:

- Enable RLS for user-accessible tables.
- Define explicit policies.
- Default to deny.
- Test policies for both allowed and forbidden access.
- Do not rely only on frontend restrictions.
- Keep service-role credentials server-side.
- Never expose privileged database keys to the browser.

If the database does **not** support RLS, such as MongoDB:

- Do not pretend RLS exists.
- Enforce equivalent authorization in server-side queries/services.
- Scope queries by authenticated user/tenant/workspace.
- Prevent cross-tenant access.
- Test ownership boundaries.

Authorization must remain server-side regardless of database technology.

---

# 27. Database Engineering

Use the database already established by the project unless there is a real requirement to change it.

Principles:

- Create only required models/tables.
- Validate schemas.
- Add indexes based on actual query patterns.
- Use projections/selects.
- Use pagination.
- Avoid N+1 queries.
- Use transactions where correctness requires them.
- Use connection pooling where supported.
- Avoid unbounded queries.
- Avoid unnecessary joins/population.
- Avoid fetching fields the current screen does not need.

Do not add multiple databases merely for architectural fashion.

---

# 28. Database Indexing

Indexes should support real query patterns.

Before adding an index:

1. Identify the query.
2. Check query frequency.
3. Check query plan/performance where possible.
4. Consider write/storage overhead.
5. Add the smallest useful index.
6. Verify the result.

Do not create indexes on every field.

Review indexes as the application evolves.

---

# 29. Pagination and Large Data

Never return unlimited records.

Use:

- cursor pagination for high-volume feeds where appropriate
- page-based pagination where appropriate
- virtualization for genuinely large client-side lists
- server-side filtering
- selective fields

Do not load thousands of records into the browser just to filter them locally.

---

# 30. Caching

Cache only where it provides real value.

Possible cache layers:

```text
Browser
→ CDN
→ Server/application cache
→ Database
```

Use the appropriate layer for the data.

Cache candidates may include:

- public static assets
- public metadata
- expensive read-heavy queries
- stable configuration
- safe AI/provider metadata

Never cache sensitive personalized responses publicly.

Every cache must have a clear invalidation or freshness strategy.

A cache without an invalidation strategy is a future bug.

---

# 31. API Response and Network Optimization

Reduce:

- request count
- duplicate requests
- payload size
- unnecessary polling
- unnecessary prefetching

Use:

- compression
- selective fields
- pagination
- batching where useful
- caching
- request deduplication
- request cancellation
- streaming where appropriate

Do not send data the current UI does not need.

---

# 32. Frontend Performance

Use appropriate techniques including:

- route-level code splitting
- lazy loading
- dynamic imports
- tree-shaking
- image optimization
- responsive images
- CDN delivery
- caching
- avoiding unnecessary client components
- avoiding unnecessary re-renders
- virtualization for genuinely large lists
- pagination/infinite loading
- debounced search
- request cancellation
- query caching
- selective prefetching
- deferred non-critical work

Do not blindly add:

```ts
memo()
useMemo()
useCallback()
```

Measure or identify a real rendering problem first.

---

# 33. Bundle Optimization

Keep JavaScript and CSS payloads small.

- Remove unused dependencies.
- Remove dead code.
- Prefer tree-shakeable imports.
- Avoid importing entire libraries unnecessarily.
- Lazy-load expensive features.
- Split editor/code-generation functionality from the public landing page when possible.
- Keep analytics and third-party scripts non-blocking.
- Defer non-critical scripts.
- Avoid shipping development-only code to production.
- Inspect bundle size when performance matters.

For an AI builder, code editors, preview runtimes, syntax highlighters, and AI SDKs can be expensive. Load them only where needed.

---

# 34. Image and Asset Optimization

Use a CDN or image optimization service when appropriate.

Prefer:

- AVIF/WebP where supported
- responsive dimensions
- correctly sized images
- lazy loading below the fold
- eager loading only for critical above-the-fold assets
- immutable cache headers for hashed assets
- optimized OG images
- compressed SVGs where appropriate

Never serve enormous original images when a smaller derivative is sufficient.

Validate user uploads.

---

# 35. Server Performance and Scalability

Design the server to be stateless where practical.

Use:

- connection pooling
- efficient database queries
- caching where justified
- compressed responses
- timeouts
- bounded concurrency
- background jobs for long-running work
- streaming for suitable AI responses

A load balancer is appropriate when production traffic requires horizontal scaling.

Do not add a load balancer to local development merely because the architecture might eventually scale.

When horizontal scaling is justified:

```text
CDN / Load Balancer
→ Multiple application instances
→ Shared database
→ Shared cache/session infrastructure where required
```

Never depend on process-local memory for critical persistent state.

---

# 36. Long-Running and Background Work

Do not block normal HTTP requests with long-running jobs when a background worker is more appropriate.

Potential background tasks:

- large AI generation
- document processing
- image processing
- indexing
- email
- analytics aggregation
- cleanup
- scheduled jobs

Use a queue/worker only when the workload justifies it.

Make jobs:

- retryable where safe
- idempotent where possible
- observable
- bounded
- cancellable where appropriate

---

# 37. Rate Limiting

Rate-limit all requests according to risk and cost.

Higher-risk endpoints include:

- authentication
- password operations
- OTP/email sending
- AI generation
- tool execution
- uploads
- expensive searches
- webhooks
- public APIs

Use distributed rate limiting when the application is horizontally scaled.

Do not rely only on in-memory rate limits in a multi-instance production system.

Avoid limits so aggressive that normal usage becomes frustrating.

---

# 38. Request Limits and Abuse Prevention

Apply sensible limits to:

- body size
- URL length
- upload size
- prompt length
- generated output
- batch size
- pagination size
- concurrency
- tool execution
- AI token budgets

Reject obviously abusive requests early.

Do not allow clients to bypass limits by changing query parameters or headers.

---

# 39. CORS

Production CORS must allow only known origins.

Never use:

```text
*
```

for credentialed authentication requests.

Keep development and production origins separate.

Only expose the methods and headers required by the application.

CORS is not an authorization mechanism.

---

# 40. Security Headers

Use appropriate production security headers, including where applicable:

- Content-Security-Policy
- Strict-Transport-Security
- X-Content-Type-Options
- Referrer-Policy
- frame protection / `frame-ancestors`
- Permissions-Policy

Do not blindly copy a CSP from another application.

Test the policy against the application's actual scripts, styles, frames, images, fonts, and API connections.

---

# 41. Cross-Site Scripting Prevention

Prevent XSS at every rendering boundary.

- Prefer framework-safe rendering.
- Never inject raw HTML unnecessarily.
- Sanitize untrusted HTML with a mature maintained sanitizer.
- Treat Markdown as untrusted.
- Sanitize or safely render AI-generated content.
- Validate URLs before rendering links.
- Avoid dangerous DOM APIs unless absolutely necessary.
- Do not construct HTML using string concatenation.
- Use a strong CSP as an additional layer.

Do not rely on CSP alone.

---

# 42. CSRF Protection

If authentication uses cookies:

- Evaluate CSRF risk for every state-changing endpoint.
- Use appropriate `SameSite` settings.
- Use CSRF tokens where the architecture requires them.
- Validate origins/referers where appropriate.
- Never assume CORS alone prevents CSRF.

---

# 43. SSRF and Internal Network Protection

If users or AI agents can provide URLs:

- Validate URLs server-side.
- Restrict protocols.
- Block access to internal/private network ranges where appropriate.
- Protect cloud metadata endpoints.
- Restrict redirects.
- Apply request timeouts and size limits.
- Use an allowlist when the feature permits it.

Never let an AI agent freely fetch arbitrary internal URLs.

---

# 44. Injection Prevention

Prevent:

- SQL injection
- NoSQL injection
- command injection
- template injection
- path traversal
- LDAP injection where applicable
- header injection

Use parameterized queries and trusted libraries.

Never build shell/database commands by concatenating untrusted user input.

---

# 45. Secrets Management

All secrets belong in secure server-side environment/configuration systems.

Never commit:

- `.env`
- `.env.local`
- production secrets
- API private keys
- database passwords
- JWT secrets
- OAuth client secrets
- SMTP passwords
- service-role keys
- cloud credentials
- AI provider keys

Commit only safe templates such as:

```text
.env.example
```

with placeholders.

Anything shipped to the browser must be considered public.

---

# 46. API Secret Protection

For AI applications especially:

- Keep model/provider API keys server-side.
- Never put private keys in browser bundles.
- Never expose them through public environment variables.
- Never send them to the client.
- Never print them in logs.
- Never store them in browser storage.
- Rotate compromised keys immediately.

The browser should call your controlled backend/API rather than directly receiving private provider credentials.

---

# 47. Logging

Use structured logging when appropriate.

Production logs should help diagnose failures without exposing secrets.

Never log:

- passwords
- OTPs
- access tokens
- refresh tokens
- cookies
- Authorization headers
- API keys
- provider secrets
- database credentials
- private keys
- full sensitive user content
- unnecessary personal data

Avoid noisy `console.log()` calls.

Remove debugging output before completing a task.

Use correlation/request IDs when useful.

---

# 48. Error Handling

Use centralized error handling.

Public errors should be safe and useful.

Never expose:

- stack traces
- internal file paths
- SQL/MongoDB errors
- environment variables
- secrets
- provider credentials
- internal infrastructure details

Internally retain enough context for debugging.

Return stable application-level error codes where useful.

---

# 49. Production Debugging

Production builds must not expose development debugging features.

Before production:

- disable verbose debug modes
- remove debug panels
- remove development-only routes
- remove test credentials
- remove fake data
- remove sensitive logs
- verify source-map policy
- verify error exposure
- verify admin/debug endpoints are protected or removed

Do not expose internal AI prompts, tool schemas, provider credentials, or infrastructure information through client debugging tools.

---

# 50. SEO: General Rules

SEO applies to **public, indexable content**.

Private application screens, authenticated dashboards, user workspaces, internal editors, and sensitive generated content should generally not be indexed.

Every public page should have an intentional SEO strategy.

Avoid keyword stuffing.

Optimize for:

- useful content
- search intent
- clear information architecture
- descriptive titles
- useful meta descriptions
- semantic HTML
- crawlable URLs
- internal linking
- performance
- accessibility
- structured data where appropriate
- unique content

SEO must serve users first.

---

# 51. SEO Metadata

Public pages should have:

- unique `<title>`
- unique meta description
- canonical URL
- appropriate robots directives
- Open Graph metadata
- social sharing metadata
- favicon
- theme/color metadata where appropriate

Do not use one generic title and description for the entire website.

Generate metadata from page content where the framework supports it.

Never expose private user data in metadata.

---

# 52. SEO Title and Description

Titles should be:

- unique
- descriptive
- concise
- aligned with the page's actual content
- naturally keyword-relevant

Descriptions should:

- accurately summarize the page
- communicate user value
- use relevant terms naturally
- avoid keyword stuffing
- avoid misleading claims

Do not repeat keywords unnaturally.

---

# 53. Keyword Strategy

Before adding keywords:

1. Identify the page's search intent.
2. Identify the primary topic.
3. Identify useful secondary terms.
4. Write natural copy.
5. Place terms where they genuinely help users.

Relevant locations may include:

- page title
- H1
- headings
- body copy
- image alt text when descriptive
- URLs
- internal links
- structured data where accurate

Do not create pages solely to target keyword variations with little unique value.

---

# 54. Sitemap

Create and maintain:

```text
/sitemap.xml
```

or the framework's equivalent sitemap route.

Include only:

- canonical
- public
- indexable
- useful URLs

Exclude:

- login
- signup
- settings
- dashboards
- private workspaces
- internal editor routes
- API routes
- temporary URLs
- duplicate URLs
- pages marked `noindex`

Update sitemap behavior automatically when public content changes where practical.

Do not manually maintain thousands of URLs if the framework can generate the sitemap safely.

---

# 55. Robots.txt

Create:

```text
/robots.txt
```

Use it to:

- identify the sitemap
- control crawler access to clearly private/non-public paths
- avoid unnecessary crawling of internal routes

Do not use `robots.txt` as a security mechanism.

A disallowed URL may still be discoverable.

Private content must be protected by authentication/authorization and appropriate `noindex` behavior.

---

# 56. Google Search Console

For production websites intended for Google Search:

1. Verify the domain/property in Google Search Console.
2. Prefer domain-level verification when DNS access is available.
3. Otherwise use the supported verification method appropriate to the deployment.
4. Submit the sitemap.
5. Monitor indexing coverage.
6. Monitor Core Web Vitals.
7. Monitor crawl errors.
8. Inspect important public URLs after deployment.
9. Re-check indexing after major routing/SEO changes.

Do not commit verification secrets or DNS credentials to the repository.

Search Console is an operational SEO tool; it is not a substitute for correct metadata and crawlable architecture.

---

# 57. Canonical URLs

Every indexable public page should have a correct canonical URL when duplicate/variant URLs are possible.

Avoid:

- duplicate content through query parameters
- inconsistent trailing-slash behavior
- HTTP/HTTPS duplication
- www/non-www duplication
- duplicate route aliases

Canonical URLs must point to the actual preferred public URL.

---

# 58. Open Graph and Social Metadata

Set up an appropriate default OG image.

At minimum support:

- `og:title`
- `og:description`
- `og:image`
- `og:url`
- `og:type`
- `og:site_name`

Where appropriate also support:

- `twitter:card`
- `twitter:title`
- `twitter:description`
- `twitter:image`

Use a real branded OG image rather than a generic placeholder.

Recommended default dimensions:

```text
1200 × 630
```

Generate page-specific OG images when they materially improve sharing.

Do not expose private project names, user content, prompts, or generated code in public OG metadata.

---

# 59. Structured Data

Use JSON-LD only when the schema accurately represents the page.

Possible schemas depending on the product include:

- Organization
- WebSite
- SoftwareApplication
- WebPage
- BreadcrumbList
- Article
- FAQPage only when the content genuinely qualifies

Do not add structured data simply to manipulate search results.

Do not mark up content that users cannot actually see.

Validate structured data before shipping.

---

# 60. SEO for AI-Generated Content

AI-generated content does not automatically deserve indexing.

Before making AI-generated pages public:

- ensure the content provides genuine user value
- avoid thin or repetitive pages
- avoid mass-generated doorway pages
- avoid programmatic keyword stuffing
- provide meaningful page structure
- ensure canonical URLs
- prevent duplicate generated pages
- allow indexing only when the content is intentionally public

User-generated projects should default to private unless the product explicitly makes them public.

---

# 61. SEO and Application Routes

Separate public marketing/content routes from private application routes.

Example:

```text
Public:
/
 /features
 /pricing
 /docs
 /templates
 /blog
 /public-project/<slug>

Private:
 /app
 /dashboard
 /settings
 /workspace
 /editor
 /projects/<id>
```

Public routes should be optimized for crawling.

Private routes should be protected and generally excluded from indexing.

Do not expose private project IDs or content through public metadata.

---

# 62. Core Web Vitals

Monitor and optimize:

- LCP
- INP
- CLS

Also monitor:

- TTFB
- JavaScript execution time
- hydration cost
- image payloads
- font loading
- third-party scripts

Do not sacrifice usability for a synthetic score.

Measure real bottlenecks before adding complexity.

---

# 63. CDN and Delivery

Use a CDN when the deployment platform provides one or when traffic justifies it.

CDN candidates:

- static assets
- images
- fonts
- public pages
- immutable build assets
- public API responses that are safe to cache

Never publicly cache personalized or authenticated data unless the cache key and security model make it safe.

Use appropriate cache-control headers.

---

# 64. Compression and Transport

Enable appropriate HTTP compression such as Brotli or gzip where supported.

Use:

- HTTP/2 or HTTP/3 where available
- compressed API payloads
- optimized asset formats
- connection reuse
- efficient caching

Do not compress data where compression creates a known security risk or provides no meaningful benefit.

---

# 65. Loading States

Every asynchronous interaction should have an intentional state.

Use:

- skeletons
- progress indicators
- disabled controls
- streaming UI for AI responses
- optimistic updates only where safe

Skeletons should resemble the final content structure.

Do not create huge animated skeletons that waste resources.

For AI applications, distinguish:

- waiting
- connecting
- streaming
- tool execution
- completed
- cancelled
- failed

---

# 66. Error and Empty States

Important data-fetching flows need:

- loading
- success
- empty
- error

AI flows should additionally consider:

- provider unavailable
- quota exceeded
- request cancelled
- timeout
- malformed model output
- tool failure
- safety/policy rejection
- partial generation

Errors should tell the user what they can do next without exposing internal details.

---

# 67. Search and Filtering

Search inputs should not issue unnecessary requests on every keystroke.

Use:

- debounce where appropriate
- cancellation
- stable query keys
- server-side filtering for large datasets
- pagination
- appropriate caching

Prevent race conditions where older responses overwrite newer results.

---

# 68. Database and API Query Efficiency

For every expensive query consider:

- correct indexes
- projection/selects
- pagination
- batching
- caching
- aggregation
- query plan
- N+1 behavior
- connection pooling

Do not optimize blindly.

Measure when possible.

---

# 69. Connection Pooling

Use database connection pooling appropriate to the database and deployment model.

Avoid creating a new database connection for every request.

Be careful with serverless environments where excessive connection creation can exhaust database limits.

Reuse connections safely according to the framework/runtime.

---

# 70. Background Caching and Expensive Queries

Cache expensive queries only when:

- the data is safe to cache
- the cache key is correct
- freshness is acceptable
- invalidation is understood

Potential candidates:

- public metadata
- expensive aggregations
- stable configuration
- popular public content

Never cache user-specific data under a shared public key.

---

# 71. Code Splitting and Lazy Loading

Split large features by route or capability.

Especially consider lazy loading:

- code editors
- preview runtimes
- syntax highlighters
- charts
- heavy AI tooling
- large visual editors
- admin-only features

Do not lazy-load critical above-the-fold content when it makes the initial experience worse.

---

# 72. Third-Party Scripts

Treat third-party scripts as performance and security dependencies.

For each third-party script:

- confirm it is necessary
- load it only where needed
- defer non-critical scripts
- use appropriate CSP configuration
- avoid blocking rendering
- review data/privacy implications

Remove unused analytics and marketing scripts.

---

# 73. Privacy

Collect only data required by the product.

Do not add:

- unnecessary tracking
- device fingerprinting
- unnecessary personal information
- unnecessary cookies
- hidden telemetry

Document meaningful telemetry.

Never log private AI conversations or generated code unless the product explicitly requires it and the privacy/security model supports it.

---

# 74. File Upload Security

Never trust client-provided:

- filename
- MIME type
- extension
- size

Validate uploads server-side.

Apply:

- size limits
- format limits
- content validation
- safe storage
- access control
- malware scanning where appropriate

Never allow arbitrary executable uploads into an executable server directory.

---

# 75. Webhooks

Webhook endpoints must:

- authenticate/verify signatures
- validate payloads
- enforce replay protection where appropriate
- be idempotent
- handle retries
- return appropriate status codes
- avoid logging secrets
- avoid duplicate processing

Never trust webhook payloads simply because they came from a URL.

---

# 76. Idempotency

Use idempotency for operations where duplicate requests could cause damage or cost.

Examples:

- payments
- AI job creation
- expensive generation
- email sending
- resource creation
- webhook processing
- background jobs

Do not create duplicate resources because a client retried a request.

---

# 77. API Reliability

Important API flows must be verified end-to-end:

```text
Request
→ Validation
→ Authentication
→ Authorization
→ Business logic
→ Database/service
→ Response
→ Frontend state update
```

Do not stop at "the route compiles."

Test:

- success
- invalid input
- unauthorized access
- forbidden access
- not found
- timeout
- rate limit
- dependency failure
- duplicate request
- malformed response

---

# 78. AI Streaming Reliability

If AI responses stream:

- support cancellation
- handle disconnects
- handle partial output
- handle provider errors
- clean up abandoned requests
- avoid duplicate persistence
- persist final state reliably
- prevent stale streams from overwriting newer state

Do not assume a stream always completes successfully.

---

# 79. Observability

For production systems, use appropriate:

- structured logs
- metrics
- traces where justified
- request IDs
- error tracking
- uptime monitoring
- database monitoring
- AI provider latency/error metrics
- token/usage metrics

Monitor meaningful product and infrastructure signals.

Do not collect sensitive data merely because an observability system can collect it.

---

# 80. Testing

Test behavior that can break the product.

Prioritize:

- authentication
- authorization
- database permissions/RLS
- validation
- security-sensitive flows
- AI orchestration
- tool permissions
- rate limiting
- usage limits
- critical API routes
- important business logic
- error states
- pagination
- search/filtering

Do not chase arbitrary test coverage percentages.

Use the project's existing test framework.

---

# 81. Security Testing

For security-sensitive features test:

- unauthorized access
- cross-user access
- cross-tenant access
- expired credentials
- revoked credentials
- malformed input
- XSS payloads
- CSRF scenarios where applicable
- SSRF scenarios where URLs are accepted
- injection attempts
- oversized requests
- rate-limit behavior
- privilege escalation
- secret exposure
- tool authorization bypasses

---

# 82. Performance Verification

When optimizing, verify the result.

Inspect as appropriate:

- bundle size
- initial HTML size
- JavaScript size
- CSS size
- Core Web Vitals
- TTFB
- API latency
- database query time
- network request count
- cache hit rate
- image payload size
- memory usage
- unnecessary renders

Do not claim an optimization exists unless it has actually been implemented.

---

# 83. Dependency Hygiene

Periodically inspect dependencies.

Remove:

- unused packages
- duplicate packages
- abandoned packages
- unnecessarily large packages

Do not replace stable dependencies during unrelated feature work without a reason.

Security updates should be evaluated promptly.

---

# 84. Do Not Rewrite Unnecessarily

If existing code works, do not rewrite it simply because you prefer another style.

Change it when it is:

- incorrect
- insecure
- unnecessarily slow
- difficult to maintain
- incompatible with the required feature
- causing a measurable problem

Keep unrelated changes out of the task.

---

# 85. Git Initialization and Commit Policy

Every new project/repository must initialize a local Git repository if one does not already exist.

Before substantial changes:

```text
Inspect
→ Understand
→ Plan
→ Implement
```

After each meaningful completed change:

```text
Test
→ Review
→ Clean up
→ Commit
```

Use meaningful conventional-style commits such as:

```text
chore: initialize project
feat: add AI chat streaming
feat: add public project pages
feat: add SEO metadata
feat: add sitemap and robots
fix: prevent unauthorized project access
perf: reduce editor bundle size
perf: cache public project queries
security: tighten API rate limits
security: add CSP headers
refactor: extract provider adapter
```

Do not create giant commits containing unrelated work.

Never knowingly commit broken code unless the task explicitly requires an intermediate state.

Never commit:

- secrets
- `.env`
- build output
- `node_modules`
- temporary files
- debug artifacts
- local credentials

---

# 86. Git Before and After Changes

Before substantial work:

1. Inspect repository state.
2. Inspect current branch/status.
3. Read relevant instructions and skills.
4. Understand current implementation.
5. Avoid unrelated rewrites.

After meaningful work:

1. Run relevant checks.
2. Fix errors.
3. Review changed files.
4. Remove debug code.
5. Check secrets.
6. Check unused dependencies.
7. Check the final diff.
8. Commit the completed change.

---

# 87. Feature Development Process

For every feature:

## Step 1 — Understand

Read:

- `AGENTS.md`
- all relevant `.agents/` skills
- nested instructions
- existing implementation
- related components
- related API
- related services
- related database models
- related tests

## Step 2 — Plan

Identify:

- frontend changes
- backend changes
- database changes
- permissions
- validation
- security implications
- SEO implications
- performance implications
- loading/error states
- testing requirements
- observability requirements

## Step 3 — Implement

Build the smallest complete solution.

Reuse mature existing packages and project utilities.

## Step 4 — Integrate

Connect:

```text
UI
→ API
→ Validation
→ Authorization
→ Business logic
→ Database/provider
→ Response
→ UI state
```

## Step 5 — Verify

Test success and failure states.

## Step 6 — Optimize

Remove unnecessary:

- renders
- requests
- dependencies
- payload
- database work
- JavaScript
- logging
- abstractions

## Step 7 — Review

Check:

- security
- accessibility
- responsive behavior
- SEO where applicable
- performance
- error handling
- privacy
- secrets
- dependencies
- tests

## Step 8 — Commit

Create a focused meaningful Git commit.

---

# 88. Definition of Done

A task is not complete merely because it compiles.

A meaningful feature is complete when applicable:

- implementation works
- frontend/backend integration works
- validation works
- authentication works
- authorization works
- database permissions work
- loading state exists
- error state exists
- empty state exists
- responsive behavior works
- accessibility is reasonable
- SEO metadata exists for public pages
- private pages are protected from indexing
- no secrets are exposed
- no sensitive logs remain
- rate limits exist for risky endpoints
- relevant tests/checks pass
- obvious performance problems are addressed
- unused code is removed
- unused dependencies are removed
- production debugging is disabled
- the final diff is reviewed
- a meaningful Git commit exists

---

# 89. Final Decision Rule

When multiple technically valid implementations exist, prefer the one that is:

```text
Simpler
+
Safer
+
Faster
+
More maintainable
+
More observable
+
Easier to understand
```

Do not add infrastructure simply because it sounds scalable.

Do not write custom code when a mature, widely used package safely solves the problem.

Do not add dependencies simply because they are popular.

Do not trust the client for security.

Do not trust AI output as safe input.

Do not expose secrets.

Do not index private content.

Do not claim an optimization that was not measured or meaningfully implemented.

Build for today's real requirements while keeping clean boundaries that allow tomorrow's requirements to be added without a rewrite.
