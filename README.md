# embeddings-demo

A demo application using embeddings with Google AI and Supabase.

## Setup

### 1. Install dependencies

```bash
bun install
```

### 2. Configure environment variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

See [SECURITY.md](./SECURITY.md) for detailed setup instructions.

## Development

To start a development server:

```bash
bun dev
```

## Production

To run for production:

```bash
bun start
```

### Deployment to Fly.io

1. Set your secrets:
   ```bash
   fly secrets set BUN_PUBLIC_AI_TOKEN=your_token
   fly secrets set BUN_PUBLIC_DB_API_KEY=your_key
   fly secrets set BUN_PUBLIC_DB_URL=your_url
   ```

2. Deploy:
   ```bash
   fly deploy
   ```

## Security

See [SECURITY.md](./SECURITY.md) for important security information.

---

This project was created using `bun init` in bun v1.2.15. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
