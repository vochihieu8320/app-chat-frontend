import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecretPerkComponent } from './secret-perk.component';

const routes: Routes = [
  {
    path: '',
    component: SecretPerkComponent,
    data: {
      title: 'Get Secret Perk',
      icon: 'icon-layout-sidebar-left',
      // caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecretPerkRoutingModule { }
