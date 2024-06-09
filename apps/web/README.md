# LaCrypta.army

LaCrypta.army supports the following NIP's:

- [x] NIP-01: Basic protocol flow description
- [ ] NIP-02: Contact List and Petnames (No petname support)
- [ ] NIP-03: OpenTimestamps Attestations for Events
- [ ] NIP-04: Encrypted Direct Message
- [ ] NIP-05: Mapping Nostr keys to DNS-based internet identifiers
- [ ] NIP-06: Basic key derivation from mnemonic seed phrase
- [ ] NIP-07: window.nostr capability for web browsers
- [ ] NIP-08: Handling Mentions
- [ ] NIP-09: Event Deletion
- [ ] NIP-10: Conventions for clients' use of e and p tags in text events
- [ ] NIP-11: Relay Information Document
- [ ] NIP-13: Proof of Work
- [ ] NIP-14: Subject tag in text events
- [ ] NIP-18: Reposts
- [ ] NIP-19: bech32-encoded entities
- [ ] NIP-21: nostr: Protocol handler (web+nostr)
- [ ] NIP-23: Long form content
- [ ] NIP-25: Reactions
- [ ] NIP-26: Delegated Event Signing (Display delegated signings only)
- [ ] NIP-27: Text note references
- [ ] NIP-28: Public Chat
- [ ] NIP-30: Custom Emoji
- [ ] NIP-31: Alt tag for unknown events
- [ ] NIP-36: Sensitive Content
- [ ] NIP-38: User Statuses
- [ ] NIP-39: External Identities
- [ ] NIP-40: Expiration Timestamp
- [ ] NIP-42: Authentication of clients to relays
- [ ] NIP-44: Versioned encryption
- [ ] NIP-46: Nostr connect (+bunker)
- [ ] NIP-47: Nostr wallet connect
- [ ] NIP-50: Search
- [ ] NIP-51: Lists
- [ ] NIP-53: Live Events
- [ ] NIP-57: Zaps
- [ ] NIP-58: Badges
- [ ] NIP-59: Gift Wrap
- [ ] NIP-65: Relay List Metadata
- [ ] NIP-75: Zap Goals
- [ ] NIP-78: App specific data
- [ ] NIP-89: App handlers
- [ ] NIP-94: File Metadata
- [ ] NIP-96: HTTP File Storage Integration (Draft)
- [ ] NIP-98: HTTP Auth

## Stack

- [Next.js](https://nextjs.org/)
- [pNPM](https://pnpm.io/)
- [NDK](https://github.com/nostr-dev-kit/ndk)

## Getting Started

Set NodeJS version

```bash
nvm use
```

Install dependencies

```bash
pnpm install
```

Set environment variables

```bash
cp .env.example .env
```

Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Documentation

This project complies with [LaWallet.io](https://lawallet.io/) backend interface.
