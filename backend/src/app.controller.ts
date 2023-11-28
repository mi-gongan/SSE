import { Body, Controller, Post, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, Subject, map } from 'rxjs';

@Controller()
export class AppController {
  private messageSubject = new Subject<string>();

  constructor(private readonly appService: AppService) {}

  @Post('price')
  setPrice(@Body('price') price: number): number {
    this.messageSubject.next(price.toString());
    return price;
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.messageSubject.pipe(
      map(
        (data) =>
          ({
            data,
          }) as MessageEvent,
      ),
    );
  }
}
