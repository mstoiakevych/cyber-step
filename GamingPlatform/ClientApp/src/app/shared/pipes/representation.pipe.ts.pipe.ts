import { Pipe, PipeTransform } from '@angular/core';
import {gameModeRepresentations, Representation, serverRepresentations} from "../interfaces/match";

@Pipe({
  name: 'RepresentationPipe'
})
export class RepresentationPipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    const representations = args[0] as Representation[]

    console.log(representations)

    console.log('repr', representations.find(r => r.value === value))
    console.log(value)

    return representations.find(r => r.value === value)!.representation;
  }

}
