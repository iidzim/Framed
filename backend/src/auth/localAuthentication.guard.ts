import { Injectable } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class localAuthenticationGuard extends AuthGuard('local') {}