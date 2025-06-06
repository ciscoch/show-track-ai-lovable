# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/ce7c82f5-877e-44f1-8152-03e9fb646c17

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ce7c82f5-877e-44f1-8152-03e9fb646c17) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Environment variables

Create a `.env` file at the project root based on `.env.example` and fill in your real credentials:

```sh
VITE_SUPABASE_URL=<your supabase url>
VITE_SUPABASE_ANON_KEY=<your supabase anon key>
VITE_OPENAI_API_KEY=<your openai api key>
VITE_WEATHER_API_KEY=35955fb435e4499fa2e15211252204
N8N_HOST=<url of your n8n instance>
N8N_API_KEY=<n8n api key>
```

## n8n workflow

This project includes a sample workflow in `n8n-workflows/animalUpdates.workflow.json`.
Run n8n and import the file to start automating notifications when new animals are added.

Example docker command:

```sh
docker run -it --rm \
  -e N8N_HOST=$N8N_HOST \
  -e N8N_API_KEY=$N8N_API_KEY \
  -p 5678:5678 n8nio/n8n
```


## AI-Powered Photo Analysis

When you upload a photo in the gallery or journal, the app sends it to an AI
service that estimates the animal's weight. The estimated weight (or any message
returned by the service) is saved with the photo and displayed in the photo
modal. A toast notification also summarizes the result after each upload.


## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ce7c82f5-877e-44f1-8152-03e9fb646c17) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Keyboard tips

When selecting an organization on the Add Animal page, open the dropdown and
start typing the first letter of the organization's name to jump directly to it.
