import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ResponseBaseDTO } from 'src/libs/core/base.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import ResponseConstants from 'src/constants/response.contants';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseBaseDTO<T>> {
    intercept(_: ExecutionContext, next: CallHandler): Observable<ResponseBaseDTO<T>> {

        //this is majorly for stream responses
        const isStream: boolean = Reflect.getMetadata('stream', _.getHandler());
        if(isStream) {
            return next.handle();
        }

        return next.handle().pipe(
            map((data) => ({
                code: ResponseConstants.Common[200].code,
                message: ResponseConstants.Common[200].message,
                type: Array.isArray(data) ? 'array' : 'object',
                data: data
            }))
        );
    }
}
