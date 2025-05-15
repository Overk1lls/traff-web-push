import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Hello' })
  @ApiOkResponse({ description: 'Hello World!' })
  getHello(): string {
    return this.appService.getHello();
  }
}
