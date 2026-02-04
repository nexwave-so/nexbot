"""Configuration management using Pydantic Settings"""

from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional


class Settings(BaseSettings):
    """Application settings"""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # Database
    database_url: str = "postgresql://nexwave:nexwave@localhost:5432/nexwave"
    postgres_password: Optional[str] = None

    # Redis
    redis_url: str = "redis://localhost:6379"
    redis_password: Optional[str] = None

    # Kafka
    kafka_bootstrap_servers: str = "localhost:9092"

    # Pacifica
    pacifica_api_url: str = "https://api.pacifica.fi/api/v1"
    pacifica_ws_url: str = "wss://ws.pacifica.fi/ws"
    pacifica_api_key: Optional[str] = None
    pacifica_agent_wallet_pubkey: Optional[str] = None
    pacifica_agent_wallet_privkey: Optional[str] = None

    # Trading Parameters
    symbols: str = "BTC,ETH,BNB,SOL,ZEC"
    whale_threshold_usd: float = 25000.0  # Default threshold, overridden per pair
    max_position_size_usd: float = 1000000.0
    max_leverage: float = 5.0
    daily_loss_limit_pct: float = 5.0

    # VWM Strategy Parameters
    vwm_lookback_period: int = 20
    vwm_momentum_threshold: float = 0.002
    vwm_exit_threshold: float = 0.001
    vwm_volume_multiplier: float = 1.5
    vwm_stop_loss_atr_multiplier: float = 2.0
    vwm_base_position_pct: float = 5.0
    vwm_max_position_pct: float = 15.0
    vwm_timeframe: str = "15m"

    # Hedged Momentum Operator (HMO) Settings
    hmo_portfolio_allocation_momentum: float = 0.6
    hmo_portfolio_allocation_mr: float = 0.4
    hmo_long_short_split_long: float = 0.6
    hmo_long_short_split_short: float = 0.4
    hmo_high_long_exposure_threshold: float = 0.7
    hmo_short_exposure_threshold: float = -0.3
    hmo_profit_threshold: float = 0.1
    hmo_short_term_momentum_lookback: int = 24
    hmo_short_term_momentum_volume_lookback: int = 10
    hmo_short_term_momentum_breakout_threshold: float = 1.05
    hmo_short_term_momentum_volume_multiplier: float = 1.5
    hmo_long_term_momentum_lookback: int = 10
    hmo_long_term_momentum_trend_confirmation: int = 3
    hmo_momentum_short_lookback: int = 14
    hmo_momentum_short_trend_confirmation: int = 4
    hmo_mr_long_hedge_lookback: int = 20
    hmo_mr_long_hedge_dip_threshold: float = 0.95
    hmo_mr_short_hedge_lookback: int = 14
    hmo_mr_short_hedge_rsi_threshold: int = 70

    # Risk Management
    min_order_size_usd: float = 50.0
    max_order_size_usd: float = 100000.0
    maintenance_margin_ratio: float = 0.5
    min_profit_target_usd: float = 2.0
    trade_cooldown_seconds: int = 300
    max_trades_per_symbol_per_day: int = 10
    symbol_blacklist: str = "XPL,ASTER,FARTCOIN,PENGU,CRV,SUI"

    # Pair configuration
    use_all_pairs: bool = False  # If True, use all active pairs from pairs.py

    # Alerts
    telegram_bot_token: Optional[str] = None
    telegram_chat_id: Optional[str] = None

    # Security
    jwt_secret: str = "change-me-in-production"
    api_rate_limit_per_minute: int = 100

    # Monitoring
    grafana_password: str = "admin"
    log_level: str = "INFO"
    environment: str = "development"

    # Service-specific
    batch_size: int = 5000
    write_interval_sec: int = 5

    @property
    def symbol_list(self) -> list[str]:
        """Parse symbols string into list or return all active pairs"""
        if self.use_all_pairs:
            try:
                from nexwave.common.pairs import get_all_symbols
                return get_all_symbols()
            except ImportError:
                # Fallback to legacy config if pairs module not available
                return [s.strip().upper() for s in self.symbols.split(",")]
        return [s.strip().upper() for s in self.symbols.split(",")]


settings = Settings()

