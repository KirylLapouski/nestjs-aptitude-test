import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { Profile } from './profile.entity';
import { Column, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileSubscriber } from './profile.subscriber';
import { filter, map } from 'rxjs/operators';

// TODO: add docker
// TODO: add hash

interface ProfileDTO {
  name: string;
  email: string;
  password: string;
}

interface ProfileByNameRequest {
  name: string;
}
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
  edit(profile: ProfileDTO) {
    const res = this.profileRepository.merge(profile);
    return from(this.profileRepository.save(res))
      .pipe(
        map(() => ({}))
      );
  }


  @GrpcMethod('ProfileService', 'getByName')
  getByName({ name }: ProfileByNameRequest): Observable<ProfileDTO> {
    const subject = new Observable<ProfileDTO>(subscriber => {
      this.profileSubscriber.addSubscriber(subscriber);
    })
      .pipe(
        filter(v => v.name === name)
      )
    return subject;
  }
}
