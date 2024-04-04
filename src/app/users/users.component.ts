import { Component } from '@angular/core';
import data from '../../assets/heliverse_mock_data.json';
import { ImageSizePipe } from '../pipes/image-size.pipe';
import { PaginationService } from '../services/pagination.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  NgbDropdown,
  NgbModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { filter, find, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  imports: [
    ImageSizePipe,
    CommonModule,
    HttpClientModule,
    NgbPaginationModule,
    FormsModule,
    RouterLink,
    NgbModule,
  ],
})
export class UsersComponent {
  // user = datao[0];

  datao: any[] = data;
  filteredData: any = this.datao;

  page: number = 1;
  pageSize: number = 20;
  totalRecords: number = 0;
  allGenders: any[] = [];
  filters = {
    available: null,
    gender: null,
    domain: null,
    searchTerm: '',
  };
  searchTerm: string = '';
  showData: any[] = [];
  allDomains: any;

  team: any = {
    name: '',
    members: [
      // {
      //   id: 0,
      //   first_name: '',
      //   last_name: '',
      //   email: '',
      //   gender: '',
      //   avatar: '',
      //   domain: '',
      //   available: false,
      // },
    ],
  };
  allTeams: any[] = [];

  addNewTeam() {
    this.getAllTeams();
    if (this.allTeams.length > 0) {
      if (this.findTeam(this.allTeams, this.team.name) == false) {
        console.log(this.allTeams);
        this.allTeams.push(this.team);
        localStorage.setItem('teams', JSON.stringify(this.allTeams));
        // alert('Team added successfully');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Team ' + this.team.name + ' added successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        this.team.name = '';
      } else {
        // alert('Team already exists');
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Team ' + this.team.name + ' already exists',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else if (this.allTeams.length == 0) {
      // let newTeam = [];
      // console.log(this.allTeams);
      this.allTeams.push(this.team);
      // console.log(this.team);
      // console.log(this.allTeams);
      // console.log(JSON.stringify(this.allTeams));
      localStorage.setItem('teams', JSON.stringify(this.allTeams));
      // alert('Team added successfully');
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Team ' + this.team.name + ' added successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  addMemberToTeam(teamName: string, member: any) {
    this.getAllTeams();
    console.log(member + ' added to ' + teamName);
    let team = this.allTeams.find((team: any) => team.name == teamName);

    console.log(team);
    if (member.id != 0 && member.available != false) {
      if (this.findTeamMember(team, member.id) == false) {
        if (this.findTeamMemberDomain(team, member.domain) == false) {
          team.members.push(member);
          localStorage.setItem('teams', JSON.stringify(this.allTeams));
          // alert('Member added to team successfully');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title:
              'Member ' +
              member.first_name +
              ' ' +
              member.last_name +
              ' added to team ' +
              team.name +
              ' successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          // alert('Please select a different member domain');
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Please select a different member domain',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        // alert('Member already exists in the team');
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Member already exists in the team',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      // alert('Please select a available member');
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Please select a available member',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  resetTeam() {
    localStorage.removeItem('teams');
    this.getAllTeams();
    // alert('All teams deleted');
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'All teams deleted',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  findTeam(allTeams: any, teamName: string) {
    console.log(allTeams);
    if (allTeams.find((team: any) => team.name == teamName)) {
      return true;
    }
    return false;
  }

  findTeamMember(team: any, memberId: string) {
    console.log(team, memberId);
    if (team.members.find((member: any) => member.id == memberId)) {
      return true;
    }
    return false;
  }

  findTeamMemberDomain(team: any, memberDomain: string) {
    console.log(team, memberDomain);
    if (team.members.find((member: any) => member.domain == memberDomain)) {
      return true;
    }
    return false;
  }

  getAllTeams() {
    if (localStorage.getItem('teams') != null) {
      this.allTeams = JSON.parse(String(localStorage.getItem('teams')));
    } else {
      this.allTeams = [];
    }
    // this.allTeams = JSON.parse(teams);
    // if (this.allTeams == null) {
    //   this.allTeams = [];
    // } else {
    //   this.allTeams = JSON.parse(teams);
    // }
    console.log(this.allTeams);
  }

  constructor(private http: HttpClient) {
    // this.getTotalRecords();

    this.getAllGenders().subscribe((data) => {
      this.allGenders = data;
    });
    this.getAllDomains().subscribe((data) => {
      this.allDomains = data;
    });

    this.loadData();
    this.getAllTeams();
  }

  getPaginatedData(filteredData: any, page: number, pageSize: number) {
    return of(filteredData).pipe(
      map((data) => {
        // console.log(data);
        this.totalRecords = data.length / 2;
        return data.slice((page - 1) * pageSize, page * pageSize);
      })
    );
  }

  // getTotalRecords(): Observable<any> {
  //   return of(this.filteredData).pipe(
  //     map((data) => {
  //       // return data.length;
  //       console.log(data.length);
  //       this.totalRecords = data.length / 2;
  //     })
  //   );
  // }

  getAllGenders(): Observable<any> {
    return this.http.get('../assets/heliverse_mock_data.json').pipe(
      map((data: any) => {
        return [...new Set(data.map((data: { gender: any }) => data.gender))];
      })
    );
  }

  getAllDomains(): Observable<any> {
    return this.http.get('../assets/heliverse_mock_data.json').pipe(
      map((data: any) => {
        return [...new Set(data.map((data: { domain: any }) => data.domain))];
      })
    );
  }
  reset() {
    this.filters = {
      available: null,
      gender: null,
      domain: null,
      searchTerm: '',
    };
    this.applyFilters();
    // alert('All Filters reset');
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'All Filters reset',
      showConfirmButton: false,
      timer: 1500,
    });
  }
  loadData() {
    this.getPaginatedData(
      this.filteredData,
      this.page,
      this.pageSize
    ).subscribe((data: any[]) => {
      // this.datao = data;
      this.showData = data;
      // this.applyFilters();
    });
  }

  pageChange(newPage: number) {
    this.page = newPage;
    this.loadData();
    // console.log(newPage);
  }

  applyFilters() {
    // console.log(this.filters);
    this.filteredData = this.datao.filter((item) => {
      return (
        (this.filters.available !== null && this.filters.available !== 'null'
          ? item.available == this.filters.available
          : item.gender) &&
        (this.filters.gender !== null && this.filters.gender !== 'null'
          ? item.gender == this.filters.gender
          : item.gender) &&
        (this.filters.domain !== null && this.filters.domain !== 'null'
          ? item.domain == this.filters.domain
          : item.domain) &&
        (this.filters.searchTerm == '' ||
          item.first_name
            .toLowerCase()
            .includes(this.filters.searchTerm.toLowerCase()) ||
          item.last_name
            .toLowerCase()
            .includes(this.filters.searchTerm.toLowerCase()))
      );
    });

    // this.filteredData = this.datao.filter((item) => {
    //   return (
    //     (this.filters.available == null ||
    //       item.available == this.filters.available) &&
    //     (this.filters.gender == null || item.gender == this.filters.gender) &&
    //     (this.filters.domain == null || item.domain == this.filters.domain) &&
    // (this.searchTerm == '' ||
    //   item.firstname
    //     .toLowerCase()
    //     .includes(this.searchTerm.toLowerCase()) ||
    //   item.lastname.toLowerCase().includes(this.searchTerm.toLowerCase()))
    //   );
    // });

    // console.log(this.filteredData);
    // this.showData = this.filteredData;
    this.loadData();
  }

  dummy() {
    console.log('dummy');
  }

  // nextPage() {
  //   this.page++;
  //   this.loadData();
  // }

  // previousPage() {
  //   if (this.page > 1) {
  //     this.page--;
  //     this.loadData();
  //   }
  // }
}
