export interface ApiSimpleResponseDto<T> {
    success: boolean;
    data: T;
}