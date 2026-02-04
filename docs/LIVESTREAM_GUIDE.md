# 🎥 Nexwave Livestream Guide

## Available Stream Scripts

### 1. **stream_visual.sh** ⭐ RECOMMENDED
Best balance of visual appeal and readability
- Large ASCII art logo
- Color-coded signals (Green=BUY, Red=SELL)
- Clear boxes around each event
- Running statistics counter
- Perfect for OBS/Streaming

**Run:**
```bash
cd /var/www/nexwave
./stream_visual.sh
```

### 2. **stream_premium.sh** 🌟 HOLLYWOOD STYLE
Maximum visual impact for hype
- Animated intro sequence
- Epic ASCII art
- Multiple emoji indicators
- Detailed signal breakdowns
- Live statistics dashboard
- Best for maximum crowd engagement

**Run:**
```bash
cd /var/www/nexwave
./stream_premium.sh
```

### 3. **stream_dashboard.sh** 📊 CLEAN & SIMPLE
Minimal but effective
- Clean header
- Emoji indicators (🟢🔴✅🛑💰)
- Timestamps on every line
- Good for technical audiences

**Run:**
```bash
cd /var/www/nexwave
./stream_dashboard.sh
```

### 4. **stream_logs.sh** 📝 FILTERED EVENTS
Shows only important events
- Compact format
- No fancy graphics
- Fast updates
- Best for secondary displays

**Run:**
```bash
cd /var/www/nexwave
./stream_logs.sh
```

### 5. **stream_raw.sh** 🔧 FULL TECHNICAL
Everything the engine does
- Complete logs
- All debug info
- For technical deep dives

**Run:**
```bash
cd /var/www/nexwave
./stream_raw.sh
```

## OBS Studio Setup Guide

### Terminal Settings
1. **Font Size:** 16-18pt (for readability)
2. **Font:** Monospace or "Fira Code"
3. **Background:** Black (#000000)
4. **Text Color:** Green (#00FF00) for matrix effect
5. **Terminal Size:** 120 columns × 35 rows

### OBS Scene Setup
1. Add "Window Capture" source
2. Select your terminal window
3. Add "Text" overlay for:
   - Stream title
   - Social media handles
   - Donation links
4. Optional: Add webcam in corner

### Stream Layout Suggestions

**Layout 1: Full Terminal** (Recommended)
```
┌─────────────────────────────────┐
│                                 │
│     TRADING TERMINAL FULL       │
│         (stream_premium.sh)     │
│                                 │
│                                 │
└─────────────────────────────────┘
```

**Layout 2: Terminal + Dashboard**
```
┌──────────────────┬──────────────┐
│                  │              │
│   Terminal       │  Dashboard   │
│  (60% width)     │  (40% width) │
│                  │  Browser     │
│                  │  nexwave.so  │
└──────────────────┴──────────────┘
```

**Layout 3: Multi-View**
```
┌──────────────┬────────┐
│              │ Webcam │
│   Terminal   ├────────┤
│              │ Chat   │
│              │ Widget │
└──────────────┴────────┘
```

## What You'll See

### Signal Types

**🟢 BUY SIGNAL**
- Indicates bullish momentum detected
- Shows symbol, VWM%, volume ratio
- Calculates position with 5x leverage

**🔴 SELL SIGNAL**
- Indicates bearish momentum detected
- Shows symbol, VWM%, volume ratio
- Short position with leverage

**✅ ORDER PLACED**
- Confirmation that order sent to Pacifica
- Shows order details

**🛑 STOP LOSS**
- Automatic risk protection triggered
- Closes position to limit losses

**💰 TAKE PROFIT**
- Target achieved, profits locked in
- Closes position at profit level

## Pro Tips

1. **Use tmux/screen** to keep stream running if SSH disconnects
   ```bash
   tmux new -s nexwave
   ./stream_premium.sh
   # Detach: Ctrl+B then D
   # Reattach: tmux attach -t nexwave
   ```

2. **Test before going live**
   - Run script for 5 minutes first
   - Check colors appear correctly in OBS
   - Verify text is readable at stream resolution

3. **Add stream overlays**
   - Twitter: @nexwave_so
   - Website: nexwave.so
   - Hackathon: x402 Solana Hackathon

4. **Backup plan**
   - Have stream_dashboard.sh ready as fallback
   - If premium script has issues, switch quickly

5. **Engagement hooks**
   - "First BUY signal = $10 giveaway"
   - "Count the signals - winner gets prize"
   - "Every take profit = celebration moment"

## Keyboard Shortcuts

- **Ctrl+C** - Stop stream
- **Ctrl+L** - Clear screen (most scripts)
- **Ctrl+Z** then `bg` - Background the process

## Troubleshooting

**Problem:** Colors not showing
**Fix:** Make sure terminal supports 256 colors
```bash
echo $TERM  # Should be xterm-256color
```

**Problem:** Text too small in OBS
**Fix:** Increase terminal font size to 18-20pt

**Problem:** Log updates too fast
**Fix:** Use stream_dashboard.sh instead (slower)

**Problem:** Script stops unexpectedly
**Fix:** Check if trading engine crashed
```bash
docker ps | grep trading-engine
docker logs nexwave-trading-engine --tail 50
```

## Go Live Checklist

- [ ] Trading engine running
- [ ] Terminal font size 16-18pt
- [ ] Terminal set to dark theme
- [ ] Script tested and displaying correctly
- [ ] OBS capturing terminal window
- [ ] Stream title and overlays added
- [ ] Audio levels checked
- [ ] Backup script ready (stream_dashboard.sh)
- [ ] Social media announced
- [ ] Mod/chat management ready

---

**Good luck with the livestream! 🚀**

Questions? Check nexwave.so or @nexwave_so on Twitter
