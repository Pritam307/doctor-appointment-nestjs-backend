import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    // Hardcoded demo user
    private readonly user = { id: 'user1', username: 'admin', password: 'password' };
    constructor(private readonly jwtService: JwtService,){}

    login(username: string, password: string) {
        console.log("DDDDDD",username,password); 
        if (username === this.user.username && password === this.user.password) {
            const payload = {
                sub: this.user.id,
                username: this.user.username,
            };
            const token = this.jwtService.sign(payload);
            return { access_token: token };
        }else{
            throw new UnauthorizedException();
        }
    }
}
