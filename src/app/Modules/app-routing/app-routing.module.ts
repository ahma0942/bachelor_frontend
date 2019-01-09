import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '@components/Pages/login/login.component';
import {ProjectsComponent} from '@components/Pages/projects/projects.component';
import {AdminComponent} from '@components/Pages/admin/admin.component';
import {ProfileComponent} from '@components/Pages/profile/profile.component';
import {UserComponent} from '@components/Pages/user/user.component';
import {ChatsComponent} from '@components/Pages/chats/chats.component';
import {SettingsComponent} from '@components/Pages/settings/settings.component';
import {ProjectsOverviewComponent} from '@components/Pages/projects-overview/projects-overview.component';
import {AdminProjectComponent} from '@components/Pages/admin-project/admin-project.component';
import {AdminUsersComponent} from '@components/Pages/admin-users/admin-users.component';
import {LogoutComponent} from '@components/Pages/logout/logout.component';
import {AdminUserAddGroupComponent} from '@app/Components/Pages/admin-user-add-group/admin-user-add-group.component';

const url = new URL(window.location.href);
if (url.searchParams.get('token') && url.searchParams.get('token') !== '') {
	localStorage.setItem('token', url.searchParams.get('token'));
}

const routes: Routes = [
	{path: 'Login', component: LoginComponent, data: { title: 'Login', logged: false }},
	{path: 'User', component: UserComponent, data: { title: 'User', logged: true }, children: [
		{path: 'Profile', data: { title: 'Profile' }, component: ProfileComponent},
		{path: 'Projects', data: { title: 'Projects' }, children: [
			{path: '', component: ProjectsComponent},
			{path: ':id', children: [
				{path: '', component: ProjectsOverviewComponent},
			]},
		]},
		{path: 'Settings', data: { title: 'Settings' }, component: SettingsComponent},
		{path: 'Admin', data: { title: 'Admin', role_id: [2] }, children: [
			{path: '', component: AdminComponent},
			{path: 'Projects', component: AdminProjectComponent},
			{path: 'Users', children: [
				{path: '', component: AdminUsersComponent},
				{path: ':id', component: AdminUserAddGroupComponent}
			]}
		]},
		{path: 'Logout', component: LogoutComponent},
	]},
	{path: 'Chat/:id', data: { logged: true }, children: [
		{path: '', component: ChatsComponent}
	]},
	{path: '**', redirectTo: '/Login'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
	providers: [
		{provide: 'Routes', useValue: routes}
	]
})
export class AppRoutingModule { }
