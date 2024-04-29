import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { DialogErrorService } from 'src/app/services/dialog-error.service';
import { DialogMessageService } from 'src/app/services/dialog-message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gestion-joueurs',
  templateUrl: './gestion-joueurs.component.html',
  styleUrls: ['./gestion-joueurs.component.scss']
})
export class GestionJoueursComponent implements OnInit, AfterViewInit {

  settings = {};
  issetting=false;
  selectedRow;
  source: LocalDataSource = new LocalDataSource();

  currentRoute;

  constructor(private _http:HttpClient, public dialog_error: DialogErrorService, private dialog_msg: DialogMessageService, private route: ActivatedRoute) 
  {
    this.route.url.subscribe(url => {
      console.log('URL:', url)
      this.currentRoute = url[0]?.path;
      console.log('Current Route:', this.currentRoute);
    })
  }

  ngAfterViewInit()
  {
    this.getPlayers();
  }

  ngOnInit(): void {
  }

  getPlayers()
  {
    this.settings = 
    {
      defaultStyle: true,
      
      actions: {
        columnTitle: 'Actions',
        position: 'right',
        add: true,
        edit: true,
        delete: true,
        width: '20%',
      },
      add:
      {
        addButtonContent: '<img src="assets/nebular-icons-master/src/icons/update/add-plus-icon.svg" width="30" height="30" >',
        createButtonContent: '<img src="assets/nebular-icons-master/src/icons/update/approve-accept-icon.svg" width="30" height="30">',
        cancelButtonContent: '<img src="assets/nebular-icons-master/src/icons/update/remove-cross-icon.svg" width="30" height="30">',
        confirmCreate : true,
      },
      edit:
      {
         editButtonContent: '<img src="assets/nebular-icons-master/src/icons/update/edit-round-icon.svg" width="30" height="30" >',
         saveButtonContent: '<img src="assets/nebular-icons-master/src/icons/update/approve-accept-icon.svg" width="30" height="30">',
         cancelButtonContent: '<img src="assets/nebular-icons-master/src/icons/update/remove-cross-icon.svg"  width="30" height="30">',
         confirmSave : true,
      },
      delete:
      {
         deleteButtonContent: '<img src="assets/nebular-icons-master/src/icons/update/trash.png" width="30" height="30">',
         confirmDelete: true,
      },

      columns: {
        name:{
          type:'text',
          title:"Nom & Prénom",
          width: '15%',
        },
        age:{
          type:'text',
          title:"Age",
          width: '10%',
        },
        nationality:{
          type:'text',
          title:"Nationalité",
          width: '10%',
        },
        number:{
          type:'text',
          title:"Numéro",
          width: '10%',
        },
        height:{
          type:'text',
          title:"Hauteur",
          width: '10%',
        },
        weight:{
          type:'text',
          title:"Poids",
          width: '10%',
        },
        position_name:{
          type:'text',
          title:"Position",
          width: '10%',
        },
        carrier_start_date:{
          type:'text',
          title:"début de Carrière",
          width: '15%',
        },
      }
    };

    this.issetting=true;

    let baseUrl = "http://localhost:8088/getList_players";
      let h = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}
      let body = new URLSearchParams();
      this._http.post(baseUrl,body.toString(),h)
      //.pipe(retry(3),catchError(this.dialog_error.handleError.bind(this)))
      .subscribe((next : any) =>
      {
        console.log(next);
        this.selectedRow = next.data;
        this.source.load(next.data);
        this.source.setPaging(1,14, true);
      })
  }

  addPlayer(event)
  {
    console.log(event);
  
      let baseUrl = "http://localhost:8088/add_players";
      let h = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}
      let body = new URLSearchParams();
      body.set('name', event.name);
      body.set('age', event.age);
      body.set('nationality', event.nationality);
      body.set('number', event.number);
      body.set('height', event.height);
      body.set('weight', event.weight);
      body.set('position_name', event.position_name);
      body.set('carrier_start_date', event.carrier_start_date);
     this._http.post(baseUrl,body.toString(),h)
      .subscribe((next : any) =>
      {
        
      });
    
  }

  onCreateConfirm(event): void
  {
    console.log(event);
    if(event.newData.name == "" ||  event.newData.age == "" || event.newData.nationality == "" || event.newData.number == "" || event.newData.height == "" || event.newData.weight == "" || event.newData.position_name == "" ||  event.newData.carrier_start_date == "" )
    {
      this.dialog_error.openDialog("Veuillez remplir les champs");
    }
   
    // else if (this.validMail(event.mail) == false)
    // {
    //     alert("mail non valide");
    // }
    else
    {
      this.dialog_msg.openDialog('Voulez-vous ajouter un joueur ?').subscribe(result => {
        if(result)
        {
          this.addPlayer(event.newData);
          event.confirm.resolve(event.newData);
          setTimeout(() => {
            window.location.href = "http://localhost:4200/gestion_joueurs"
          }, 800);
        }
        else{event.confirm.reject();}
      
      });
    }
  }

  suppPlayer(event)
  {
    let baseUrl = "http://localhost:8088/deletePlayer";
      let h = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}
      let body = new URLSearchParams();
      body.set('id', event.data.id);
      this._http.post(baseUrl,body.toString(),h)
      .subscribe((next : any) =>
      {});
  }

  onDeleteConfirm(event): void
  {
    console.log(event);
    
    this.dialog_msg.openDialog('Voulez-vous supprimer ce joueur ?').subscribe(result => {
      if(result)
      {
        this.suppPlayer(event);
        event.confirm.resolve();
        setTimeout(() => {
          window.location.href = "http://localhost:4200/gestion_joueurs"
        }, 800);
      }
      else {event.confirm.reject();}
    });
  }

  updatePlayer(event)
  {
    console.log(event);
    let baseUrl = "http://localhost:8088/editPlayer";
      let h = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}
      let body = new URLSearchParams();
      body.set('id', event.id);
      body.set('name', event.name);
      body.set('age', event.age);
      body.set('nationality', event.nationality);
      body.set('number', event.number);
      body.set('height', event.height);
      body.set('weight', event.weight);
      body.set('position_name', event.position_name);
      body.set('carrier_start_date', event.carrier_start_date);
      this._http.post(baseUrl,body.toString(),h)
      .subscribe((next : any) => {});
  }

  onEditConfirm(event): void
  {

    console.log(event);
    this.dialog_msg.openDialog('Voulez-vous modifier le joueur ?').subscribe(result => {
      if(result)
      {
        this.updatePlayer(event.newData);
        event.confirm.resolve(event.newData);
        setTimeout(() => {
          window.location.href = "http://localhost:4200/gestion_joueurs"
        }, 800);
      }
      else {event.confirm.reject();}
    });

  }
}
