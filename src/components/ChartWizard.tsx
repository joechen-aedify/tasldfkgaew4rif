import { useState } from 'react'
import { BarChart3, LineChart, PieChart, AreaChart, Target, UserCheck, ShoppingCart, TrendingUp, DollarSign, Gauge, FolderOpen, Link, Database, CheckCircle2 } from 'lucide-react'
import './ChartWizard.css'

interface ChartConfig {
    chartType: 'bar' | 'line' | 'pie' | 'area' | ''
    purpose: 'kpi' | 'checkin' | 'sales' | 'traffic' | 'revenue' | 'performance' | ''
    dataSource: 'hardcoded' | 'api' | ''
    title: string
    subtitle: string
    apiConfig?: {
        url: string
        method: 'GET' | 'POST'
        headers?: Record<string, string>
        body?: string
    }
    apiAnalysis?: {
        dataPath: string
        nameField: string
        valueField: string
    }
}

interface ChartWizardProps {
    onComplete: (config: ChartConfig) => void
    onCancel: () => void
    initialConfig?: {
        title?: string
        subtitle?: string
        chartType?: 'bar' | 'line' | 'curve' | 'pie' | 'area'
        purpose?: string
        color?: string
    }
}

/**
 * Multi-step wizard for configuring charts
 */
const ChartWizard = ({ onComplete, onCancel, initialConfig }: ChartWizardProps) => {
    const [currentStep, setCurrentStep] = useState(1)

    // Map 'curve' to 'line' since ChartConfig doesn't support 'curve'
    const mapChartType = (type?: 'bar' | 'line' | 'curve' | 'pie' | 'area'): ChartConfig['chartType'] => {
        if (!type) return '';
        if (type === 'curve') return 'line'; // Map curve to line
        return type as ChartConfig['chartType'];
    };

    const [config, setConfig] = useState<ChartConfig>({
        chartType: mapChartType(initialConfig?.chartType),
        purpose: (initialConfig?.purpose as ChartConfig['purpose']) || '',
        dataSource: '',
        title: initialConfig?.title || '',
        subtitle: initialConfig?.subtitle || '',
    })
    // TODO: Implement API configuration UI in step 4
    // @ts-expect-error - Setters will be used when API config UI is implemented
    const [apiUrl, setApiUrl] = useState('')
    // @ts-expect-error - Setters will be used when API config UI is implemented
    const [apiMethod, setApiMethod] = useState<'GET' | 'POST'>('GET')
    // @ts-expect-error - Setters will be used when API config UI is implemented
    const [apiHeaders, setApiHeaders] = useState('')
    // @ts-expect-error - Setters will be used when API config UI is implemented
    const [apiBody, setApiBody] = useState('')
    const [_isTestingApi, setIsTestingApi] = useState(false)
    const [_apiTestResult, setApiTestResult] = useState<'success' | 'error' | null>(null)
    const [apiResponse, setApiResponse] = useState<any>(null)
    const [_isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysisResult, setAnalysisResult] = useState<any>(null)

    // Get OpenAI API key from environment variable
    const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY || ''

    const getTotalSteps = () => {
        // If API is selected, add extra step for API configuration and testing
        return config.dataSource === 'api' ? 5 : 4
    }

    const chartTypes = [
        { id: 'bar', name: 'Bar Chart', icon: <BarChart3 size={40} />, description: 'Compare values across categories' },
        { id: 'line', name: 'Line Chart', icon: <LineChart size={40} />, description: 'Show trends over time' },
        { id: 'pie', name: 'Pie Chart', icon: <PieChart size={40} />, description: 'Display proportions' },
        { id: 'area', name: 'Area Chart', icon: <AreaChart size={40} />, description: 'Visualize volume over time' },
    ]

    const purposes = [
        { id: 'kpi', name: 'KPI', icon: <Target size={40} />, description: 'Track key performance indicators' },
        { id: 'checkin', name: 'User Check-in', icon: <UserCheck size={40} />, description: 'Monitor user activity' },
        { id: 'sales', name: 'Sales', icon: <ShoppingCart size={40} />, description: 'Track sales metrics' },
        { id: 'traffic', name: 'Traffic', icon: <TrendingUp size={40} />, description: 'Monitor website traffic' },
        { id: 'revenue', name: 'Revenue', icon: <DollarSign size={40} />, description: 'Track revenue streams' },
        { id: 'performance', name: 'Performance', icon: <Gauge size={40} />, description: 'System performance metrics' },
    ]

    const handleNext = () => {
        if (currentStep < getTotalSteps()) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    // TODO: Implement API test UI
    // @ts-expect-error - Function will be used when API test UI is implemented
    const _handleTestApi = async () => {
        setIsTestingApi(true)
        setApiTestResult(null)

        try {
            const headers: Record<string, string> = {}
            if (apiHeaders) {
                const headerLines = apiHeaders.split('\n')
                headerLines.forEach(line => {
                    const [key, value] = line.split(':').map(s => s.trim())
                    if (key && value) headers[key] = value
                })
            }

            const options: RequestInit = {
                method: apiMethod,
                headers,
            }

            if (apiMethod === 'POST' && apiBody) {
                options.body = apiBody
            }

            const response = await fetch(apiUrl, options)
            const data = await response.json()

            setApiResponse(data)
            setApiTestResult('success')
        } catch (error) {
            console.error('API Test Error:', error)
            setApiTestResult('error')
        } finally {
            setIsTestingApi(false)
        }
    }

    // TODO: Implement OpenAI analysis UI
    // @ts-expect-error - Function will be used when OpenAI analysis UI is implemented
    const _handleAnalyzeWithOpenAI = async () => {
        if (!apiResponse) {
            alert('No API response to analyze. Please test the API connection first.')
            return
        }

        if (!openaiApiKey) {
            alert('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env file and restart the dev server.')
            return
        }

        console.log('OpenAI API Key loaded:', openaiApiKey ? 'Yes (length: ' + openaiApiKey.length + ')' : 'No')

        setIsAnalyzing(true)
        try {
            const prompt = `Analyze this API response and extract data suitable for a ${config.chartType} chart for ${config.purpose} purpose.

API Response:
${JSON.stringify(apiResponse, null, 2)}

Please provide a JSON response with the following structure:
{
  "dataPath": "path.to.array.in.response",
  "nameField": "field_name_for_x_axis_or_labels",
  "valueField": "field_name_for_y_axis_or_values",
  "transformedData": [
    {"name": "label1", "value": 100},
    {"name": "label2", "value": 200}
  ]
}

The transformedData should be ready to use in a Recharts ${config.chartType} chart.`

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openaiApiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a data analyst expert. Analyze API responses and extract chart-ready data. Always respond with valid JSON only.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    response_format: { type: 'json_object' }
                })
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error('OpenAI API Error:', errorData)
                throw new Error(errorData.error?.message || 'OpenAI API request failed')
            }

            const result = await response.json()
            console.log('OpenAI Response:', result)

            const analysis = JSON.parse(result.choices[0].message.content)

            setAnalysisResult(analysis)
            setConfig({
                ...config,
                apiAnalysis: {
                    dataPath: analysis.dataPath,
                    nameField: analysis.nameField,
                    valueField: analysis.valueField,
                }
            })
        } catch (error: any) {
            console.error('OpenAI Analysis Error:', error)
            alert(`Failed to analyze data with OpenAI: ${error.message || 'Unknown error'}. Please check your API key and try again.`)
        } finally {
            setIsAnalyzing(false)
        }
    }

    const handleComplete = () => {
        // Auto-generate title based on purpose if not set
        if (!config.title) {
            const purposeObj = purposes.find(p => p.id === config.purpose)
            config.title = purposeObj?.name || 'Custom Chart'
            config.subtitle = purposeObj?.description || ''
        }

        // Save API config if using API data source
        if (config.dataSource === 'api' && apiUrl) {
            const headers: Record<string, string> = {}
            if (apiHeaders) {
                const headerLines = apiHeaders.split('\n')
                headerLines.forEach(line => {
                    const [key, value] = line.split(':').map(s => s.trim())
                    if (key && value) headers[key] = value
                })
            }

            config.apiConfig = {
                url: apiUrl,
                method: apiMethod,
                headers,
                body: apiMethod === 'POST' ? apiBody : undefined,
            }
        }

        onComplete(config)
    }

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return config.chartType !== ''
            case 2:
                return config.purpose !== ''
            case 3:
                return config.dataSource !== ''
            case 4:
                // API Config step - check if URL is filled
                if (config.dataSource === 'api') {
                    return apiUrl !== ''
                }
                // For non-API, this is the preview step
                return true
            case 5:
                // API Test & Analysis step - check if analysis is complete
                if (config.dataSource === 'api') {
                    return analysisResult !== null
                }
                return true
            default:
                return false
        }
    }

    return (
        <div className="chartwizard-overlay" onClick={onCancel}>
            <div className="chartwizard-modal" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="chartwizard-header">
                    <h2 className="chartwizard-title">Create New Chart</h2>
                    <button className="chartwizard-close" onClick={onCancel}>×</button>
                </div>

                {/* Progress Bar */}
                <div className="chartwizard-progress">
                    {[1, 2, 3, 4].map((step) => (
                        <div
                            key={step}
                            className={`chartwizard-progress-step ${step === currentStep ? 'chartwizard-active' : ''
                                } ${step < currentStep ? 'chartwizard-completed' : ''}`}
                        >
                            <div className="chartwizard-progress-dot">
                                {step < currentStep ? '✓' : step}
                            </div>
                            <span className="chartwizard-progress-label">
                                {step === 1 && 'Chart Type'}
                                {step === 2 && 'Purpose'}
                                {step === 3 && 'Data Source'}
                                {step === 4 && 'Preview'}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div className="chartwizard-content">
                    {/* Step 1: Chart Type */}
                    {currentStep === 1 && (
                        <div className="chartwizard-step">
                            <h3 className="chartwizard-step-title">Select Type</h3>
                            <p className="chartwizard-step-desc">Choose the type of chart you want to create</p>
                            <div className="chartwizard-grid">
                                {chartTypes.map((type) => (
                                    <button
                                        key={type.id}
                                        className={`chartwizard-option ${config.chartType === type.id ? 'chartwizard-selected' : ''
                                            }`}
                                        onClick={() => setConfig({ ...config, chartType: type.id as any })}
                                    >
                                        <span className="chartwizard-option-icon">{type.icon}</span>
                                        <span className="chartwizard-option-name">{type.name}</span>
                                        <span className="chartwizard-option-desc">{type.description}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Purpose */}
                    {currentStep === 2 && (
                        <div className="chartwizard-step">
                            <h3 className="chartwizard-step-title">Select Chart Purpose</h3>
                            <p className="chartwizard-step-desc">What will this chart be used for?</p>
                            <div className="chartwizard-grid">
                                {purposes.map((purpose) => (
                                    <button
                                        key={purpose.id}
                                        className={`chartwizard-option ${config.purpose === purpose.id ? 'chartwizard-selected' : ''
                                            }`}
                                        onClick={() => setConfig({ ...config, purpose: purpose.id as any })}
                                    >
                                        <span className="chartwizard-option-icon">{purpose.icon}</span>
                                        <span className="chartwizard-option-name">{purpose.name}</span>
                                        <span className="chartwizard-option-desc">{purpose.description}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Data Source */}
                    {currentStep === 3 && (
                        <div className="chartwizard-step">
                            <h3 className="chartwizard-step-title">Configure Data Source</h3>
                            <p className="chartwizard-step-desc">Select where your data will come from</p>
                            <div className="chartwizard-datasource">
                                <button
                                    className={`chartwizard-datasource-option ${config.dataSource === 'hardcoded' ? 'chartwizard-selected' : ''
                                        }`}
                                    onClick={() => setConfig({ ...config, dataSource: 'hardcoded' })}
                                >
                                    <span className="chartwizard-datasource-icon"><FolderOpen size={32} /></span>
                                    <div className="chartwizard-datasource-content">
                                        <span className="chartwizard-datasource-name">Sample Data</span>
                                        <span className="chartwizard-datasource-desc">
                                            Use pre-configured sample data for testing
                                        </span>
                                    </div>
                                    {config.dataSource === 'hardcoded' && (
                                        <CheckCircle2 size={24} color="#10b981" />
                                    )}
                                </button>

                                <button
                                    className={`chartwizard-datasource-option ${config.dataSource === 'api' ? 'chartwizard-selected' : ''
                                        }`}
                                    onClick={() => setConfig({ ...config, dataSource: 'api' })}
                                >
                                    <span className="chartwizard-datasource-icon"><Link size={32} /></span>
                                    <div className="chartwizard-datasource-content">
                                        <span className="chartwizard-datasource-name">API Connection</span>
                                        <span className="chartwizard-datasource-desc">
                                            Connect to external API with AI analysis
                                        </span>
                                    </div>
                                    {config.dataSource === 'api' && (
                                        <CheckCircle2 size={24} color="#10b981" />
                                    )}
                                </button>

                                <div className="chartwizard-datasource-option chartwizard-disabled">
                                    <span className="chartwizard-datasource-icon"><Database size={32} /></span>
                                    <div className="chartwizard-datasource-content">
                                        <span className="chartwizard-datasource-name">Database</span>
                                        <span className="chartwizard-datasource-desc">
                                            Connect to database (Coming soon)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Preview (only for sample data) */}
                    {currentStep === 4 && config.dataSource === 'hardcoded' && (
                        <div className="chartwizard-step">
                            <h3 className="chartwizard-step-title">Review & Create</h3>
                            <p className="chartwizard-step-desc">Review your chart configuration</p>
                            <div className="chartwizard-summary">
                                <div className="chartwizard-summary-item">
                                    <span className="chartwizard-summary-label">Chart Type:</span>
                                    <span className="chartwizard-summary-value">
                                        {chartTypes.find(t => t.id === config.chartType)?.name}
                                    </span>
                                </div>
                                <div className="chartwizard-summary-item">
                                    <span className="chartwizard-summary-label">Purpose:</span>
                                    <span className="chartwizard-summary-value">
                                        {purposes.find(p => p.id === config.purpose)?.name}
                                    </span>
                                </div>
                                <div className="chartwizard-summary-item">
                                    <span className="chartwizard-summary-label">Data Source:</span>
                                    <span className="chartwizard-summary-value">Sample Data</span>
                                </div>

                                {/* Preview Chart */}
                                <div className="chartwizard-preview">
                                    <div className="chartwizard-preview-card">
                                        <div className="chartwizard-preview-header">
                                            <h4>{purposes.find(p => p.id === config.purpose)?.name}</h4>
                                            <p>{purposes.find(p => p.id === config.purpose)?.description}</p>
                                        </div>
                                        <div className="chartwizard-preview-chart">
                                            {config.chartType === 'bar' && (
                                                <div className="chartwizard-mini-bar">
                                                    {[40, 60, 35, 75, 50, 85, 45, 70].map((h, i) => (
                                                        <div
                                                            key={i}
                                                            className="chartwizard-bar"
                                                            style={{ height: `${h}%` }}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                            {config.chartType === 'line' && (
                                                <div className="chartwizard-mini-line">
                                                    {[40, 60, 35, 75, 50, 85, 45, 70].map((h, i) => (
                                                        <div
                                                            key={i}
                                                            className="chartwizard-line-point"
                                                            style={{ height: `${h}%` }}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                            {config.chartType === 'pie' && (
                                                <div className="chartwizard-mini-pie">
                                                    <div className="chartwizard-pie-chart">
                                                        <div className="chartwizard-pie-slice" style={{ '--percentage': 35 } as any} />
                                                    </div>
                                                </div>
                                            )}
                                            {config.chartType === 'area' && (
                                                <svg className="chartwizard-mini-area" viewBox="0 0 100 50">
                                                    <path
                                                        d="M0,40 L15,30 L30,35 L45,20 L60,28 L75,15 L90,25 L100,18 L100,50 L0,50 Z"
                                                        fill="url(#areaGradient)"
                                                    />
                                                    <defs>
                                                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                                                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                            )}
                                        </div>
                                        <div className="chartwizard-preview-value">
                                            {config.purpose === 'kpi' && '94.5%'}
                                            {config.purpose === 'checkin' && '1,234'}
                                            {config.purpose === 'sales' && '$54.2K'}
                                            {config.purpose === 'traffic' && '12.5K'}
                                            {config.purpose === 'revenue' && '$125K'}
                                            {config.purpose === 'performance' && '89%'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="chartwizard-footer">
                    <button
                        className="chartwizard-btn chartwizard-btn-secondary"
                        onClick={currentStep === 1 ? onCancel : handleBack}
                    >
                        {currentStep === 1 ? 'Cancel' : 'Back'}
                    </button>
                    <div className="chartwizard-step-indicator">
                        Step {currentStep} of {getTotalSteps()}
                    </div>
                    <button
                        className="chartwizard-btn chartwizard-btn-primary"
                        onClick={currentStep === getTotalSteps() ? handleComplete : handleNext}
                        disabled={!canProceed()}
                    >
                        {currentStep === getTotalSteps() ? 'Create Chart' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChartWizard

