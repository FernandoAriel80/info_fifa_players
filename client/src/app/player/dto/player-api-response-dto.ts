import { PaginationDto } from "./pagination-dto";

export interface PlayerApiResponseDto<T> {
    success: boolean;
    data: T;
    meta: PaginationDto;
    total?: number; 
    page?: number;
    limit?: number;
}
