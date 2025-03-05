import { HttpHeaders, HttpParams } from "@angular/common/http";

export function createRequestOptions(params?: HttpParams) {
    return {
        headers: new HttpHeaders().set('Content-type', 'application/json'),
        params: params
    }
}