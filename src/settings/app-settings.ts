export type EnvironmentVariable = { [key: string]: string | undefined }

export type EnvironmentsTypes = 'DEVELOPMENT' | 'STAGING' | 'PRODUCTION'

export class EnvironmentSettings {
    constructor(private env: EnvironmentsTypes) {}

    getEnv() {
        return this.env
    }

    isProduction() {
        return this.env === 'PRODUCTION'
    }

    isStaging() {
        return this.env === 'STAGING'
    }

    isDevelopment() {
        return this.env === 'DEVELOPMENT'
    }
}

class APISettings {
    public readonly REACT_APP_API_BASE_URL: string
    public readonly REACT_APP_PASSED_PERCENT: number

    constructor(private envVariables: EnvironmentVariable) {
        this.REACT_APP_API_BASE_URL =
            envVariables.REACT_APP_API_BASE_URL || 'https://mbb-nest.vercel.app'
        this.REACT_APP_PASSED_PERCENT = 50
    }
}

class AppSettings {
    constructor(public env: EnvironmentSettings, public api: APISettings) {}
}

const env = new EnvironmentSettings(
    (process.env.REACT_APP_NODE_ENV || 'DEVELOPMENT') as EnvironmentsTypes
)
const api = new APISettings(process.env)

export const appSettings = new AppSettings(env, api)
