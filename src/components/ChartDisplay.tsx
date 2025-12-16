import {
    BarChart,
    Bar,
    LineChart,
    Line,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

interface ChartDisplayProps {
    type: 'bar' | 'line' | 'area' | 'pie' | 'curve'
    color: string
    purpose?: string
}

/**
 * Displays interactive charts using Recharts library
 */
const ChartDisplay = ({ type, color, purpose }: ChartDisplayProps) => {
    // Generate realistic sample data based on purpose
    const generateData = () => {
        switch (purpose) {
            case 'kpi':
                return [
                    { name: 'Mon', value: 88 },
                    { name: 'Tue', value: 92 },
                    { name: 'Wed', value: 85 },
                    { name: 'Thu', value: 94 },
                    { name: 'Fri', value: 90 },
                    { name: 'Sat', value: 96 },
                    { name: 'Sun', value: 89 },
                ]
            case 'checkin':
                return [
                    { name: '6AM', value: 45 },
                    { name: '9AM', value: 234 },
                    { name: '12PM', value: 456 },
                    { name: '3PM', value: 389 },
                    { name: '6PM', value: 567 },
                    { name: '9PM', value: 123 },
                ]
            case 'sales':
                return [
                    { name: 'Jan', value: 4200 },
                    { name: 'Feb', value: 5800 },
                    { name: 'Mar', value: 4900 },
                    { name: 'Apr', value: 7200 },
                    { name: 'May', value: 6100 },
                    { name: 'Jun', value: 8400 },
                ]
            case 'traffic':
                return [
                    { name: 'Mon', value: 8400 },
                    { name: 'Tue', value: 12200 },
                    { name: 'Wed', value: 10800 },
                    { name: 'Thu', value: 14200 },
                    { name: 'Fri', value: 13500 },
                    { name: 'Sat', value: 9200 },
                    { name: 'Sun', value: 7800 },
                ]
            case 'revenue':
                return [
                    { name: 'Q1', value: 98000 },
                    { name: 'Q2', value: 125000 },
                    { name: 'Q3', value: 142000 },
                    { name: 'Q4', value: 156000 },
                ]
            case 'performance':
                return [
                    { name: '0h', value: 75 },
                    { name: '4h', value: 82 },
                    { name: '8h', value: 88 },
                    { name: '12h', value: 91 },
                    { name: '16h', value: 86 },
                    { name: '20h', value: 79 },
                ]
            default:
                return [
                    { name: 'A', value: 400 },
                    { name: 'B', value: 300 },
                    { name: 'C', value: 600 },
                    { name: 'D', value: 800 },
                    { name: 'E', value: 500 },
                ]
        }
    }

    const data = generateData()

    // Pie chart data
    const pieData = [
        { name: 'Complete', value: 68, color: color },
        { name: 'In Progress', value: 22, color: '#6b7280' },
        { name: 'Pending', value: 10, color: '#374151' },
    ]

    const renderChart = () => {
        switch (type) {
            case 'bar':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                            <XAxis
                                dataKey="name"
                                stroke="#6b7280"
                                tick={{ fill: '#6b7280', fontSize: 11 }}
                            />
                            <YAxis stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 11 }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1a1a1a',
                                    border: '1px solid #2a2a2a',
                                    borderRadius: '8px',
                                    color: '#fff',
                                }}
                                cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                            />
                            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )

            case 'line':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                            <XAxis
                                dataKey="name"
                                stroke="#6b7280"
                                tick={{ fill: '#6b7280', fontSize: 11 }}
                            />
                            <YAxis stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 11 }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1a1a1a',
                                    border: '1px solid #2a2a2a',
                                    borderRadius: '8px',
                                    color: '#fff',
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={color}
                                strokeWidth={3}
                                dot={{ fill: color, r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )

            case 'area':
            case 'curve':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                            <defs>
                                <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                            <XAxis
                                dataKey="name"
                                stroke="#6b7280"
                                tick={{ fill: '#6b7280', fontSize: 11 }}
                            />
                            <YAxis stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 11 }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1a1a1a',
                                    border: '1px solid #2a2a2a',
                                    borderRadius: '8px',
                                    color: '#fff',
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={color}
                                strokeWidth={2}
                                fillOpacity={1}
                                fill={`url(#gradient-${color})`}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )

            case 'pie':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1a1a1a',
                                    border: '1px solid #2a2a2a',
                                    borderRadius: '8px',
                                    color: '#fff',
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                )

            default:
                return null
        }
    }

    return (
        <div style={{ width: '100%', height: '100%', minHeight: '120px' }}>
            {renderChart()}
        </div>
    )
}

export default ChartDisplay

