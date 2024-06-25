import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { RlFormModule } from '../../Helpers/rl-form/rl-form.module';
import { MatDividerModule } from '@angular/material/divider';
import { RoleNamePipe, UserListComponent } from './user-list/user-list.component';
import { CardModule, GridCardModule, ItemsModule, RlFormsModule } from '@randem-frames/ui-rl';
import { TitleTemplateModule } from '../../templates/title-template/title-template.module';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

const routes: Routes = [
    { path: 'list', component: UserListComponent, data: { title: 'lista użytkowników' } },
    { path: '', redirectTo: '/dashboard/user/list', pathMatch: 'full' },
];

@NgModule({
    declarations: [UserComponent, UserFormComponent, UserFormComponent, UserListComponent, RoleNamePipe],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatTooltipModule,
        RouterModule.forChild(routes),
        CdkDrag,
        MatCardModule,
        RlFormModule,
        MatDividerModule,
        CdkDragHandle,
        GridCardModule,
        CardModule,
        ItemsModule,
        TitleTemplateModule,
        MatMenu,
        MatMenuTrigger,
        MatMenuItem,
        RlFormsModule,
    ],
})
export class UserModule {}
