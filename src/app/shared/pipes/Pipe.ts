import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(rawNum) {
    rawNum = rawNum.charAt(0) == 0 ? '+2' + rawNum : '' + rawNum;

    let newStr = '';
    let i = 0;
    // for (; i < Math.floor(rawNum.length / 2) - 1; i++) {
    //   newStr = newStr + rawNum.substr(i * 2, 2) + "-";
    // }
    return newStr + rawNum.substr(i * 2);
  }
}

@Pipe({
  name: 'convertSize',
})
export class ConvertSize {
  transform(bytes) {
    if (bytes == 0) {
      return '0 B';
    }
    var k = 1000,
      dm = 1,
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}

@Pipe({
  name: 'safeURL',
})
export class SafeURL implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Pipe({
  name: 'safeURLTracking',
})
export class SafeURLTracking implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Pipe({
  name: 'currencySpace',
})
export class CurrencySpacePipe implements PipeTransform {
  constructor(private cookie: CookieService) {}
  transform(value: any, args?: any): any {
    return value?.replace(
      this.cookie.get('currency'),
      this.cookie.get('currency') + ' '
    );
  }
}
@Pipe({
  name: 'distanceSpace',
})
export class DistanceSpacePipe implements PipeTransform {
  constructor(private cookie: CookieService) {}
  transform(value: any, args?: any): any {
    return value?.replace(
      this.cookie.get('distanceUnit'),
      ' ' + this.cookie.get('distanceUnit')
    );
  }
}

// {{ 200 | currency:'BRL':true | currencySpace }} // R$ 200.00
