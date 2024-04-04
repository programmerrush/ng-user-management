import { Component } from '@angular/core';
import data from '../../assets/heliverse_mock_data.json';
import { ImageSizePipe } from '../pipes/image-size.pipe';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  imports: [ImageSizePipe, RouterLink],
})
export class UserProfileComponent {
  user: any;
  id: number = 0;
  totalRecords: number = 0;
  // routeId: number = 0;
  constructor(private route: ActivatedRoute, private router: Router) {
    // this.routeId = Number(this.route.snapshot.paramMap.get('id'));

    // if (this.routeId === 0) {
    //    this.router.navigate(['/users/']);
    // }

    router.events.subscribe((val) => {
      this.getData();
    });
  }

  ngOnInit() {}
  getData() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.user = data[this.id - 1];
    this.totalRecords = data.length;
  }

  // prev() {
  //   if (this.routeId > 1) {
  //     let newId = this.routeId - 1;
  //     // alert(newId);
  //     this.router.navigate(['/profile/' + newId]);
  //   }
  // }

  // next() {
  //   if (this.routeId !== 0) {
  //     let newId = this.routeId + 1;
  //     // alert(newId);
  //     this.router.navigate(['/profile/' + newId]);
  //   }
  // }
}
