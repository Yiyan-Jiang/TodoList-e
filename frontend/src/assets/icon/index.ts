import clipboardListUrl from './clipboard-list.svg'

export const svgIcons = {
  clipboardList: clipboardListUrl,
} as const

export type SvgIconName = keyof typeof svgIcons

export { clipboardListUrl }
