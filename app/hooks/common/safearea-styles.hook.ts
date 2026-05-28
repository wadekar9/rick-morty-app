import { useMemo } from "react"
import { Edge, useSafeAreaInsets } from "react-native-safe-area-context"

type ExtendedEdge = Edge | "start" | "end"

const propertySuffixMap = {
  top: "Top",
  bottom: "Bottom",
  left: "Start",
  right: "End",
  start: "Start",
  end: "End",
}

const edgeInsetMap: Record<string, Edge> = {
  start: "left",
  end: "right",
}

type SafeAreaInsetsStyle<
  Property extends "padding" | "margin" = "padding",
  Edges extends Array<ExtendedEdge> = Array<ExtendedEdge>,
> = {
    [K in Edges[number]as `${Property}${Capitalize<K>}`]: number
  }

/**
 * Custom hook to calculate global styles that account for safe area insets.
 * Prevents content from overlapping system UI like notches and home indicators.
 * @param safeAreaEdges An array of edges (top, bottom, left, right) to apply.
 * @param property The CSS property to use ('padding' or 'margin').
 * @returns A StyleSheet object containing safe area inset padding/margin.
 */
export function useSafeAreaInsetsStyle<
  Property extends "padding" | "margin" = "padding",
  Edges extends Array<ExtendedEdge> = [],
>(
  safeAreaEdges: Edges = [] as unknown as Edges,
  property: Property = "padding" as Property,
): SafeAreaInsetsStyle<Property, Edges> {
  const insets = useSafeAreaInsets()

  return useMemo(
    () =>
      safeAreaEdges.reduce((acc, e) => {
        const value = edgeInsetMap[e] ?? e
        return { ...acc, [`${property}${propertySuffixMap[e]}`]: insets[value] }
      }, {}),
    [insets, safeAreaEdges, property],
  ) as SafeAreaInsetsStyle<Property, Edges>
}