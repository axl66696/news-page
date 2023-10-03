import { Injectable } from '@angular/core';
import { Coding } from '@his-base/datatypes';

@Injectable({
  providedIn: 'root'
})
export class MockUserService {
  mockUserCode:Coding = {code:"Neo",display:"Neo"}
}
