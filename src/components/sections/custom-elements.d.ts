import type * as React from "react"

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "dotlottie-wc": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string
        autoplay?: boolean
        loop?: boolean
      }
    }
  }
}

export {}
