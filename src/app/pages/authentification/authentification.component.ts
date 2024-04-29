import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, retry } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogErrorService } from 'src/app/services/dialog-error.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit, AfterViewInit {

  isMobile;
  screenHeight: number;
  screenWidth: number;

  login = "";
  password="";
  emptyLog=false;
  emptyPass=false;
  showAuth=true;
  showlogin=true;


  currentRoute;
  constructor(private router : Router,private overlay: OverlayContainer,
              private _http:HttpClient, private dialog_error:DialogErrorService,
              public authService: AuthenticationService, private route: ActivatedRoute)
  { 
    this.route.url.subscribe(url => {
      console.log('URL:', url)
      this.currentRoute = url[0]?.path;
      console.log('Current Route:', this.currentRoute);
    })
  }
  
  toggleTheme(): void {
    if (this.overlay.getContainerElement().classList.contains("dark-theme")) {
      this.overlay.getContainerElement().classList.remove("dark-theme");
      this.overlay.getContainerElement().classList.add("light-theme");
    } else if (this.overlay.getContainerElement().classList.contains("light-theme")) {
      this.overlay.getContainerElement().classList.remove("light-theme");
      this.overlay.getContainerElement().classList.add("dark-theme");
    } else {
      this.overlay.getContainerElement().classList.add("light-theme");
    }
    if (document.body.classList.contains("dark-theme")) {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
    } else if (document.body.classList.contains("light-theme")) {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.add("light-theme");
    }
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      // console.log(this.screenHeight, this.screenWidth);
  }

  ngAfterViewInit()
  {
    setTimeout(() => {
      if((this.screenHeight > this.screenWidth) || (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)))
      {
        // true for mobile device
        this.isMobile = true;
      }else{
        // false for not mobile device
        this.isMobile = false;
      }
    }, 10);

  }

  ngOnInit(): void {
    window.addEventListener("resize", () => {
      if((this.screenHeight > this.screenWidth) || (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))){
        // true for mobile device
        this.isMobile = true;
      }else{
        // false for not mobile device
        this.isMobile = false;
      }
    });
  }


  getPassword(event)
  {
    this.password=event;
  }
  getLogin(event)
  {
    this.login=event;
  }

  nbcon=0;
  auth()
  {
    console.log(this.login);
    console.log(this.password);
    if(this.login=="" || this.password=="")
    {
      this.emptyLog=true;
      this.emptyPass=true;
      this.dialog_error.openDialog("Merci de remplir les champs");

    }
    else
    {
      let baseUrl = "http://localhost:8088/Authentification";
      let h = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}

      let body = new URLSearchParams();
      body.set('login', this.login);
      body.set('password',this.password);
      this.authService.login(baseUrl, body, h)
      
      .pipe(retry(1),catchError(this.dialog_error.handleError.bind(this))).subscribe((next : any) =>
      {
        console.log(next);

        if(next.msg=="notok")
        {
          // this.loadingSpinner.closeDialog();
          this.dialog_error.openDialog("Not OK");
          this.showAuth=false;
          this.showlogin=false;
          return;
        }
        else if(next.msg=="pass incorrect")
          {
            console.log(next);
            if(this.nbcon < 2)
            {
              // this.loadingSpinner.closeDialog();
              this.dialog_error.openDialog("Incorrect password");
              this.showAuth=false;
              this.nbcon+=1;

            }
            else
            {
              // this.loadingSpinner.closeDialog();
              this.dialog_error.openDialog("Accès refusé");
              this.showAuth=false;
              this.showlogin=false;
            }

          }
        else if(next.msg=="ok")
        {
         console.log(next.level);
         if(next.level==0)
         {
          // this.loadingSpinner.closeDialog();
          this.dialog_error.openDialog("Accès refusé");
          this.showAuth=false;
         }
         else
         {
            let JSONDatas = [
              {"login": this.login, }];
              localStorage.setItem("datas", JSON.stringify(JSONDatas));
              this.router.navigate(['gestion_joueurs']);
          }

        }
        else
        {
          // this.loadingSpinner.closeDialog();
          this.dialog_error.openDialog("Erreur connexion BDD");
          this.showAuth=false;
          return;
        }

      })
    }
  }

}
