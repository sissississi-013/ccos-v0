# Notion Setup Guide

## Step 1: Create a Notion Integration

1. Go to https://www.notion.so/my-integrations
2. Click **New integration**
3. Name it `sissiwang.me`
4. Select your workspace
5. Copy the **Internal Integration Token** (starts with `ntn_`)

## Step 2: Create 5 Databases

Create 5 **full-page databases** in Notion (one per section). Each database needs the following **shared properties**:

| Property      | Type         | Notes                                      |
|---------------|--------------|---------------------------------------------|
| **Name**      | Title        | Default column — the title of your entry    |
| **Slug**      | Text         | URL-friendly name, e.g. `my-first-blog`     |
| **Description** | Text       | Short summary shown on the card             |
| **Tags**      | Multi-select | Categories/labels for filtering             |
| **Date**      | Date         | Publication or creation date                |
| **Published** | Checkbox     | Only checked entries appear on the site     |

### Section-specific properties

**Projects** — add these extra columns:
| Property   | Type   | Notes                          |
|------------|--------|--------------------------------|
| **Link**   | URL    | Live project URL               |
| **GitHub** | URL    | GitHub repo URL                |
| **Status** | Select | Options: `active`, `completed`, `archived` |

**Art** — add this extra column:
| Property   | Type   | Notes                          |
|------------|--------|--------------------------------|
| **Medium** | Select | Options: `digital`, `oil`, `mixed media`, etc. |

**Research** — add these extra columns:
| Property   | Type   | Notes                          |
|------------|--------|--------------------------------|
| **Venue**  | Text   | e.g. `NeurIPS 2025`           |
| **PDF**    | URL    | Link to paper PDF              |

**Blogs** and **Life** — no extra properties needed.

### Cover images

Use Notion's built-in **page cover** on each entry. The site pulls cover images automatically.

## Step 3: Connect Each Database to Your Integration

For each of the 5 databases:

1. Open the database page in Notion
2. Click the **`...`** menu (top right)
3. Go to **Connections**
4. Find your `sissiwang.me` integration
5. Click **Connect**

## Step 4: Get Database IDs

Open each database in the browser. The URL looks like:

```
https://www.notion.so/your-workspace/abc123def456?v=...
                                      ^^^^^^^^^^^^
                                      this is the database ID
```

Copy the 32-character hex string before the `?v=` for each database.

## Step 5: Update `.env.local`

Open `/Users/sissi/Desktop/ccos/.env.local` and replace the placeholder values:

```
NOTION_API_KEY=ntn_your_integration_token_here
NOTION_BLOG_DB=your_blog_database_id
NOTION_PROJECT_DB=your_project_database_id
NOTION_ART_DB=your_art_database_id
NOTION_RESEARCH_DB=your_research_database_id
NOTION_LIFE_DB=your_life_database_id
```

## Step 6: Write Content

For each entry:

1. Add a new row to the relevant database
2. Fill in **Name**, **Slug**, **Description**, **Tags**, **Date**
3. Open the page and **write your content inside it** — the site renders:
   - Headings (h1, h2, h3)
   - Paragraphs
   - Images
   - Code blocks
   - Bulleted and numbered lists
   - Quotes and callouts
   - Toggles
   - Videos
   - Bookmarks
   - Dividers
4. Check **Published** when ready — the entry appears on the site

## Step 7: Auto-Update (After Deploying to Vercel)

Two mechanisms keep the site in sync with Notion:

### A) ISR (built-in)

Pages are cached and automatically refreshed periodically on Vercel.

### B) Instant updates via webhook

Set up a Notion automation for each database:

1. Open a database → click **`...`** → **Automations** → **New automation**
2. **Trigger**: "When a page is added" or "When a property is edited"
3. **Action**: "Send webhook"
   - **URL**: `https://sissiwang.me/api/revalidate`
   - **Method**: POST
   - **Header**: `x-revalidate-secret: your_secret_from_env`

This makes the site refresh within seconds whenever you add or edit content — zero human intervention.

## Quick Checklist

- [ ] Created Notion integration
- [ ] Created 5 databases with correct properties
- [ ] Connected each database to the integration
- [ ] Copied all 5 database IDs
- [ ] Updated `.env.local` with API key + database IDs
- [ ] Added at least one published entry to test
- [ ] Verified site shows content at `http://localhost:3001`
