import ApiService from './ApiService'
import type {
    SignInCredential,
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignInResponse,
    SignUpResponse,
} from '@/@types/auth'

export async function apiSignIn(data: SignInCredential) {
    // return ApiService.fetchData<SignInResponse>({
    //     url: '/sign-in',
    //     method: 'post',
    //     data,
    // })
    return {
        data: {
            user: {  avatar: '/img/avatars/thumb-1.jpg',
                userName: 'Carolyn Perkins',
                email: 'carolyn.p@elstar.com',
                authority: ['admin', 'user'], },
            token: 'wVYrxaeNa9OxdnULvde1Au5m5w63',
            id: '21',
            password: '123Qwe',
            accountUserName: 'admin',
        },
    }
}

export async function apiSignUp(data: SignUpCredential) {
    return ApiService.fetchData<SignUpResponse>({
        url: '/sign-up',
        method: 'post',
        data,
    })
}

export async function apiSignOut() {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
    })
}

export async function apiForgotPassword(data: ForgotPassword) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data: ResetPassword) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}
