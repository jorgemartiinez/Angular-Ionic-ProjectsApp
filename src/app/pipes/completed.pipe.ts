import { Task } from './../interfaces/interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'completed',
  pure: true,
})
export class CompletedPipe implements PipeTransform {

  transform(tasks: Task[], options: string): any {
    let finalTasks = tasks;

    switch (options) {
        case 'all':
            return finalTasks;
        case 'pending':
            finalTasks = tasks.filter((task) => task.state === 0);
            // console.log('los pending', finalTasks);
            return finalTasks;
        case 'completed':
            finalTasks = tasks.filter((task) => task.state === 1);
            // console.log('los completed', finalTasks);
            return finalTasks;
        default:
            return finalTasks;
    }
}

}
