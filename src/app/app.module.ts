import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from '@components/App/app.component';
import { LoginComponent } from '@components/Pages/login/login.component';
import { RegisterComponent } from '@components/Pages/register/register.component';
import { HomeComponent } from '@components/Pages/home/home.component';
import { AdminComponent } from '@components/Pages/admin/admin.component';
import { ProfileComponent } from '@components/Pages/profile/profile.component';
import { ProjectsComponent } from '@components/Pages/projects/projects.component';
import {AppRoutingModule} from '@modules/app-routing/app-routing.module';
import { NavigationBarComponent } from '@components/General/navigation-bar/navigation-bar.component';
import {APIInterceptor} from '@services/http/APIInterceptor';
import { UserComponent } from '@components/Pages/user/user.component';
import { ChatsComponent } from '@components/Pages/chats/chats.component';
import { SettingsComponent } from '@components/Pages/settings/settings.component';
import { SearchComponent } from '@components/Pages/search/search.component';
import { ProjectsOverviewComponent } from '@components/Pages/projects-overview/projects-overview.component';
import { AdminProjectComponent } from '@components/Pages/admin-project/admin-project.component';
import { AdminUsersComponent } from '@components/Pages/admin-users/admin-users.component';
import { LogoutComponent } from '@components/Pages/logout/logout.component';
import { HeaderComponent } from '@components/General/header/header.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart'

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		HomeComponent,
		AdminComponent,
		ProfileComponent,
		ProjectsComponent,
		NavigationBarComponent,
		UserComponent,
		ChatsComponent,
		SettingsComponent,
		SearchComponent,
		ProjectsOverviewComponent,
		AdminProjectComponent,
		AdminUsersComponent,
		LogoutComponent,
		HeaderComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule,
		PickerModule
	],
	providers: [{
		provide: HTTP_INTERCEPTORS,
		useClass: APIInterceptor,
		multi: true,
	}],
	bootstrap: [AppComponent]
})
export class AppModule { }
