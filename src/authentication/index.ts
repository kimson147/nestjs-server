import { Module } from '@nestjs/common';
import { AuthenticationController } from '@/authentication/controllers';
import { AuthenticationService } from '@/authentication/services/authentication.service';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
