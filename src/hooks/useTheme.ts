import { useEffect } from 'react'
import { useConfigWatcher } from './useConfigWatcher'

/**
 * Hook to apply theme colors from config to CSS variables
 * Updates theme in real-time when config changes
 */
export const useTheme = () => {
    const { config } = useConfigWatcher()

    useEffect(() => {
        if (!config?.theme) return

        const theme = config.theme
        const root = document.documentElement

        // Apply all theme colors as CSS variables
        root.style.setProperty('--primary-color', theme.primaryColor)
        root.style.setProperty('--secondary-color', theme.secondaryColor)
        root.style.setProperty('--background-color', theme.backgroundColor)
        root.style.setProperty('--card-background', theme.cardBackground)
        root.style.setProperty('--text-color', theme.textColor)
        root.style.setProperty('--text-secondary', theme.textSecondary)
        root.style.setProperty('--border-color', theme.borderColor)
        root.style.setProperty('--accent-purple', theme.accentPurple)
        root.style.setProperty('--accent-cyan', theme.accentCyan)
        root.style.setProperty('--accent-green', theme.accentGreen)
        root.style.setProperty('--accent-orange', theme.accentOrange)
        root.style.setProperty('--accent-pink', theme.accentPink)
        root.style.setProperty('--border-radius', theme.borderRadius)
        root.style.setProperty('--border-width', theme.borderWidth)

        console.log('🎨 Theme applied:', {
            primary: theme.primaryColor,
            secondary: theme.secondaryColor,
            background: theme.backgroundColor
        })
    }, [config])

    return config?.theme || null
}

