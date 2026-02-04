# Pacifica DEX API Setup Guide

## Understanding Pacifica Authentication

Pacifica uses **two different keys** for API access:

### 1. API Key (from Pacifica UI)
- **Purpose**: Authentication header (`X-API-Key`)
- **Location**: Pacifica UI → API Settings
- **Format**: String (e.g., `BYrHNE4DXcah91AA8bugtY7p5bu9Dij7PCyjdMXnEcB`)
- **Environment Variable**: `PACIFICA_API_KEY`
- **Used for**: API authentication, rate limiting identification

### 2. Agent Wallet (API Agent Key)
- **Purpose**: Signing transactions on behalf of your account
- **Location**: Generate from Pacifica UI or Python SDK
- **Format**: Solana keypair (base58, ~88 characters) OR 32-byte seed
- **Environment Variables**: 
  - `PACIFICA_AGENT_WALLET_PRIVKEY` - Private key
  - `PACIFICA_AGENT_WALLET_PUBKEY` - Public key
- **Used for**: Signing order requests, transaction signatures

## Current Configuration

Based on your setup:

```bash
# API Key (from Pacifica UI)
PACIFICA_API_KEY=BYrHNE4DXcah91AA8bugtY7p5bu9Dij7PCyjdMXnEcB

# Agent Wallet (what you need to generate)
PACIFICA_AGENT_WALLET_PUBKEY=EXEA1GKfnKMGUDz2z4RmvigbFzFLv99WcSc4bvEpoAHQ
PACIFICA_AGENT_WALLET_PRIVKEY=HLTvqmqurci4ypYGjA4L9dyKxcoHmPCkJL4C4FGBeedL
```

## Issue Identified

The value in `PACIFICA_AGENT_WALLET_PRIVKEY` (`HLTvqmqurci4ypYGjA4L9dyKxcoHmPCkJL4C4FGBeedL`) is:
- 44 characters long
- This is likely a **32-byte seed** (base58 encoded), not a full Solana keypair
- Solana keypairs are typically ~88 characters (64 bytes: 32 private + 32 public)

## Solutions

### Option 1: Generate Agent Wallet from Pacifica UI

1. Go to Pacifica UI → API Settings
2. Generate/create an "API Agent Key" or "Agent Wallet"
3. Export the **full keypair** (not just the seed)
4. Update `.env` with the full keypair

### Option 2: Convert Seed to Keypair (if seed is valid)

If `HLTvqmqurci4ypYGjA4L9dyKxcoHmPCkJL4C4FGBeedL` is a valid 32-byte seed:
- The code will attempt to convert it to a full keypair
- Requires PyNaCl library to be installed
- Verify the public key matches: `EXEA1GKfnKMGUDz2z4RmvigbFzFLv99WcSc4bvEpoAHQ`

### Option 3: Generate New Agent Wallet

Using Python/Solana CLI:

```python
from solders.keypair import Keypair
import base58

# Generate new keypair
keypair = Keypair()

# Get private key (base58)
privkey = base58.b58encode(bytes(keypair)).decode()
print(f"Private Key: {privkey}")

# Get public key
pubkey = str(keypair.pubkey())
print(f"Public Key: {pubkey}")
```

Then:
1. Add the private key to Pacifica UI as an Agent Wallet
2. Update `.env` with both keys

## Verification

After setting up the Agent Wallet:

1. **Check if keypair initializes**:
   ```bash
   docker compose logs order-management | grep "Initialized Pacifica client"
   ```

2. **Test connection**:
   ```bash
   python scripts/test_order_placement.py
   ```

3. **Verify wallet**:
   - Should see: "Initialized Pacifica client with wallet: [PUBKEY]"
   - Public key should match `EXEA1GKfnKMGUDz2z4RmvigbFzFLv99WcSc4bvEpoAHQ`

## References

- [Pacifica API Agent Keys Documentation](https://docs.pacifica.fi/api-documentation/api/signing/api-agent-keys)
- [Pacifica Signing Documentation](https://docs.pacifica.fi/api-documentation/api/signing)
- [Pacifica WebSocket Documentation](https://docs.pacifica.fi/api-documentation/api/websocket)

## Next Steps

1. Verify if `HLTvqmqurci4ypYGjA4L9dyKxcoHmPCkJL4C4FGBeedL` is:
   - A valid 32-byte seed (can be converted)
   - Or if you need the full keypair from Pacifica UI

2. If it's a seed, ensure PyNaCl is installed:
   ```bash
   pip install PyNaCl
   # or in Docker: add to requirements
   ```

3. Test the connection after updating the key

