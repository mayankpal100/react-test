export type AppConfig = {
    apiPrefix: string | undefined
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: import.meta.env.VITE_APP_BASE_URL,
    authenticatedEntryPath: '/sales',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}

export default appConfig
