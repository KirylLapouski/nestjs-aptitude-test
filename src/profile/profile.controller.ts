import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileSubscriber } from './profile.subscriber';
import { filter, map } from 'rxjs/operators';

// TODO: add docker
// TODO: add hash
@Controller('profile')
export class ProfileController {

  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @Inject(ProfileSubscriber)
    private profileSubscriber: ProfileSubscriber,
  ) {
  }

  @GrpcMethod('ProfileService', 'edit')
  edit(profile: any) {
    const res = this.profileRepository.merge(profile);
    return from(this.profileRepository.save(res))
      .pipe(
        map(() => ({}))
      );
  }


  @GrpcMethod('ProfileService', 'getByName')
  getByName({ name }: any): Observable<any> {
    const subject = new Observable<Profile>(subscriber => {
      this.profileSubscriber.addSubscriber(subscriber);
    })
      .pipe(
        filter(v => v.name === name)
      )
    return subject;
  }
}
