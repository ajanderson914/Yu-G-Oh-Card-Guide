# Developer Manual

## Project Overview

Yu-Gi-Oh Card Guide is a web application that helps beginners search for Yu-Gi-Oh cards, view basic card information, and save cards to a saved list.

The project uses:

- Node.js
- Express
- Supabase
- YGOPRODeck API
- HTML
- CSS
- JavaScript
- SweetAlert2
- Chart.js

## How to Install the Application

First, clone the GitHub repository:

```bash
git clone your-github-repo-link-here
```

Then move into the project folder:

```bash
cd yugioh_thing
```

Install the required packages:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the main project folder.

The `.env` file should be at the same level as:

```text
index.js
package.json
README.md
```

Add these variables:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_publishable_key
```

The Supabase URL should look like this:

```env
SUPABASE_URL=https://yourproject.supabase.co
```

Do not include `/rest/v1` at the end of the URL.

## How to Run the Application on a Server

To run the application locally, use:

```bash
node index.js
```

The app will run at:

```text
http://localhost:3000
```

## How to Run Tests

There are currently no automated tests for this project.

To manually test the application:

1. Run the server using `node index.js`
2. Open `http://localhost:3000`
3. Click **Load Beginner Cards**
4. Search for a card
5. Save a card
6. Go to the **My Cards** page
7. Click **Load My Cards**
8. Confirm that the saved card appears

## API Endpoints

### GET `/cards`

This endpoint gets card data from the YGOPRODeck API.

Example:

```text
GET /cards
```

Optional search example:

```text
GET /cards?search=Dark Magician
```

This endpoint is used on the Home page to load and search for Yu-Gi-Oh cards.

### GET `/saved-cards`

This endpoint gets saved cards from the Supabase `saved_cards` table.

Example:

```text
GET /saved-cards
```

This endpoint is used on the My Cards page.

### POST `/saved-cards`

This endpoint saves one card to the Supabase `saved_cards` table.

Example request body:

```json
{
  "card_id": "46986414",
  "name": "Dark Magician",
  "type": "Normal Monster",
  "image_url": "https://images.ygoprodeck.com/images/cards/46986414.jpg",
  "description": "The ultimate wizard in terms of attack and defense."
}
```

This endpoint is used by the Save Card button on the Home page.

## Supabase Table

The project uses one Supabase table called:

```text
saved_cards
```

The table has these columns:

| Column | Type |
|---|---|
| id | int8 |
| created_at | timestamp |
| card_id | text |
| name | text |
| type | text |
| image_url | text |
| description | text |

## Known Bugs

- The app does not stop users from saving the same card more than once.
- The app does not currently have a delete button for removing saved cards.
- Search results depend on what the YGOPRODeck API returns.

## Roadmap for Future Development

Future improvements could include:

- Add a delete button for saved cards
- Prevent duplicate saved cards
- Add filters for card type, attribute, or race