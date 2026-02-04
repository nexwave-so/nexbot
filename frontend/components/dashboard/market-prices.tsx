"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, TrendingUp, TrendingDown, Search } from "lucide-react"
import { useMarketPrices } from "@/lib/hooks"

type SortOption = "symbol" | "price" | "change"
type CategoryFilter = "all" | "major" | "mid-cap" | "emerging" | "small-cap"

export default function MarketPrices() {
  const { data: marketPrices, loading } = useMarketPrices()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("symbol")
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all")

  const formatFundingRate = (rate: number) => {
    const pct = (rate * 100).toFixed(4)
    return `${rate >= 0 ? '+' : ''}${pct}%`
  }

  const formatPrice = (price: number) => {
    if (price >= 1000) return price.toFixed(2)
    if (price >= 1) return price.toFixed(4)
    if (price >= 0.01) return price.toFixed(6)
    return price.toFixed(8)
  }

  const filteredAndSortedPrices = useMemo(() => {
    if (!marketPrices?.prices) return []

    let prices = Array.isArray(marketPrices.prices)
      ? marketPrices.prices
      : Object.entries(marketPrices.prices).map(([symbol, data]) => ({
          symbol,
          ...data,
        }))

    // Filter by category
    if (categoryFilter !== "all") {
      prices = prices.filter((p: any) => p.category === categoryFilter)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      prices = prices.filter(
        (p: any) =>
          p.symbol?.toLowerCase().includes(query) ||
          p.display_name?.toLowerCase().includes(query)
      )
    }

    // Sort
    prices.sort((a: any, b: any) => {
      switch (sortBy) {
        case "price":
          return (b.price || b.mark_price || 0) - (a.price || a.mark_price || 0)
        case "change":
          return (b.change_24h_pct || 0) - (a.change_24h_pct || 0)
        default:
          return (a.symbol || "").localeCompare(b.symbol || "")
      }
    })

    return prices
  }, [marketPrices, searchQuery, sortBy, categoryFilter])

  return (
    <Card className="bg-nexwave-dark/50 border-nexwave-indigo/20">
      <CardHeader>
        <div className="flex flex-col gap-4">
          <CardTitle className="text-nexwave-off-white">Live Market Prices</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-nexwave-off-white/40" />
              <Input
                placeholder="Search pairs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-nexwave-indigo/10 border-nexwave-indigo/30 text-nexwave-off-white"
              />
            </div>
            <Select value={categoryFilter} onValueChange={(val) => setCategoryFilter(val as CategoryFilter)}>
              <SelectTrigger className="w-full sm:w-[180px] bg-nexwave-indigo/10 border-nexwave-indigo/30 text-nexwave-off-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="major">Major</SelectItem>
                <SelectItem value="mid-cap">Mid-Cap</SelectItem>
                <SelectItem value="emerging">Emerging</SelectItem>
                <SelectItem value="small-cap">Small-Cap</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(val) => setSortBy(val as SortOption)}>
              <SelectTrigger className="w-full sm:w-[180px] bg-nexwave-indigo/10 border-nexwave-indigo/30 text-nexwave-off-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="symbol">Sort by Symbol</SelectItem>
                <SelectItem value="price">Sort by Price</SelectItem>
                <SelectItem value="change">Sort by Change</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-nexwave-cyan" />
          </div>
        ) : filteredAndSortedPrices.length === 0 ? (
          <div className="flex items-center justify-center py-12 text-nexwave-off-white/60">
            {searchQuery ? "No pairs match your search" : "No market data available"}
          </div>
        ) : (
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredAndSortedPrices.map((priceData: any) => {
              const symbol = priceData.symbol
              const price = priceData.price || priceData.mark_price || 0
              const change = priceData.change_24h_pct || 0
              const displayName = priceData.display_name || symbol
              const category = priceData.category || "major"

              const getCategoryColor = (cat: string) => {
                switch (cat) {
                  case "major":
                    return "bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/30"
                  case "mid-cap":
                    return "bg-nexwave-cyan/10 text-nexwave-cyan border-nexwave-cyan/30"
                  case "emerging":
                    return "bg-nexwave-indigo/10 text-nexwave-indigo border-nexwave-indigo/30"
                  case "small-cap":
                    return "bg-nexwave-off-white/10 text-nexwave-off-white border-nexwave-off-white/30"
                  default:
                    return "bg-nexwave-indigo/10 text-nexwave-indigo border-nexwave-indigo/30"
                }
              }

              return (
                <div
                  key={symbol}
                  className="flex items-center justify-between p-3 rounded-lg bg-nexwave-indigo/10 hover:bg-nexwave-indigo/20 transition-colors border border-nexwave-indigo/20"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-nexwave-indigo">
                      <span className="text-xs font-bold text-nexwave-off-white">
                        {symbol.slice(0, 3)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-nexwave-off-white">{symbol}</div>
                      <div className="text-xs text-nexwave-off-white/60">{displayName}</div>
                    </div>
                    <Badge variant="outline" className={`text-xs ${getCategoryColor(category)}`}>
                      {category}
                    </Badge>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-lg font-bold text-nexwave-light-blue">
                      ${formatPrice(price)}
                    </div>
                    {change !== null && (
                      <Badge
                        variant="outline"
                        className={
                          change >= 0
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30"
                        }
                      >
                        {change >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                      </Badge>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
