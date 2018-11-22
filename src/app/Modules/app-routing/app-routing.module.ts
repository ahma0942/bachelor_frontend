import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '@components/Pages/login/login.component';
import {ProjectsComponent} from '@components/Pages/projects/projects.component';
import {AdminComponent} from '@components/Pages/admin/admin.component';
import {ProfileComponent} from '@components/Pages/profile/profile.component';
import {UserComponent} from '@components/Pages/user/user.component';
import {ChatsComponent} from "@components/Pages/chats/chats.component";
import {SettingsComponent} from "@components/Pages/settings/settings.component";
import {SearchComponent} from '@components/Pages/search/search.component';
import {ProjectsOverviewComponent} from '@components/Pages/projects-overview/projects-overview.component';
import {AdminProjectComponent} from '@components/Pages/admin-project/admin-project.component';
import {AdminUsersComponent} from '@components/Pages/admin-users/admin-users.component';
import {LogoutComponent} from '@components/Pages/logout/logout.component';

const url = new URL(window.location.href);
if (url.searchParams.get('token') && url.searchParams.get('token') !== '') {
	localStorage.setItem('token', url.searchParams.get('token'));
}

const routes: Routes = [
	{path: 'Login', component: LoginComponent, data: { title: 'Login', logged: false }},
	{path: 'User', component: UserComponent, data: { title: 'User', logged: true }, children: [
		{path: 'Profile', component: ProfileComponent, data: { title: 'Profile' }},
		{path: 'Projects', data: { title: 'Projects' }, children: [
			{path: '', component: ProjectsComponent},
			{path: ':id', children: [
				{path: '', component: ProjectsOverviewComponent},
			]},
		]},
		{path: 'Settings', component: SettingsComponent, data: { title: 'Settings' }},
		{path: 'Admin', data: { title: 'Admin' }, children: [
			{path: '', component: AdminComponent},
			{path: 'Projects', component: AdminProjectComponent},
			{path: 'Users', component: AdminUsersComponent}
		]},
		{path: 'Logout', component: LogoutComponent, data: { title: 'Logout' }},
	]},
	{path: 'Chat/:id', data: { logged: true }, children: [
		{path: '', component: ChatsComponent},
		{path: 'Search', component: SearchComponent}
	]},
	{path: '**', redirectTo: '/Login'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [
		{provide: 'Routes', useValue: routes}
	]
})
export class AppRoutingModule { }
