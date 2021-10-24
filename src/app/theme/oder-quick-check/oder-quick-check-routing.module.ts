import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { OderQuickCheckComponent } from './oder-quick-check.component';


const routes: Routes = [
    {
        path: '',
        component: OderQuickCheckComponent,
        
            data: {
                title: 'Get Quick Access',
              }           
        
    }
]

@NgModule({

    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})

export class OderQuickCheckRoutingModule{}