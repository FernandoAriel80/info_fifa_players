import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from "../header-component/header.component";
import { FooterComponent } from "../footer-component/footer-component";

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './main-layout-component.html',
  styleUrl: './main-layout-component.css'
})
export class MainLayoutComponent {

}
