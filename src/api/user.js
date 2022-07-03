import request from '@/utils/request'

export function dayCount(data) {
    return request({
        url: `/day/count/${data}`,
        method: 'get',
        params: null
    })
}

export function monCount(data) {
    return request({
        url: `/day/count/${data}`,
        method: 'get',
        params: null
    })
}