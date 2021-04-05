import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'titleCase'
})
export class TitleCasePipe implements PipeTransform {
    transform(string: string) {
        if (!string) return string;
        return string[0].toUpperCase() + string.substr(1).toLowerCase();
    }
}