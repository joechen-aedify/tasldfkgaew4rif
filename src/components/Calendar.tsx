import { useState } from 'react'
import './Calendar.css'

/**
 * Calendar component for displaying monthly calendar
 */
const Calendar = () => {
    const [currentDate] = useState(new Date(2025, 9, 22)) // October 22, 2025

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const daysOfWeek = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()

        // Get the day of week (0 = Sunday, 1 = Monday, etc.)
        let startDay = firstDay.getDay()
        // Adjust so Monday is 0
        startDay = startDay === 0 ? 6 : startDay - 1

        const days = []

        // Add empty cells for days before the first of the month
        for (let i = 0; i < startDay; i++) {
            days.push(null)
        }

        // Add the days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day)
        }

        return days
    }

    const days = getDaysInMonth(currentDate)
    const currentMonth = monthNames[currentDate.getMonth()]
    const currentYear = currentDate.getFullYear()
    const today = 22 // October 22

    return (
        <div className="calendar-widget">
            <div className="calendar-header">
                <button className="calendar-nav-btn">←</button>
                <h3 className="calendar-month">{currentMonth} {currentYear}</h3>
                <button className="calendar-nav-btn">→</button>
            </div>

            <div className="calendar-grid">
                {daysOfWeek.map((day) => (
                    <div key={day} className="calendar-day-label">
                        {day}
                    </div>
                ))}
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`calendar-day ${day === today ? 'calendar-today' : ''} ${!day ? 'calendar-empty' : ''}`}
                    >
                        {day || ''}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Calendar

